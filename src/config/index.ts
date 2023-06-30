import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const API_PREFIX = '/api/v1';

export default {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  API_PREFIX,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
};
