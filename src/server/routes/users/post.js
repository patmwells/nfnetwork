export default async function post(context, request, response) {
  const { firstName, lastName } = context.location.query;
  if (!firstName || !lastName) {
    response.writeHead(401);
    response.end();
    return;
  }
  const user = await context.users.create(firstName, lastName);
  response.writeHead(200);
  response.end(JSON.stringify(user));
}