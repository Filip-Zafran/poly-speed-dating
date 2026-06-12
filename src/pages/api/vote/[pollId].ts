import type { APIRoute } from 'astro';

const API_URL = import.meta.env.DUCK_PLAYGROUND_API || 'http://localhost:3001';

export const GET: APIRoute = async ({ params }) => {
  try {
    const { pollId } = params;
    if (!pollId) {
      return new Response(JSON.stringify({ error: 'Poll ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(`${API_URL}/api/vote/${pollId}`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Poll not found' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
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

    const body = await request.json();
    const response = await fetch(`${API_URL}/api/vote/${pollId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
