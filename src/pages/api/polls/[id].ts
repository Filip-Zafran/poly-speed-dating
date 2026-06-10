import type { APIRoute } from 'astro';
import { initDb } from '@/lib/db';

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    const db = initDb();

    db.prepare('DELETE FROM polls WHERE id = ?').run(id);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting poll:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete poll' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
