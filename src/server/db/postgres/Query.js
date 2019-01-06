export default class Query {
  constructor() {
    this.query = '';
  }

  select(fields = []) {
    const model = fields.join(',');
    this.query = `SELECT ${model}`;
    return this;
  }

  from(table) {
    this.query = `${this.query} FROM ${table}`;
    return this;
  }

  insert(table) {
    this.query = `INSERT INTO ${table}`;
    return this;
  }

  fields(fields = []) {
    const queryFields = fields.join(',');
    this.query = `${this.query} (${queryFields})`;
    return this;
  }

  values(values = []) {
    const queryValues = values.join('\',\'');
    this.query = `${this.query} VALUES ('${queryValues}')`;
    return this;
  }

  return(fields = []) {
    const model = fields.join(',');
    this.query = `${this.query} RETURNING ${model}`;
    return this;
  }

  where() {
    this.query = `${this.query} WHERE`;
    return this;
  }

  equal(field, value) {
    this.query = `${this.query} ${field} = '${value}'`;
    return this;
  }

  delete() {
    this.query = 'DELETE';
    return this;
  }

  write() {
    return `${this.query};`;
  }
}