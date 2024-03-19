const postgres = require('pg').Pool;
const cred = require('./properties');

const postgresClient = new postgres({
   user: cred.db_user,
   password: cred.db_password,
   host: 'localhost',
   port: 5432,
   database: 'pern_todo_db'
});

module.exports = postgresClient;