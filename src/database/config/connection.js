const { Pool } = require('pg');
require('env2')('./config.env');

if (!process.env.DEV_DB) console.log('No DB Url Provided');

const options = {
  connectionString: process.env.DEV_DB,
  ssl: true,
};

const connection = new Pool(options);

module.exports = {
  connection,
};
