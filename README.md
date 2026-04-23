[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/steimerbyte)

# playwright-cli

Simple Playwright CLI for browser automation with persistent browser state.

## Features

- **Persistent Browser** - Browser stays open between commands
- **Tab Management** - Open, close, switch tabs
- **Full Browser Control** - Click, fill, upload, screenshot

## Installation

```bash
git clone https://github.com/alephtex/playwright-cli.git
cd playwright-cli
npm install
npm install playwright
npx playwright install firefox
```

## Usage

```bash
pw navigate <url>       # Go to URL
pw screenshot [path]    # Screenshot
pw click <selector>     # Click element
pw fill <sel> <text>   # Fill input
pw upload <sel> <file>  # Upload file

# Tab management
pw tab-new [url]        # New tab
pw tab-list             # List tabs
pw tab-select <N>       # Switch to tab N
pw tab-close <N>        # Close tab N

# Browser control
pw close                # Close current tab
pw close-all            # Close all tabs
pw close-window         # Close entire browser
pw status               # Show browser state
```

## Commands

| Command | Description |
|---------|-------------|
| navigate | Go to URL |
| screenshot | Screenshot current page |
| click/dblclick/hover | Mouse actions |
| fill/type | Input text |
| upload | File upload |
| text/html/attr | Query elements |
| tab-new/tab-list/tab-select/tab-close | Tab management |
| close/close-all/close-window | Close commands |
| status | Browser state |

## Browser

Default: **Firefox** (headless: false)

## License

MIT
