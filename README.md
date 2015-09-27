# grunt-handlebars-compiler
Handlebars compiler, combined with js-beautify's html module.

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