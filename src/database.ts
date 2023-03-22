import { Pool } from "pg";
import env from "dotenv";

env.config();

const { HOST, DATABASE, TEST_DATABASE, PASSWORD, USER, ENV } = process.env;

let pool: Pool;

if (ENV == "dev") {
  pool = new Pool({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
  });
} else {
  pool = new Pool({
    host: HOST,
    database: TEST_DATABASE,
    user: USER,
    password: PASSWORD,
  });
}

export default pool;
