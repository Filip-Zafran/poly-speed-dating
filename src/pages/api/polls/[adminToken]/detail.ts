import type { APIRoute } from 'astro';
import { initDb } from '@/lib/db';
import type { VoteCounts } from '@/lib/types';

function getVoteCounts(db: any, pollId: string): VoteCounts {
  const result = db.prepare(`
    SELECT choice, COUNT(*) as count
    FROM votes
    WHERE poll_id = ?
    GROUP BY choice
  `).all(pollId);

  const counts: VoteCounts = { date1: 0, date2: 0, date3: 0, none: 0 };
  result.forEach((row: any) => {
    counts[row.choice as keyof VoteCounts] = row.count;
  });
  return counts;
}

export const GET: APIRoute = async ({ params }) => {
  try {
    const { adminToken } = params;
    const db = initDb();

    const poll = db.prepare('SELECT * FROM polls WHERE admin_token = ?').get(adminToken) as any;
    if (!poll) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const votes = db.prepare('SELECT voter_name, choice, alt_date, submitted_at FROM votes WHERE poll_id = ? ORDER BY submitted_at DESC').all(poll.id) as any[];
    const counts = getVoteCounts(db, poll.id);

    return new Response(
      JSON.stringify({
        poll,
        votes,
        counts,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching poll detail:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch poll' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
