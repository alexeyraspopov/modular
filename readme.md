# Modular

Simple [CommonJS Module/1.1](http://wiki.commonjs.org/wiki/Modules/1.1) proposal implementation

## Features

 * Works in browsers. You don't need to rebuild your project on every change
 * Dev Tools compatibility. You are able to debug your scripts in browser
 * You can work with your modules via console (`require` is available in global scope)
 * You can use config file for Browserify build

## Install

Install via [Bower](http://bower.io/)

    $ bower install modular

## Setup

Include main script file. Set config file in `data-setup` attribute.

    <script src="path/to/modular.js" data-setup="modular.json"></script>

Simple config file should consists of aliases list and entry points.

    {
        "alias": {
            "utils": "./components/utils/utils.js",
            "promise": "./components/promise/promise.js",
        },
        "start": [
            "./initial.js"
        ]
    }

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov