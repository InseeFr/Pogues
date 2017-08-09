# Getting started

Pogues is a Single Page Application built with React and Redux. To run the application in development mode, run the following commands from a shell prompt in the local directory, and then navigate to [http://localhost:8080](http://localhost:8080):

```
# Download all the dependencies needed by the application
npm install
# Needed to copy some assets to the `dist` folder (this step should disappear
# over time, # see #144)
npm run build
# Compiles the code and starts a minimal web server (see below)
npm run dev 
```

You will only be able to create and edit a questionnaire locally. You won't be able to save it, visualize it or use some external resources (like some list of codes) within your questionnaire: `Pogues` serves only as a front-end application to design questionnaires and relies on tiers Web services to process these operations. More information on this in [remote APIs](./remote-apis/README.md).

## Build

To build the application, run `npm run build`. You can now serve the content of the `dist` folder with the HTTP server of your choice.

Note that you will probably first need to update the [config file](https://github.com/InseeFr/Pogues/blob/master/src/js/config/config.js) to point to the proper URLs and paths for the web services Pogues will rely on.

## New to JavaScript and Node.js

If you're new to JavaScript, you might need to first install [node and npm](https://nodejs.org/en/download/) on your computer. You should download NodeJS < 8

`npm` is the `Node.js` package manager. `npm install` will download all the dependencies needed by the project, as described in the `dependencies` and `devDepedencies` sections of the [package.json](https://github.com/InseeFr/Pogues/blob/master/package.json) file.

`npm run dev` will launch the `dev` command defined in the `scripts` section of the same `package.json` file. This command will launch a local web server serving the main HTML file ([src/js/index.html](https://github.com/InseeFr/Pogues/blob/master/src/index.html)) and all the relevant assets. Read more about [Webpack usage](./application/build-process.md).

`npm run build` will launch the compilation with some optimizations for production. It copies all the static assets and the resulting bundle file in the `dist` folder.