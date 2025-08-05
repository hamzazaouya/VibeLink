import pool from './postgreSQL_conf';
import {log} from './log'
import { QueryResult } from 'pg';

type Condition = {
  column: string;
  operator: '=' | '>' | '<' | '>=' | '<=' | '!=' | 'LIKE' | 'ILIKE' | 'IN' | 'IS' | 'IS NOT';
  value: any;
};

type Join = {
  type: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
  table: string;
  on: string;
};


const querySelect = async (
  fields: string[] | null,
  table: string,
  conditions: Condition[] | null,
  joins: Join[] | null = null
): Promise<any | null> => {
  if (!table) return null;

  if (!fields || fields.length === 0) {
    fields = ['*'];
  }

  let query = `SELECT ${fields.map(f => `${f}`).join(', ')} FROM ${table}`;

  if (joins && joins.length > 0) {
    joins.forEach(join => {
      query += ` ${join.type} JOIN ${join.table} ON ${join.on}`;
    });
  }

  const values: any[] = [];

  if (conditions && conditions.length > 0) {
    query += ' WHERE ';
    const clauses = conditions.map((cond, idx) => {
      values.push(cond.value);
      return `${cond.column} ${cond.operator} $${idx + 1}`;
    });
    query += clauses.join(' AND ');
  }

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error: any) {
    log(5, null, 'querySelect', error.message);
    return null;
  }
};



const queryInsert = async (
  table: string,
  columns: string[],
  values: any[]
): Promise<any | null> => {
  if (
    typeof table === 'undefined' || table === null ||
    typeof columns === 'undefined' || columns === null ||
    typeof values === 'undefined' || values === null
  ) {
    return null;
  }

  if (columns.length !== values.length || columns.length === 0) {
    log(5, null, 'queryInsert', 'Column/value count mismatch or empty.');
    return null;
  }

  const cols = columns.map(col => `"${col}"`).join(', ');
  const placeholders = values.map((_, idx) => `$${idx + 1}`).join(', ');

  const query = `INSERT INTO "${table}" (${cols}) VALUES (${placeholders})`;

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error: any) {
    log(5, null, 'queryInsert', error.message);
    return null;
  }
};


const queryDelete = async (
  table: string,
  columns: string[],
  values: any[]
): Promise<any | null> => {

  // Validate inputs
  if (
    typeof table === 'undefined' || table === null ||
    typeof columns === 'undefined' || columns.length === 0 ||
    typeof values === 'undefined' || values.length === 0
  ) {
    return null;
  }

  if (columns.length !== values.length) {
    log(5, null, 'queryDelete', 'Column/value count mismatch.');
    return null;
  }

  const conditions = columns.map((col, idx) => `"${col}" = $${idx + 1}`).join(' AND ');
  const query = `DELETE FROM "${table}" WHERE ${conditions}`;

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error: any) {
    log(5, null, 'queryDelete', error.message);
    return null;
  }
};

const queryUpdate = async (
  table: string,
  columns: string[],
  values: any[],
  condiCol: string,
  condiVal: any
): Promise<any | null> => {
  if (
    !table || !columns || !values || !condiCol || typeof condiVal === 'undefined' ||
    columns.length !== values.length
  ) {
    return null;
  }

  const setClause = columns
    .map((col, index) => `"${col}" = $${index + 1}`)
    .join(', ');

  const query = `UPDATE "${table}" SET ${setClause} WHERE "${condiCol}" = $${columns.length + 1}`;
  const queryValues = [...values, condiVal];

  console.log(query);
  try {
    const result = await pool.query(query, queryValues);
    return result;
  } catch (error: any) {
    log(5, null, 'queryUpdate', error.message);
    return null;
  }
};


const query = {
  select: querySelect,
  insert: queryInsert,
  delete: queryDelete,
  update: queryUpdate,
};

export default query;


