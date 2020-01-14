/* eslint-disable no-use-before-define */

import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

export async function getInputElementHandle (page, identificator, options, inputTag = 'input') {
  const {tag} = identificator;
  const {elementHandle} = await getIdentificator(page, identificator);
  if (tag === 'label') {
    const inputId = await page.evaluate((labelElement) => labelElement.getAttribute('for'), elementHandle);
    const inputXPath = '//' + inputTag + '[@id = "' + inputId + '"]';
    return getElementHandleByXpath(page, inputXPath, options);
  }
  return elementHandle;
}

export async function clickElement (page, identificator) {
  const {elementHandle} = await getIdentificator(page, identificator);
  await elementHandle.click();
}

export async function doubleClickElement (page, identificator) {
  const {elementHandle} = await getIdentificator(page, identificator);
  await elementHandle.click({clickCount: 1});
  await elementHandle.click({clickCount: 2});
}

export async function getElementHandleByXpath (page, elementPath, options = {}) {
  const {
    externalPath,
    index,
  } = options;
  let xPath = (externalPath || '') + elementPath;
  if (typeof index !== 'undefined') {
    xPath = '(' + xPath + ')[' + index + ']';
  }
  await page.waitForXPath(xPath);
  const elements = await page.$x(xPath);
  if (elements.length > 1 && typeof index === 'undefined') {
    throw new Error('xPath ' + xPath + ' found more than once and options.index is not specified');
  }
  return elements[0];
}

export async function getIdentificator (page, data) {
  const {
    isPlaceholder,
    options,
    siblingTag,
    tag,
    text,
  } = data;
  let siblingXPath;
  if (siblingTag) {
    siblingXPath = '//following-sibling::' + siblingTag;
  } else {
    // Essas tags nunca tem filhos
    siblingXPath = ['h1', 'h2', 'h3', 'h4', 'legend'].includes(tag) ? '//following-sibling::div' : '';
  }
  let {xPath} = options || {};
  if (!xPath) {
    if (isPlaceholder) {
      xPath = '//input[@placeholder = "' + text + '"]' + siblingXPath;
    } else {
      xPath = '//' + tag + '[text() = "' + text + '"]' + siblingXPath;
    }
  }
  const elementHandle = await getElementHandleByXpath(page, xPath, options);
  return {elementHandle, xPath};
}

export function getModuleName (filePath) {
  const fileNameParts = filePath.split('/');
  return fileNameParts[fileNameParts.length - 1].replace('.test.js', '');
}

export async function lauchApplication (moduleName, url) {
  const args = ['--single-process', '–no-sandbox', '–disable-setuid-sandbox', '--disable-features=Metal'];
  let launchOptions;
  if (process.env.NODE_TEST_ENV === 'debug') {
    launchOptions = {
      args,
      headless: false,
      slowMo: 50,
    };
  } else {
    launchOptions = {
      args,
      headless: true,
      slowMo: 50, // Ainda nao sei pq, mas nao funciona sem isso
    };
  }
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  const consoleMessageFileName = moduleName + '-' + (new Date()).getTime() + '.txt';
  const consoleMessageFilePath = path.resolve(__dirname, '../consoleMessages/', consoleMessageFileName);
  fs.writeFileSync(consoleMessageFilePath, '');
  page.on('console', async (consoleMessage) => {
    const consoleMessageArgs = consoleMessage.args();
    let parsedArgs = [];
    try {
      parsedArgs = await Promise.all(consoleMessageArgs.map((jsHandle) => {
        return jsHandle.executionContext().evaluate((obj) => {
          return JSON.stringify(obj);
        }, jsHandle);
      }));
    } catch (e) {
      parsedArgs = [
        'Console message could not be read due to the following error:',
        e,
      ];
    }
    const fileData = 'type: ' + consoleMessage.type() + '\n' + consoleMessage.text() + parsedArgs.join('\n') + '\n\n';
    fs.appendFileSync(consoleMessageFilePath, fileData);
  });
  await page.setViewport({height: 600, width: 1280});
  await page.goto(url);
  return [browser, page];
}

export async function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function takeScreenshot (page, moduleName) {
  const screenshotPath = 'screenshots/' + moduleName + '-' + (new Date()).getTime() + '.png';
  await page.screenshot({path: screenshotPath});
}

export async function waitElement (page, identificator) {
  await getIdentificator(page, identificator);
}
