# createjs-cache-util

A module for caching and update bitmap text on change.

[![Maintainability](https://api.codeclimate.com/v1/badges/aa68e67573e06757daf2/maintainability)](https://codeclimate.com/github/MasatoMakino/createjs-cache-util/maintainability)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=createjs-cache-util&show_owner=true)](https://github.com/MasatoMakino/createjs-cache-util)

## Demo

[Demo Page](https://masatomakino.github.io/createjs-cache-util/demo/)

### Install

createjs-cache-util depend on [CreateJS / EaselJS](https://github.com/CreateJS/EaselJS)

```bash
npm install easeljs --save-dev
```

or load script files in html.

```html
<script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
```

and

```bash
npm install https://github.com/MasatoMakino/createjs-cache-util.git --save-dev
```

### Import

createjs-cache-util is composed of ES6 modules and TypeScript d.ts files.

At first, import classes.

```js
import { CreatejsCacheUtil } from "createjs-cache-util";
```

### Cache a text

```js
CreatejsCacheUtil.cacheText(textField, "textContents");
```

if contents is updated, textField.cacheCanvas will update.

[API documents](https://masatomakino.github.io/createjs-cache-util/api/)

see also [demo script](demoSrc/demo.js).

## License

createjs-cache-util is [MIT licensed](LICENSE).
