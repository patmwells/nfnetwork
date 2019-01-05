export default async function get(context, response) {
  const users = await context.listUsers();
  response.writeHead(200);
  response.end(JSON.stringify(users));
}