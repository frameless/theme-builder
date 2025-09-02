import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { get_css } from './get-css.js'
import { css_to_tokens } from '@projectwallace/css-design-tokens'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('*', cors({
  origin: '*'
}))

app.get('/api/get-css', async (c) => {
  const url = c.req.query('url')

  if (!url || url.trim().length === 0) {
    throw new HTTPException(400, { message: 'missing `url` parameter' })
  }

  const origins = await get_css(url)

  if ('error' in origins) {
    console.error(origins.error)
    throw new HTTPException(500, { message: 'encountered a scraping error', cause: origins.error })
  }

  const css = origins.map(origin => origin.css).join('')
  const tokens = css_to_tokens(css)

  return c.json(tokens)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
