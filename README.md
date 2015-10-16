# grunt-handlebars-page-builder
This grunt task uses Handlebars to compile templates based on a json model structure and formatted via js-beautify. This lets us create modular html components that can be used and reused in multiple scenarios.

## Configurations
Example:

```js
hb_page_builder: {
  dist: {
    options: {
      templateFolders: ['test/templates']
    },
    files: {
      'tmp/': ['test/data/start-page.json']
    }
  }
}
```

**options**
- `templateFolders`: Specifies which folders the plugin should look for templates in.

**files**
- `dest:['path/to/json']`: This object contains properties, representing the target directory into which the files will be compiled. The value is an array of json objects that represents the page model.

## The JSON object
Example:

```js
{
  "fileName": "start-page",
  "layout": "path/to/markup.html",
  "model": {
    ...
  }
}
```

**fileName**
This is the name of the html file that is generated.

**layout**
The layout is the entry point for your model.

**model**
This is the model for your views.

## Global variables
It is possible to specify global variables that handlebars will make accessible through the helper function `globals`. We specify a folder in the options where the global json files are stored. 

```js
hb_page_builder: {
  dist: {
    options: {
      globals: 'global/directory'
    }
  }
}
```

The task will create an object of all these files, which are available by using the following helper function.

```html
{{ globals 'filename.property.path' }}
```

## Helpers
If you're familiar with Handlebars, you will know just hw powerful helper functions are. You can inject your own helper functions by adding a filepath to the options... 

```js
hb_page_builder: {
  dist: {
    options: {
      helpers: './../test/data/helpers/helpers.js'
    }
  }
}
```
The contents of this file should be a node module, exposing an array called helpers. The helpers array should contain objects with 2 properties: "name" and "func". 

```js
"use strict";

exports.helpers = [

    {
        name: 'equal',
        func: function(lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if( lvalue!=rvalue ) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }

];
```