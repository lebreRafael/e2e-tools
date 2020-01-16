# puppeteer-tools
A set of functions to let you write e2e tests more quickly and with interactions more user like

# Getting Started
```
import puppeteer from 'puppeteer';
import createPuppeteerTools from 'puppeteer-tools';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const puppeteerTools = createPuppeteerTools(page);
```

# Coming soon
* More input types (check, radio, textarea, ...)
* Custom input types
* Function to check form data
