/**
 * Docker run command to start test postgres database:
 *  1) dstopcontainers
 *  2) docker run -d -p 5432:5432 --name nfnetwork-postgres -e POSTGRES_PASSWORD=123456 postgres
 */
export const postgres = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 123456,
  database: 'postgres',
};

export const nfnetwork = {
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 654321,
  database: 'nfnetwork',
};