#!/bin/sh

set -e

usage() {
    echo "Usage:"
    echo "$0 <path/to/place/component> <ComponentName>"
}

main() {
    local DIR=$1
    local NAME=$2

    if [[ ! -d ${DIR} ]]; then
        usage
        exit 1
    fi

    mkdir -p ${DIR}/${NAME}

    touch ${DIR}/${NAME}/component.js
    echo 'import React, { Component, PropTypes } from '"'"'react'"'"'\n\nimport style from '"'"'./style.scss'"'"'\n\nclass '${NAME}' extends Component {\n  render() {\n    return (\n      <div></div>\n    )\n  }\n}\n\nexport default '${NAME} >> ${DIR}/${NAME}/component.js

    touch ${DIR}/${NAME}/container.js
    echo 'import '${NAME}' from '"'"'./component'"'"'\n\nexport default '${NAME} >> ${DIR}/${NAME}/container.js

    touch ${DIR}/${NAME}/style.scss

    touch ${DIR}/${NAME}/index.js
    echo 'export default from '"'"'./container'"'" >> ${DIR}/${NAME}/index.js
}

main "$@"
