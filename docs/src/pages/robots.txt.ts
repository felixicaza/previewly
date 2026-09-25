import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    'User-agent: *',
    'Disallow:',
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', site).href}`
  ].join('\n')

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
