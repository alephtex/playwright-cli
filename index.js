#!/usr/bin/env node

import { firefox as chromium } from 'playwright';

const args = process.argv.slice(2);
const cmd = args[0];

const BROWSER_OPTS = { headless: false };

async function run() {
  let browser;

  try {
    switch (cmd) {
      case 'navigate': case 'goto': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1], { waitUntil: 'networkidle', timeout: 15000 });
        console.log(JSON.stringify({ success: true, url: page.url(), title: await page.title() }));
        break;
      }
      case 'screenshot': case 'shot': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        const file = args[1] || `screenshot-${Date.now()}.png`;
        await page.goto(args[2] || 'about:blank', { waitUntil: 'networkidle' });
        await page.screenshot({ path: file, fullPage: args[1] === '--full' });
        console.log(JSON.stringify({ success: true, path: file }));
        break;
      }
      case 'shot-url': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1], { waitUntil: 'networkidle', timeout: 15000 });
        const file = args[2] || `screenshot-${Date.now()}.png`;
        await page.screenshot({ path: file });
        console.log(JSON.stringify({ success: true, path: file }));
        break;
      }
      case 'click': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.click(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'dblclick': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.dblclick(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'rightclick': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.click(args[1], { button: 'right', timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'hover': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.hover(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'fill': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[3] || 'about:blank');
        await page.fill(args[1], args[2]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'type': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[3] || 'about:blank');
        const delay = parseInt(args[4]) || 50;
        await page.type(args[1], args[2], { delay });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'press': case 'key': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[3] || 'about:blank');
        await page.press(args[1], args[2], { delay: 50 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'check': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.check(args[1]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'uncheck': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.uncheck(args[1]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'select': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[3] || 'about:blank');
        const values = await page.selectOption(args[1], args[2]);
        console.log(JSON.stringify({ success: true, selected: values }));
        break;
      }
      case 'text': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        console.log(await page.textContent(args[1]));
        break;
      }
      case 'html': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        console.log(await page.innerHTML(args[1] || 'body'));
        break;
      }
      case 'inner-text': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        const handle = await page.locator(args[1]).first();
        console.log(await handle.innerText());
        break;
      }
      case 'get-attr': case 'attr': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[3] || 'about:blank');
        console.log(await page.getAttribute(args[1], args[2]));
        break;
      }
      case 'is-visible': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        console.log(await page.isVisible(args[1]));
        break;
      }
      case 'is-enabled': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        console.log(await page.isEnabled(args[1]));
        break;
      }
      case 'wait-for': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        const timeout = parseInt(args[3]) || 5000;
        await page.waitForSelector(args[1], { timeout });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'wait-time': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        await page.waitForTimeout(parseInt(args[1]) || 1000);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'back': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1] || 'about:blank');
        await page.goBack();
        console.log(JSON.stringify({ success: true, url: page.url() }));
        break;
      }
      case 'forward': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1] || 'about:blank');
        await page.goForward();
        console.log(JSON.stringify({ success: true, url: page.url() }));
        break;
      }
      case 'reload': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1] || 'about:blank');
        await page.reload();
        console.log(JSON.stringify({ success: true, url: page.url() }));
        break;
      }
      case 'url': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1] || 'about:blank');
        console.log(page.url());
        break;
      }
      case 'title': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[1] || 'about:blank');
        console.log(await page.title());
        break;
      }
      case 'evaluate': case 'js': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.goto(args[2] || 'about:blank');
        const result = await page.evaluate(args[1]);
        console.log(JSON.stringify(result));
        break;
      }
      case 'resize': {
        browser = await chromium.launch(BROWSER_OPTS);
        const page = await browser.newPage();
        await page.setViewportSize({ width: parseInt(args[1]) || 1280, height: parseInt(args[2]) || 720 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'close':
        console.log(JSON.stringify({ success: true }));
        return;
      case 'help': case '--help': case '-h':
        console.log(`Usage: pw <cmd> [args]

Navigation:
  navigate <url>       Go to URL
  shot-url <url> [path] Navigate + screenshot
  screenshot [path] [url] Screenshot
  back [url]           Go back
  forward [url]        Go forward
  reload [url]         Reload page
  url [url]            Get current URL
  title [url]          Get page title

Mouse:
  click <sel> [url]    Click element
  dblclick <sel> [url] Double click
  rightclick <sel> [url] Right click
  hover <sel> [url]    Hover element

Input:
  fill <sel> <text> [url] Fill input (instant)
  type <sel> <text> [url] [delay] Type with delay
  press <sel> <key> [url] Press key (Enter, Tab, Escape...)
  check <sel> [url]    Check checkbox
  uncheck <sel> [url]  Uncheck checkbox
  select <sel> <val> [url] Select dropdown option

Query:
  text <sel> [url]     Get text content
  html [sel] [url]     Get HTML
  inner-text <sel> [url] Get inner text
  attr <sel> <name> [url] Get attribute
  is-visible <sel> [url] Check visible
  is-enabled <sel> [url] Check enabled

Wait:
  wait-for <sel> [url] [ms] Wait for selector
  wait-time <ms> [url] Wait time

Other:
  evaluate <js> [url]  Run JS code
  resize <w> <h>      Resize viewport
  close               No-op`);
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
