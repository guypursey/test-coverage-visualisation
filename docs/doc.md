# Documentation

This documentation is more about the development process and certain of the decisions I took. It also records roughly the time spent on this code in the form of a "development diary" to give an insight into my working practices.

## Decisions

In each case I used technology I was familiar with.

 - I decided immediately to try and create a simple but effective interactive visualisation, using D3.js.
 - I used Browserify in order to enable serving a demonstration via the browser. (Minification could do with adding though...)
 - I used the simple Http-Server package and NPM to test the visualisation on my own machine before committing each change.
 - I used Mocha and Chai to build the beginnings of a set of unit tests. I thought about Sinon but thought that would be overkill for this particular scenario.
 - I whiteboarded some ideas as I went to think about what users might most appreciate, how the data might be parsed and navigated, and what interactions I could put in place to aid this.
 - I deliberately decided not to think about cosmetics too much. I like simple, elegant design in any case, and I thought getting caught up in styling and colour would be a distraction.

## Development diary

I spent longer than the 4 hours I intended on spend on this. This is partly down to challenges I encountered, partly down to ambition, and partly because I was having fun with this.

### Saturday morning

I spent about an hour in the morning, preparing.

 - Briefly sketched user requirements. (Some of this thinking and sketching happened in the build-up over the preceding days, as I finished other work.)
 - Set up basic repository with Browserify and Http-Server for generating files for display in browser, with all dependencies wrapped in.
 - Set up data files -- two datasets and one control file for listing which files are available.
 - Opened issue for D3 and rolled back dependency to D3 4.10.0. (Also answered question on StackOverflow.)
 - Created selector and dispatch handling.

The issue with D3 and reporting it set me back somewhat, as did some issues with my machine.

### Saturday afternoon

I spent a couple of hours in the afternoon working towards a first working iteration.

 - Built accessor for processing data.
 - Adding rendering for data.

### Sunday morning

I spent about an hour in the morning. By the end of the morning, I had gone past the four-hour mark but I had a roughly working prototype.

 - Added labelling.
 - Did a bit more work on responsiveness.
 - Added basic animation/transition to aid user in following changes to display.

### Sunday afternoon

I spent the afternoon adding some features I originally envisaged being there, writing test units, documenting what I had done and recording what I would ideally do next.

 - Moved data processing out to a separate file.
 - Started writing basic unit tests.
 - Created directory exploration.
 - Created branch for Gist so as to provide demo on Blocks.
 - Added README, documentation and issues log (bugs to fix and enhancements).
