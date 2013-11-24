# Modular

## Setup

Include main script file. Set config file in `data-setup` attribute.

    <script src="components/modular/modular.js" data-setup="config.json"></script>

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