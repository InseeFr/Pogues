# Build process

This operation consist of transforming and combining all the application resources to make them usable in web browsers. This process is taken care of by [webpack](https://webpack.github.io/), and can be launched with `npm run dev` during development, and `npm run build` for production.

Mainly, it will take all the `javascript` files and combine them in a giant bundle file. Thanks to the `babel` plugin for `webpack`, we can make use in our code of some `javascript` [features](/javascript/syntax.md#ES2015) which are not widely supported: `babel` will transform the code you write to make it work in all major browsers. 

Webpack will also process the main `css` file to make it load faster and work consistently across browsers (see [how to import `css` from `javascript`](https://github.com/InseeFr/Pogues/blob/4ef8d01e46cecc9343bede2a3f9a0d1406abfdf7/src/js/main.js#L6) with `webpack`).

`webpack` is configured via the [webpack.config.js](https://github.com/InseeFr/Pogues/blob/master/webpack.config.js) file. Refer to this file to see all the operations this configuration handle.
`webpack` will transform the `javascript` code you write, but in order to make debugging easier, it will provide `source maps` to enable browsers to show the original files within the developer tools.

During development, `npm run dev` will act as a background task:
- providing a simple HTTP server to serve the application assets on port `8080`;
- watching for file modifications and recompiling the application accordingly;
- automatically reloading the page in the browser to take the modifications into account.
The `npm run dev` script is configured to work with a "in memory" version of the bundle file (`--content-base` command line option for `webpack-dev-server`), hence the `javascript` file served to the browsers might not be visible in the `dist` folder on your hard drive.

[Gulp](http://gulpjs.com/) is used in combination with `webpack` to build the application for production. `Gulp` is a task runner used in this project to automate copy of some static files from the `src` folder to the `dist` folder (for now, this task should be run with `npm run build` every time the `index.html` file changes, since this file is not [tracked]((https://github.com/InseeFr/Pogues/issues/144) by the `npm run dev` task).

The [webpack configuration for production](https://github.com/InseeFr/Pogues/blob/master/webpack.production.config.js) is slightly different from the one used for development: it does not need the configuration related to the development web server. It should also provide [other adjustments](https://github.com/InseeFr/Pogues/issues/145) to make the code more production ready. When building code for production, `webpack` will automatically minify the `javascript` thanks to the command line option `-p`.