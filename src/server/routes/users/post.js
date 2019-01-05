export default async function post(context, response) {
  const { firstName, lastName } = context.query;
  if (!firstName || !lastName) {
    response.writeHead(401);
    response.end();
    return;
  }
  const user = await context.createUser(firstName, lastName);
  response.writeHead(200);
  response.end(JSON.stringify(user));
}