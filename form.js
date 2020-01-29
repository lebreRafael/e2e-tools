const Input = require('./input');

class Form {
  constructor (page, checkCB) {
    this.input = new Input(page, checkCB);
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
}

module.exports = Form;
