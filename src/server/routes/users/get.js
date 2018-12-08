export default async function get(context, response) {
  const users = await context.services.users.getUsers();
  response.writeHead(200);
  response.end(JSON.stringify(users));
}