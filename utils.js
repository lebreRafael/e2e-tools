class Utils {
  constructor (page) {
    this.page = page;
  }

  async getInputElementHandle (identificator, options, inputTag = 'input') {
    const {tag} = identificator;
    const {elementHandle} = await this.getIdentificator(identificator);
    if (tag === 'label') {
      const inputId = await this.page.evaluate((labelElement) => labelElement.getAttribute('for'), elementHandle);
      const inputXPath = '//' + inputTag + '[@id = "' + inputId + '"]';
      return this.getElementHandleByXpath(inputXPath, options);
    }
    return elementHandle;
  }

  async clickElement (identificator) {
    const {elementHandle} = await this.getIdentificator(identificator);
    await elementHandle.click();
  }

  async doubleClickElement (identificator) {
    const {elementHandle} = await this.getIdentificator(identificator);
    await elementHandle.click({clickCount: 1});
    await elementHandle.click({clickCount: 2});
  }

  async getElementHandleByXpath (elementPath, options = {}) {
    const {
      externalPath,
      index,
    } = options;
    let xPath = (externalPath || '') + elementPath;
    if (typeof index !== 'undefined') {
      xPath = '(' + xPath + ')[' + index + ']';
    }
    await this.page.waitForXPath(xPath);
    const elements = await this.page.$x(xPath);
    if (elements.length > 1 && typeof index === 'undefined') {
      throw new Error('xPath ' + xPath + ' found more than once and options.index is not specified');
    }
    return elements[0];
  }

  async getIdentificator (data) {
    const {
      isPlaceholder,
      options,
      siblingTag,
      tag,
      text,
    } = data;

    let siblingXPath = '';
    if (siblingTag) siblingXPath = '//following-sibling::' + siblingTag;

    let {xPath} = options || {};
    if (!xPath) {
      if (isPlaceholder) {
        xPath = '//input[@placeholder = "' + text + '"]' + siblingXPath;
      } else {
        xPath = '//' + tag + '[text() = "' + text + '"]' + siblingXPath;
      }
    }
    const elementHandle = await this.getElementHandleByXpath(xPath, options);
    return {elementHandle, xPath};
  }

  async waitElement (identificator) {
    await this.getIdentificator(identificator);
  }
}

module.exports = Utils;
