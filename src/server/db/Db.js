import { Client, Pool } from 'pg'
import { postgres, nfnetwork } from './configuration';

export default class Db {
  constructor() {
    this.host = postgres.host;
    this.port = postgres.port;
    this.name = nfnetwork.database;
    this.client = new Client(postgres);
    this.pool = new Pool(nfnetwork);
  }

  async create() {
    await this.client.connect();
    await this.createDB();
    await this.createUser();
    await this.client.end();
  }

  async createDB() {
    try {
      await this.client.query(`CREATE DATABASE ${nfnetwork.database};`);
    } catch (ex) {
      if (ex.code !== '42P04') {
       throw ex;
      }
    }
  }

  async createUser() {
    try {
      await this.client.query(`CREATE USER ${nfnetwork.user} WITH PASSWORD '${nfnetwork.password}';`);
    } catch (ex) {
      if (ex.code !== '42710') {
        throw ex;
      }
    }
  }

  connect() {
    return this.pool.connect().then(client => client.release());
  }

  query(query) {
    return this.pool.query(query);
  }

  createUserTable() {
    return this.query(
      'CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL,' +
      'firstName varchar(255),' +
      'lastName varchar(255) NOT NULL' +
      ')'
    );
  }
}