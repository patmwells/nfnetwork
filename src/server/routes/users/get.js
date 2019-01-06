export default async function get(context, request, response) {
  const user = await context.users.get(context.location.params.id);
  response.writeHead(200);
  response.end(JSON.stringify(user));
}