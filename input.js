const InputGeneric = require('./inputGeneric');

class Input {
  constructor (page) {
    this.page = page;
    this.inputGeneric = new InputGeneric(page);
  }

  // async checkInput (inputData) {
  //   const {
  //     checkData,
  //     data,
  //     identificator,
  //     options,
  //     type,
  //   } = inputData;
  //   const expectedData = typeof checkData !== 'undefined' ? checkData : data;
  //   switch (type) {
  //     // case 'checkBox':
  //     //   await checkCheckBox(identificator, data);
  //     //   break;
  //     // case 'radio':
  //     //   await checkRadio(identificator, data);
  //     //   break;
  //     case 'text':
  //       await this.inputGeneric.check(identificator, expectedData, options);
  //       break;
  //     // case 'textarea':
  //     //   await checkTextarea(identificator, expectedData, options);
  //     //   break;
  //     default:
  //       throw new Error('Tipo inválido: ' + type);
  //   }
  // }

  async fill (inputData) {
    const {
      beforeFill, // function
      data,
      identificator,
      options,
      type,
    } = inputData;
    if (beforeFill) await beforeFill(this.page);
    switch (type) {
      // case 'checkBox':
      //   return fillCheckBox(identificator, data);
      // case 'radio':
      //   return selectRadioGroupItem(identificator, data);
      case 'text':
        return this.inputGeneric.fill(identificator, data, options);
      // case 'textarea':
      //   return fillTextarea(identificator, data, options);
      default:
        throw new Error('Invalid type: ' + type);
    }
  }
}

module.exports = Input;
