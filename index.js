const Form = require('./form');
const Input = require('./input');
const Utils = require('./utils');

const createPuppeteerTools = (page) => ({
  form: new Form(page),
  input: new Input(page),
  utils: new Utils(page),
});

module.exports = createPuppeteerTools;
