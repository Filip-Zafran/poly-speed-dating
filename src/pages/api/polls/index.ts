import { randomBytes, randomUUID } from 'crypto';
import { getDatabase, getVoteCounts, getVotePreviews } from '../../../lib/db';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const db = getDatabase();
    const polls = db.prepare(`
      SELECT id, title, expected, created_at, admin_token
      FROM polls
      ORDER BY created_at DESC
    `).all() as Array<{
      id: string;
      title: string;
      expected: number;
      created_at: string;
      admin_token: string;
    }>;

    const pollsWithCounts = polls.map(poll => {
      const counts = getVoteCounts(poll.id);
      const totalVotes = counts.date1 + counts.date2 + counts.date3 + counts.none;
      return {
        ...poll,
        vote_count: totalVotes
      };
    });

    return new Response(JSON.stringify(pollsWithCounts), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error listing polls:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const {
      title,
      description,
      duration,
      expected,
      open_access,
      date1,
      date2,
      date3,
      timer_minutes = 0,
      invite_emails = []
    } = await request.json() as {
      title: string;
      description?: string;
      duration?: string;
      expected?: number;
      open_access?: boolean;
      date1: string;
      date2: string;
      date3: string;
      timer_minutes?: number;
      invite_emails?: string[];
    };

    const db = getDatabase();
    const pollId = randomUUID();
    const adminToken = randomBytes(16).toString('hex');

    let timerEnd: string | null = null;
    if (timer_minutes > 0) {
      const endTime = new Date(Date.now() + timer_minutes * 60000);
      timerEnd = endTime.toISOString();
    }

    db.prepare(`
      INSERT INTO polls (id, admin_token, title, description, duration, expected, open_access, date1, date2, date3, timer_end)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(pollId, adminToken, title, description || null, duration || null, expected || 0, open_access ? 1 : 0, date1, date2, date3, timerEnd);

    if (!open_access && invite_emails.length > 0) {
      const insertInvite = db.prepare('INSERT INTO invites (poll_id, email) VALUES (?, ?)');
      invite_emails.forEach(email => {
        insertInvite.run(pollId, email.toLowerCase().trim());
      });
    }

    return new Response(JSON.stringify({
      id: pollId,
      admin_token: adminToken,
      vote_url: `/poll-vote.html?token=${pollId}`,
      admin_url: `/poll.html?admin=${adminToken}`
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating poll:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
