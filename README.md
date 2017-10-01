# Test coverage visualisation

This repository represents code written as a quick proof-of-concept for visualising test coverage across multiple projects.

 - You can see an in-browser demo at the [Blocks page for this visualisation](http://bl.ocks.org/guypursey/3d9c954aa0184abad08ee1c3d22793e5).
 - You can see the [Gist repo feeding the Blocks page](https://gist.github.com/guypursey/3d9c954aa0184abad08ee1c3d22793e5) for a simplified branch of the repository.
 - You can see the [GitHub repo of this visualisation code](https://github.com/guypursey/test-coverage-visualisation) for fuller history and also unit tests and documentation.

You can see the aforementioned [documentation of the project, plus a brief "developer diary"](https://github.com/guypursey/test-coverage-visualisation/tree/master/docs) within the GitHub repository's `docs` folder.

## Local usage

If downloading as a local repo, viewing the HTML file directly can be problematic unless you enable CORS (cross-origin resource sharing). This is because the data is pulled in from files in the directory beginning with `data_` and if you view the HTML file directly without CORS enabled, the browser is prevented from getting the data file even though it's in the same folder.

To get around this, I've specified `http-server` as a devDependency.

You can use either `npm start` or `http-server` to start up a simple local server and then go its address (e.g., `localhost:8080`) in your browser directly to see the file.

## Local development

If developing this visualisation for yourself, you should know that the Node packages are included as dependencies in `package.json`.

You can use `npm install` as usual to get these.

Amend `index.html` and `main.js` to make changes.

Because the visualisation was developed with the browser and specifically Blocks in mind for the purposes of demonstration of the proof of concept, each time you update `main.js` you will need to run

  browserify main.js > bundle.js

This simple process updates the `bundle.js` file that pulls together the main code and any package dependencies for the browser.
