import { getDatabase, getVoteCounts } from '../../../../lib/db';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id: adminToken } = params;
    if (!adminToken) {
      return new Response(JSON.stringify({ error: 'Admin token required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = getDatabase();
    const poll = db.prepare('SELECT * FROM polls WHERE admin_token = ?').get(adminToken) as any;

    if (!poll) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const votes = db.prepare('SELECT voter_name, choice, alt_date, submitted_at FROM votes WHERE poll_id = ? ORDER BY submitted_at DESC').all(poll.id) as Array<any>;
    const invites = db.prepare('SELECT email FROM invites WHERE poll_id = ?').all(poll.id) as Array<{ email: string }>;
    const counts = getVoteCounts(poll.id);

    return new Response(JSON.stringify({
      poll,
      votes,
      invites: invites.map(i => i.email),
      counts
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching poll detail:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
