export async function get() {
  const time = new Date();
  const json = JSON.stringify({ time }, null, 2);

  return new Response(json, {
    status: 200,
  });
}
