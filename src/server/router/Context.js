import crypto from 'crypto';
import Location from './Location';

export default class Context extends Location {
  constructor(services) {
    super();
    this.services = services;
    this.id = crypto.randomBytes(8).toString('hex');
  }
}