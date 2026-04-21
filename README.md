# Playwright CLI

Simple browser automation CLI using Playwright.

## Install

```bash
npm install -g playwright-cli
```

Or download and run directly:
```bash
curl -fsSL https://raw.githubusercontent.com/alephtex/playwright-cli/main/index.js -o ~/.local/bin/pw
chmod +x ~/.local/bin/pw
```

Requires Playwright browsers:
```bash
npx playwright install chromium
```

## Usage

```bash
pw navigate <url>           # Navigate to URL
pw shot-url <url> [path]    # Navigate + screenshot
pw screenshot [path] [url]  # Screenshot
pw click <sel> [url]        # Click element
pw fill <sel> <text> [url]  # Fill input
pw text <sel> [url]         # Get text content
pw html [sel] [url]         # Get HTML
```

## Examples

```bash
# Navigate and get title
pw navigate https://github.com

# Take screenshot
pw shot-url https://github.com github.png

# Get page title
pw text "title" https://github.com

# Get element text
pw text "h1" https://github.com
```

## Output

JSON responses:
```json
{"success":true,"url":"https://github.com/","title":"GitHub"}
```

## License

MIT
