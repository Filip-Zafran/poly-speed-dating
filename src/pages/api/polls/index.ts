import type { APIRoute } from 'astro';
import { randomBytes, randomUUID } from 'crypto';
import { initDb } from '@/lib/db';
import type { Poll, VoteCounts } from '@/lib/types';

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

export const GET: APIRoute = async ({ request }) => {
  try {
    const db = initDb();

    const polls = db.prepare(`
      SELECT id, title, expected, created_at, admin_token
      FROM polls
      ORDER BY created_at DESC
    `).all() as any[];

    const pollsWithCounts = polls.map((poll) => {
      const counts = getVoteCounts(db, poll.id);
      const totalVotes = counts.date1 + counts.date2 + counts.date3 + counts.none;
      return {
        ...poll,
        vote_count: totalVotes,
      };
    });

    return new Response(JSON.stringify(pollsWithCounts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error listing polls:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to list polls' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as any;
    const { title, description, duration, expected, open_access, date1, date2, date3, timer_minutes = 0, invite_emails = [] } = body;

    const db = initDb();
    const pollId = randomUUID();
    const adminToken = randomBytes(16).toString('hex');

    let timerEnd = null;
    if (timer_minutes > 0) {
      const endTime = new Date(Date.now() + timer_minutes * 60000);
      timerEnd = endTime.toISOString();
    }

    db.prepare(`
      INSERT INTO polls (id, admin_token, title, description, duration, expected, open_access, date1, date2, date3, timer_end)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(pollId, adminToken, title, description, duration, expected, open_access, date1, date2, date3, timerEnd);

    if (!open_access && invite_emails.length > 0) {
      const insertInvite = db.prepare('INSERT INTO invites (poll_id, email) VALUES (?, ?)');
      invite_emails.forEach((email: string) => {
        insertInvite.run(pollId, email.toLowerCase().trim());
      });
    }

    return new Response(
      JSON.stringify({
        id: pollId,
        admin_token: adminToken,
        vote_url: `/poll-vote.html?token=${pollId}`,
        admin_url: `/poll.html?admin=${adminToken}`,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating poll:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create poll' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
