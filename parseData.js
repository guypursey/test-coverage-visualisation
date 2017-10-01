module.exports = (function () {

    const createDataTree = filedata => {
        let key
        let tree = {}

        let parseKey = function (root, key, signature, dataObject) {
            let dirname = (key.match(/^\w*\//) || [ "" ])[0]
            let remainder = (key.match(/^\w*\/(.*)/) || [ "" ])[1]
            if (dirname) {
                root[dirname] = root[dirname] || {
                    "children": {},
                    "coveredLines": 0,
                    "totalLines": 0,
                    "folder": true,
                    "name": dirname,
                    "pathname": `${signature}${dirname}`
                }
                root[dirname].children = parseKey(root[dirname].children, remainder, `${signature}${dirname}`, dataObject)
                root[dirname].coveredLines += dataObject.coveredLines
                root[dirname].totalLines += dataObject.totalLines
            } else {
                root[key] = {
                    "coveredLines": dataObject.coveredLines,
                    "totalLines": dataObject.totalLines,
                    "folder": false,
                    "name": key,
                    "pathname": `${signature}${key}`
                }
            }

            return root
        }

        for (key in filedata) {
            parseKey(tree, key, "", filedata[key])
        }

        return tree
    }

    return {
        createDataTree: createDataTree
    }

}())
