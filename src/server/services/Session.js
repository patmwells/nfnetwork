export default class Session {
  constructor(db) {
    this.db = db;
  }

  createTable() {
    return this.db.query('CREATE TABLE IF NOT EXISTS sessions (expires TIMESTAMP, token TEXT, userId TEXT)');
  }

  getToken(token) {
    return token;
  }
}