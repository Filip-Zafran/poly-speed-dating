import sharp from 'sharp';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  try {
    const deadline = url.searchParams.get('deadline');

    if (!deadline) {
      return new Response(JSON.stringify({ error: 'deadline parameter required (ISO 8601 format)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid deadline format. Use ISO 8601: 2026-06-11T15:00:00Z' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const maxFutureDate = new Date();
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 2);
    if (deadlineDate > maxFutureDate) {
      return new Response(JSON.stringify({ error: 'Deadline too far in the future' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const now = new Date();
    const remaining = deadlineDate.getTime() - now.getTime();

    let timeText: string;
    let textColor = '#000000';

    if (remaining <= 0) {
      timeText = 'Registration closed';
      textColor = '#8B0000';
    } else {
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      if (days > 0) {
        timeText = `${days}d ${hours}h ${minutes}m remaining`;
      } else if (hours > 0) {
        timeText = `${hours}h ${minutes}m remaining`;
      } else {
        timeText = `${minutes}m remaining`;
      }
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

    const buffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, max-age=60'
      }
    });
  } catch (error) {
    console.error('Countdown image error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate countdown image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
