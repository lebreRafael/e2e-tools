### [API documentation](https://github.com/lebreRafael/puppeteer-tools/blob/master/api.md)

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
    data: 'mylogin',
    label: 'Login',
    type: 'text',
  },
  {
    data: 'mypass',
    label: 'Password',
    type: 'text',
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
* Possibility to execute some action between inputs fill in form.fill

# Contributing
Not organized yet, so for now reach me on twitter [@lebreRafael](https://twitter.com/lebreRafael) or just open issues and PRs
