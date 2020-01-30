- [function: createPuppeteerTools](#function-createpuppeteertoolspage-checkcb)
- [class: Form](#class-form)
  * [form.check([inputs])](#formcheckinputs)
  * [form.fill([inputs])](#formfillinputs)
  * [form.submit([options])](#formsubmitoptions)
- [class: Input](#class-input)
  * [input.check(input)](#inputcheckinput)
  * [input.fill(input)](#inputfillinput)
  * [input.getValue(input)](#inputgetvalueinput)
- [class: Utils](#class-utils)
  * [utils.click(identificator)](#utilsclickidentificator)
  * [utils.doubleClick(identificator)](#utilsdoubleclickidentificator)
  * [utils.getElement(identificator)](#utilsgetelementidentificator)
  * [utils.waitForElement(identificator)](#utilswaitforelementidentificator)

### function: createPuppeteerTools(page, [checkCB])
* `page` <[object]> The page object returned from `await browser.newPage();` in puppeteer
* `checkCB` <[function]> A function that is called to check input values in form.check() and input.check(). You must
get the params passed to this function and pass it to you test suit's expect functions. Your test must fail if they
are not equal.
  * `value` Current input's value
  * `expectedValue` Expected value for this input.

### class: Form
Provides methods to handle multiple inputs

#### form.check([inputs])
* `inputs` <[array]<[object]>> An array of objects that describes the input and the data to be checked
  * `checkData` <[string]> This one overrides the data key in check function. This is usefull
  when using the same inputData in fill and check function and the value is formatted.
  * `data` <[string]> The value you want to fill in your input
  * `label` <[string]> The input's label
  * `placeholder` <[string]> The input's placeholder
  * `type` <[string]> For now, the only type supported is **text**

#### form.fill([inputs])
* `inputs` <[array]<[object]>> An array of objects that describes the input and the data to be filled
  * `data` <[string]> The value you want to fill in your input
  * `label` <[string]> The input's label
  * `placeholder` <[string]> The input's placeholder
  * `type` <[string]> For now, the only type supported is **text**

#### form.submit([options])
* `options` <[object]>
  * `waitForNavigation` <[boolean]> wait for navigation after submit the form. Defaults to `true`
  * `identificator` <[object]> An object that describes the element in a human way (using screen things like label instead of id and test-id)
    * `label` <[string]> The element's label
    * `placeholder` <[string]> The element's placeholder
    * `tag` <[string]> The element's tag name
    * `text` <[string]> The element's text

### class: Input
Provides methods to handle inputs

#### input.check(input)
* `input` <[object]> An object that describes the input and the data to be checked
  * `checkData` <[string]> This one overrides the data key in check function. This is usefull
  when using the same inputData in fill and check function and the value is formatted.
  * `data` <[string]> The value you want to fill in your input
  * `label` <[string]> The input's label
  * `placeholder` <[string]> The input's placeholder
  * `type` <[string]> For now, the only type supported is **text**

This method get the input matching label, placeholder and type, scrolls it into view if needed,
click into it and fill in your data.

#### input.fill(input)
* `input` <[object]> An object that describes the input and the data to be filled
  * `data` <[string]> The value you want to fill in your input
  * `label` <[string]> The input's label
  * `placeholder` <[string]> The input's placeholder
  * `type` <[string]> For now, the only type supported is **text**

#### input.getValue(input)
* `input` <[object]> An object that describes the input
  * `label` <[string]> The input's label
  * `placeholder` <[string]> The input's placeholder
  * `type` <[string]> For now, the only type supported is **text**
* returns: <[string]>

This method get the input matching label, placeholder and type, scrolls it into view if needed,
click into it, get it's value and return it.

### class: Utils

#### utils.click(identificator)
* `identificator` <[object]> An object that describes the element in a human way (using screen things like label instead of id and test-id)
  * `label` <[string]> The element's label
  * `placeholder` <[string]> The element's placeholder
  * `tag` <[string]> The element's tag name
  * `text` <[string]> The element's text

#### utils.doubleClick(identificator)
* `identificator` <[object]> An object that describes the element in a human way (using screen things like label instead of id and test-id)
  * `label` <[string]> The element's label
  * `placeholder` <[string]> The element's placeholder
  * `tag` <[string]> The element's tag name
  * `text` <[string]> The element's text

#### utils.getElement(identificator)
* `identificator` <[object]> An object that describes the element in a human way (using screen things like label instead of id and test-id)
  * `label` <[string]> The element's label
  * `placeholder` <[string]> The element's placeholder
  * `tag` <[string]> The element's tag name
  * `text` <[string]> The element's text

#### utils.waitForElement(identificator)
* `identificator` <[object]> An object that describes the element in a human way (using screen things like label instead of id and test-id)
  * `label` <[string]> The element's label
  * `placeholder` <[string]> The element's placeholder
  * `tag` <[string]> The element's tag name
  * `text` <[string]> The element's text

