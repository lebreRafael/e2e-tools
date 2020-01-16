const Form = require('./form');
const Input = require('./input');
const Utils = require('./utils');

module.exports = (page) => ({
  form: new Form(page),
  input: new Input(page),
  utils: new Utils(page),
});
