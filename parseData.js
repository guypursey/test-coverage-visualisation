module.exports = (function () {

    const createDataTree = filedata => {
        let key
        let tree = {}

        let parseKey = function (root, key, signature, generation, dataObject) {
            let dirname = (key.match(/^[\w\-\_]*\//) || [ "" ])[0]
            let remainder = (key.match(/^[\w\-\_]*\/(.*)/) || [ "" ])[1]
            if (dirname) {
                root[dirname] = root[dirname] || {
                    "children": {},
                    "coveredLines": 0,
                    "totalLines": 0,
                    "folder": true,
                    "name": dirname,
                    "ancestry": `${signature}`,
                    "pathname": `${signature}${dirname}`,
                    "generation": generation
                }
                root[dirname].children = parseKey(root[dirname].children, remainder, `${signature}${dirname}`, generation + 1, dataObject)
                root[dirname].coveredLines += dataObject.coveredLines
                root[dirname].totalLines += dataObject.totalLines
            } else {
                root[key] = {
                    "coveredLines": dataObject.coveredLines,
                    "totalLines": dataObject.totalLines,
                    "folder": false,
                    "name": key,
                    "ancestry": `${signature}`,
                    "pathname": `${signature}${key}`,
                    "generation": generation
                }
            }

            return root
        }

        for (key in filedata) {
            parseKey(tree, key, "", 0, filedata[key])
        }

        return tree
    }

    const traceLineage = (address, treedata) => {
        let result = {
            "ancestors": [],
            "siblings": []
        }

        let addObjectPropertiesToArray = (object, array) => {
            var o
            for (o in object) {
                if (object.hasOwnProperty(o)) {
                    array.push(object[o])
                }
            }
            return array
        }

        let finditems = (address, treedata, result) => {
            if (address) {
                let dirname = (address.match(/^[\w\-\_]*\//) || [ "" ])[0]
                if (dirname) {
                    if (treedata.hasOwnProperty(dirname)) {
                        result.ancestors.push(treedata[dirname])
                        let remainder = (address.match(/^[\w\-\_]*\/(.*)/) || [ "" ])[1]
                        finditems(remainder, treedata[dirname].children, result)
                    } else {
                        // tree does not contain property with this address
                        result.siblings = addObjectPropertiesToArray(treedata, result.siblings)
                    }
                } else {
                    // nothing matching a dirname in the address provided now
                    result.siblings = addObjectPropertiesToArray(treedata, result.siblings)
                }
            } else {
                // no address left/provided
                result.siblings = addObjectPropertiesToArray(treedata, result.siblings)
            }
            return result
        }

        result = finditems(address, treedata, result)

        return result
    }

    return {
        createDataTree: createDataTree,
        traceLineage: traceLineage
    }

}())
