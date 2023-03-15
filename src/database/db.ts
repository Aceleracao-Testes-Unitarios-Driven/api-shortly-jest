import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

interface IConfigDb {
  connectionString: string;
  ssl?: boolean;
}

const { Pool } = pg;

const configDatabase: IConfigDb = {
  connectionString: process.env.DATABASE_URL!,
};

if (process.env.MODE === "prod") configDatabase.ssl = true;

export const db = new Pool(configDatabase);
