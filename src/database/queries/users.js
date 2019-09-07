const { connection } = require('../config/connection');

const getUsers = (username, email) => connection.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

const addUser = (userInfo) => {
  const {
    username, password, email, bio,
  } = userInfo;
  const sql = {
    text: 'INSERT INTO users (email, password, username, bio) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [email, password, username, bio],
  };
  return connection.query(sql);
};

module.exports = {
  addUser,
  getUsers,
};
