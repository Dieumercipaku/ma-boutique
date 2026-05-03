const { Pool } = require("pg");

const isProduction = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL
    : "postgresql://postgres:1234@localhost:5433/boutique",

  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
