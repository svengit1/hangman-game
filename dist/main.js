/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/get_quote_mask_for_char.js":
/*!****************************************!*\
  !*** ./src/get_quote_mask_for_char.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getQuoteMaskForCharacter\": () => (/* binding */ getQuoteMaskForCharacter)\n/* harmony export */ });\n/* harmony import */ var _is_a_letter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .//is_a_letter */ \"./src/is_a_letter.js\");\n\n\nfunction getQuoteMaskForCharacter(c, guesed_letters){\n    if (guesed_letters.includes(c.toLowerCase()) || guesed_letters.includes(c.toUpperCase()) || !(0,_is_a_letter__WEBPACK_IMPORTED_MODULE_0__.is_a_letter)(c)){\n        return c\n    } else if (c === \" \"){\n        return \"  \"\n    } else{\n        return \"_ \"\n    }\n}\n\n\n//# sourceURL=webpack://hangman/./src/get_quote_mask_for_char.js?");

/***/ }),

/***/ "./src/hangman.js":
/*!************************!*\
  !*** ./src/hangman.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _get_quote_mask_for_char_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .//get_quote_mask_for_char.js */ \"./src/get_quote_mask_for_char.js\");\n/* harmony import */ var _is_a_letter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .//is_a_letter */ \"./src/is_a_letter.js\");\n/* harmony import */ var _unique_characters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .//unique_characters.js */ \"./src/unique_characters.js\");\n\n\n\n\nlet quote = {\n    'text': '',\n    'quoteId': 0,\n    'length': 0,\n    'uniqueCharacters': 0,\n}\nlet player = {\n    'name': '',\n    'errors': 0\n}\nlet game = {\n    'duration': 0,\n    'guesed_letters': [],\n    'visable_letters': ''\n}\nlet start = 0\nconst el = document.getElementById(\"main\")\nconst submit_letter_btn = document.getElementById(\"submit_letter_btn\")\nconst restart_btn = document.getElementById(\"restart_btn\")\nsubmit_letter_btn.addEventListener(\"click\", submit_letter_handler)\nrestart_btn.addEventListener(\"click\", restart_handler)\nlet paragraph = document.createElement(\"pre\")\nparagraph.setAttribute(\"id\", \"paragraph\")\nfech_quote()\nfunction fech_quote(){\n    fetch(\"http://api.quotable.io/random\").then(res => res.json())\n    .then(data => {\n        \n        setup_quote(data)\n        player.name = localStorage.getItem('name')\n        console.log(player.name)\n        console.log(quote.text)\n        run()\n    })\n}\n\n\nfunction setup_quote(data){\n    quote.text = data.content\n    quote.quoteId = data._id\n    quote.length = data.length\n    quote.uniqueCharacters = (0,_unique_characters_js__WEBPACK_IMPORTED_MODULE_2__.uniqueCharacters)(quote.text)\n}\n\nfunction run(){\n    for (let c of quote.text){\n        if ((0,_is_a_letter__WEBPACK_IMPORTED_MODULE_1__.is_a_letter)(c)){\n            game.visable_letters += \"_ \"\n        } else{\n            game.visable_letters += c\n        }\n    }\n    render(game.visable_letters)\n    start = Date.now();\n}\n\n\nfunction check_if_finished(){\n    if (!game.visable_letters.includes(\"_\")){\n        return true\n    } else{\n        return false\n    }\n}\n\nfunction render(){\n    paragraph.textContent = \"\"\n    paragraph.textContent += game.visable_letters\n    el.appendChild(paragraph)\n}\n\n\nfunction submit_letter_handler(){\n    let selected_letter = document.getElementById(\"letter\").value\n    document.getElementById(\"letter\").value = \"\"\n    if (!game.guesed_letters.includes(selected_letter)){\n        game.guesed_letters.push(selected_letter)\n    }\n    let new_visable_letters = \"\"\n    if (!quote.text.includes(selected_letter.toLowerCase()) && !quote.text.includes(selected_letter.toUpperCase())){\n        player.errors ++\n\n        var err = document.getElementById(\"error_num\")\n        err.textContent = \"\"\n        err.textContent = \"Number of errors:\" + player.errors\n        el.appendChild(err)\n    }\n    for (let c of quote.text){\n        new_visable_letters += (0,_get_quote_mask_for_char_js__WEBPACK_IMPORTED_MODULE_0__.getQuoteMaskForCharacter)(c, game.guesed_letters);\n    }\n    let used_letters = \"\"\n    for (let c of game.guesed_letters){\n        used_letters += c\n    }\n    console.log(player.errors)\n    game.visable_letters = new_visable_letters\n    if (check_if_finished()){\n        game.duration = Date.now() - start;\n        console.log(game.duration)\n        localStorage.setItem(\"game\", JSON.stringify(game))\n        localStorage.setItem(\"player\", JSON.stringify(player))\n        localStorage.setItem(\"quote\", JSON.stringify(quote))\n        location.href = \"score_page.html\";\n    }\n    document.getElementById('used_letters').innerHTML = used_letters\n\n    render(new_visable_letters)\n}\n\nfunction restart_handler(){\n    document.getElementById('used_letters').innerHTML = ''\n    game.guesed_letters = []\n    quote.text = \"\"\n    game.visable_letters = \"\"\n    player.errors = 0\n    var err = document.getElementById(\"error_num\")\n    err.textContent = \"\"\n    err.textContent = \"Number of errors:\" + player.errors\n    start = Date.now();\n    fech_quote()\n}\n\n//# sourceURL=webpack://hangman/./src/hangman.js?");

/***/ }),

/***/ "./src/is_a_letter.js":
/*!****************************!*\
  !*** ./src/is_a_letter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"is_a_letter\": () => (/* binding */ is_a_letter)\n/* harmony export */ });\nfunction is_a_letter(char){\n    if ((65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90 || 97 <= char.charCodeAt(0) &&  char.charCodeAt(0) <= 122)){\n        return true\n    } else{\n        return false\n    }\n}\n\n\n//# sourceURL=webpack://hangman/./src/is_a_letter.js?");

/***/ }),

/***/ "./src/unique_characters.js":
/*!**********************************!*\
  !*** ./src/unique_characters.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"uniqueCharacters\": () => (/* binding */ uniqueCharacters)\n/* harmony export */ });\n/* harmony import */ var _is_a_letter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .//is_a_letter */ \"./src/is_a_letter.js\");\n\nfunction uniqueCharacters(text){\n    let set = new Set();\n    for (let c of text){\n        if ((0,_is_a_letter__WEBPACK_IMPORTED_MODULE_0__.is_a_letter)(c)){\n            set.add(c)\n        } \n    }\n    console.log(set)\n    return set.size\n}\n\n\n//# sourceURL=webpack://hangman/./src/unique_characters.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/hangman.js");
/******/ 	
/******/ })()
;