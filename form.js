const Input = require('./input');

class Form {
  constructor (page) {
    this.input = new Input(page);
  }

  // /**
  //  *
  //  * @param formData
  //  * @returns {Promise<void>}
  //  */
  // async check (formData) {
  //   // Pra usar forEach e async/await é bem mais chato.
  //   for (let i = 0; i < formData.length; i++) {
  //     /* eslint-disable no-await-in-loop */ // Não quero rodar essas promises em paralelo
  //     const data = formData[i];
  //     if (!data.skipCheck) {
  //       await this.input.check(data);
  //     }
  //     /* eslint-enable no-await-in-loop */
  //   }
  // }

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
