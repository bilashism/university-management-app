import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const API_PREFIX = '/api/v1';

export default {
  ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  API_PREFIX,
  DATABASE_URL: process.env.DATABASE_URL,
  DEFAULT_STUDENT_PASS: process.env.DEFAULT_STUDENT_PASS,
  DEFAULT_FACULTY_PASS: process.env.DEFAULT_FACULTY_PASS,
  DEFAULT_ADMIN_PASS: process.env.DEFAULT_ADMIN_PASS,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};
