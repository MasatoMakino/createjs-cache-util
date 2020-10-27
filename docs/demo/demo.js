/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./bin/createjs-text-cache.js":
/*!************************************!*\
  !*** ./bin/createjs-text-cache.js ***!
  \************************************/
/*! namespace exports */
/*! export CacheTextOption [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CreatejsCacheUtil [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CreatejsCacheUtil\": () => /* binding */ CreatejsCacheUtil,\n/* harmony export */   \"CacheTextOption\": () => /* binding */ CacheTextOption\n/* harmony export */ });\nvar Shape = createjs.Shape;\nclass CreatejsCacheUtil {\n  /**\n   * フィルタ適用のためのキャッシュを生成する。\n   * @param target\n   * @param filters\n   * @param margin\n   * @param scale\n   * @param addHitArea\n   */\n  static setFilter(target, filters, margin = 8, scale = 1, addHitArea = false) {\n    target.filters = filters;\n\n    if (!target.bitmapCache) {\n      this.refreshCache(target, margin, scale, addHitArea);\n    } else {\n      target.updateCache();\n    }\n  }\n  /**\n   * テキストオブジェクトのキャッシュと更新を行う。\n   * テキストに変化がない場合は処理をスキップする。\n   * @param {createjs.Text} target\n   * @param {string} value\n   * @param {CacheTextOption} option\n   */\n\n\n  static cacheText(target, value, option) {\n    if (!target) return;\n    option = CacheTextOption.init(target, option);\n    if (!this.isNeedUpdate(target, value, option)) return; //文字とカラーの更新\n\n    const currentText = target.text;\n    target.text = value;\n    target.color = option.color; //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了\n\n    if (target.bitmapCache && currentText === value) {\n      target.updateCache();\n      return;\n    }\n\n    this.refreshCache(target, option.margin, option.scale, option.addHitArea);\n  }\n  /**\n   * 対象のディスプレイオブジェクトを、指定されたマージンの範囲でキャッシュする。\n   * キャッシュはupdateではなくuncacheを行い、キャッシュサイズも変更する。\n   *\n   * @param target\n   * @param margin\n   * @param scale\n   * @param addHitArea\n   */\n\n\n  static refreshCache(target, margin, scale, addHitArea) {\n    //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。\n    //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。\n    target.uncache();\n    const rect = this.getRect(target, margin); //targetが空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。\n\n    if (rect == null) return;\n    target.cache(rect.x, rect.y, rect.width, rect.height, scale);\n\n    if (addHitArea) {\n      CreatejsCacheUtil.addHitArea(target, rect);\n    }\n  }\n  /**\n   * キャッシュ用の座標を取得。\n   * @param target\n   * @param margin\n   */\n\n\n  static getRect(target, margin) {\n    const bounds = target.getBounds();\n    if (bounds == null) return null;\n    return {\n      x: bounds.x - margin,\n      y: bounds.y - margin,\n      width: bounds.width + margin * 2,\n      height: bounds.height + margin * 2\n    };\n  }\n\n  static addHitArea(target, rect) {\n    const shape = new Shape();\n    shape.graphics.beginFill(\"#000\").drawRect(rect.x, rect.y, rect.width, rect.height).endFill();\n    target.hitArea = shape;\n  }\n  /**\n   * キャッシュの更新が必要か否かを判定する。\n   * cacheText関数の内部処理。\n   *\n   * @param {createjs.Text} target\n   * @param {string} value\n   * @param {CacheTextOption} option\n   * @returns {boolean}\n   */\n\n\n  static isNeedUpdate(target, value, option) {\n    //キャッシュが行われていないなら強制的にキャッシュを更新。\n    if (!target.bitmapCache) return true; //状態が同一か確認\n\n    if (target.text !== value) return true;\n    if (target.color !== option.color) return true; //スケール値が存在し、かつ同一かを確認\n\n    const cacheScale = target.bitmapCache.scale; //2019/05/03 bitmapCache.scaleプロパティは非公開である。将来的に取得できなくなる可能性がある。\n\n    if (cacheScale != null && cacheScale !== option.scale) return true;\n    return false;\n  }\n\n}\n/**\n * CreatejsCacheUtil.cacheText関数のためのオプション。\n */\n\nclass CacheTextOption {\n  /**\n   * 不足している値をデフォルト値で埋める。\n   * @param {createjs.Text} target\n   * @param {CacheTextOption} option\n   * @returns {CacheTextOption}\n   */\n  static init(target, option) {\n    if (option == null) option = {};\n    if (option.margin == null) option.margin = 8;\n    if (!option.color) option.color = target.color;\n    if (option.scale == null) option.scale = 1;\n    if (option.addHitArea == null) option.addHitArea = false;\n    return option;\n  }\n\n}\n\n//# sourceURL=webpack://createjs-cache-util/./bin/createjs-text-cache.js?");

/***/ }),

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bin_createjs_text_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bin/createjs-text-cache */ \"./bin/createjs-text-cache.js\");\n\n\nconst getRandomString = length => {\n  // 生成する文字列に含める文字セット\n  const c = \"abcdefghijklmnopqrstuvwxyz0123456789\";\n  const cl = c.length;\n  let randomString = \"\";\n\n  for (let i = 0; i < length; i++) {\n    randomString += c[Math.floor(Math.random() * cl)];\n  }\n\n  return randomString;\n};\n\nconst initTexts = stage => {\n  const texts = [];\n\n  for (let i = 0; i < 40; i++) {\n    for (let j = 0; j < 30; j++) {\n      const text = new createjs.Text(\"\", \"16px Meiryo\", \"#000\");\n      text.x = i * 36;\n      text.y = j * 20;\n      text.addEventListener(\"click\", e => {\n        console.log(i, j);\n      });\n      _bin_createjs_text_cache__WEBPACK_IMPORTED_MODULE_0__.CreatejsCacheUtil.cacheText(text, \"TXT\");\n      stage.addChild(text);\n      texts.push(text);\n    }\n  }\n\n  return texts;\n};\n\nconst onDomContentsLoaded = () => {\n  const r = getRandomString(3); //ステージ更新処理\n\n  const updateStage = () => {\n    if (texts) {\n      for (let text of texts) {\n        _bin_createjs_text_cache__WEBPACK_IMPORTED_MODULE_0__.CreatejsCacheUtil.cacheText(text, r, {\n          scale: 2,\n          addHitArea: true\n        });\n      }\n    }\n\n    stage.update();\n  }; //Create.jsのグローバル設定\n\n\n  createjs.Ticker.timingMode = createjs.Ticker.RAF;\n  createjs.Text.prototype.snapToPixel = false; //stageの初期化\n\n  const canvas = document.getElementById(\"textCanvas\");\n  canvas.width = 1280;\n  canvas.height = 480;\n  const stage = new createjs.Stage(canvas);\n  createjs.Ticker.on(\"tick\", updateStage);\n  const texts = initTexts(stage);\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack://createjs-cache-util/./demoSrc/demo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./demoSrc/demo.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;