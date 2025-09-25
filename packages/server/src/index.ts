import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { get_css } from './get-css.js'
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
  // const origins = [{
  //   css: `a {
  //     color: red;
  //     color: green;
  //     color: blue;

  //     font-size: 19px;
  //     font-size: 1rem;
  //     font-size: 2rem;

  //     line-height: 1rem;
  //     line-height: 2rem;

  //     font-family: "open sans", sans-serif;
  //     font-family: "MS Comic Sans";
  //   }`
  // }]

  if ('error' in origins) {
    console.error(origins.error)
    throw new HTTPException(500, { message: 'encountered a scraping error', cause: origins.error })
  }

  c.res.headers.set('content-type', 'text/css;utf-8')
  const css = origins.map(origin => origin.css).join('')
  return c.text(css)
})

app.get('/theme.css', async (c) => {
  console.log(c.req.query())
  const map = Object.entries(c.req.query()).reduce((acc, [key, value]) => {
    acc.push({ key: key.replaceAll('.', '-').toLowerCase(), value });
    return acc
  }, [] as { key: string, value: string }[])
  c.res.headers.set('content-type', 'text/css;utf-8')
  return c.text(`
:root {
  --test: 1;
${map.map(({ key, value }) => `\t--${key}: ${value};`).join('\n')}
}
`.trim())
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
