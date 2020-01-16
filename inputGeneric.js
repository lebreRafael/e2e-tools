const Utils = require('./utils');

class InputGeneric {
  constructor (page) {
    this.page = page;
    this.utils = new Utils(page);
  }

  // async check (identificator, expectedValue, options) {
  //   const inputValue = await this.getValue(identificator, options);
  //   expect(inputValue).toBe(expectedValue);
  // }

  async fill (identificator, data, options) {
    const elementHandle = await this.utils.getInputElementHandle(identificator, options);
    await elementHandle.click();
    const inputValue = await this.getValue(null, {elementHandle});
    if (inputValue) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < inputValue.length; i++) {
        await this.page.keyboard.press('ArrowRight');
      }
      /* eslint-enable no-await-in-loop */
      // Quando só quero completar o texto, ai o começo vai ser igual e só tem que escrever o resto
      if (data.indexOf(inputValue) === 0 && data !== inputValue) {
        await elementHandle.type(data.replace(inputValue, ''));
      } else {
        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < inputValue.length; i++) {
          await this.page.keyboard.press('Backspace');
        }
        /* eslint-enable no-await-in-loop */
        await elementHandle.type(data);
      }
    } else {
      await elementHandle.type(data);
    }
  }

  async getValue (identificator, options) {
    const elementHandle = (options && options.elementHandle) || await this.utils.getInputElementHandle(identificator, options);
    const valueHandle = await elementHandle.getProperty('value');
    return valueHandle.jsonValue();
  }
}

module.exports = InputGeneric;
