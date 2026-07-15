(() => {
  // src/gui_based_mods/handler/handler.ts
  var keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    lmb: false,
    rmb: false
  };
  var handleRender = () => {
    keystrokesRndr.innerHTML = `
  <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ""}>${keysPressed.w ? "W" : "w"}</p></br>
    <div style="display:flex;gap:10px;">
      <p ${keysPressed.a ? 'class="lighter"' : ""}>${keysPressed.a ? "A" : "a"}</p></br>                      
      <p ${keysPressed.s ? 'class="lighter"' : ""}>${keysPressed.s ? "S" : "s"}</p></br>
      <p ${keysPressed.d ? 'class="lighter"' : ""}>${keysPressed.d ? "D" : "d"}</p></br>                  
    </div>
    <div>
      <p class="space${keysPressed.space ? " lighter" : ""}"></p>
    </div>       
    <div style="display:flex;gap:10px;">
      <p ${keysPressed.lmb ? 'class="lighter"' : ""}>${keysPressed.lmb ? "LMB" : "lmb"}</p></br>
      <p ${keysPressed.rmb ? 'class="lighter"' : ""}>${keysPressed.rmb ? "RMB" : "rmb"}</p></br>                     
    </div>  
  `;
  };
  var handlers = {
    mouseUp: (e2) => {
      if (e2.button === 0) {
        keysPressed.lmb = false;
      } else if (e2.button === 2) {
        keysPressed.rmb = false;
      }
      handleRender();
    },
    mouseDown: (e2) => {
      if (e2.button === 0) {
        keysPressed.lmb = true;
      } else if (e2.button === 2) {
        keysPressed.rmb = true;
      }
      handleRender();
    },
    keyUp: (e2) => {
      const k = e2.key.toLowerCase();
      if (!(k in keysPressed || k == " ")) return;
      if (k == " ") {
        keysPressed.space = false;
        handleRender();
      } else {
        keysPressed[k] = false;
        handleRender();
      }
    },
    keyDown: (e2) => {
      const k = e2.key.toLowerCase();
      if (!(k in keysPressed || k == " ")) return;
      if (k == " ") {
        keysPressed.space = true;
        handleRender();
      } else {
        keysPressed[k] = true;
        handleRender();
      }
    }
  };

  // src/gui_based_mods/keystr.ts
  var keystrokesRndr;
  var initkeystrokesCSS = () => {
  };
  var initKeystrokes = () => {
    const existing = document.getElementById("keystrokes_");
    if (toggles.keystrokes) {
      const keystrokes = existing ?? document.createElement("div");
      keystrokes.id = "keystrokes_";
      if (!existing) document.body.appendChild(keystrokes);
      keystrokesRndr = keystrokes;
      if (!existing) {
        window.addEventListener("keydown", handlers.keyDown);
        window.addEventListener("keyup", handlers.keyUp);
        document.addEventListener("mousedown", handlers.mouseDown);
        document.addEventListener("mouseup", handlers.mouseUp);
      }
    } else {
      const el = document.getElementById("keystrokes_");
      window.removeEventListener("keydown", handlers.keyDown);
      window.removeEventListener("keyup", handlers.keyUp);
      window.removeEventListener("mousedown", handlers.mouseDown);
      window.removeEventListener("mouseup", handlers.mouseUp);
      if (el) el.remove();
    }
  };

  // src/gui_based_mods/fpsmod.ts
  var fpsElement = null;
  var updateHandler = null;
  var Interval = null;
  var renderFps = () => {
    if (!fpsElement) return;
    const fps = typeof ModAPI.getFPS === "function" ? ModAPI.getFPS() : 0;
    fpsElement.innerHTML = `<span class="fpsm-inner">${fps}</span>`;
  };
  var initFpsMod = () => {
    if (!document.body) return;
    if (toggles.fpsMod) {
      if (!fpsElement) {
        fpsElement = document.createElement("div");
        fpsElement.id = "fpsm_";
        document.body.appendChild(fpsElement);
      }
      if (!updateHandler) {
        updateHandler = () => renderFps();
        Interval = setInterval(updateHandler, 30);
      }
      renderFps();
    } else {
      if (updateHandler) {
        if (Interval) {
          clearInterval(Interval);
        }
      }
      if (fpsElement && fpsElement.isConnected) {
        fpsElement.remove();
      }
      fpsElement = null;
      updateHandler = null;
    }
  };

  // src/main.ts
  initkeystrokesCSS();
  var m = ModAPI;
  var toggles = {
    fullbright: false,
    keystrokes: false,
    fpsMod: false
  };
  var ev1 = [];
  var lastLog = 0;
  m.addEventListener("event", (e2) => {
    const now = Date.now();
    if (now - lastLog >= 5e4) {
      lastLog = now;
      ev1.push({
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        event: e2.event,
        data: e2.data
      });
      if (ev1.length > 100) {
        ev1.shift();
      }
    }
  });
  var mcSettings = ModAPI.settings;
  m.settings.gammaSetting = 1;
  m.addEventListener("sendchatmessage", (e) => {
    if (!e.message.startsWith("!")) return;
    e.preventDefault = true;
    if (e.message === "!fb") {
      if (!toggles.fullbright) {
        toggles.fullbright = true;
        m.settings.gammaSetting = 1e3;
        m.displayToChat("\xA7a \xA7lFullbright enabled");
      } else {
        toggles.fullbright = false;
        m.settings.gammaSetting = 1;
        m.displayToChat("\xA7c \xA7lFullbright disabled");
      }
    } else if (e.message === "!help") {
      m.displayToChat(
        " \xA7l help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA76 !keystrokes (self explanatory)\n\xA71 !mode (fps, fancy)\n\xA7b !version (self explanatory)\n\n \xA7l DEV TOOLS\n\xA78 !eval (run JS code)\n \xA77 !devlog (log of events)"
      );
    } else if (e.message.startsWith("!mode")) {
      var args = {
        a1: e.message.split(" ")[0],
        a2: e.message.split(" ")[1]
      };
      if (args.a2 == "fps") {
        mcSettings.renderDistanceChunks = 1;
        mcSettings.fog = false;
        mcSettings.mipmapLevels = 0;
        mcSettings.clouds = 0;
        mcSettings.viewBobbing = false;
        mcSettings.fancyGraphics = false;
        mcSettings.chunkFix = true;
        mcSettings.enableVsync = false;
      } else if (args.a2 == "fancy") {
        mcSettings.renderDistanceChunks = 8;
        mcSettings.fog = true;
        mcSettings.mipmapLevels = 3;
        mcSettings.clouds = 100;
        mcSettings.viewBobbing = true;
        mcSettings.fancyGraphics = true;
        mcSettings.chunkFix = true;
        mcSettings.enableVsync = false;
      } else {
        m.displayToChat("No mode exists with name: " + args.a2);
      }
    } else if (e.message === "!version") {
      m.displayToChat("\xA79 Current Client Version: 0.0.1");
    } else if (e.message === "!devlog") {
      m.displayToChat(
        "\xA7d Log: \n" + ev1.map(
          (i) => "\xA7e Event: " + i.event + "\n\xA7d Data:" + JSON.stringify(i.data)
        ).join("\n")
      );
    } else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
      var code = e.message.split("!eval ")[1];
      m.displayToChat("\xA7d Eval:\n\xA7e " + eval(code));
    } else if (e.message === "!keystrokes") {
      if (toggles.keystrokes == true) {
        toggles.keystrokes = false;
        m.displayToChat("\xA7c \xA7lKeystrokes disabled");
      } else if (toggles.keystrokes == false) {
        toggles.keystrokes = true;
        m.displayToChat("\xA7a \xA7lKeystrokes enabled");
      }
      initKeystrokes();
    } else if (e.message == "!fps") {
      if (toggles.fpsMod == true) {
        toggles.fpsMod = false;
        m.displayToChat("\xA7c \xA7lFPS mod disabled");
      } else if (toggles.fpsMod == false) {
        toggles.fpsMod = true;
        m.displayToChat("\xA7a \xA7lFPS mod enabled");
      }
      initFpsMod();
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2hhbmRsZXIvaGFuZGxlci50cyIsICIuLi9zcmMvZ3VpX2Jhc2VkX21vZHMva2V5c3RyLnRzIiwgIi4uL3NyYy9ndWlfYmFzZWRfbW9kcy9mcHNtb2QudHMiLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGtleXN0cm9rZXNSbmRyIH0gZnJvbSBcIi4uL2tleXN0clwiO1xuZXhwb3J0IHZhciBrZXlzUHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7XG4gIHc6IGZhbHNlLFxuICBhOiBmYWxzZSxcbiAgczogZmFsc2UsXG4gIGQ6IGZhbHNlLFxuICBzcGFjZTogZmFsc2UsXG4gIGxtYjogZmFsc2UsXG4gIHJtYjogZmFsc2UsXG59O1xuXG5leHBvcnQgdmFyIGhhbmRsZVJlbmRlciA9ICgpID0+IHtcbiAga2V5c3Ryb2tlc1JuZHIuaW5uZXJIVE1MID0gYFxuICA8cCBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiAke2tleXNQcmVzc2VkLncgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogXCJcIn0+JHtrZXlzUHJlc3NlZC53ID8gXCJXXCIgOiBcIndcIn08L3A+PC9icj5cbiAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgPHAgJHtrZXlzUHJlc3NlZC5hID8gJ2NsYXNzPVwibGlnaHRlclwiJyA6IFwiXCJ9PiR7a2V5c1ByZXNzZWQuYSA/IFwiQVwiIDogXCJhXCJ9PC9wPjwvYnI+ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgPHAgJHtrZXlzUHJlc3NlZC5zID8gJ2NsYXNzPVwibGlnaHRlclwiJyA6IFwiXCJ9PiR7a2V5c1ByZXNzZWQucyA/IFwiU1wiIDogXCJzXCJ9PC9wPjwvYnI+XG4gICAgICA8cCAke2tleXNQcmVzc2VkLmQgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogXCJcIn0+JHtrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIn08L3A+PC9icj4gICAgICAgICAgICAgICAgICBcbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHAgY2xhc3M9XCJzcGFjZSR7a2V5c1ByZXNzZWQuc3BhY2UgPyAnIGxpZ2h0ZXInIDogXCJcIn1cIj48L3A+XG4gICAgPC9kaXY+ICAgICAgIFxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmZsZXg7Z2FwOjEwcHg7XCI+XG4gICAgICA8cCAke2tleXNQcmVzc2VkLmxtYiA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiBcIlwifT4ke2tleXNQcmVzc2VkLmxtYiA/IFwiTE1CXCIgOiBcImxtYlwifTwvcD48L2JyPlxuICAgICAgPHAgJHtrZXlzUHJlc3NlZC5ybWIgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogXCJcIn0+JHtrZXlzUHJlc3NlZC5ybWIgPyBcIlJNQlwiIDogXCJybWJcIn08L3A+PC9icj4gICAgICAgICAgICAgICAgICAgICBcbiAgICA8L2Rpdj4gIFxuICBgO1xufTtcbmV4cG9ydCB2YXIgaGFuZGxlcnMgPSB7XG4gIG1vdXNlVXA6IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKGUuYnV0dG9uID09PSAwKSB7XG4gICAgICBrZXlzUHJlc3NlZC5sbWIgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUuYnV0dG9uID09PSAyKSB7XG4gICAgICBrZXlzUHJlc3NlZC5ybWIgPSBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlUmVuZGVyKCk7XG4gIH0sXG4gIG1vdXNlRG93bjogKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoZS5idXR0b24gPT09IDApIHtcbiAgICAgIGtleXNQcmVzc2VkLmxtYiA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlLmJ1dHRvbiA9PT0gMikge1xuICAgICAga2V5c1ByZXNzZWQucm1iID0gdHJ1ZTtcbiAgICB9XG4gICAgaGFuZGxlUmVuZGVyKCk7XG4gIH0sXG4gIGtleVVwOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGNvbnN0IGsgPSBlLmtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghKGsgaW4ga2V5c1ByZXNzZWQgfHwgayA9PSBcIiBcIikpIHJldHVybjtcbiAgICBpZiAoayA9PSBcIiBcIikge1xuICAgICAga2V5c1ByZXNzZWQuc3BhY2UgPSBmYWxzZTtcbiAgICAgIGhhbmRsZVJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzUHJlc3NlZFtrXSA9IGZhbHNlO1xuICAgICAgaGFuZGxlUmVuZGVyKCk7XG4gICAgfVxuICB9LFxuICBrZXlEb3duOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGNvbnN0IGsgPSBlLmtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghKGsgaW4ga2V5c1ByZXNzZWQgfHwgayA9PSBcIiBcIikpIHJldHVybjtcblxuICAgIGlmIChrID09IFwiIFwiKSB7XG4gICAgICBrZXlzUHJlc3NlZC5zcGFjZSA9IHRydWU7XG4gICAgICBoYW5kbGVSZW5kZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5c1ByZXNzZWRba10gPSB0cnVlO1xuICAgICAgaGFuZGxlUmVuZGVyKCk7XG4gICAgfVxuICB9LFxufTtcbiIsICJpbXBvcnQgeyB0b2dnbGVzIH0gZnJvbSBcIi4uL21haW5cIjtcbmltcG9ydCB7IFxuICAgIGtleXNQcmVzc2VkLCBcbiAgICBoYW5kbGVSZW5kZXIsIFxuICAgIGhhbmRsZXJzXG59IGZyb20gXCIuL2hhbmRsZXIvaGFuZGxlclwiO1xuLy8gQHRzLWlnbm9yZTogc2lkZS1lZmZlY3QgaW1wb3J0IHNvIHdlYnBhY2sgY2FuIGJ1bmRsZSBhbmQgaW5qZWN0IENTU1xuaW1wb3J0IFwiLi9rZXlzdHJva2VzQ1NTLmNzc1wiO1xuZXhwb3J0IHZhciBrZXlzdHJva2VzUm5kcjogSFRNTEVsZW1lbnQ7XG5leHBvcnQgdmFyIGluaXRrZXlzdHJva2VzQ1NTID0gKCkgPT4ge1xuICAvLyBDU1MgaXMgaW1wb3J0ZWQgYXQgbW9kdWxlIGxvYWQ7IHdpdGggc3R5bGUtbG9hZGVyIGl0IHdpbGwgYmUgaW5qZWN0ZWQgYXV0b21hdGljYWxseS5cbn07XG5cbmV4cG9ydCB2YXIgaW5pdEtleXN0cm9rZXMgPSAoKSA9PiB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gIGlmICh0b2dnbGVzLmtleXN0cm9rZXMpIHtcbiAgICBjb25zdCBrZXlzdHJva2VzID0gZXhpc3RpbmcgPz8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgICAgXG4gICAga2V5c3Ryb2tlcy5pZCA9IFwia2V5c3Ryb2tlc19cIjtcbiAgICBpZiAoIWV4aXN0aW5nKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGtleXN0cm9rZXMpO1xuICAgIGtleXN0cm9rZXNSbmRyID0ga2V5c3Ryb2tlc1xuICAgIC8vIE9ubHkgYXR0YWNoIGxpc3RlbmVycyBvbmNlIHdoZW4gY3JlYXRpbmcgdGhlIGVsZW1lbnRcbiAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlcnMua2V5RG93bik7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgaGFuZGxlcnMua2V5VXApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVycy5tb3VzZURvd24pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlcnMubW91c2VVcCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlcnMua2V5RG93bilcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZXJzLmtleVVwKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXJzLm1vdXNlRG93bilcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlcnMubW91c2VVcClcbiAgICBpZiAoZWwpIGVsLnJlbW92ZSgpO1xuICB9XG59O1xuIiwgImltcG9ydCB7dG9nZ2xlc30gZnJvbSBcIi4uL21haW5cIlxuLy8gQHRzLWlnbm9yZTogc2lkZS1lZmZlY3QgaW1wb3J0IHNvIHdlYnBhY2sgY2FuIGJ1bmRsZSBhbmQgaW5qZWN0IENTU1xuaW1wb3J0ICcuL2Zwc21vZENTUy5jc3MnXG5cbmxldCBmcHNFbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xubGV0IHVwZGF0ZUhhbmRsZXI6ICgoZT86IGFueSkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbmxldCBJbnRlcnZhbDogYW55ID0gbnVsbDtcblxuY29uc3QgcmVuZGVyRnBzID0gKCkgPT4ge1xuICAgIGlmICghZnBzRWxlbWVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGZwcyA9IHR5cGVvZiBNb2RBUEkuZ2V0RlBTID09PSBcImZ1bmN0aW9uXCIgPyBNb2RBUEkuZ2V0RlBTKCkgOiAwO1xuICAgIGZwc0VsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZnBzbS1pbm5lclwiPiR7ZnBzfTwvc3Bhbj5gO1xufVxuXG5leHBvcnQgdmFyIGluaXRGcHNNb2QgPSAoKSA9PiB7XG4gICAgaWYgKCFkb2N1bWVudC5ib2R5KSByZXR1cm47XG5cbiAgICBpZiAodG9nZ2xlcy5mcHNNb2QpIHtcbiAgICAgICAgaWYgKCFmcHNFbGVtZW50KSB7XG4gICAgICAgICAgICBmcHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmcHNFbGVtZW50LmlkID0gXCJmcHNtX1wiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcHNFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXBkYXRlSGFuZGxlcikge1xuICAgICAgICAgICAgdXBkYXRlSGFuZGxlciA9ICgpID0+IHJlbmRlckZwcygpO1xuICAgICAgICAgICAgSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGVIYW5kbGVyLDMwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlckZwcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyKSB7XG4gICAgICAgICAgICBpZiAoSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKEludGVydmFsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZwc0VsZW1lbnQgJiYgZnBzRWxlbWVudC5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgZnBzRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZwc0VsZW1lbnQgPSBudWxsO1xuICAgICAgICB1cGRhdGVIYW5kbGVyID0gbnVsbDtcbiAgICB9XG59IiwgImltcG9ydCB7IGluaXRLZXlzdHJva2VzLCBpbml0a2V5c3Ryb2tlc0NTUyB9IGZyb20gXCIuL2d1aV9iYXNlZF9tb2RzL2tleXN0clwiO1xuaW1wb3J0IHsgaW5pdEZwc01vZCB9IGZyb20gXCIuL2d1aV9iYXNlZF9tb2RzL2Zwc21vZFwiO1xuaW5pdGtleXN0cm9rZXNDU1MoKTtcbmNvbnN0IG0gPSBNb2RBUEk7XG5leHBvcnQgY29uc3QgdG9nZ2xlcyA9IHtcbiAgZnVsbGJyaWdodDogZmFsc2UsXG4gIGtleXN0cm9rZXM6IGZhbHNlLFxuICBmcHNNb2Q6IGZhbHNlLFxufTtcbnZhciBldjE6IGFueVtdID0gW107XG5sZXQgbGFzdExvZyA9IDA7XG5cbm0uYWRkRXZlbnRMaXN0ZW5lcihcImV2ZW50XCIsIChlOiBhbnkpID0+IHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICBpZiAobm93IC0gbGFzdExvZyA+PSA1MDAwMCkge1xuICAgIC8vIDMwIHNlY29uZHNcbiAgICBsYXN0TG9nID0gbm93O1xuXG4gICAgZXYxLnB1c2goe1xuICAgICAgdGltZTogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgIGV2ZW50OiBlLmV2ZW50LFxuICAgICAgZGF0YTogZS5kYXRhLFxuICAgIH0pO1xuXG4gICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgIGV2MS5zaGlmdCgpO1xuICAgIH1cbiAgfVxufSk7XG5jb25zdCBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzO1xubS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjA7XG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgKGU6IGFueSkgPT4ge1xuICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSkgcmV0dXJuO1xuXG4gIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuXG4gIGlmIChlLm1lc3NhZ2UgPT09IFwiIWZiXCIpIHtcbiAgICBpZiAoIXRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wO1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBcdTAwQTdsRnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSBmYWxzZTtcbiAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wO1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICBtLmRpc3BsYXlUb0NoYXQoXG4gICAgICBcIiBcdTAwQTdsIGhlbHBcXG5cdTAwQTczICFmYiAoRnVsbEJyaWdodClcXG5cdTAwQTcyICFoZWxwICh0aGlzIHRleHQpXFxuXHUwMEE3NiAha2V5c3Ryb2tlcyAoc2VsZiBleHBsYW5hdG9yeSlcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVxcblx1MDBBN2IgIXZlcnNpb24gKHNlbGYgZXhwbGFuYXRvcnkpXFxuXFxuIFx1MDBBN2wgREVWIFRPT0xTXFxuXHUwMEE3OCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIFx1MDBBNzcgIWRldmxvZyAobG9nIG9mIGV2ZW50cylcIixcbiAgICApO1xuICB9IGVsc2UgaWYgKGUubWVzc2FnZS5zdGFydHNXaXRoKFwiIW1vZGVcIikpIHtcbiAgICB2YXIgYXJncyA9IHtcbiAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV0sXG4gICAgfTtcbiAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMTtcbiAgICAgIG1jU2V0dGluZ3MuZm9nID0gZmFsc2U7XG4gICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDAuMDtcbiAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wO1xuICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IGZhbHNlO1xuICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gZmFsc2U7XG4gICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZTtcbiAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuYTIgPT0gXCJmYW5jeVwiKSB7XG4gICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gODtcbiAgICAgIG1jU2V0dGluZ3MuZm9nID0gdHJ1ZTtcbiAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wO1xuICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAxMDA7XG4gICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gdHJ1ZTtcbiAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWU7XG4gICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZTtcbiAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIikge1xuICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBNzkgQ3VycmVudCBDbGllbnQgVmVyc2lvbjogMC4wLjFcIik7XG4gIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFkZXZsb2dcIikge1xuICAgIG0uZGlzcGxheVRvQ2hhdChcbiAgICAgIFwiXHUwMEE3ZCBMb2c6IFxcblwiICtcbiAgICAgICAgZXYxXG4gICAgICAgICAgLm1hcChcbiAgICAgICAgICAgIChpKSA9PlxuICAgICAgICAgICAgICBcIlx1MDBBN2UgRXZlbnQ6IFwiICsgaS5ldmVudCArIFwiXFxuXHUwMEE3ZCBEYXRhOlwiICsgSlNPTi5zdHJpbmdpZnkoaS5kYXRhKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLmpvaW4oXCJcXG5cIiksXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBlLm1lc3NhZ2VbMV0gPT09IFwiZVwiICYmXG4gICAgZS5tZXNzYWdlID09PSBcInZcIiAmJlxuICAgIGUubWVzc2FnZVsxXSA9PT0gXCJhXCIgJiZcbiAgICBlLm1lc3NhZ2UgPT09IFwibFwiXG4gICkge1xuICAgIHZhciBjb2RlID0gZS5tZXNzYWdlLnNwbGl0KFwiIWV2YWwgXCIpWzFdO1xuICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2QgRXZhbDpcXG5cdTAwQTdlIFwiICsgZXZhbChjb2RlKSk7XG4gIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFrZXlzdHJva2VzXCIpIHtcbiAgICBpZiAodG9nZ2xlcy5rZXlzdHJva2VzID09IHRydWUpIHtcbiAgICAgIHRvZ2dsZXMua2V5c3Ryb2tlcyA9IGZhbHNlO1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsS2V5c3Ryb2tlcyBkaXNhYmxlZFwiKTtcbiAgICB9IGVsc2UgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcyA9PSBmYWxzZSkge1xuICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gdHJ1ZTtcbiAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEtleXN0cm9rZXMgZW5hYmxlZFwiKTtcbiAgICB9XG4gICAgaW5pdEtleXN0cm9rZXMoKTtcbiAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT0gXCIhZnBzXCIpIHtcbiAgICBpZiAodG9nZ2xlcy5mcHNNb2QgPT0gdHJ1ZSkge1xuICAgICAgdG9nZ2xlcy5mcHNNb2QgPSBmYWxzZTtcbiAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgXHUwMEE3bEZQUyBtb2QgZGlzYWJsZWRcIik7XG4gICAgfSBlbHNlIGlmICh0b2dnbGVzLmZwc01vZCA9PSBmYWxzZSkge1xuICAgICAgdG9nZ2xlcy5mcHNNb2QgPSB0cnVlO1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBcdTAwQTdsRlBTIG1vZCBlbmFibGVkXCIpO1xuICAgIH1cbiAgICBpbml0RnBzTW9kKCk7XG4gIH0gZWxzZSB7XG4gICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBVbmtub3duIENvbW1hbmQ6XCIpO1xuICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2NcIiArIGUubWVzc2FnZSk7XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBp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
