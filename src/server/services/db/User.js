import Query from '../../db/postgres/Query';

export default class User {
  constructor(db) {
    this.db = db;
  }

  create(firstName, lastName) {
    const query = new Query()
      .insert('users')
      .fields(['firstName', 'lastName'])
      .values([firstName, lastName])
      .return(['*'])
      .write();
    return this.db.query(query).then(result => result.rows[0]);
  }

  list() {
    const query = new Query()
      .select(['*'])
      .from('users')
      .write();
    return this.db.query(query).then(result => result.rows);
  }
}