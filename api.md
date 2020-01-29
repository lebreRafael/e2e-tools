- [class: Form](#class-form)
  * [form.check([inputs])](#formcheckinputs)
  * [form.fill([inputs])](#formfillinputs)
- [class: Input](#class-input)
  * [input.check(input)](#inputcheckinput)
  * [input.fill(input)](#inputfillinput)
  * [input.getValue(input)](#inputgetvalueinput)
- [class: Utils](#class-utils)
  * [utils.click(identificator)](#utilsclickidentificator)
  * [utils.doubleClick(identificator)](#utilsdoubleclickidentificator)
  * [utils.getElement(identificator)](#utilsgetelementidentificator)
  * [utils.waitForElement(identificator)](#utilswaitforelementidentificator)

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

