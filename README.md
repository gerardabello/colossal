# Analosizer

A self-contained analog-style synthesizer that runs within a Web browser

This program is in the early stages of development, and does not do
much yet.  So far, it plays a continuous "A" (440Hz) sinewave tone when
engaged.

## Usage:

There is no release process yet, and no build is published anywhere yet,
so to use this, you need to build it yourself, and then open the build
in your compatible Web browser.

## Building:

Note that the build process requires a `bash`-like environment (generally
the default on Unix, Linux, BSD, OS X, etc.) not a Windows environment.
It should be trivial, however, to modify the script entries in package.son
to work with Windows if you want to run a build on Windows.

### Have node.js and npm Installed

You'll need to use npm to run the build process, so install node.js and
npm if those are not already installed on your system.

See https://nodejs.org and
https://docs.npmjs.com/getting-started/installing-node

### Clone the repository fron github

Change to the directory in which you'll want to have the analosizer
project directory installed, and then clone the analosizer repository
from GitHub.

    git clone https://github.com/stevecj/analosizer.git

### Install the build dependencies

Change to the newly created ./analosizer directory, and then update the
npm project.

    npm update

### Build the Analosizer Run-Time Files

    npm run build

### Open Analosizer In Your Browser

Open a compatible Web browser (a modern browser with WebAudio support) and
enter the file URL to the analosizer.html file in your build directory
(e.g. file:///Users/boss/Projects/analosizer/build/analosizer.html).

### Engage Analosizer

Check the box labeled "Audio engine on/off".

## Development

To list the development tasks, ...

    npm run

To have the project automatically rebuilt when you modify files in the
project's ./src directory, in its own terminal window or pane...

    npm run watch

This project uses the Ractive.js fraework for tempating and UI data
binding.  See http://www.ractivejs.org/ for more info.

This project uses Browserify to build a single runnable javascript file
from a number of source module files and npm packages.  See
http://browserify.org/ for more info.
