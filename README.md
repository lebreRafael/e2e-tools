# puppeteer-tools
A set of functions to let you write e2e tests more quickly and with interactions more user like

# Installation
```
npm i puppeteer-tools
```

puppeteer-tools is like a plugin to puppeteer, so you need to install it too.
```
npm i puppeteer
```


# Getting Started
```
import puppeteer from 'puppeteer';
import createPuppeteerTools from 'puppeteer-tools';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const puppeteerTools = createPuppeteerTools(page);

await page.goto('http://myapp.com/login');
await puppeteerTools.form.fill([
  {
    data: 'mylogin'
    label: 'Login',
    tag: 'input',
  },
  {
    data: 'mypass'
    label: 'Password',
    tag: 'input',
  },
]);
await Promise.all([
  page.waitForNavigation(),
  page.click('button[type=submit]'),
]);
```

# Coming soon
* More input types (check, radio, textarea, ...)
* Custom input types
* Function to check form data (input.check() and form.check())
* Function to get input value (input.getValue())

# Contributing
Not organized yet, so for now reach me on twitter [@lebreRafael](https://twitter.com/lebreRafael)
