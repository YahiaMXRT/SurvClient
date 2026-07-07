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
            keystrokes_1.innerHTML = "\n                <p style=\"display:block\">W: ".concat(keysPressed.w, "</p></br>\n                <div style=\"display:flex;gap:10px;\">\n                    <p>A: ").concat(keysPressed.a, "</p></br>\n                    <p>S: ").concat(keysPressed.s, "</p></br>\n                    <p>D: ").concat(keysPressed.d, "</p></br>\n                </div>\n            ");
        });
        window.addEventListener("keyup", function (e) {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = false;
            }
            else {
                return;
            }
            keystrokes_1.innerHTML = "\n                <p style=\"display:block\">W: ".concat(keysPressed.w, "</p></br>\n                <div style=\"display:flex;gap:10px;\">\n                    <p>A: ").concat(keysPressed.a, "</p></br>\n                    <p>S: ").concat(keysPressed.s, "</p></br>\n                    <p>D: ").concat(keysPressed.d, "</p></br>\n                </div>\n            ");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsYUFBYSxtQkFBTyxDQUFDLDhCQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9LQUFvSyxTQUFTO0FBQzdLLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9LQUFvSyxTQUFTO0FBQzdLLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUNuRFQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZTtBQUNmLGVBQWUsbUJBQU8sQ0FBQywrREFBeUI7QUFDaEQ7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCx3RUFBd0U7QUFDdEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O1VDbEdEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUU1QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li8uL3NyYy9ndWlfYmFzZWRfbW9kcy9rZXlzdHIudHMiLCJ3ZWJwYWNrOi8vU3VydkNsaWVudC4vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL1N1cnZDbGllbnQuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRLZXlzdHJva2VzID0gdm9pZCAwO1xudmFyIG1haW5fMSA9IHJlcXVpcmUoXCIuLi9tYWluXCIpO1xudmFyIGluaXRLZXlzdHJva2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAobWFpbl8xLnRvZ2dsZXMua2V5c3Ryb2tlcykge1xuICAgICAgICB2YXIga2V5c3Ryb2tlc18xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAga2V5c3Ryb2tlc18xLmlkID0gXCJrZXlzdHJva2VzX1wiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS50b3AgPSBcIjEwcHhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBcImNvbHVtblwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuZ2FwID0gXCIycHhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLnJpZ2h0ID0gXCIxMHB4XCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC41KVwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGtleXN0cm9rZXNfMSk7XG4gICAgICAgIHZhciBrZXlzUHJlc3NlZCA9IHsgdzogZmFsc2UsIGE6IGZhbHNlLCBzOiBmYWxzZSwgZDogZmFsc2UgfTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSBpbiBrZXlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGtleXNQcmVzc2VkW2Uua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXN0cm9rZXNfMS5pbm5lckhUTUwgPSBcIlxcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cXFwiZGlzcGxheTpibG9ja1xcXCI+VzogXCIuY29uY2F0KGtleXNQcmVzc2VkLncsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XFxcImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHA+QTogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5hLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICAgICAgPHA+UzogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5zLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICAgICAgPHA+RDogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5kLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcIik7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSBpbiBrZXlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGtleXNQcmVzc2VkW2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzdHJva2VzXzEuaW5uZXJIVE1MID0gXCJcXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9XFxcImRpc3BsYXk6YmxvY2tcXFwiPlc6IFwiLmNvbmNhdChrZXlzUHJlc3NlZC53LCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVxcXCJkaXNwbGF5OmZsZXg7Z2FwOjEwcHg7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxwPkE6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQuYSwgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgICAgIDxwPlM6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQucywgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgICAgIDxwPkQ6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQuZCwgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWFpbl8xLnRvZ2dsZXMua2V5c3Ryb2tlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2V5c3Ryb2tlc19cIikpIHtcbiAgICAgICAgICAgIChfYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2V5c3Ryb2tlc19cIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIDA7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5pbml0S2V5c3Ryb2tlcyA9IGluaXRLZXlzdHJva2VzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRvZ2dsZXMgPSB2b2lkIDA7XG52YXIga2V5c3RyXzEgPSByZXF1aXJlKFwiLi9ndWlfYmFzZWRfbW9kcy9rZXlzdHJcIik7XG52YXIgbSA9IE1vZEFQSTtcbmV4cG9ydHMudG9nZ2xlcyA9IHtcbiAgICBmdWxsYnJpZ2h0OiBmYWxzZSxcbiAgICBrZXlzdHJva2VzOiBmYWxzZVxufTtcbnZhciBldjEgPSBbXTtcbnZhciBsYXN0TG9nID0gMDtcbm0uYWRkRXZlbnRMaXN0ZW5lcihcImV2ZW50XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKG5vdyAtIGxhc3RMb2cgPj0gNTAwMDApIHsgLy8gMzAgc2Vjb25kc1xuICAgICAgICBsYXN0TG9nID0gbm93O1xuICAgICAgICBldjEucHVzaCh7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgICAgZXZlbnQ6IGUuZXZlbnQsXG4gICAgICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChldjEubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgICAgICBldjEuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xudmFyIG1jU2V0dGluZ3MgPSBNb2RBUEkuc2V0dGluZ3M7XG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMDtcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhXCIpKVxuICAgICAgICByZXR1cm47XG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgICAgICBpZiAoIWV4cG9ydHMudG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICBleHBvcnRzLnRvZ2dsZXMuZnVsbGJyaWdodCA9IHRydWU7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEwMDAuMDtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnYSDCp2xGdWxsYnJpZ2h0IGVuYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleHBvcnRzLnRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjA7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2MgwqdsRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWhlbHBcIikge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCIgwqdsIGhlbHBcXG7CpzMgIWZiIChGdWxsQnJpZ2h0KVxcbsKnMiAhaGVscCAodGhpcyB0ZXh0KVxcbsKnNiAha2V5c3Ryb2tlcyAoc2VsZiBleHBsYW5hdG9yeSlcXG7CpzEgIW1vZGUgKGZwcywgZmFuY3kpXFxuwqdiICF2ZXJzaW9uIChzZWxmIGV4cGxhbmF0b3J5KVxcblxcbiDCp2wgREVWIFRPT0xTXFxuwqc4ICFldmFsIChydW4gSlMgY29kZSlcXG4gwqc3ICFkZXZsb2cgKGxvZyBvZiBldmVudHMpXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFtb2RlXCIpKSB7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICAgICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXVxuICAgICAgICB9O1xuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gZmFsc2U7XG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDAuMDtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gZmFsc2U7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmEyID09IFwiZmFuY3lcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDg7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWU7XG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDMuMDtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMTAwO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWU7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWU7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJObyBtb2RlIGV4aXN0cyB3aXRoIG5hbWU6IFwiICsgYXJncy5hMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiF2ZXJzaW9uXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqc5IEN1cnJlbnQgQ2xpZW50IFZlcnNpb246IDAuMC4xXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnZCBMb2c6IFxcblwiICsgZXYxLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gXCLCp2UgRXZlbnQ6IFwiICsgaS5ldmVudCArIFwiXFxuwqdkIERhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShpLmRhdGEpOyB9KS5qb2luKFwiXFxuXCIpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlWzFdID09PSBcImVcIiAmJiBlLm1lc3NhZ2UgPT09IFwidlwiICYmIGUubWVzc2FnZVsxXSA9PT0gXCJhXCIgJiYgZS5tZXNzYWdlID09PSBcImxcIikge1xuICAgICAgICB2YXIgY29kZSA9IGUubWVzc2FnZS5zcGxpdChcIiFldmFsIFwiKVsxXTtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdkIEV2YWw6XFxuwqdlIFwiICsgZXZhbChjb2RlKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIha2V5c3Ryb2tlc1wiKSB7XG4gICAgICAgIGlmIChleHBvcnRzLnRvZ2dsZXMua2V5c3Ryb2tlcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICBleHBvcnRzLnRvZ2dsZXMua2V5c3Ryb2tlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4cG9ydHMudG9nZ2xlcy5rZXlzdHJva2VzID09IGZhbHNlKSB7XG4gICAgICAgICAgICBleHBvcnRzLnRvZ2dsZXMua2V5c3Ryb2tlcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgKDAsIGtleXN0cl8xLmluaXRLZXlzdHJva2VzKSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdjIFVua25vd24gQ29tbWFuZDpcIik7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnY1wiICsgZS5tZXNzYWdlKTtcbiAgICB9XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxubGV0IF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==