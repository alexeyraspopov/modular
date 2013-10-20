# Modular

## Setup

Include main script file. Set config file in `data-config` attribute.

    <script src="components/modular/modular.js" data-config="config.json"></script>

Simple config file should consists of aliases list and entry points.

    {
        "alias": {
            "utils": "./components/utils/utils.js",
            "promise": "./components/promise/promise.js",
        },
        "start": [
            "initial.js"
        ]
    }