const Input = require('./input');
const Utils = require('./utils');

class Form {
  constructor (page, checkCB) {
    this.input = new Input(page, checkCB);
    this.page = page;
    this.utils = new Utils(page);
  }

  /**
   * Using for instead of forEach due to async/await
   *
   * @param formData
   * @returns {Promise<void>}
   */
  async check (formData) {
    for (let i = 0; i < formData.length; i++) {
      /* eslint-disable no-await-in-loop */ // I want to run this promises syncronously
      const data = formData[i];
      if (!data.skipCheck) {
        await this.input.check(data);
      }
      /* eslint-enable no-await-in-loop */
    }
  }

  /**
   *
   * @param formData
   * @returns {Promise<void>}
   */
  async fill (formData) {
    // Pra usar forEach e async/await é bem mais chato.
    for (let i = 0; i < formData.length; i++) {
      /* eslint-disable no-await-in-loop */ // Não quero rodar essas promises em paralelo
      const data = formData[i];
      await this.input.fill(data);
      /* eslint-enable no-await-in-loop */
    }
  }

  async submit (options = {}) {
    const {waitForNavigation = true, identificator = null} = options;
    const clickFunction = async () => {
      if (identificator) {
        await this.utils.click(identificator);
      } else {
        await this.page.waitForSelector('button[type=submit]');
        await this.page.click('button[type=submit]');
      }
    };
    await Promise.all([
      waitForNavigation ? this.page.waitForNavigation() : null,
      clickFunction(),
    ]);
  }
}

module.exports = Form;
