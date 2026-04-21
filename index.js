#!/usr/bin/env node

import { chromium } from 'playwright';

async function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  let browser;

  try {
    switch (cmd) {
      case 'navigate': case 'goto': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(args[1], { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(500);
        console.log(JSON.stringify({ success: true, url: page.url(), title: await page.title() }));
        break;
      }
      case 'screenshot': case 'shot': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        const file = args[1] || `screenshot-${Date.now()}.png`;
        await page.goto(args[2] || 'about:blank', { waitUntil: 'domcontentloaded' });
        await page.screenshot({ path: file });
        console.log(JSON.stringify({ success: true, path: file }));
        break;
      }
      case 'click': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.click(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'fill': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(args[3] || 'about:blank');
        await page.fill(args[1], args[2]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'text': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        console.log(await page.textContent(args[1]));
        break;
      }
      case 'html': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        console.log(await page.innerHTML(args[1] || 'body'));
        break;
      }
      case 'shot-url': {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(args[1], { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(500);
        const file = args[2] || `screenshot-${Date.now()}.png`;
        await page.screenshot({ path: file });
        console.log(JSON.stringify({ success: true, path: file }));
        break;
      }
      case 'close':
      case 'help': case '--help': case '-h':
        console.log(`Usage: pw <cmd> [args]

Commands:
  navigate <url>       Navigate to URL
  shot-url <url> [path] Navigate + screenshot
  screenshot [path] [url] Screenshot (url optional)
  click <sel> [url]    Click element
  fill <sel> <text> [url] Fill input
  text <sel> [url]     Get text content
  html [sel] [url]     Get HTML (default: body)
  close                Close (no-op)`);
        return;
      default:
        if (!cmd) { console.log('pw - Playwright CLI'); return; }
        console.error(JSON.stringify({ error: `Unknown: ${cmd}` }));
        process.exit(1);
    }
  } catch (e) {
    console.error(JSON.stringify({ error: e.message }));
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

run();
