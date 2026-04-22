#!/usr/bin/env node

import { firefox as browserType } from 'playwright';

const args = process.argv.slice(2);
const cmd = args[0];

const BROWSER_OPTS = { headless: false };

// Persistent browser state
let state = {
  browser: null,
  context: null,
  page: null,
  pages: []
};

async function ensureBrowser() {
  if (!state.browser) {
    state.browser = await browserType.launch(BROWSER_OPTS);
    state.context = await state.browser.newContext();
    state.page = await state.context.newPage();
    state.pages = [state.page];
  }
  return state.browser;
}

async function run() {
  try {
    switch (cmd) {
      case 'navigate': case 'goto': {
        await ensureBrowser();
        await state.page.goto(args[1], { waitUntil: 'networkidle', timeout: 15000 });
        console.log(JSON.stringify({ success: true, url: state.page.url(), title: await state.page.title() }));
        break;
      }
      case 'screenshot': case 'shot': {
        await ensureBrowser();
        const file = args[1] || `screenshot-${Date.now()}.png`;
        await state.page.screenshot({ path: file, fullPage: args[1] === '--full' });
        console.log(JSON.stringify({ success: true, path: file }));
        break;
      }
      case 'shot-url': {
        await ensureBrowser();
        await state.page.goto(args[1], { waitUntil: 'networkidle', timeout: 15000 });
        const file = args[2] || `screenshot-${Date.now()}.png`;
        await state.page.screenshot({ path: file });
        console.log(JSON.stringify({ success: true, path: file }));
        break;
      }
      case 'click': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        await state.page.click(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'dblclick': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        await state.page.dblclick(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'rightclick': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        await state.page.click(args[1], { button: 'right', timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'hover': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        await state.page.hover(args[1], { timeout: 5000 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'fill': {
        await ensureBrowser();
        await state.page.goto(args[3] || state.page.url());
        await state.page.fill(args[1], args[2]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'type': {
        await ensureBrowser();
        await state.page.goto(args[3] || state.page.url());
        const delay = parseInt(args[4]) || 50;
        await state.page.type(args[1], args[2], { delay });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'press': case 'key': {
        await ensureBrowser();
        await state.page.goto(args[3] || state.page.url());
        await state.page.press(args[1], args[2], { delay: 50 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'check': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        await state.page.check(args[1]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'uncheck': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        await state.page.uncheck(args[1]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'select': {
        await ensureBrowser();
        await state.page.goto(args[3] || state.page.url());
        const values = await state.page.selectOption(args[1], args[2]);
        console.log(JSON.stringify({ success: true, selected: values }));
        break;
      }
      case 'text': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        console.log(await state.page.textContent(args[1]));
        break;
      }
      case 'html': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        console.log(await state.page.innerHTML(args[1] || 'body'));
        break;
      }
      case 'inner-text': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        const handle = await state.page.locator(args[1]).first();
        console.log(await handle.innerText());
        break;
      }
      case 'get-attr': case 'attr': {
        await ensureBrowser();
        await state.page.goto(args[3] || state.page.url());
        console.log(await state.page.getAttribute(args[1], args[2]));
        break;
      }
      case 'is-visible': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        console.log(await state.page.isVisible(args[1]));
        break;
      }
      case 'is-enabled': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        console.log(await state.page.isEnabled(args[1]));
        break;
      }
      case 'wait-for': {
        await ensureBrowser();
        await state.page.goto(args[2] || state.page.url());
        const timeout = parseInt(args[3]) || 5000;
        await state.page.waitForSelector(args[1], { timeout });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'wait-time': {
        await ensureBrowser();
        await state.page.waitForTimeout(parseInt(args[1]) || 1000);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'back': {
        await ensureBrowser();
        await state.page.goBack();
        console.log(JSON.stringify({ success: true, url: state.page.url() }));
        break;
      }
      case 'forward': {
        await ensureBrowser();
        await state.page.goForward();
        console.log(JSON.stringify({ success: true, url: state.page.url() }));
        break;
      }
      case 'reload': {
        await ensureBrowser();
        await state.page.reload();
        console.log(JSON.stringify({ success: true, url: state.page.url() }));
        break;
      }
      case 'url': {
        await ensureBrowser();
        console.log(state.page.url());
        break;
      }
      case 'title': {
        await ensureBrowser();
        console.log(await state.page.title());
        break;
      }
      case 'evaluate': case 'js': {
        await ensureBrowser();
        const result = await state.page.evaluate(args[1]);
        console.log(JSON.stringify(result));
        break;
      }
      case 'resize': {
        await ensureBrowser();
        await state.page.setViewportSize({ width: parseInt(args[1]) || 1280, height: parseInt(args[2]) || 720 });
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'upload': {
        await ensureBrowser();
        const [fileChooser] = await Promise.all([
          state.page.waitForEvent('filechooser'),
          state.page.click(args[1], { timeout: 5000 })
        ]);
        await fileChooser.setFiles(args[2]);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      // === Browser/Window/Tab Management ===
      case 'close': {
        // Close current page
        if (state.page) {
          await state.page.close();
          state.pages = state.pages.filter(p => p !== state.page);
          state.page = state.pages[state.pages.length - 1] || null;
          if (!state.page) {
            state.page = await state.context.newPage();
            state.pages.push(state.page);
          }
        }
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'close-all': {
        // Close all pages/tabs
        for (const p of state.pages) {
          await p.close();
        }
        state.pages = [];
        state.page = await state.context.newPage();
        state.pages.push(state.page);
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'close-window': {
        // Close entire browser window
        if (state.browser) {
          await state.browser.close();
          state = { browser: null, context: null, page: null, pages: [] };
        }
        console.log(JSON.stringify({ success: true }));
        break;
      }
      case 'tab-list': {
        await ensureBrowser();
        const tabs = [];
        for (let i = 0; i < state.pages.length; i++) {
          tabs.push({ index: i, url: state.pages[i].url(), title: await state.pages[i].title() });
        }
        console.log(JSON.stringify({ tabs }));
        break;
      }
      case 'tab-new': {
        await ensureBrowser();
        const newPage = await state.context.newPage();
        state.pages.push(newPage);
        state.page = newPage;
        if (args[1]) {
          await state.page.goto(args[1], { waitUntil: 'networkidle', timeout: 15000 });
        }
        console.log(JSON.stringify({ success: true, url: state.page.url(), index: state.pages.length - 1 }));
        break;
      }
      case 'tab-select': case 'tab': {
        await ensureBrowser();
        const idx = parseInt(args[1]) || 0;
        if (state.pages[idx]) {
          state.page = state.pages[idx];
          console.log(JSON.stringify({ success: true, url: state.page.url(), index: idx }));
        } else {
          console.log(JSON.stringify({ error: `Tab ${idx} not found` }));
        }
        break;
      }
      case 'tab-close': {
        await ensureBrowser();
        const idx = parseInt(args[1]);
        if (idx !== undefined && state.pages[idx]) {
          await state.pages[idx].close();
          state.pages.splice(idx, 1);
          if (state.pages.length === 0) {
            state.page = await state.context.newPage();
            state.pages.push(state.page);
          } else if (state.page === state.pages[idx]) {
            state.page = state.pages[Math.min(idx, state.pages.length - 1)];
          }
          console.log(JSON.stringify({ success: true, tabs: state.pages.length }));
        } else {
          console.log(JSON.stringify({ error: `Tab ${idx} not found` }));
        }
        break;
      }
      case 'status': {
        await ensureBrowser();
        console.log(JSON.stringify({
          browser: !!state.browser,
          pages: state.pages.length,
          currentPage: state.page?.url() || 'none'
        }));
        break;
      }
      case 'help': case '--help': case '-h':
        console.log(`Usage: pw <cmd> [args]

Navigation:
  navigate <url>       Go to URL
  shot-url <url> [path] Navigate + screenshot
  screenshot [path]    Screenshot current page
  back                 Go back
  forward              Go forward
  reload               Reload page
  url                  Get current URL
  title                Get page title

Mouse:
  click <sel>          Click element
  dblclick <sel>       Double click
  rightclick <sel>     Right click
  hover <sel>          Hover element

Input:
  fill <sel> <text>    Fill input
  type <sel> <text>    Type with delay
  press <sel> <key>    Press key
  check <sel>          Check checkbox
  uncheck <sel>        Uncheck checkbox
  select <sel> <val>   Select option
  upload <sel> <file>  Upload file

Query:
  text <sel>           Get text
  html <sel>           Get HTML
  attr <sel> <name>    Get attribute
  is-visible <sel>     Check visible
  is-enabled <sel>     Check enabled

Wait:
  wait-for <sel> [ms]  Wait for selector
  wait-time <ms>       Wait time

Tabs/Windows:
  tab-new [url]        Open new tab
  tab-list             List all tabs
  tab-select <N>       Switch to tab N
  tab-close <N>        Close tab N
  close                Close current tab
  close-all            Close all tabs
  close-window         Close entire browser

Other:
  evaluate <js>        Run JS
  resize <w> <h>       Resize viewport
  status               Show browser state
  help                 Show this help`);
        break;
      default:
        if (!cmd) { console.log('pw - Playwright CLI (persistent browser)'); return; }
        console.error(JSON.stringify({ error: `Unknown: ${cmd}` }));
        process.exit(1);
    }
  } catch (e) {
    console.error(JSON.stringify({ error: e.message }));
    process.exit(1);
  }
}

run();
