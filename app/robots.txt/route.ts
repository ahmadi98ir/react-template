export async function GET() {
  const allow = (process.env.ROBOTS_POLICY || 'allow') === 'allow'
  const body = `User-agent: *\n${allow ? 'Allow' : 'Disallow'}: /\nSitemap: ${process.env.NEXTAUTH_URL || 'https://ahmadi98.ir'}/sitemap.xml\n`
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/plain' } })
}

