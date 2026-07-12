(() => {
  // src/gui_based_mods/keystr.ts
  var keystrokesElement = null;
  var keysPressed = null;
  var listenersAttached = false;
  var handleKeyDown = null;
  var handleKeyUp = null;
  var handleMouseDown = null;
  var handleMouseUp = null;
  var initkeystrokesCSS = () => {
  };
  var createDefaultKeyState = () => ({ w: false, a: false, s: false, d: false, lmb: false, rmb: false });
  var renderKeystrokes = () => {
    if (!keystrokesElement) return;
    const state = keysPressed ?? createDefaultKeyState();
    keystrokesElement.innerHTML = `
        <p style="display:block" ${state.w ? 'class="lighter"' : ""}>${state.w ? "W" : "w"}</p></br>
        <div style="display:flex;gap:10px;">
            <p ${state.a ? 'class="lighter"' : ""}>${state.a ? "A" : "a"}</p></br>
            <p ${state.s ? 'class="lighter"' : ""}>${state.s ? "S" : "s"}</p></br>
            <p ${state.d ? 'class="lighter"' : ""}>${state.d ? "D" : "d"}</p></br>
        </div>
        <div style="display:flex;gap:10px;">
            <p ${state.lmb ? 'class="lighter"' : ""}>${state.lmb ? "LMB" : "lmb"}</p></br>
            <p ${state.rmb ? 'class="lighter"' : ""}>${state.rmb ? "RMB" : "rmb"}</p></br>
        </div>
    `;
  };
  var attachListeners = () => {
    if (listenersAttached) return;
    keysPressed = createDefaultKeyState();
    handleKeyDown = (e2) => {
      const k = e2.key.toLowerCase();
      if (!keysPressed || !(k in keysPressed)) return;
      keysPressed[k] = true;
      renderKeystrokes();
    };
    handleKeyUp = (e2) => {
      const k = e2.key.toLowerCase();
      if (!keysPressed || !(k in keysPressed)) return;
      keysPressed[k] = false;
      renderKeystrokes();
    };
    handleMouseDown = (e2) => {
      if (!keysPressed) return;
      if (e2.button === 0) {
        keysPressed.lmb = true;
      } else if (e2.button === 2) {
        keysPressed.rmb = true;
      }
      renderKeystrokes();
    };
    handleMouseUp = (e2) => {
      if (!keysPressed) return;
      if (e2.button === 0) {
        keysPressed.lmb = false;
      } else if (e2.button === 2) {
        keysPressed.rmb = false;
      }
      renderKeystrokes();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    listenersAttached = true;
  };
  var detachListeners = () => {
    if (!listenersAttached) return;
    if (handleKeyDown) window.removeEventListener("keydown", handleKeyDown);
    if (handleKeyUp) window.removeEventListener("keyup", handleKeyUp);
    if (handleMouseDown) document.removeEventListener("mousedown", handleMouseDown);
    if (handleMouseUp) document.removeEventListener("mouseup", handleMouseUp);
    handleKeyDown = null;
    handleKeyUp = null;
    handleMouseDown = null;
    handleMouseUp = null;
    listenersAttached = false;
    keysPressed = null;
  };
  var initKeystrokes = () => {
    if (!document.body) return;
    if (toggles.keystrokes) {
      attachListeners();
      const existing = document.getElementById("keystrokes_");
      if (existing) {
        keystrokesElement = existing;
      } else if (!keystrokesElement) {
        keystrokesElement = document.createElement("div");
        keystrokesElement.id = "keystrokes_";
        document.body.appendChild(keystrokesElement);
      }
      renderKeystrokes();
    } else {
      if (keystrokesElement && keystrokesElement.isConnected) {
        keystrokesElement.remove();
      }
      keystrokesElement = null;
      detachListeners();
    }
  };

  // src/gui_based_mods/fpsmod.ts
  var fpsElement = null;
  var updateHandler = null;
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
        ModAPI.addEventListener("update", updateHandler);
      }
      renderFps();
    } else {
      if (updateHandler) {
        if (typeof ModAPI.removeEventListener === "function") {
          ModAPI.removeEventListener("update", updateHandler);
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
      m.displayToChat(" \xA7l help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA76 !keystrokes (self explanatory)\n\xA71 !mode (fps, fancy)\n\xA7b !version (self explanatory)\n\n \xA7l DEV TOOLS\n\xA78 !eval (run JS code)\n \xA77 !devlog (log of events)");
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
        "\xA7d Log: \n" + ev1.map((i) => "\xA7e Event: " + i.event + "\n\xA7d Data:" + JSON.stringify(i.data)).join("\n")
      );
    } else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
      var code = e.message.split("!eval ")[1];
      m.displayToChat("\xA7d Eval:\n\xA7e " + eval(code));
    } else if (e.message === "!keystrokes") {
      if (toggles.keystrokes == true) {
        toggles.keystrokes = false;
        m.displayToChat("\xA7a \xA7lKeystrokes enabled");
      } else if (toggles.keystrokes == false) {
        toggles.keystrokes = true;
        m.displayToChat("\xA7c \xA7lKeystrokes disabled");
      }
      initKeystrokes();
    } else if (e.message == "!fps") {
      if (toggles.fpsMod == true) {
        toggles.fpsMod = false;
        m.displayToChat("\xA7a \xA7lFPS mod enabled");
      } else if (toggles.fpsMod == false) {
        toggles.fpsMod = true;
        m.displayToChat("\xA7c \xA7lFPS mod disabled");
      }
      initFpsMod();
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2tleXN0ci50cyIsICIuLi9zcmMvZ3VpX2Jhc2VkX21vZHMvZnBzbW9kLnRzIiwgIi4uL3NyYy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0b2dnbGVzIH0gZnJvbSBcIi4uL21haW5cIjtcbi8vIEB0cy1pZ25vcmU6IHNpZGUtZWZmZWN0IGltcG9ydCBzbyB3ZWJwYWNrIGNhbiBidW5kbGUgYW5kIGluamVjdCBDU1NcbmltcG9ydCAnLi9rZXlzdHJva2VzQ1NTLmNzcyc7XG5cbmxldCBrZXlzdHJva2VzRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbmxldCBrZXlzUHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gfCBudWxsID0gbnVsbDtcbmxldCBsaXN0ZW5lcnNBdHRhY2hlZCA9IGZhbHNlO1xubGV0IGhhbmRsZUtleURvd246ICgoZTogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbmxldCBoYW5kbGVLZXlVcDogKChlOiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xubGV0IGhhbmRsZU1vdXNlRG93bjogKChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xubGV0IGhhbmRsZU1vdXNlVXA6ICgoZTogTW91c2VFdmVudCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IHZhciBpbml0a2V5c3Ryb2tlc0NTUyA9ICgpID0+IHtcbiAgICAvLyBDU1MgaXMgaW1wb3J0ZWQgYXQgbW9kdWxlIGxvYWQ7IHdpdGggc3R5bGUtbG9hZGVyIGl0IHdpbGwgYmUgaW5qZWN0ZWQgYXV0b21hdGljYWxseS5cbn1cblxuY29uc3QgY3JlYXRlRGVmYXVsdEtleVN0YXRlID0gKCkgPT4gKHsgdzogZmFsc2UsIGE6IGZhbHNlLCBzOiBmYWxzZSwgZDogZmFsc2UsIGxtYjogZmFsc2UsIHJtYjogZmFsc2UgfSk7XG5cbmNvbnN0IHJlbmRlcktleXN0cm9rZXMgPSAoKSA9PiB7XG4gICAgaWYgKCFrZXlzdHJva2VzRWxlbWVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHN0YXRlID0ga2V5c1ByZXNzZWQgPz8gY3JlYXRlRGVmYXVsdEtleVN0YXRlKCk7XG4gICAga2V5c3Ryb2tlc0VsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8cCBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiAke3N0YXRlLncgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7c3RhdGUudyA/IFwiV1wiIDogXCJ3XCJ9PC9wPjwvYnI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmZsZXg7Z2FwOjEwcHg7XCI+XG4gICAgICAgICAgICA8cCAke3N0YXRlLmEgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7c3RhdGUuYSA/IFwiQVwiIDogXCJhXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICA8cCAke3N0YXRlLnMgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7c3RhdGUucyA/IFwiU1wiIDogXCJzXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICA8cCAke3N0YXRlLmQgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7c3RhdGUuZCA/IFwiRFwiIDogXCJkXCJ9PC9wPjwvYnI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgICAgICAgPHAgJHtzdGF0ZS5sbWIgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7c3RhdGUubG1iID8gXCJMTUJcIiA6IFwibG1iXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICA8cCAke3N0YXRlLnJtYiA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtzdGF0ZS5ybWIgPyBcIlJNQlwiIDogXCJybWJcIn08L3A+PC9icj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn07XG5cbmNvbnN0IGF0dGFjaExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBpZiAobGlzdGVuZXJzQXR0YWNoZWQpIHJldHVybjtcblxuICAgIGtleXNQcmVzc2VkID0gY3JlYXRlRGVmYXVsdEtleVN0YXRlKCk7XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgayA9IGUua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICgha2V5c1ByZXNzZWQgfHwgIShrIGluIGtleXNQcmVzc2VkKSkgcmV0dXJuO1xuICAgICAgICBrZXlzUHJlc3NlZFtrXSA9IHRydWU7XG4gICAgICAgIHJlbmRlcktleXN0cm9rZXMoKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlS2V5VXAgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBrID0gZS5rZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCFrZXlzUHJlc3NlZCB8fCAhKGsgaW4ga2V5c1ByZXNzZWQpKSByZXR1cm47XG4gICAgICAgIGtleXNQcmVzc2VkW2tdID0gZmFsc2U7XG4gICAgICAgIHJlbmRlcktleXN0cm9rZXMoKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFrZXlzUHJlc3NlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZS5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIGtleXNQcmVzc2VkLmxtYiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5idXR0b24gPT09IDIpIHtcbiAgICAgICAgICAgIGtleXNQcmVzc2VkLnJtYiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyS2V5c3Ryb2tlcygpO1xuICAgIH07XG5cbiAgICBoYW5kbGVNb3VzZVVwID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFrZXlzUHJlc3NlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZS5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIGtleXNQcmVzc2VkLmxtYiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGUuYnV0dG9uID09PSAyKSB7XG4gICAgICAgICAgICBrZXlzUHJlc3NlZC5ybWIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJLZXlzdHJva2VzKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleVVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU1vdXNlRG93bik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlTW91c2VVcCk7XG4gICAgbGlzdGVuZXJzQXR0YWNoZWQgPSB0cnVlO1xufTtcblxuY29uc3QgZGV0YWNoTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIGlmICghbGlzdGVuZXJzQXR0YWNoZWQpIHJldHVybjtcblxuICAgIGlmIChoYW5kbGVLZXlEb3duKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93bik7XG4gICAgaWYgKGhhbmRsZUtleVVwKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleVVwKTtcbiAgICBpZiAoaGFuZGxlTW91c2VEb3duKSBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU1vdXNlRG93bik7XG4gICAgaWYgKGhhbmRsZU1vdXNlVXApIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU1vdXNlVXApO1xuXG4gICAgaGFuZGxlS2V5RG93biA9IG51bGw7XG4gICAgaGFuZGxlS2V5VXAgPSBudWxsO1xuICAgIGhhbmRsZU1vdXNlRG93biA9IG51bGw7XG4gICAgaGFuZGxlTW91c2VVcCA9IG51bGw7XG4gICAgbGlzdGVuZXJzQXR0YWNoZWQgPSBmYWxzZTtcbiAgICBrZXlzUHJlc3NlZCA9IG51bGw7XG59O1xuXG5leHBvcnQgdmFyIGluaXRLZXlzdHJva2VzID0gKCkgPT4ge1xuICAgIGlmICghZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuXG4gICAgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcykge1xuICAgICAgICBhdHRhY2hMaXN0ZW5lcnMoKTtcblxuICAgICAgICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2V5c3Ryb2tlc19cIikgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIGtleXN0cm9rZXNFbGVtZW50ID0gZXhpc3Rpbmc7XG4gICAgICAgIH0gZWxzZSBpZiAoIWtleXN0cm9rZXNFbGVtZW50KSB7XG4gICAgICAgICAgICBrZXlzdHJva2VzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBrZXlzdHJva2VzRWxlbWVudC5pZCA9IFwia2V5c3Ryb2tlc19cIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoa2V5c3Ryb2tlc0VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyS2V5c3Ryb2tlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChrZXlzdHJva2VzRWxlbWVudCAmJiBrZXlzdHJva2VzRWxlbWVudC5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAga2V5c3Ryb2tlc0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAga2V5c3Ryb2tlc0VsZW1lbnQgPSBudWxsO1xuICAgICAgICBkZXRhY2hMaXN0ZW5lcnMoKTtcbiAgICB9XG59IiwgImltcG9ydCB7dG9nZ2xlc30gZnJvbSBcIi4uL21haW5cIlxuLy8gQHRzLWlnbm9yZTogc2lkZS1lZmZlY3QgaW1wb3J0IHNvIHdlYnBhY2sgY2FuIGJ1bmRsZSBhbmQgaW5qZWN0IENTU1xuaW1wb3J0ICcuL2Zwc21vZENTUy5jc3MnXG5cbmxldCBmcHNFbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xubGV0IHVwZGF0ZUhhbmRsZXI6ICgoZT86IGFueSkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuY29uc3QgcmVuZGVyRnBzID0gKCkgPT4ge1xuICAgIGlmICghZnBzRWxlbWVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGZwcyA9IHR5cGVvZiBNb2RBUEkuZ2V0RlBTID09PSBcImZ1bmN0aW9uXCIgPyBNb2RBUEkuZ2V0RlBTKCkgOiAwO1xuICAgIGZwc0VsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZnBzbS1pbm5lclwiPiR7ZnBzfTwvc3Bhbj5gO1xufVxuXG5leHBvcnQgdmFyIGluaXRGcHNNb2QgPSAoKSA9PiB7XG4gICAgaWYgKCFkb2N1bWVudC5ib2R5KSByZXR1cm47XG5cbiAgICBpZiAodG9nZ2xlcy5mcHNNb2QpIHtcbiAgICAgICAgaWYgKCFmcHNFbGVtZW50KSB7XG4gICAgICAgICAgICBmcHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmcHNFbGVtZW50LmlkID0gXCJmcHNtX1wiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcHNFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXBkYXRlSGFuZGxlcikge1xuICAgICAgICAgICAgdXBkYXRlSGFuZGxlciA9ICgpID0+IHJlbmRlckZwcygpO1xuICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJ1cGRhdGVcIiwgdXBkYXRlSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJGcHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNb2RBUEkucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1cGRhdGVcIiwgdXBkYXRlSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnBzRWxlbWVudCAmJiBmcHNFbGVtZW50LmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICBmcHNFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnBzRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXIgPSBudWxsO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgaW5pdEtleXN0cm9rZXMsIGluaXRrZXlzdHJva2VzQ1NTIH0gZnJvbSBcIi4vZ3VpX2Jhc2VkX21vZHMva2V5c3RyXCI7XG5pbXBvcnQgeyBpbml0RnBzTW9kIH0gZnJvbSAnLi9ndWlfYmFzZWRfbW9kcy9mcHNtb2QnXG5pbml0a2V5c3Ryb2tlc0NTUygpXG5jb25zdCBtID0gTW9kQVBJO1xuZXhwb3J0IGNvbnN0IHRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2UsXG4gICAga2V5c3Ryb2tlczogZmFsc2UsXG4gICAgZnBzTW9kOiBmYWxzZVxufTtcbnZhciBldjE6IGFueVtdID0gW107XG5sZXQgbGFzdExvZyA9IDA7XG5cbm0uYWRkRXZlbnRMaXN0ZW5lcihcImV2ZW50XCIsIChlOiBhbnkpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKG5vdyAtIGxhc3RMb2cgPj0gNTAwMDApIHsgLy8gMzAgc2Vjb25kc1xuICAgICAgICBsYXN0TG9nID0gbm93O1xuXG4gICAgICAgIGV2MS5wdXNoKHtcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgICBldmVudDogZS5ldmVudCxcbiAgICAgICAgICAgIGRhdGE6IGUuZGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXYxLmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgZXYxLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmNvbnN0IG1jU2V0dGluZ3MgPSBNb2RBUEkuc2V0dGluZ3Ncbm0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgKGU6IGFueSkgPT4ge1xuICAgIGlmICghZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhXCIpKSByZXR1cm47XG5cbiAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcblxuICAgIGlmIChlLm1lc3NhZ2UgPT09IFwiIWZiXCIpIHtcbiAgICAgICAgaWYgKCF0b2dnbGVzLmZ1bGxicmlnaHQpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IHRydWU7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEwMDAuMFxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBcdTAwQTdsRnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiIFx1MDBBN2wgaGVscFxcblx1MDBBNzMgIWZiIChGdWxsQnJpZ2h0KVxcblx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcXG5cdTAwQTc2ICFrZXlzdHJva2VzIChzZWxmIGV4cGxhbmF0b3J5KVxcblx1MDBBNzEgIW1vZGUgKGZwcywgZmFuY3kpXFxuXHUwMEE3YiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcXG5cXG4gXHUwMEE3bCBERVYgVE9PTFNcXG5cdTAwQTc4ICFldmFsIChydW4gSlMgY29kZSlcXG4gXHUwMEE3NyAhZGV2bG9nIChsb2cgb2YgZXZlbnRzKVwiKVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFtb2RlXCIpKSB7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICAgICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSAxXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDAuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmEyID09IFwiZmFuY3lcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDhcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMTAwXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhdmVyc2lvblwiKVxuICAgIHsgXG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBNzkgQ3VycmVudCBDbGllbnQgVmVyc2lvbjogMC4wLjFcIilcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhZGV2bG9nXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFxuICAgICAgICAgICAgXCJcdTAwQTdkIExvZzogXFxuXCIgKyBldjEubWFwKGkgPT4gXCJcdTAwQTdlIEV2ZW50OiBcIiArIGkuZXZlbnQgKyBcIlxcblx1MDBBN2QgRGF0YTpcIiArIEpTT04uc3RyaW5naWZ5KGkuZGF0YSkpLmpvaW4oXCJcXG5cIilcbiAgICAgICAgKVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlWzFdID09PSBcImVcIiAmJiBlLm1lc3NhZ2UgPT09IFwidlwiICYmIGUubWVzc2FnZVsxXSA9PT0gXCJhXCIgJiYgZS5tZXNzYWdlID09PSBcImxcIikge1xuICAgICAgICB2YXIgY29kZSA9IGUubWVzc2FnZS5zcGxpdChcIiFldmFsIFwiKVsxXTtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3ZCBFdmFsOlxcblx1MDBBN2UgXCIgKyBldmFsKGNvZGUpKVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFrZXlzdHJva2VzXCIpIHtcbiAgICAgICAgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0b2dnbGVzLmtleXN0cm9rZXMgPSBmYWxzZVxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBcdTAwQTdsS2V5c3Ryb2tlcyBlbmFibGVkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gdHJ1ZVxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsS2V5c3Ryb2tlcyBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpbml0S2V5c3Ryb2tlcygpXG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT0gXCIhZnBzXCIpIHtcbiAgICAgICAgaWYgKHRvZ2dsZXMuZnBzTW9kID09IHRydWUpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnBzTW9kID0gZmFsc2VcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEZQUyBtb2QgZW5hYmxlZFwiKTsgICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0b2dnbGVzLmZwc01vZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5mcHNNb2QgPSB0cnVlXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFx1MDBBN2xGUFMgbW9kIGRpc2FibGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpbml0RnBzTW9kKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgVW5rbm93biBDb21tYW5kOlwiKVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjXCIgKyBlLm1lc3NhZ2UpXG4gICAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjs7QUFJQSxNQUFJLG9CQUF3QztBQUM1QyxNQUFJLGNBQWlEO0FBQ3JELE1BQUksb0JBQW9CO0FBQ3hCLE1BQUksZ0JBQXFEO0FBQ3pELE1BQUksY0FBbUQ7QUFDdkQsTUFBSSxrQkFBb0Q7QUFDeEQsTUFBSSxnQkFBa0Q7QUFFL0MsTUFBSSxvQkFBb0IsTUFBTTtBQUFBLEVBRXJDO0FBRUEsTUFBTSx3QkFBd0IsT0FBTyxFQUFFLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTyxLQUFLLE9BQU8sS0FBSyxNQUFNO0FBRXRHLE1BQU0sbUJBQW1CLE1BQU07QUFDM0IsUUFBSSxDQUFDLGtCQUFtQjtBQUN4QixVQUFNLFFBQVEsZUFBZSxzQkFBc0I7QUFDbkQsc0JBQWtCLFlBQVk7QUFBQSxtQ0FDQyxNQUFNLElBQUksb0JBQW9CLEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHO0FBQUE7QUFBQSxpQkFFekUsTUFBTSxJQUFJLG9CQUFvQixFQUFFLElBQUksTUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLGlCQUN2RCxNQUFNLElBQUksb0JBQW9CLEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsaUJBQ3ZELE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxJQUFJLE1BQU0sSUFBSSxNQUFNLEdBQUc7QUFBQTtBQUFBO0FBQUEsaUJBR3ZELE1BQU0sTUFBTSxvQkFBb0IsRUFBRSxJQUFJLE1BQU0sTUFBTSxRQUFRLEtBQUs7QUFBQSxpQkFDL0QsTUFBTSxNQUFNLG9CQUFvQixFQUFFLElBQUksTUFBTSxNQUFNLFFBQVEsS0FBSztBQUFBO0FBQUE7QUFBQSxFQUdoRjtBQUVBLE1BQU0sa0JBQWtCLE1BQU07QUFDMUIsUUFBSSxrQkFBbUI7QUFFdkIsa0JBQWMsc0JBQXNCO0FBRXBDLG9CQUFnQixDQUFD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
