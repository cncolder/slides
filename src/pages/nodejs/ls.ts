import fs from 'fs/promises';

export async function get() {
  const files = await fs.readdir('.');
  const result = files.join('\n');

  return new Response(result, {
    status: 200,
  });
}
