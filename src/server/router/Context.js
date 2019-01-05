import crypto from 'crypto';
import Location from './Location';

export default class Context extends Location {
  constructor(db) {
    super();
    this.db = db;
    this.id = crypto.randomBytes(8).toString('hex');
  }

  createUser(firstName, lastName) {
    return this.db.user.create(firstName, lastName);
  }

  listUsers() {
    return this.db.user.list();
  }
}