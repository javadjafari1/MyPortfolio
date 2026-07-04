// Fetches published articles from the Medium RSS feed and writes a static
// JSON snapshot to src/content/articles.json. Run with `npm run fetch:medium`
// whenever a new article is published, then commit the updated JSON.
//
// Medium's RSS feed does not expose clap counts or response counts, and no
// documented public API provides them either — those numbers only exist
// behind Medium's own unofficial internal API, which this script deliberately
// does not use. Reading time is estimated from word count instead of trusting
// an unavailable field.

import { JSDOM } from 'jsdom'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const MEDIUM_USERNAME = 'javadjafari1' // must match socialLinks Medium handle in src/content/data.ts
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`
const OUTPUT_PATH = fileURLToPath(new URL('../src/content/articles.json', import.meta.url))
const WORDS_PER_MINUTE = 200
const SUMMARY_LENGTH = 220

function htmlToPlainText(html) {
  const dom = new JSDOM(`<div>${html}</div>`)
  const { document } = dom.window
  // Photo credits (<figure><figcaption>) and Medium's tracking pixel aren't
  // part of the article's actual prose — strip them before summarizing.
  document.querySelectorAll('figure').forEach((el) => el.remove())
  // Block-level elements need an explicit space at their boundary, or adjacent
  // paragraphs collapse into one run-on sentence once tags are stripped.
  document
    .querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, blockquote, br')
    .forEach((el) => el.insertAdjacentText('afterend', ' '))
  return document.body.textContent.replace(/\s+/g, ' ').trim()
}

function summarize(text) {
  if (text.length <= SUMMARY_LENGTH) return text
  const truncated = text.slice(0, SUMMARY_LENGTH)
  const lastSpace = truncated.lastIndexOf(' ')
  return `${truncated.slice(0, lastSpace)}…`
}

function readingTime(text) {
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}

function cleanUrl(rawUrl) {
  const url = new URL(rawUrl)
  url.searchParams.delete('source')
  return url.toString()
}

async function main() {
  const res = await fetch(FEED_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch Medium feed: ${res.status} ${res.statusText}`)
  }
  const xml = await res.text()

  const dom = new JSDOM(xml, { contentType: 'text/xml' })
  const items = Array.from(dom.window.document.querySelectorAll('item'))

  const articles = items
    .map((item) => {
      const title = item.querySelector('title')?.textContent?.trim() ?? ''
      const link = item.querySelector('link')?.textContent?.trim() ?? ''
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() ?? ''
      const contentHtml =
        item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]
          ?.textContent ?? ''
      const tags = Array.from(item.querySelectorAll('category'))
        .map((c) => c.textContent?.trim())
        .filter(Boolean)

      const plainText = htmlToPlainText(contentHtml)

      return {
        title,
        url: cleanUrl(link),
        publishedAt: new Date(pubDate).toISOString(),
        summary: summarize(plainText),
        readingTimeMinutes: readingTime(plainText),
        tags,
      }
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  await writeFile(OUTPUT_PATH, `${JSON.stringify(articles, null, 2)}\n`)
  console.log(`Wrote ${articles.length} articles to ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
