const { Pool } = require('pg');
require('env2')('./config.env');

let db;

if (process.env.NODE_ENV === 'production') {
  db = process.env.DATABASE_URL;
} else {
  db = process.env.DEV_DB;
}

const options = {
  connectionString: db,
  ssl: true,
};

if (!db) console.log('No DB Url Provided');
const connection = new Pool(options);

module.exports = {
  connection,
};
