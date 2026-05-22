import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function siteMiddleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const siteId = getSiteFromHostname(hostname)

  const url = request.nextUrl.clone()
  url.searchParams.set('siteId', siteId)

  return NextResponse.rewrite(url)
}
