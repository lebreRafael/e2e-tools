class Utils {
  constructor (page) {
    this.page = page;
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
      label,
      options,
      placeholder,
      siblingTag,
      tag,
      text,
    } = data;

    let {xPath} = data;

    if (xPath && tag) throw new Error('Identificator can not have both "xPath" and "tag" keys');
    if (!xPath && !tag) throw new Error('Identificator must have one of the following keys: "xPath" or "tag"');

    if (xPath) {
      const elementHandle = await this.getElementHandleByXpath(xPath, options);
      return {elementHandle, xPath};
    }

    xPath = '//' + tag;

    if (tag === 'input') {
      if (text) throw new Error('Identificator can not have "text" key when "tag" key is "input"');

      if (label) {
        const {elementHandle: labelElement} = await this.getIdentificator({tag: 'label', text: label});
        const inputId = await this.page.evaluate((element) => element.getAttribute('for'), labelElement);
        xPath += '[@id = "' + inputId + '"]';
      }
      if (placeholder) {
        xPath += '[@placeholder = "' + placeholder + '"]';
      }
    }

    if (text) {
      xPath += '[text() = "' + text + '"]';
    }

    if (siblingTag) {
      xPath += '//following-sibling::' + siblingTag;
    }

    const elementHandle = await this.getElementHandleByXpath(xPath, options);
    return {elementHandle, xPath};
  }

  async waitElement (identificator) {
    await this.getIdentificator(identificator);
  }
}

module.exports = Utils;
