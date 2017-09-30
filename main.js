/*

	If viewing as `main.js`, please note that this file needs to be compiled with Browserify to `bundle.js` in order that the visualisation can be displayed in the browser.

*/
const d3 = require("d3")
const dispatch = d3.dispatch("load", "projectchange")

d3.json("filelist.json", function (error, datafiles) {
    if (error) throw error

    let filesObject = d3.map()
    datafiles.forEach(function (d) { filesObject.set(d.filename, d) })
    dispatch.call("load", this, filesObject)
    dispatch.call("projectchange", this, filesObject.get(datafiles[0].filename))
})

dispatch.on("load.menu", function (files) {

    console.log("menu loading", files)
    let select = d3.select("body")
        .append("div")
        .append("select")
            .on("change", function () { dispatch.call("projectchange", this, files.get(this.value))})

    select.selectAll("option")
            .data(files.values())
        .enter().append("option")
            .attr("value", d => d.filename)
            .text(d => d.label)

    dispatch.on("projectchange.menu", function (file) {
        console.log("projectchange.menu trigger", file)
        select.property("value", file.filename)
    })

})
