export default class UserService {
  constructor(db) {
    this.db = db;
  }

  createTable() {
    return this.db.query(
      'CREATE TABLE IF NOT EXISTS users (' +
        'id SERIAL,' +
        'firstName varchar(255),' +
        'lastName varchar(255) NOT NULL' +
      ')'
    );
  }

  createUser(firstName, lastName) {
    return this.db.query(
      `INSERT INTO users (firstName,lastName) VALUES ('${firstName}','${lastName}') RETURNING *`
    ).then(result => result.rows[0]);
  }

  getUsers() {
    return this.db.query(`SELECT * FROM users`).then(result => result.rows);
  }
}