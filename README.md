# grunt-handlebars-page-builder
This grunt task uses Handlebars to compile templates based on a json model structure and formatted via js-beautify. This lets us create modular html components that can be used and reused in multiple scenarios.

## Configurations
Example:

```js
hb_compiler: {
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
hb_compiler: {
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