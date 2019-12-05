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

/***/ "./src/Modules/FigmaModules.ts":
/*!*************************************!*\
  !*** ./src/Modules/FigmaModules.ts ***!
  \*************************************/
/*! exports provided: setFrameNodeNameFunc, updateFrameNodeNameFunc, setFrameNodePluginDataFunc, setStatusColorFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFrameNodeNameFunc", function() { return setFrameNodeNameFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFrameNodeNameFunc", function() { return updateFrameNodeNameFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFrameNodePluginDataFunc", function() { return setFrameNodePluginDataFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStatusColorFunc", function() { return setStatusColorFunc; });
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


/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modules_FigmaModules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/FigmaModules */ "./src/Modules/FigmaModules.ts");

const iFrameWindowDimensions = {
    width: 280,
    height: 310
};
const selectFrameAlert = "Select a frame or multiple frames to apply the status to";
const selectStatusAlert = "Select a status to apply to selected frame(s)";
const statusSuccessNotification = "Successfully updated status for selected frame(s)";
figma.showUI(__html__, iFrameWindowDimensions);
figma.ui.onmessage = (param) => {
    if (figma.currentPage.selection.length == 0) {
        alert(selectFrameAlert);
        figma.closePlugin();
        return false;
    }
    if (param.message.status == null) {
        alert(selectStatusAlert);
        return false;
    }
    if (param.type === "apply_status") {
        figma.currentPage.selection.forEach(node => {
            var nodePluginData = node.getPluginData(node.id);
            if (nodePluginData.length == 0) {
                node.setPluginData(node.id, JSON.stringify(Object(_Modules_FigmaModules__WEBPACK_IMPORTED_MODULE_0__["setFrameNodePluginDataFunc"])(node.name, param)));
                node.name = Object(_Modules_FigmaModules__WEBPACK_IMPORTED_MODULE_0__["setFrameNodeNameFunc"])(param) + " " + node.name;
            }
            else {
                node.name = Object(_Modules_FigmaModules__WEBPACK_IMPORTED_MODULE_0__["updateFrameNodeNameFunc"])(nodePluginData, node, param);
            }
        });
        figma.closePlugin();
        figma.notify(statusSuccessNotification);
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZHVsZXMvRmlnbWFNb2R1bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hIQTtBQUFBO0FBQW1IO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELHdGQUEwQjtBQUNyRiw0QkFBNEIsa0ZBQW9CO0FBQ2hEO0FBQ0E7QUFDQSw0QkFBNEIscUZBQXVCO0FBQ25EO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IHNldEZyYW1lTm9kZU5hbWVGdW5jID0gKHBhcmFtKSA9PiB7XHJcbiAgICBsZXQgdGlja2V0TnVtYmVyID0gcGFyYW0ubWVzc2FnZS50aWNrZXROdW1iZXJcclxuICAgICAgICA/IFwiIFwiICsgcGFyYW0ubWVzc2FnZS50aWNrZXROdW1iZXJcclxuICAgICAgICA6IFwiXCI7XHJcbiAgICBsZXQgbmFtZVByZWZpeCA9IHNldFN0YXR1c0NvbG9yRnVuYyhwYXJhbS5tZXNzYWdlLnN0YXR1cykgK1xyXG4gICAgICAgIFwiIFwiICtcclxuICAgICAgICBwYXJhbS5tZXNzYWdlLnN0YXR1cyArXHJcbiAgICAgICAgdGlja2V0TnVtYmVyO1xyXG4gICAgcmV0dXJuIG5hbWVQcmVmaXg7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVGcmFtZU5vZGVOYW1lRnVuYyA9IChmcmFtZU5vZGVJbmZvcm1hdGlvbiwgbm9kZSwgcGFyYW0pID0+IHtcclxuICAgIHZhciBwYXJzZWRGcmFtZURhdGEgPSBKU09OLnBhcnNlKGZyYW1lTm9kZUluZm9ybWF0aW9uKTtcclxuICAgIGxldCB0aWNrZXROdW1iZXIgPSBwYXJzZWRGcmFtZURhdGEudGlja2V0TnVtYmVyO1xyXG4gICAgdmFyIG5ld05vZGVOYW1lO1xyXG4gICAgbGV0IGZyYW1lTm9kZURhdGE7XHJcbiAgICBpZiAodGlja2V0TnVtYmVyICE9IFwiXCIpIHtcclxuICAgICAgICBsZXQgc3BsaXROb2RlTmFtZSA9IG5vZGUubmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgaWYgKHNwbGl0Tm9kZU5hbWVbMV0gIT0gXCJOZWVkc1wiKSB7XHJcbiAgICAgICAgICAgIHNwbGl0Tm9kZU5hbWUuc3BsaWNlKDAsIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3BsaXROb2RlTmFtZS5zcGxpY2UoMCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbS5tZXNzYWdlLnRpY2tldE51bWJlci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBuZXdOb2RlTmFtZSA9XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXNDb2xvckZ1bmMocGFyYW0ubWVzc2FnZS5zdGF0dXMpICtcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ubWVzc2FnZS5zdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICB0aWNrZXROdW1iZXIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBzcGxpdE5vZGVOYW1lLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgICBmcmFtZU5vZGVEYXRhID0gc2V0RnJhbWVOb2RlUGx1Z2luRGF0YUZ1bmMoc3BsaXROb2RlTmFtZS5qb2luKFwiIFwiKSwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogcGFyYW0udHlwZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcmFtLm1lc3NhZ2Uuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tldE51bWJlcjogdGlja2V0TnVtYmVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbmV3Tm9kZU5hbWUgPVxyXG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzQ29sb3JGdW5jKHBhcmFtLm1lc3NhZ2Uuc3RhdHVzKSArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLm1lc3NhZ2Uuc3RhdHVzICtcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ubWVzc2FnZS50aWNrZXROdW1iZXIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBzcGxpdE5vZGVOYW1lLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgICBmcmFtZU5vZGVEYXRhID0gc2V0RnJhbWVOb2RlUGx1Z2luRGF0YUZ1bmMoc3BsaXROb2RlTmFtZS5qb2luKFwiIFwiKSwgcGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxldCBzcGxpdE5vZGVOYW1lID0gbm9kZS5uYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBpZiAoc3BsaXROb2RlTmFtZVsxXSAhPSBcIk5lZWRzXCIpIHtcclxuICAgICAgICAgICAgc3BsaXROb2RlTmFtZS5zcGxpY2UoMCwgMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzcGxpdE5vZGVOYW1lLnNwbGljZSgwLCAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtLm1lc3NhZ2UudGlja2V0TnVtYmVyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIG5ld05vZGVOYW1lID1cclxuICAgICAgICAgICAgICAgIHNldFN0YXR1c0NvbG9yRnVuYyhwYXJhbS5tZXNzYWdlLnN0YXR1cykgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5tZXNzYWdlLnN0YXR1cyArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0Tm9kZU5hbWUuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIGZyYW1lTm9kZURhdGEgPSBzZXRGcmFtZU5vZGVQbHVnaW5EYXRhRnVuYyhzcGxpdE5vZGVOYW1lLmpvaW4oXCIgXCIpLCBwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdOb2RlTmFtZSA9XHJcbiAgICAgICAgICAgICAgICBzZXRTdGF0dXNDb2xvckZ1bmMocGFyYW0ubWVzc2FnZS5zdGF0dXMpICtcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ubWVzc2FnZS5zdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5tZXNzYWdlLnRpY2tldE51bWJlciArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHNwbGl0Tm9kZU5hbWUuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIGZyYW1lTm9kZURhdGEgPSBzZXRGcmFtZU5vZGVQbHVnaW5EYXRhRnVuYyhzcGxpdE5vZGVOYW1lLmpvaW4oXCIgXCIpLCBwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbm9kZS5zZXRQbHVnaW5EYXRhKG5vZGUuaWQsIEpTT04uc3RyaW5naWZ5KGZyYW1lTm9kZURhdGEpKTtcclxuICAgIHJldHVybiBuZXdOb2RlTmFtZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEZyYW1lTm9kZVBsdWdpbkRhdGFGdW5jID0gKG5hbWUsIHBhcmFtKSA9PiB7XHJcbiAgICBjb25zdCBmcmFtZURhdGEgPSB7XHJcbiAgICAgICAgdGlja2V0TnVtYmVyOiBwYXJhbS5tZXNzYWdlLnRpY2tldE51bWJlciA/IHBhcmFtLm1lc3NhZ2UudGlja2V0TnVtYmVyIDogXCJcIixcclxuICAgICAgICBzdGF0dXM6IHBhcmFtLm1lc3NhZ2Uuc3RhdHVzID8gcGFyYW0ubWVzc2FnZS5zdGF0dXMgOiBudWxsLFxyXG4gICAgICAgIGZyYW1lTmFtZTogbmFtZVxyXG4gICAgfTtcclxuICAgIHJldHVybiBmcmFtZURhdGE7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRTdGF0dXNDb2xvckZ1bmMgPSAoc3RhdHVzVHlwZSkgPT4ge1xyXG4gICAgdmFyIGVtb2ppSGV4ID0gXCJcIjtcclxuICAgIHN3aXRjaCAoc3RhdHVzVHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJBY3RpdmVcIjpcclxuICAgICAgICAgICAgZW1vamlIZXggPSBcIlxcdUQ4M0RcXHVERDM1XCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcHByb3ZlZFwiOlxyXG4gICAgICAgICAgICBlbW9qaUhleCA9IFwiXFx1RDgzRFxcdURGRTJcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkluLWRldmVsb3BtZW50XCI6XHJcbiAgICAgICAgICAgIGVtb2ppSGV4ID0gXCJcXHVEODNEXFx1REZFM1wiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiSW4tcmV2aWV3XCI6XHJcbiAgICAgICAgICAgIGVtb2ppSGV4ID0gXCJcXHVEODNEXFx1REZFMVwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiTmVlZHMgY2hhbmdlc1wiOlxyXG4gICAgICAgICAgICBlbW9qaUhleCA9IFwiXFx1RDgzRFxcdUREMzRcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW1vamlIZXg7XHJcbn07XHJcbiIsImltcG9ydCB7IHNldEZyYW1lTm9kZU5hbWVGdW5jLCBzZXRGcmFtZU5vZGVQbHVnaW5EYXRhRnVuYywgdXBkYXRlRnJhbWVOb2RlTmFtZUZ1bmMgfSBmcm9tIFwiLi9Nb2R1bGVzL0ZpZ21hTW9kdWxlc1wiO1xyXG5jb25zdCBpRnJhbWVXaW5kb3dEaW1lbnNpb25zID0ge1xyXG4gICAgd2lkdGg6IDI4MCxcclxuICAgIGhlaWdodDogMzEwXHJcbn07XHJcbmNvbnN0IHNlbGVjdEZyYW1lQWxlcnQgPSBcIlNlbGVjdCBhIGZyYW1lIG9yIG11bHRpcGxlIGZyYW1lcyB0byBhcHBseSB0aGUgc3RhdHVzIHRvXCI7XHJcbmNvbnN0IHNlbGVjdFN0YXR1c0FsZXJ0ID0gXCJTZWxlY3QgYSBzdGF0dXMgdG8gYXBwbHkgdG8gc2VsZWN0ZWQgZnJhbWUocylcIjtcclxuY29uc3Qgc3RhdHVzU3VjY2Vzc05vdGlmaWNhdGlvbiA9IFwiU3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgc3RhdHVzIGZvciBzZWxlY3RlZCBmcmFtZShzKVwiO1xyXG5maWdtYS5zaG93VUkoX19odG1sX18sIGlGcmFtZVdpbmRvd0RpbWVuc2lvbnMpO1xyXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAocGFyYW0pID0+IHtcclxuICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID09IDApIHtcclxuICAgICAgICBhbGVydChzZWxlY3RGcmFtZUFsZXJ0KTtcclxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChwYXJhbS5tZXNzYWdlLnN0YXR1cyA9PSBudWxsKSB7XHJcbiAgICAgICAgYWxlcnQoc2VsZWN0U3RhdHVzQWxlcnQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChwYXJhbS50eXBlID09PSBcImFwcGx5X3N0YXR1c1wiKSB7XHJcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBub2RlUGx1Z2luRGF0YSA9IG5vZGUuZ2V0UGx1Z2luRGF0YShub2RlLmlkKTtcclxuICAgICAgICAgICAgaWYgKG5vZGVQbHVnaW5EYXRhLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBsdWdpbkRhdGEobm9kZS5pZCwgSlNPTi5zdHJpbmdpZnkoc2V0RnJhbWVOb2RlUGx1Z2luRGF0YUZ1bmMobm9kZS5uYW1lLCBwYXJhbSkpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUubmFtZSA9IHNldEZyYW1lTm9kZU5hbWVGdW5jKHBhcmFtKSArIFwiIFwiICsgbm9kZS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5uYW1lID0gdXBkYXRlRnJhbWVOb2RlTmFtZUZ1bmMobm9kZVBsdWdpbkRhdGEsIG5vZGUsIHBhcmFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KHN0YXR1c1N1Y2Nlc3NOb3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9