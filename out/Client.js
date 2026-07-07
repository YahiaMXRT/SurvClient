/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gui_based_mods/keystr.ts"
/*!**************************************!*\
  !*** ./src/gui_based_mods/keystr.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initKeystrokes = void 0;
var main_1 = __webpack_require__(/*! ../main */ "./src/main.ts");
var initKeystrokes = function () {
    var _a;
    if (main_1.toggles.keystrokes) {
        var keystrokes_1 = document.createElement("div");
        keystrokes_1.id = "keystrokes_";
        keystrokes_1.style.position = "absolute";
        keystrokes_1.style.top = "10px";
        keystrokes_1.style.display = "flex";
        keystrokes_1.style.flexDirection = "column";
        keystrokes_1.style.gap = "2px";
        keystrokes_1.style.justifyContent = "center";
        keystrokes_1.style.right = "10px";
        keystrokes_1.style.fontSize = "20px";
        keystrokes_1.style.color = "white";
        keystrokes_1.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        keystrokes_1.style.padding = "5px";
        keystrokes_1.style.borderRadius = "5px";
        document.body.appendChild(keystrokes_1);
        var keysPressed = { w: false, a: false, s: false, d: false };
        window.addEventListener("keydown", function (e) {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = true;
            }
            else {
                return;
            }
            keystrokes_1.innerHTML = "\n                <p style=\"display:block\">".concat(keysPressed.w ? "W" : "w", "</p></br>\n                <div style=\"display:flex;gap:10px;\">\n                    <p>A: ").concat(keysPressed.a ? "A" : "a", "</p></br>\n                    <p>S: ").concat(keysPressed.s ? "S" : "s", "</p></br>\n                    <p>D: ").concat(keysPressed.d ? "D" : "d", "</p></br>\n                </div>\n            ");
        });
        window.addEventListener("keyup", function (e) {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = false;
            }
            else {
                return;
            }
            keystrokes_1.innerHTML = "\n                <p style=\"display:block\">".concat(keysPressed.w ? "W" : "w", "</p></br>\n                <div style=\"display:flex;gap:10px;\">\n                    <p>A: ").concat(keysPressed.a ? "A" : "a", "</p></br>\n                    <p>S: ").concat(keysPressed.s ? "S" : "s", "</p></br>\n                    <p>D: ").concat(keysPressed.d ? "D" : "d", "</p></br>\n                </div>\n            ");
        });
    }
    else if (main_1.toggles.keystrokes === false) {
        if (document.getElementById("keystrokes_")) {
            (_a = document.getElementById("keystrokes_")) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else {
            0;
        }
    }
};
exports.initKeystrokes = initKeystrokes;


/***/ },

/***/ "./src/main.ts"
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toggles = void 0;
var keystr_1 = __webpack_require__(/*! ./gui_based_mods/keystr */ "./src/gui_based_mods/keystr.ts");
var m = ModAPI;
exports.toggles = {
    fullbright: false,
    keystrokes: false
};
var ev1 = [];
var lastLog = 0;
m.addEventListener("event", function (e) {
    var now = Date.now();
    if (now - lastLog >= 50000) { // 30 seconds
        lastLog = now;
        ev1.push({
            time: new Date().toLocaleTimeString(),
            event: e.event,
            data: e.data
        });
        if (ev1.length > 100) {
            ev1.shift();
        }
    }
});
var mcSettings = ModAPI.settings;
m.settings.gammaSetting = 1.0;
m.addEventListener("sendchatmessage", function (e) {
    if (!e.message.startsWith("!"))
        return;
    e.preventDefault = true;
    if (e.message === "!fb") {
        if (!exports.toggles.fullbright) {
            exports.toggles.fullbright = true;
            m.settings.gammaSetting = 1000.0;
            m.displayToChat("§a §lFullbright enabled");
        }
        else {
            exports.toggles.fullbright = false;
            m.settings.gammaSetting = 1.0;
            m.displayToChat("§c §lFullbright disabled");
        }
    }
    else if (e.message === "!help") {
        m.displayToChat(" §l help\n§3 !fb (FullBright)\n§2 !help (this text)\n§6 !keystrokes (self explanatory)\n§1 !mode (fps, fancy)\n§b !version (self explanatory)\n\n §l DEV TOOLS\n§8 !eval (run JS code)\n §7 !devlog (log of events)");
    }
    else if (e.message.startsWith("!mode")) {
        var args = {
            a1: e.message.split(" ")[0],
            a2: e.message.split(" ")[1]
        };
        if (args.a2 == "fps") {
            mcSettings.renderDistanceChunks = 1;
            mcSettings.fog = false;
            mcSettings.mipmapLevels = 0.0;
            mcSettings.clouds = 0.0;
            mcSettings.viewBobbing = false;
            mcSettings.fancyGraphics = false;
            mcSettings.chunkFix = true;
            mcSettings.enableVsync = false;
        }
        else if (args.a2 == "fancy") {
            mcSettings.renderDistanceChunks = 8;
            mcSettings.fog = true;
            mcSettings.mipmapLevels = 3.0;
            mcSettings.clouds = 100;
            mcSettings.viewBobbing = true;
            mcSettings.fancyGraphics = true;
            mcSettings.chunkFix = true;
            mcSettings.enableVsync = false;
        }
        else {
            m.displayToChat("No mode exists with name: " + args.a2);
        }
    }
    else if (e.message === "!version") {
        m.displayToChat("§9 Current Client Version: 0.0.1");
    }
    else if (e.message === "!devlog") {
        m.displayToChat("§d Log: \n" + ev1.map(function (i) { return "§e Event: " + i.event + "\n§d Data:" + JSON.stringify(i.data); }).join("\n"));
    }
    else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
        var code = e.message.split("!eval ")[1];
        m.displayToChat("§d Eval:\n§e " + eval(code));
    }
    else if (e.message === "!keystrokes") {
        if (exports.toggles.keystrokes == true) {
            exports.toggles.keystrokes = false;
        }
        else if (exports.toggles.keystrokes == false) {
            exports.toggles.keystrokes = true;
        }
        (0, keystr_1.initKeystrokes)();
    }
    else {
        m.displayToChat("§c Unknown Command:");
        m.displayToChat("§c" + e.message);
    }
});


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsYUFBYSxtQkFBTyxDQUFDLDhCQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZLQUE2SyxTQUFTO0FBQ3RMLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZLQUE2SyxTQUFTO0FBQ3RMLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUNuRFQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZTtBQUNmLGVBQWUsbUJBQU8sQ0FBQywrREFBeUI7QUFDaEQ7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCx3RUFBd0U7QUFDdEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O1VDbEdEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUU1QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li8uL3NyYy9ndWlfYmFzZWRfbW9kcy9rZXlzdHIudHMiLCJ3ZWJwYWNrOi8vU3VydkNsaWVudC4vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL1N1cnZDbGllbnQuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRLZXlzdHJva2VzID0gdm9pZCAwO1xudmFyIG1haW5fMSA9IHJlcXVpcmUoXCIuLi9tYWluXCIpO1xudmFyIGluaXRLZXlzdHJva2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAobWFpbl8xLnRvZ2dsZXMua2V5c3Ryb2tlcykge1xuICAgICAgICB2YXIga2V5c3Ryb2tlc18xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAga2V5c3Ryb2tlc18xLmlkID0gXCJrZXlzdHJva2VzX1wiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS50b3AgPSBcIjEwcHhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBcImNvbHVtblwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuZ2FwID0gXCIycHhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLnJpZ2h0ID0gXCIxMHB4XCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC41KVwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGtleXN0cm9rZXNfMSk7XG4gICAgICAgIHZhciBrZXlzUHJlc3NlZCA9IHsgdzogZmFsc2UsIGE6IGZhbHNlLCBzOiBmYWxzZSwgZDogZmFsc2UgfTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSBpbiBrZXlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGtleXNQcmVzc2VkW2Uua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXN0cm9rZXNfMS5pbm5lckhUTUwgPSBcIlxcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cXFwiZGlzcGxheTpibG9ja1xcXCI+XCIuY29uY2F0KGtleXNQcmVzc2VkLncgPyBcIldcIiA6IFwid1wiLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVxcXCJkaXNwbGF5OmZsZXg7Z2FwOjEwcHg7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxwPkE6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQuYSA/IFwiQVwiIDogXCJhXCIsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgICAgICAgICA8cD5TOiBcIikuY29uY2F0KGtleXNQcmVzc2VkLnMgPyBcIlNcIiA6IFwic1wiLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICAgICAgPHA+RDogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIiwgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgaW4ga2V5c1ByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBrZXlzUHJlc3NlZFtlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5c3Ryb2tlc18xLmlubmVySFRNTCA9IFwiXFxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVxcXCJkaXNwbGF5OmJsb2NrXFxcIj5cIi5jb25jYXQoa2V5c1ByZXNzZWQudyA/IFwiV1wiIDogXCJ3XCIsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XFxcImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHA+QTogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5hID8gXCJBXCIgOiBcImFcIiwgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgICAgIDxwPlM6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQucyA/IFwiU1wiIDogXCJzXCIsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgICAgICAgICA8cD5EOiBcIikuY29uY2F0KGtleXNQcmVzc2VkLmQgPyBcIkRcIiA6IFwiZFwiLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtYWluXzEudG9nZ2xlcy5rZXlzdHJva2VzID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKSkge1xuICAgICAgICAgICAgKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgMDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLmluaXRLZXlzdHJva2VzID0gaW5pdEtleXN0cm9rZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudG9nZ2xlcyA9IHZvaWQgMDtcbnZhciBrZXlzdHJfMSA9IHJlcXVpcmUoXCIuL2d1aV9iYXNlZF9tb2RzL2tleXN0clwiKTtcbnZhciBtID0gTW9kQVBJO1xuZXhwb3J0cy50b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlLFxuICAgIGtleXN0cm9rZXM6IGZhbHNlXG59O1xudmFyIGV2MSA9IFtdO1xudmFyIGxhc3RMb2cgPSAwO1xubS5hZGRFdmVudExpc3RlbmVyKFwiZXZlbnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAobm93IC0gbGFzdExvZyA+PSA1MDAwMCkgeyAvLyAzMCBzZWNvbmRzXG4gICAgICAgIGxhc3RMb2cgPSBub3c7XG4gICAgICAgIGV2MS5wdXNoKHtcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgICBldmVudDogZS5ldmVudCxcbiAgICAgICAgICAgIGRhdGE6IGUuZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIGV2MS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG52YXIgbWNTZXR0aW5ncyA9IE1vZEFQSS5zZXR0aW5ncztcbm0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wO1xubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpXG4gICAgICAgIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghZXhwb3J0cy50b2dnbGVzLmZ1bGxicmlnaHQpIHtcbiAgICAgICAgICAgIGV4cG9ydHMudG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wO1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdhIMKnbEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV4cG9ydHMudG9nZ2xlcy5mdWxsYnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMDtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnYyDCp2xGdWxsYnJpZ2h0IGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiDCp2wgaGVscFxcbsKnMyAhZmIgKEZ1bGxCcmlnaHQpXFxuwqcyICFoZWxwICh0aGlzIHRleHQpXFxuwqc2ICFrZXlzdHJva2VzIChzZWxmIGV4cGxhbmF0b3J5KVxcbsKnMSAhbW9kZSAoZnBzLCBmYW5jeSlcXG7Cp2IgIXZlcnNpb24gKHNlbGYgZXhwbGFuYXRvcnkpXFxuXFxuIMKnbCBERVYgVE9PTFNcXG7CpzggIWV2YWwgKHJ1biBKUyBjb2RlKVxcbiDCpzcgIWRldmxvZyAobG9nIG9mIGV2ZW50cylcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZS5zdGFydHNXaXRoKFwiIW1vZGVcIikpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSB7XG4gICAgICAgICAgICBhMTogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVswXSxcbiAgICAgICAgICAgIGEyOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzFdXG4gICAgICAgIH07XG4gICAgICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSAxO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMC4wO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAwLjA7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSBmYWxzZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuYTIgPT0gXCJmYW5jeVwiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gODtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gdHJ1ZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAxMDA7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWU7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIikge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCpzkgQ3VycmVudCBDbGllbnQgVmVyc2lvbjogMC4wLjFcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhZGV2bG9nXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdkIExvZzogXFxuXCIgKyBldjEubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiBcIsKnZSBFdmVudDogXCIgKyBpLmV2ZW50ICsgXCJcXG7Cp2QgRGF0YTpcIiArIEpTT04uc3RyaW5naWZ5KGkuZGF0YSk7IH0pLmpvaW4oXCJcXG5cIikpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2VbMV0gPT09IFwiZVwiICYmIGUubWVzc2FnZSA9PT0gXCJ2XCIgJiYgZS5tZXNzYWdlWzFdID09PSBcImFcIiAmJiBlLm1lc3NhZ2UgPT09IFwibFwiKSB7XG4gICAgICAgIHZhciBjb2RlID0gZS5tZXNzYWdlLnNwbGl0KFwiIWV2YWwgXCIpWzFdO1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2QgRXZhbDpcXG7Cp2UgXCIgKyBldmFsKGNvZGUpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFrZXlzdHJva2VzXCIpIHtcbiAgICAgICAgaWYgKGV4cG9ydHMudG9nZ2xlcy5rZXlzdHJva2VzID09IHRydWUpIHtcbiAgICAgICAgICAgIGV4cG9ydHMudG9nZ2xlcy5rZXlzdHJva2VzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXhwb3J0cy50b2dnbGVzLmtleXN0cm9rZXMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV4cG9ydHMudG9nZ2xlcy5rZXlzdHJva2VzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAoMCwga2V5c3RyXzEuaW5pdEtleXN0cm9rZXMpKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2MgVW5rbm93biBDb21tYW5kOlwiKTtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdjXCIgKyBlLm1lc3NhZ2UpO1xuICAgIH1cbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5sZXQgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9