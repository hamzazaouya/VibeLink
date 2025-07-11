// db.ts

import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Type for database connection options
interface DbConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const pool = new Pool({
  user: process.env.POSTGRES_USER as string,
  host: process.env.POSTGRES_HOST as string,
  database: process.env.POSTGRES_NAME as string,
  password: process.env.POSTGRES_PASSWORD as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),  // Ensure the port is treated as a number
} as DbConfig);

export default pool;
