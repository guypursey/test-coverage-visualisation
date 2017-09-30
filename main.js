/*

	If viewing as `main.js`, please note that this file needs to be compiled with Browserify to `bundle.js` in order that the visualisation can be displayed in the browser.

*/
const d3 = require("d3")
const dispatch = d3.dispatch("load", "projectchange", "render")

const width = window.innerWidth
const height = window.innerHeight

const createDataTree = filedata => {
    let key
    let tree = {}

    let parseKey = function (root, key, dataObject) {
        let dirname = (key.match(/^\w*\//) || [ "" ])[0]
        let remainder = (key.match(/^\w*\/(.*)/) || [ "" ])[1]
        if (dirname) {
            root[dirname] = root[dirname] || {
                "children": {},
                "coveredLines": 0,
                "totalLines": 0
            }
            root[dirname].children = parseKey(root[dirname].children, remainder, dataObject)
            root[dirname].coveredLines += dataObject.coveredLines
            root[dirname].totalLines += dataObject.totalLines
        } else {
            root[key] = dataObject
        }
        return root
    }

    for (key in filedata) {
        parseKey(tree, key, filedata[key])
    }
    //console.log(tree)
    return tree
}

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

    let treedata = createDataTree(filedata)

    console.log(treedata)

    let key
    let filearray = []
    for (key in filedata) {
        filedata[key].filename = key
        filearray.push(filedata[key])
    }

    console.log(filearray)

    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    }

    let barMaxWidth = width - margin.left - margin.right
    let barHeight = height - margin.top - margin.bottom

    let x = d3.scaleLinear()
        .domain([0, 1])
        .range([0, barMaxWidth])
        //.nice()

    let y = d3.scaleBand()
        .domain(Object.keys(filedata))
        .range([barHeight, 0])
        .padding(0.1)

    let svg = d3.select(".svg-content-responsive")

    let bars = svg.selectAll(".bar")
            .data(filearray)

    bars.exit()
        .remove()

    bars
        .attr("y", d => y(d.filename))
        .attr("height", y.bandwidth())

    bars.enter().append("rect")
            .attr("class", d => `bar file${d.filename.replace(/\//g, "__").replace(/\./g, "_").replace(/[^\w\d]/g, "-")}`)
            .attr("x", x(0))
            .attr("width", d => x((1 / d.totalLines) * d.coveredLines))
            .attr("y", d => y(d.filename))
            .attr("height", y.bandwidth())


})
