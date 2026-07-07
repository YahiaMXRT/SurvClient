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
        keystrokes_1.style.bottom = "10px";
        keystrokes_1.style.display = "flex";
        keystrokes_1.style.gap = "10px";
        keystrokes_1.style.left = "10px";
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
            keystrokes_1.innerHTML = "\n                <p>W: ".concat(keysPressed.w, "</p></br>\n                <p>A: ").concat(keysPressed.a, "</p></br>\n                <p>S: ").concat(keysPressed.s, "</p></br>\n                <p>D: ").concat(keysPressed.d, "</p></br>\n            ");
        });
        window.addEventListener("keyup", function (e) {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = false;
            }
            else {
                return;
            }
            keystrokes_1.innerHTML = "\n                <p>W: ".concat(keysPressed.w, "</p></br>\n                <p>A: ").concat(keysPressed.a, "</p></br>\n                <p>S: ").concat(keysPressed.s, "</p></br>\n                <p>D: ").concat(keysPressed.d, "</p></br>\n            ");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsYUFBYSxtQkFBTyxDQUFDLDhCQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUNqRFQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZTtBQUNmLGVBQWUsbUJBQU8sQ0FBQywrREFBeUI7QUFDaEQ7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCx3RUFBd0U7QUFDdEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBCQUEwQjtBQUN0QztBQUNBO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O1VDbEdEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUU1QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li8uL3NyYy9ndWlfYmFzZWRfbW9kcy9rZXlzdHIudHMiLCJ3ZWJwYWNrOi8vU3VydkNsaWVudC4vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL1N1cnZDbGllbnQuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9TdXJ2Q2xpZW50Li93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRLZXlzdHJva2VzID0gdm9pZCAwO1xudmFyIG1haW5fMSA9IHJlcXVpcmUoXCIuLi9tYWluXCIpO1xudmFyIGluaXRLZXlzdHJva2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAobWFpbl8xLnRvZ2dsZXMua2V5c3Ryb2tlcykge1xuICAgICAgICB2YXIga2V5c3Ryb2tlc18xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAga2V5c3Ryb2tlc18xLmlkID0gXCJrZXlzdHJva2VzX1wiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIGtleXN0cm9rZXNfMS5zdHlsZS5ib3R0b20gPSBcIjEwcHhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmdhcCA9IFwiMTBweFwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUubGVmdCA9IFwiMTBweFwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcbiAgICAgICAga2V5c3Ryb2tlc18xLnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBrZXlzdHJva2VzXzEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChrZXlzdHJva2VzXzEpO1xuICAgICAgICB2YXIga2V5c1ByZXNzZWQgPSB7IHc6IGZhbHNlLCBhOiBmYWxzZSwgczogZmFsc2UsIGQ6IGZhbHNlIH07XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgaW4ga2V5c1ByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBrZXlzUHJlc3NlZFtlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzdHJva2VzXzEuaW5uZXJIVE1MID0gXCJcXG4gICAgICAgICAgICAgICAgPHA+VzogXCIuY29uY2F0KGtleXNQcmVzc2VkLncsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgICAgIDxwPkE6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQuYSwgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgPHA+UzogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5zLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICA8cD5EOiBcIikuY29uY2F0KGtleXNQcmVzc2VkLmQsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgaW4ga2V5c1ByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBrZXlzUHJlc3NlZFtlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5c3Ryb2tlc18xLmlubmVySFRNTCA9IFwiXFxuICAgICAgICAgICAgICAgIDxwPlc6IFwiLmNvbmNhdChrZXlzUHJlc3NlZC53LCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgICAgICA8cD5BOiBcIikuY29uY2F0KGtleXNQcmVzc2VkLmEsIFwiPC9wPjwvYnI+XFxuICAgICAgICAgICAgICAgIDxwPlM6IFwiKS5jb25jYXQoa2V5c1ByZXNzZWQucywgXCI8L3A+PC9icj5cXG4gICAgICAgICAgICAgICAgPHA+RDogXCIpLmNvbmNhdChrZXlzUHJlc3NlZC5kLCBcIjwvcD48L2JyPlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1haW5fMS50b2dnbGVzLmtleXN0cm9rZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpKSB7XG4gICAgICAgICAgICAoX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAwO1xuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydHMuaW5pdEtleXN0cm9rZXMgPSBpbml0S2V5c3Ryb2tlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50b2dnbGVzID0gdm9pZCAwO1xudmFyIGtleXN0cl8xID0gcmVxdWlyZShcIi4vZ3VpX2Jhc2VkX21vZHMva2V5c3RyXCIpO1xudmFyIG0gPSBNb2RBUEk7XG5leHBvcnRzLnRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2UsXG4gICAga2V5c3Ryb2tlczogZmFsc2Vcbn07XG52YXIgZXYxID0gW107XG52YXIgbGFzdExvZyA9IDA7XG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJldmVudFwiLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgIGlmIChub3cgLSBsYXN0TG9nID49IDUwMDAwKSB7IC8vIDMwIHNlY29uZHNcbiAgICAgICAgbGFzdExvZyA9IG5vdztcbiAgICAgICAgZXYxLnB1c2goe1xuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgICAgIGV2ZW50OiBlLmV2ZW50LFxuICAgICAgICAgICAgZGF0YTogZS5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXYxLmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgZXYxLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbnZhciBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzO1xubS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjA7XG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuICAgIGlmIChlLm1lc3NhZ2UgPT09IFwiIWZiXCIpIHtcbiAgICAgICAgaWYgKCFleHBvcnRzLnRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgICAgICAgZXhwb3J0cy50b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjA7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2EgwqdsRnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0cy50b2dnbGVzLmZ1bGxicmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wO1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdjIMKnbEZ1bGxicmlnaHQgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiIMKnbCBoZWxwXFxuwqczICFmYiAoRnVsbEJyaWdodClcXG7CpzIgIWhlbHAgKHRoaXMgdGV4dClcXG7CpzYgIWtleXN0cm9rZXMgKHNlbGYgZXhwbGFuYXRvcnkpXFxuwqcxICFtb2RlIChmcHMsIGZhbmN5KVxcbsKnYiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcXG5cXG4gwqdsIERFViBUT09MU1xcbsKnOCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIMKnNyAhZGV2bG9nIChsb2cgb2YgZXZlbnRzKVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFyZ3MuYTIgPT0gXCJmcHNcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDE7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IGZhbHNlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjA7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDAuMDtcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWU7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4O1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjA7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMDtcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhdmVyc2lvblwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnOSBDdXJyZW50IENsaWVudCBWZXJzaW9uOiAwLjAuMVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFkZXZsb2dcIikge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2QgTG9nOiBcXG5cIiArIGV2MS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIFwiwqdlIEV2ZW50OiBcIiArIGkuZXZlbnQgKyBcIlxcbsKnZCBEYXRhOlwiICsgSlNPTi5zdHJpbmdpZnkoaS5kYXRhKTsgfSkuam9pbihcIlxcblwiKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiYgZS5tZXNzYWdlID09PSBcInZcIiAmJiBlLm1lc3NhZ2VbMV0gPT09IFwiYVwiICYmIGUubWVzc2FnZSA9PT0gXCJsXCIpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnZCBFdmFsOlxcbsKnZSBcIiArIGV2YWwoY29kZSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWtleXN0cm9rZXNcIikge1xuICAgICAgICBpZiAoZXhwb3J0cy50b2dnbGVzLmtleXN0cm9rZXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXhwb3J0cy50b2dnbGVzLmtleXN0cm9rZXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChleHBvcnRzLnRvZ2dsZXMua2V5c3Ryb2tlcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgZXhwb3J0cy50b2dnbGVzLmtleXN0cm9rZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICgwLCBrZXlzdHJfMS5pbml0S2V5c3Ryb2tlcykoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnYyBVbmtub3duIENvbW1hbmQ6XCIpO1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2NcIiArIGUubWVzc2FnZSk7XG4gICAgfVxufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbmxldCBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=