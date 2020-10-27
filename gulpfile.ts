const { dest, series, src, watch } = require("gulp");

const doc = require("gulptask-tsdoc").generateTask();
const server = require("gulptask-dev-server").generateTask("./docs/demo");
const { bundleDemo, watchDemo } = require("gulptask-demo-page").generateTasks({
  externalScripts: ["//code.createjs.com/1.0.0/easeljs.min.js"],
  body: `<canvas id="textCanvas" width="1920" height="1080"></canvas>`,
});

const copyGlob = "./demoSrc/**/*.{png,jpg,jpeg}";
const copy = () => {
  return src(copyGlob, { base: "./demoSrc/" }).pipe(dest("./docs/demo"));
};

const { tsc, tscClean, watchTsc } = require("gulptask-tsc").generateTasks();

const watchTasks = async () => {
  watchDemo();
  watchTsc();
  watch(copyGlob, copy);
};

exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, copy, bundleDemo, doc);
exports.build_clean = series(tscClean, copy, bundleDemo, doc);
