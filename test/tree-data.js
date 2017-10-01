let expect = require("chai").expect
let parseData = require("../parseData.js")
let sample_data = {
    "/Main.java":           {"coveredLines": 0,  "totalLines": 10},
    "/utils/Copy.java":     {"coveredLines": 15, "totalLines": 37},
    "/utils/Paste.java":    {"coveredLines": 14, "totalLines": 14},
    "/utils/nums/Add.java": {"coveredLines": 9,  "totalLines": 22},
    "/ui/Window.java":      {"coveredLines": 23, "totalLines": 79}
}

describe("Converting sample data to tree data using `createDataTree`", function () {

    let result = parseData.createDataTree(sample_data)

    describe("should return", function () {
        it("an object", function () {
            expect(result).to.be.an("object")
        })
        it("an object with root `/` as its first and only key", function () {
            expect(result).to.have.all.keys("/")
        })
        it("an object with a children object", function () {
            expect(result["/"]).to.have.property("children")
        })
        it("an object with three 'children'", function () {
            expect(result["/"].children).to.have.keys("Main.java", "utils/", "ui/")
        })
    })
    
})

describe("Converting data tree to targetted objects", function () {
    let datatree = parseData.createDataTree(sample_data)

    describe("when root is given address", function () {
        let result = parseData.traceLineage("/", datatree)
        it("should return an object", function () {
            expect(result).to.be.an("object")
        })
        it("should return an object with ancestors and siblings properties", function () {
            expect(result).to.have.all.keys("ancestors", "siblings")
        })
        it("should return its ancestors property as an array", function () {
            expect(result.ancestors).to.be.an("array")
        })
        it("should return its siblings property as an array", function () {
            expect(result.siblings).to.be.an("array")
        })
        it("should return just one ancestor", function () {
            expect(result.ancestors).to.have.lengthOf(1)
        })
        it("should return `/`, root, as the sole ancestor", function () {
            // To be written
        })
        it("should return three siblings", function () {
            expect(result.siblings).to.have.lengthOf(3)
        })
        it("should return `Main.java`, `utils`, and `ui` as siblings", function () {
            // To be written
        })
    })

    describe("when `/utils/` is given address", function () {
        let result = parseData.traceLineage("/utils/", datatree)
        it("should return an object", function () {
            expect(result).to.be.an("object")
        })
    })

    describe("when `/utils/nums/` is given address", function () {
        let result = parseData.traceLineage("/utils/nums/", datatree)
        it("should return an object", function () {
            expect(result).to.be.an("object")
        })
    })

})
