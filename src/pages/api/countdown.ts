import type { APIRoute } from 'astro';
import sharp from 'sharp';

function formatTimeRemaining(milliseconds: number): string {
  if (milliseconds <= 0) return 'Poll closed';

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const deadline = url.searchParams.get('deadline');

    if (!deadline) {
      return new Response(JSON.stringify({ error: 'deadline parameter required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid deadline format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const maxFutureDate = new Date();
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 2);
    if (deadlineDate > maxFutureDate) {
      return new Response(JSON.stringify({ error: 'Deadline too far in the future' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const now = new Date();
    const remaining = deadlineDate.getTime() - now.getTime();

    let timeText = formatTimeRemaining(remaining) + ' remaining';
    let textColor = '#000000';

    if (remaining <= 0) {
      timeText = 'Registration closed';
      textColor = '#c41e3a';
    }

    const svg = `
      <svg width="600" height="120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            text { font-family: Arial, sans-serif; }
          </style>
        </defs>
        <rect width="600" height="120" fill="#FFD84D" stroke="#000000" stroke-width="4" rx="15" ry="15"/>
        <text x="300" y="65" font-size="52" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">
          ${timeText}
        </text>
      </svg>
    `;

    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, max-age=60',
        'Content-Disposition': 'inline; filename="countdown.png"',
      },
    });
  } catch (error) {
    console.error('Countdown image error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate countdown image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
