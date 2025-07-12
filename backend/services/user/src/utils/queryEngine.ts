import pool from './postgreSQL_conf';
import {log} from './log'

const querySelect = async (
  fields: string[] | null,
  table: string,
  columns: string[] | null,
  values: any[] | null
): Promise<any[] | null> => {

  if (typeof fields === 'undefined' || typeof table === 'undefined' ||
      typeof columns === 'undefined' || typeof values === 'undefined') {
    return null;
  }

  if (!fields || fields.length === 0) {
    fields = ['*'];
  }

  if (!table) {
    return null;
  }

  let query = `SELECT ${fields.map((f) => `"${f}"`).join(', ')} FROM "${table}"`;

  if (columns!.length > 0 && values!.length > 0) {
    query += ' WHERE ';
    const conditions = columns!.map((col, idx) => `"${col}" = $${idx + 1}`);
    query += conditions.join(' AND ');
  }

  try {
    const result = await pool.query(query, values!);
    return result.rows;
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
  column: string,
  value: any,
  condiCol: string,
  condiVal: any
): Promise<any | null> => {
  if (
    typeof table === 'undefined' || table === null ||
    typeof column === 'undefined' || column === null ||
    typeof value === 'undefined' || value === null ||
    typeof condiCol === 'undefined' || condiCol === null ||
    typeof condiVal === 'undefined' || condiVal === null
  ) {
    return null;
  }

  const query = `UPDATE "${table}" SET "${column}" = $1 WHERE "${condiCol}" = $2`;

  try {
    const result = await pool.query(query, [value, condiVal]);
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


