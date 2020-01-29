const Form = require('./form');
const Input = require('./input');
const Utils = require('./utils');

const createPuppeteerTools = (page, checkCB) => ({
  form: new Form(page, checkCB),
  input: new Input(page, checkCB),
  utils: new Utils(page),
});

module.exports = createPuppeteerTools;
