const { readFileSync } = require('fs');
const { join } = require('path');

const { connection } = require('./connection');

const sql = readFileSync(join(__dirname, 'db_build.sql')).toString();

connection
  .query(sql)
  .then((result) => console.log('Build Successfully'))
  .catch((err) => console.log(err));
