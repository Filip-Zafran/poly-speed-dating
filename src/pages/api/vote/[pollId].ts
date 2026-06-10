import type { APIRoute } from 'astro';
import { initDb } from '@/lib/db';
import type { VoteCounts, VotePreview } from '@/lib/types';

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

function getVotePreviews(db: any, pollId: string): VotePreview[] {
  const votes = db.prepare(`
    SELECT voter_name, choice
    FROM votes
    WHERE poll_id = ?
    ORDER BY submitted_at DESC
    LIMIT 20
  `).all(pollId) as any[];

  return votes.map((v: any) => ({
    initials: (v.voter_name || '?').slice(0, 2).toUpperCase(),
    choice: v.choice,
  }));
}

export const GET: APIRoute = async ({ params }) => {
  try {
    const { pollId } = params;
    const db = initDb();

    const poll = db.prepare('SELECT * FROM polls WHERE id = ?').get(pollId) as any;
    if (!poll) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const counts = getVoteCounts(db, pollId);
    const votesPreviews = getVotePreviews(db, pollId);

    return new Response(
      JSON.stringify({
        title: poll.title,
        description: poll.description,
        duration: poll.duration,
        date1: poll.date1,
        date2: poll.date2,
        date3: poll.date3,
        expected: poll.expected,
        timer_end: poll.timer_end,
        counts,
        votes_preview: votesPreviews,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching poll:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch poll' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { pollId } = params;
    const body = await request.json() as any;
    const { voter_name, choice, alt_date, voter_token } = body;

    const db = initDb();

    const poll = db.prepare('SELECT id FROM polls WHERE id = ?').get(pollId) as any;
    if (!poll) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      db.prepare(`
        INSERT INTO votes (poll_id, voter_name, choice, alt_date, voter_token)
        VALUES (?, ?, ?, ?, ?)
      `).run(pollId, voter_name, choice, alt_date || null, voter_token);
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return new Response(JSON.stringify({ error: 'Vote already submitted from this device' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw error;
    }

    const counts = getVoteCounts(db, pollId);
    const votesPreviews = getVotePreviews(db, pollId);

    return new Response(
      JSON.stringify({
        ok: true,
        counts,
        votes_preview: votesPreviews,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error submitting vote:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit vote' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
