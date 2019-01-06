export default async function remove(context, request, response) {
  const user = await context.users.remove(context.location.params.id);
  response.writeHead(200);
  response.end(JSON.stringify(user));
}