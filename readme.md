# Modular

Simple [CommonJS Module/1.1](http://wiki.commonjs.org/wiki/Modules/1.1) proposal implementation

## Install

Install via [Bower](http://bower.io/)

    $ bower install modular

## Setup

Include main script file. Set config file in `data-setup` attribute.

    <script src="path/to/modular.js" data-setup="config.json"></script>

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