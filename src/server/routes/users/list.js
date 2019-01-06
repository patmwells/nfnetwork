export default async function list(context, request, response) {
  const users = await context.users.list();
  response.writeHead(200);
  response.end(JSON.stringify(users));
}