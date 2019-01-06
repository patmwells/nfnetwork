import crypto from 'crypto';
import Location from './Location';
import User from '../services/User';

export default class Context {
  constructor(request, db) {
    this.location = new Location(request);
    this.users = new User(db);

    this.id = crypto.randomBytes(8).toString('hex');
  }
}