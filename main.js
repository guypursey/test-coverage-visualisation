/*

	If viewing as `main.js`, please note that this file needs to be compiled with Browserify to `bundle.js` in order that the visualisation can be displayed in the browser.

*/
const d3 = require("d3")
const dispatch = d3.dispatch("load", "projectchange", "render")

const width = window.innerWidth
const height = window.innerHeight

d3.json("filelist.json", function (error, datafiles) {
    if (error) throw error

    let filesObject = d3.map()
    datafiles.forEach(function (d) { filesObject.set(d.filename, d) })
    dispatch.call("load", this, filesObject)
    dispatch.call("projectchange", this, filesObject.get(datafiles[0].filename))
})

dispatch.on("load.menu", function (files) {

    let select = d3.select("div#chartId")
        .append("select")
            .on("change", function () { dispatch.call("projectchange", this, files.get(this.value))})

    select.selectAll("option")
            .data(files.values())
        .enter().append("option")
            .attr("value", d => d.filename)
            .text(d => d.label)

    let svg = d3.select("div#chartId")
       .append("div")
       .classed("svg-container", true)
       .append("svg")
       .attr("preserveAspectRatio", "xMinYMin meet")
       .attr("viewBox", `0 0 ${width} ${height}`)
       .classed("svg-content-responsive", true)

    dispatch.on("projectchange.menu", function (file) {
        console.log("projectchange.menu trigger", file)
        select.property("value", file.filename)

        d3.json(`/data/${file.filename}`, function (error, data) {
            dispatch.call("render", this, data)
        })
    })

})

dispatch.on("render.coverage", function (filedata) {
    console.log(filedata)

    let createDataTree = filedata => {
        let key
        let tree = {
            "children": {},
            "coveredLines": 0,
            "totalLines": 0
        }

        let parseKey = function (root, key, dataObject) {
            let dirname = (key.match(/^\w*\//) || [ "" ])[0]
            let remainder = (key.match(/^\w*\/(.*)/) || [ "" ])[1]
            if (dirname) {
                root.children[dirname] = root.children[dirname] || {
                    "children": {},
                    "coveredLines": 0,
                    "totalLines": 0
                }
                root.children[dirname] = parseKey(root.children[dirname], remainder, dataObject)
                root.coveredLines += dataObject.coveredLines
                root.totalLines += dataObject.totalLines
            } else {
                root.children[key] = dataObject
            }
            return root
        }

        for (key in filedata) {
            parseKey(tree, key, filedata[key])
        }
        //console.log(tree)
        return tree
    }

    console.log(createDataTree(filedata))


})
