/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "http://localhost:8080/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dot__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_App__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__containers_document_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__containers_document_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__containers_document_index__);





var fs = __webpack_require__(14);
var baseTemplate = fs.readFileSync('./build/public/index.html');
console.log(baseTemplate);
var template = __WEBPACK_IMPORTED_MODULE_1_dot___default.a.template(baseTemplate);



var handleRender = function handleRender(req, res) {
  // This context object contains the results of the render
  var context = {};

  // render the first time
  var body = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_3_react_router__["StaticRouter"],
    { location: req.url, context: context },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__containers_App__["a" /* default */], null)
  ));
  console.log('context = ', context);
  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    // the result will tell you if there were any misses, if so
    // we can send a 404 and then do a second render pass with
    // the context to clue the <Miss> components into rendering
    // this time (on the client they know from componentDidMount)
    if (context.missed) {
      res.writeHead(404);
      body = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_router__["StaticRouter"],
        { location: req.url, context: context },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__containers_App__["a" /* default */], null)
      ));
    }
    __WEBPACK_IMPORTED_MODULE_4_react_helmet___default.a.rewind();
    console.log(template({ body: body }));
    // res.write('<!DOCTYPE html>' + renderToStaticMarkup(<Document head={Helmet.rewind()} content={markup} />));
    res.write(template({ body: body }));
    res.end();
  }
};

var _default = handleRender;
/* harmony default export */ __webpack_exports__["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(baseTemplate, 'baseTemplate', '/Users/pdiniz/work/ht-base/src/server/handle-render.js');

  __REACT_HOT_LOADER__.register(template, 'template', '/Users/pdiniz/work/ht-base/src/server/handle-render.js');

  __REACT_HOT_LOADER__.register(handleRender, 'handleRender', '/Users/pdiniz/work/ht-base/src/server/handle-render.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/pdiniz/work/ht-base/src/server/handle-render.js');
}();

;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_welcome__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_imprint__ = __webpack_require__(9);








var NoMatch = function NoMatch(_ref) {
  var location = _ref.location;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h2',
      null,
      'Whoops'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      null,
      'Sorry but ',
      location.pathname,
      ' failed!!!!!!!!!!!'
    )
  );
};

var App = function App() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2__layout_index__["a" /* default */],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router__["Switch"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__pages_welcome__["a" /* default */] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: '/about', component: __WEBPACK_IMPORTED_MODULE_4__pages_about__["a" /* default */] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: '/imprint', component: __WEBPACK_IMPORTED_MODULE_5__pages_imprint__["a" /* default */] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { component: NoMatch })
    )
  );
};

var _default = App;
/* harmony default export */ __webpack_exports__["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NoMatch, 'NoMatch', '/Users/pdiniz/work/ht-base/src/containers/App.js');

  __REACT_HOT_LOADER__.register(App, 'App', '/Users/pdiniz/work/ht-base/src/containers/App.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/pdiniz/work/ht-base/src/containers/App.js');
}();

;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// import React from 'react'
// import Head from './head'
// import { assetPath } from '../../lib/assets'
//
// const Document = ({head,content,children}) => (
//   <html>
//     <Head head={head} />
//     <body>
//       {content
//         ? <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
//         : <div id="app">{children}</div>
//       }
//
//       <script type="text/javascript" src={assetPath("app", "js")}></script>
//     </body>
//   </html>
// );
//
// export default Document
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);





var Layout = function Layout(_ref) {
  var children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_helmet___default.a, {
      title: 'Layout title',
      meta: [{ name: "description", content: "Layout description" }, { name: "robots", content: "noodp, noydir" }, { name: "lang", content: "de" }, { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" }]
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'nav',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
            { to: '/' },
            'Welcome'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
            { to: '/about' },
            'About'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
            { to: '/imprint' },
            'Imprint'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Link"],
            { to: '/not-matching-route' },
            'Not Matching Route'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'main',
      null,
      children
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'footer',
      null,
      'Footer'
    )
  );
};

var _default = Layout;
/* harmony default export */ __webpack_exports__["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Layout, 'Layout', '/Users/pdiniz/work/ht-base/src/containers/layout/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/pdiniz/work/ht-base/src/containers/layout/index.js');
}();

;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_helmet__);



var About = function About() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { id: "content" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_helmet___default.a, { title: "Custom page title" }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "h1",
      null,
      "About us"
    )
  );
};

var _default = About;
/* harmony default export */ __webpack_exports__["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(About, "About", "/Users/pdiniz/work/ht-base/src/containers/pages/about.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/pdiniz/work/ht-base/src/containers/pages/about.js");
}();

;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Imprint = function Imprint() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h1',
    null,
    'Imprint'
  );
};

var _default = Imprint;
/* harmony default export */ __webpack_exports__["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Imprint, 'Imprint', '/Users/pdiniz/work/ht-base/src/containers/pages/imprint.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/pdiniz/work/ht-base/src/containers/pages/imprint.js');
}();

;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__welcome_sass__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__welcome_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__welcome_sass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hero_jpg__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hero_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__hero_jpg__);





var Welcome = function Welcome() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h1',
      { className: 'welcome' },
      'Welcome users!'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_2__hero_jpg___default.a })
  );
};

var _default = Welcome;
/* harmony default export */ __webpack_exports__["a"] = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Welcome, 'Welcome', '/Users/pdiniz/work/ht-base/src/containers/pages/welcome.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/pdiniz/work/ht-base/src/containers/pages/welcome.js');
}();

;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7c107fb692c21b01ca711e4b1d7447f9.jpg";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// empty (null-loader)

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("dot");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handle_render__ = __webpack_require__(3);



var app = new __WEBPACK_IMPORTED_MODULE_0_express___default.a();

app.use('/assets', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(process.env.NODE_ENV === 'production' ? 'build/public' : 'dev/build'));
app.get('*', __WEBPACK_IMPORTED_MODULE_1__handle_render__["a" /* default */]);

app.listen(process.env.PORT, process.env.HOST, function (err) {
  if (err) {
    console.log(err);
  }

  console.log("\n==> \uD83D\uDCBB  App-Server(" + process.env.NODE_ENV + ") listening at " + process.env.HOST + ":" + process.env.PORT);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(app, "app", "/Users/pdiniz/work/ht-base/src/server/index.js");
}();

;

/***/ })
/******/ ]);