import { getDatabase, getVoteCounts, getVotePreviews } from '../../../lib/db';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  try {
    const { pollId } = params;
    if (!pollId) {
      return new Response(JSON.stringify({ error: 'Poll ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = getDatabase();
    const poll = db.prepare('SELECT * FROM polls WHERE id = ?').get(pollId) as any;

    if (!poll) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const counts = getVoteCounts(pollId);
    const votesPreviews = getVotePreviews(pollId);

    return new Response(JSON.stringify({
      title: poll.title,
      description: poll.description,
      duration: poll.duration,
      date1: poll.date1,
      date2: poll.date2,
      date3: poll.date3,
      expected: poll.expected,
      timer_end: poll.timer_end,
      counts,
      votes_preview: votesPreviews
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching poll:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { pollId } = params;
    if (!pollId) {
      return new Response(JSON.stringify({ error: 'Poll ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { voter_name, choice, alt_date, voter_token } = await request.json() as {
      voter_name: string;
      choice: string;
      alt_date?: string;
      voter_token: string;
    };

    const db = getDatabase();
    const poll = db.prepare('SELECT id FROM polls WHERE id = ?').get(pollId);

    if (!poll) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    db.prepare(`
      INSERT INTO votes (poll_id, voter_name, choice, alt_date, voter_token)
      VALUES (?, ?, ?, ?, ?)
    `).run(pollId, voter_name, choice, alt_date || null, voter_token);

    const counts = getVoteCounts(pollId);
    const votesPreviews = getVotePreviews(pollId);

    return new Response(JSON.stringify({
      ok: true,
      counts,
      votes_preview: votesPreviews
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    if ((error as any)?.message?.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ error: 'Vote already submitted from this device' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    console.error('Error submitting vote:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
