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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Modules/PluginModules.ts":
/*!**************************************!*\
  !*** ./src/Modules/PluginModules.ts ***!
  \**************************************/
/*! exports provided: setStatusColorFunc, setFrameNodeNameFunc, updateFrameNodeNameFunc, setFrameNodePluginDataFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStatusColorFunc", function() { return setStatusColorFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFrameNodeNameFunc", function() { return setFrameNodeNameFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFrameNodeNameFunc", function() { return updateFrameNodeNameFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFrameNodePluginDataFunc", function() { return setFrameNodePluginDataFunc; });
const setStatusColorFunc = (statusType) => {
    var emojiHex = "";
    switch (statusType) {
        case "Active":
            emojiHex = "\uD83D\uDD35";
            break;
        case "Approved":
            emojiHex = "\uD83D\uDFE2";
            break;
        case "In-development":
            emojiHex = "\uD83D\uDFE3";
            break;
        case "In-review":
            emojiHex = "\uD83D\uDFE1";
            break;
        case "Needs changes":
            emojiHex = "\uD83D\uDD34";
            break;
    }
    return emojiHex;
};
const setFrameNodeNameFunc = (param) => {
    let ticketNumber = param.message.ticketNumber
        ? " " + param.message.ticketNumber
        : "";
    let namePrefix = setStatusColorFunc(param.message.status) +
        " " +
        param.message.status +
        ticketNumber;
    return namePrefix;
};
const updateFrameNodeNameFunc = (frameNodeInformation, node, param) => {
    var parsedFrameData = JSON.parse(frameNodeInformation);
    let ticketNumber = parsedFrameData.ticketNumber;
    var newNodeName;
    let frameNodeData;
    if (ticketNumber != "") {
        let splitNodeName = node.name.split(" ");
        if (splitNodeName[1] != "Needs") {
            splitNodeName.splice(0, 3);
        }
        else {
            splitNodeName.splice(0, 4);
        }
        if (param.message.ticketNumber.length == 0) {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    ticketNumber +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), {
                type: param.type,
                message: {
                    status: param.message.status,
                    ticketNumber: ticketNumber
                }
            });
        }
        else {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    param.message.ticketNumber +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
    }
    else {
        let splitNodeName = node.name.split(" ");
        if (splitNodeName[1] != "Needs") {
            splitNodeName.splice(0, 2);
        }
        else {
            splitNodeName.splice(0, 3);
        }
        if (param.message.ticketNumber.length == 0) {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
        else {
            newNodeName =
                setStatusColorFunc(param.message.status) +
                    " " +
                    param.message.status +
                    " " +
                    param.message.ticketNumber +
                    " " +
                    splitNodeName.join(" ");
            frameNodeData = setFrameNodePluginDataFunc(splitNodeName.join(" "), param);
        }
    }
    node.setPluginData(node.id, JSON.stringify(frameNodeData));
    return newNodeName;
};
const setFrameNodePluginDataFunc = (name, param) => {
    const frameData = {
        ticketNumber: param.message.ticketNumber ? param.message.ticketNumber : "",
        status: param.message.status ? param.message.status : null,
        frameName: name
    };
    return frameData;
};


/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modules_PluginModules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/PluginModules */ "./src/Modules/PluginModules.ts");

const iFrameWindowDimensions = {
    width: 280,
    height: 310
};
const selectFrameAlert = "Select a frame or multiple frames to apply the status to";
const selectStatusAlert = "Select a status to apply to selected frame(s)";
const statusSuccessNotification = "Successfully updated status for selected frame(s)";
figma.showUI(__html__, iFrameWindowDimensions);
figma.ui.onmessage = (param) => {
    if (param.type == "resize_window") {
        if (param.message.resizeWindow == true) {
            figma.ui.resize(280, 340);
        }
        else {
            figma.ui.resize(280, 310);
        }
    }
    if (param.type === "apply_status") {
        if (figma.currentPage.selection.length == 0) {
            alert(selectFrameAlert);
            figma.closePlugin();
            return;
        }
        if (param.message.status == null) {
            alert(selectStatusAlert);
            return;
        }
        figma.currentPage.selection.forEach(node => {
            var nodePluginData = node.getPluginData(node.id);
            if (nodePluginData.length == 0) {
                node.setPluginData(node.id, JSON.stringify(Object(_Modules_PluginModules__WEBPACK_IMPORTED_MODULE_0__["setFrameNodePluginDataFunc"])(node.name, param)));
                node.name = Object(_Modules_PluginModules__WEBPACK_IMPORTED_MODULE_0__["setFrameNodeNameFunc"])(param) + " " + node.name;
            }
            else {
                node.name = Object(_Modules_PluginModules__WEBPACK_IMPORTED_MODULE_0__["updateFrameNodeNameFunc"])(nodePluginData, node, param);
            }
        });
        figma.closePlugin();
        figma.notify(statusSuccessNotification);
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZHVsZXMvUGx1Z2luTW9kdWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoSEE7QUFBQTtBQUFvSDtBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQseUZBQTBCO0FBQ3JGLDRCQUE0QixtRkFBb0I7QUFDaEQ7QUFDQTtBQUNBLDRCQUE0QixzRkFBdUI7QUFDbkQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJleHBvcnQgY29uc3Qgc2V0U3RhdHVzQ29sb3JGdW5jID0gKHN0YXR1c1R5cGUpID0+IHtcclxuICAgIHZhciBlbW9qaUhleCA9IFwiXCI7XHJcbiAgICBzd2l0Y2ggKHN0YXR1c1R5cGUpIHtcclxuICAgICAgICBjYXNlIFwiQWN0aXZlXCI6XHJcbiAgICAgICAgICAgIGVtb2ppSGV4ID0gXCJcXHVEODNEXFx1REQzNVwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQXBwcm92ZWRcIjpcclxuICAgICAgICAgICAgZW1vamlIZXggPSBcIlxcdUQ4M0RcXHVERkUyXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJJbi1kZXZlbG9wbWVudFwiOlxyXG4gICAgICAgICAgICBlbW9qaUhleCA9IFwiXFx1RDgzRFxcdURGRTNcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkluLXJldmlld1wiOlxyXG4gICAgICAgICAgICBlbW9qaUhleCA9IFwiXFx1RDgzRFxcdURGRTFcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIk5lZWRzIGNoYW5nZXNcIjpcclxuICAgICAgICAgICAgZW1vamlIZXggPSBcIlxcdUQ4M0RcXHVERDM0XCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVtb2ppSGV4O1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0RnJhbWVOb2RlTmFtZUZ1bmMgPSAocGFyYW0pID0+IHtcclxuICAgIGxldCB0aWNrZXROdW1iZXIgPSBwYXJhbS5tZXNzYWdlLnRpY2tldE51bWJlclxyXG4gICAgICAgID8gXCIgXCIgKyBwYXJhbS5tZXNzYWdlLnRpY2tldE51bWJlclxyXG4gICAgICAgIDogXCJcIjtcclxuICAgIGxldCBuYW1lUHJlZml4ID0gc2V0U3RhdHVzQ29sb3JGdW5jKHBhcmFtLm1lc3NhZ2Uuc3RhdHVzKSArXHJcbiAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgIHBhcmFtLm1lc3NhZ2Uuc3RhdHVzICtcclxuICAgICAgICB0aWNrZXROdW1iZXI7XHJcbiAgICByZXR1cm4gbmFtZVByZWZpeDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUZyYW1lTm9kZU5hbWVGdW5jID0gKGZyYW1lTm9kZUluZm9ybWF0aW9uLCBub2RlLCBwYXJhbSkgPT4ge1xyXG4gICAgdmFyIHBhcnNlZEZyYW1lRGF0YSA9IEpTT04ucGFyc2UoZnJhbWVOb2RlSW5mb3JtYXRpb24pO1xyXG4gICAgbGV0IHRpY2tldE51bWJlciA9IHBhcnNlZEZyYW1lRGF0YS50aWNrZXROdW1iZXI7XHJcbiAgICB2YXIgbmV3Tm9kZU5hbWU7XHJcbiAgICBsZXQgZnJhbWVOb2RlRGF0YTtcclxuICAgIGlmICh0aWNrZXROdW1iZXIgIT0gXCJcIikge1xyXG4gICAgICAgIGxldCBzcGxpdE5vZGVOYW1lID0gbm9kZS5uYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBpZiAoc3BsaXROb2RlTmFtZVsxXSAhPSBcIk5lZWRzXCIpIHtcclxuICAgICAgICAgICAgc3BsaXROb2RlTmFtZS5zcGxpY2UoMCwgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzcGxpdE5vZGVOYW1lLnNwbGljZSgwLCA0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtLm1lc3NhZ2UudGlja2V0TnVtYmVyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIG5ld05vZGVOYW1lID1cclxuICAgICAgICAgICAgICAgIHNldFN0YXR1c0NvbG9yRnVuYyhwYXJhbS5tZXNzYWdlLnN0YXR1cykgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5tZXNzYWdlLnN0YXR1cyArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tldE51bWJlciArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0Tm9kZU5hbWUuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIGZyYW1lTm9kZURhdGEgPSBzZXRGcmFtZU5vZGVQbHVnaW5EYXRhRnVuYyhzcGxpdE5vZGVOYW1lLmpvaW4oXCIgXCIpLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBwYXJhbS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogcGFyYW0ubWVzc2FnZS5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2V0TnVtYmVyOiB0aWNrZXROdW1iZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdOb2RlTmFtZSA9XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXNDb2xvckZ1bmMocGFyYW0ubWVzc2FnZS5zdGF0dXMpICtcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ubWVzc2FnZS5zdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5tZXNzYWdlLnRpY2tldE51bWJlciArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0Tm9kZU5hbWUuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIGZyYW1lTm9kZURhdGEgPSBzZXRGcmFtZU5vZGVQbHVnaW5EYXRhRnVuYyhzcGxpdE5vZGVOYW1lLmpvaW4oXCIgXCIpLCBwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbGV0IHNwbGl0Tm9kZU5hbWUgPSBub2RlLm5hbWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGlmIChzcGxpdE5vZGVOYW1lWzFdICE9IFwiTmVlZHNcIikge1xyXG4gICAgICAgICAgICBzcGxpdE5vZGVOYW1lLnNwbGljZSgwLCAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNwbGl0Tm9kZU5hbWUuc3BsaWNlKDAsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW0ubWVzc2FnZS50aWNrZXROdW1iZXIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgbmV3Tm9kZU5hbWUgPVxyXG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzQ29sb3JGdW5jKHBhcmFtLm1lc3NhZ2Uuc3RhdHVzKSArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLm1lc3NhZ2Uuc3RhdHVzICtcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgc3BsaXROb2RlTmFtZS5qb2luKFwiIFwiKTtcclxuICAgICAgICAgICAgZnJhbWVOb2RlRGF0YSA9IHNldEZyYW1lTm9kZVBsdWdpbkRhdGFGdW5jKHNwbGl0Tm9kZU5hbWUuam9pbihcIiBcIiksIHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld05vZGVOYW1lID1cclxuICAgICAgICAgICAgICAgIHNldFN0YXR1c0NvbG9yRnVuYyhwYXJhbS5tZXNzYWdlLnN0YXR1cykgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5tZXNzYWdlLnN0YXR1cyArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLm1lc3NhZ2UudGlja2V0TnVtYmVyICtcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgc3BsaXROb2RlTmFtZS5qb2luKFwiIFwiKTtcclxuICAgICAgICAgICAgZnJhbWVOb2RlRGF0YSA9IHNldEZyYW1lTm9kZVBsdWdpbkRhdGFGdW5jKHNwbGl0Tm9kZU5hbWUuam9pbihcIiBcIiksIHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBub2RlLnNldFBsdWdpbkRhdGEobm9kZS5pZCwgSlNPTi5zdHJpbmdpZnkoZnJhbWVOb2RlRGF0YSkpO1xyXG4gICAgcmV0dXJuIG5ld05vZGVOYW1lO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0RnJhbWVOb2RlUGx1Z2luRGF0YUZ1bmMgPSAobmFtZSwgcGFyYW0pID0+IHtcclxuICAgIGNvbnN0IGZyYW1lRGF0YSA9IHtcclxuICAgICAgICB0aWNrZXROdW1iZXI6IHBhcmFtLm1lc3NhZ2UudGlja2V0TnVtYmVyID8gcGFyYW0ubWVzc2FnZS50aWNrZXROdW1iZXIgOiBcIlwiLFxyXG4gICAgICAgIHN0YXR1czogcGFyYW0ubWVzc2FnZS5zdGF0dXMgPyBwYXJhbS5tZXNzYWdlLnN0YXR1cyA6IG51bGwsXHJcbiAgICAgICAgZnJhbWVOYW1lOiBuYW1lXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZyYW1lRGF0YTtcclxufTtcclxuIiwiaW1wb3J0IHsgc2V0RnJhbWVOb2RlTmFtZUZ1bmMsIHNldEZyYW1lTm9kZVBsdWdpbkRhdGFGdW5jLCB1cGRhdGVGcmFtZU5vZGVOYW1lRnVuYyB9IGZyb20gXCIuL01vZHVsZXMvUGx1Z2luTW9kdWxlc1wiO1xyXG5jb25zdCBpRnJhbWVXaW5kb3dEaW1lbnNpb25zID0ge1xyXG4gICAgd2lkdGg6IDI4MCxcclxuICAgIGhlaWdodDogMzEwXHJcbn07XHJcbmNvbnN0IHNlbGVjdEZyYW1lQWxlcnQgPSBcIlNlbGVjdCBhIGZyYW1lIG9yIG11bHRpcGxlIGZyYW1lcyB0byBhcHBseSB0aGUgc3RhdHVzIHRvXCI7XHJcbmNvbnN0IHNlbGVjdFN0YXR1c0FsZXJ0ID0gXCJTZWxlY3QgYSBzdGF0dXMgdG8gYXBwbHkgdG8gc2VsZWN0ZWQgZnJhbWUocylcIjtcclxuY29uc3Qgc3RhdHVzU3VjY2Vzc05vdGlmaWNhdGlvbiA9IFwiU3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgc3RhdHVzIGZvciBzZWxlY3RlZCBmcmFtZShzKVwiO1xyXG5maWdtYS5zaG93VUkoX19odG1sX18sIGlGcmFtZVdpbmRvd0RpbWVuc2lvbnMpO1xyXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAocGFyYW0pID0+IHtcclxuICAgIGlmIChwYXJhbS50eXBlID09IFwicmVzaXplX3dpbmRvd1wiKSB7XHJcbiAgICAgICAgaWYgKHBhcmFtLm1lc3NhZ2UucmVzaXplV2luZG93ID09IHRydWUpIHtcclxuICAgICAgICAgICAgZmlnbWEudWkucmVzaXplKDI4MCwgMzQwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZ21hLnVpLnJlc2l6ZSgyODAsIDMxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcmFtLnR5cGUgPT09IFwiYXBwbHlfc3RhdHVzXCIpIHtcclxuICAgICAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHNlbGVjdEZyYW1lQWxlcnQpO1xyXG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbS5tZXNzYWdlLnN0YXR1cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHNlbGVjdFN0YXR1c0FsZXJ0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgdmFyIG5vZGVQbHVnaW5EYXRhID0gbm9kZS5nZXRQbHVnaW5EYXRhKG5vZGUuaWQpO1xyXG4gICAgICAgICAgICBpZiAobm9kZVBsdWdpbkRhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGx1Z2luRGF0YShub2RlLmlkLCBKU09OLnN0cmluZ2lmeShzZXRGcmFtZU5vZGVQbHVnaW5EYXRhRnVuYyhub2RlLm5hbWUsIHBhcmFtKSkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5uYW1lID0gc2V0RnJhbWVOb2RlTmFtZUZ1bmMocGFyYW0pICsgXCIgXCIgKyBub2RlLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5hbWUgPSB1cGRhdGVGcmFtZU5vZGVOYW1lRnVuYyhub2RlUGx1Z2luRGF0YSwgbm9kZSwgcGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoc3RhdHVzU3VjY2Vzc05vdGlmaWNhdGlvbik7XHJcbiAgICB9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=