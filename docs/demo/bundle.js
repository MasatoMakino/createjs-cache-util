/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/createjs-text-cache.js":
/*!************************************!*\
  !*** ./bin/createjs-text-cache.js ***!
  \************************************/
/*! exports provided: CreatejsCacheUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatejsCacheUtil\", function() { return CreatejsCacheUtil; });\nclass CreatejsCacheUtil {\n  /**\n   * フィルタ適用のためのキャッシュを生成する。\n   * @param {createjs.DisplayObject} target\n   * @param {createjs.Filter[]} filters\n   * @param {number} margin\n   */\n  static setFilter(target, filters, margin = 8) {\n    target.filters = filters;\n\n    if (!target.cacheCanvas) {\n      const bounds = target.getBounds();\n      target.cache(bounds.x - margin, bounds.y - margin, bounds.width + margin * 2, bounds.height + margin * 2);\n    } else {\n      target.updateCache();\n    }\n  }\n  /**\n   * テキストオブジェクトのキャッシュと更新を行う。\n   * テキストに変化がない場合は処理をスキップする。\n   * @param {createjs.Text} target\n   * @param {string} value\n   * @param option オプション　marginはテキスト周囲のキャッシュのマージンサイズ colorはテキスト色\n   */\n\n\n  static cacheText(target, value, option) {\n    if (!target) return; //optionのデフォルト値を追加。\n\n    if (!option) {\n      option = {};\n    }\n\n    if (!option.margin) {\n      option.margin = 8;\n    }\n\n    if (!option.color) {\n      option.color = target.color;\n    } //状態が同一か確認\n\n\n    let isSame = true;\n    const isSameString = target.text === value;\n    if (!isSameString) isSame = false;\n\n    if (target.color !== option.color) {\n      isSame = false;\n    }\n\n    if (isSame) {\n      //状態が全く同じなら更新をせずに終了\n      return;\n    } //文字とカラーの更新\n\n\n    target.text = value;\n\n    if (target.color !== option.color) {\n      target.color = option.color;\n    } //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了\n\n\n    if (target.cacheCanvas && isSameString) {\n      target.updateCache();\n      return;\n    } //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。\n    //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。\n\n\n    target.uncache();\n    const bounds = target.getBounds(); //空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。\n\n    if (bounds === null || bounds === undefined) {\n      if (target.cacheCanvas) {\n        target.uncache();\n      }\n\n      return;\n    } //文言が異なる場合は再キャッシュ。\n\n\n    target.cache(bounds.x - option.margin, bounds.y - option.margin, bounds.width + option.margin * 2, bounds.height + option.margin * 2);\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/createjs-text-cache.js?");

/***/ }),

/***/ "./docs/demo/main.js":
/*!***************************!*\
  !*** ./docs/demo/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bin_createjs_text_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bin/createjs-text-cache */ \"./bin/createjs-text-cache.js\");\n\n\nconst onDomContentsLoaded = () => {\n  //FPSメーターの生成と配置\n  const stats = new Stats();\n  stats.showPanel(0);\n  stats.domElement.style.cssText = \"position:absolute; z-index:999; top:0; left:0;\";\n  document.body.appendChild(stats.domElement); // 生成する文字列の長さ\n\n  const l = 3; // 生成する文字列に含める文字セット\n\n  const c = \"abcdefghijklmnopqrstuvwxyz0123456789\";\n  const cl = c.length;\n  let r = \"\";\n\n  for (let i = 0; i < l; i++) {\n    r += c[Math.floor(Math.random() * cl)];\n  } //ステージ更新処理\n\n\n  const updateStage = () => {\n    if (texts) {\n      for (let text of texts) {\n        _bin_createjs_text_cache__WEBPACK_IMPORTED_MODULE_0__[\"CreatejsCacheUtil\"].cacheText(text, r);\n      }\n    }\n\n    stats.begin();\n    stage.update();\n    stats.end();\n  }; //Create.jsのグローバル設定\n\n\n  createjs.Ticker.timingMode = createjs.Ticker.RAF;\n  createjs.Text.prototype.snapToPixel = false; //stageの初期化\n\n  const canvas = document.getElementById(\"textCanvas\");\n  canvas.width = 1280;\n  canvas.height = 480;\n  const stage = new createjs.Stage(canvas);\n  createjs.Ticker.on(\"tick\", updateStage); //Textオブジェクトの配置\n\n  const texts = [];\n\n  for (let i = 0; i < 100; i++) {\n    for (let j = 0; j < 80; j++) {\n      const text = new createjs.Text(\"\", \"16px Meiryo\", \"#000\");\n      text.x = i * 36;\n      text.y = j * 20;\n      _bin_createjs_text_cache__WEBPACK_IMPORTED_MODULE_0__[\"CreatejsCacheUtil\"].cacheText(text, \"TXT\");\n      stage.addChild(text);\n      texts.push(text);\n    }\n  }\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack:///./docs/demo/main.js?");

/***/ })

/******/ });