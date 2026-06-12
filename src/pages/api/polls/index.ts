import type { APIRoute } from 'astro';

const API_URL = import.meta.env.DUCK_PLAYGROUND_API || 'http://localhost:3001';

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(`${API_URL}/api/polls`);
    if (!response.ok) {
      throw new Error(`Duck-Playground API error: ${response.statusText}`);
    }
    const polls = await response.json();
    return new Response(JSON.stringify(polls), {
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
    const body = await request.json();
    const response = await fetch(`${API_URL}/api/polls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Duck-Playground API error: ${response.statusText}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
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
