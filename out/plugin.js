(() => {
  // src/gui_based_mods/keystr.ts
  var initkeystrokesCSS = () => {
  };
  var initKeystrokes = () => {
    const existing = document.getElementById("keystrokes_");
    if (toggles.keystrokes) {
      const keystrokes = existing ?? document.createElement("div");
      keystrokes.id = "keystrokes_";
      if (!existing) document.body.appendChild(keystrokes);
      if (!existing) {
        var keysPressed = { w: false, a: false, s: false, d: false };
        window.addEventListener("keydown", (e2) => {
          const k = e2.key.toLowerCase();
          if (!(k in keysPressed)) return;
          keysPressed[k] = true;
          keystrokes.innerHTML = `
                    <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ""}>${keysPressed.w ? "W" : "w"}</p></br>
                    <div style="display:flex;gap:10px;">
                        <p ${keysPressed.a ? 'class="lighter"' : ""}>${keysPressed.a ? "A" : "a"}</p></br>
                        <p ${keysPressed.s ? 'class="lighter"' : ""}>${keysPressed.s ? "S" : "s"}</p></br>
                        <p ${keysPressed.d ? 'class="lighter"' : ""}>${keysPressed.d ? "D" : "d"}</p></br>
                    </div>
                `;
        });
        window.addEventListener("keyup", (e2) => {
          const k = e2.key.toLowerCase();
          if (!(k in keysPressed)) return;
          keysPressed[k] = false;
          keystrokes.innerHTML = `
                    <p style="display:block">${keysPressed.w ? "W" : "w"}</p></br>
                    <div style="display:flex;gap:10px;">
                        <p>${keysPressed.a ? "A" : "a"}</p></br>
                        <p>${keysPressed.s ? "S" : "s"}</p></br>
                        <p>${keysPressed.d ? "D" : "d"}</p></br>
                    </div>
                `;
        });
      }
    } else {
      const el = document.getElementById("keystrokes_");
      if (el) el.remove();
    }
  };

  // src/gui_based_mods/fpsmod.ts
  var initFpsMod = () => {
    if (toggles.fpsMod == true) {
      var fps = document.createElement("div");
      fps.id = "fpsm_";
      ModAPI.addEventListener("update", () => {
        fps.innerHTML = `<span class="fpsm-inner">${ModAPI.getFPS()}</span>`;
      });
    } else if (toggles.fpsMod == false) {
      if (document.getElementById("fpsm_")) {
        document.getElementById("fpsm_").remove();
      } else {
        return 0;
      }
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
        m.displayToChat("\xA7a \xA7lFPS mod enabled");
        toggles.fpsMod = false;
      } else if (toggles.fpsMod == false) {
        m.displayToChat("\xA7c \xA7lFPS mod disabled");
        toggles.fpsMod = true;
      }
      initFpsMod();
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2tleXN0ci50cyIsICIuLi9zcmMvZ3VpX2Jhc2VkX21vZHMvZnBzbW9kLnRzIiwgIi4uL3NyYy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0b2dnbGVzIH0gZnJvbSBcIi4uL21haW5cIjtcbi8vIEB0cy1pZ25vcmU6IHNpZGUtZWZmZWN0IGltcG9ydCBzbyB3ZWJwYWNrIGNhbiBidW5kbGUgYW5kIGluamVjdCBDU1NcbmltcG9ydCAnLi9rZXlzdHJva2VzQ1NTLmNzcyc7XG5cbmV4cG9ydCB2YXIgaW5pdGtleXN0cm9rZXNDU1MgPSAoKSA9PiB7XG4gICAgLy8gQ1NTIGlzIGltcG9ydGVkIGF0IG1vZHVsZSBsb2FkOyB3aXRoIHN0eWxlLWxvYWRlciBpdCB3aWxsIGJlIGluamVjdGVkIGF1dG9tYXRpY2FsbHkuXG59XG5cbmV4cG9ydCB2YXIgaW5pdEtleXN0cm9rZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAodG9nZ2xlcy5rZXlzdHJva2VzKSB7XG4gICAgICAgIGNvbnN0IGtleXN0cm9rZXMgPSBleGlzdGluZyA/PyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBrZXlzdHJva2VzLmlkID0gXCJrZXlzdHJva2VzX1wiO1xuICAgICAgICBpZiAoIWV4aXN0aW5nKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGtleXN0cm9rZXMpO1xuXG4gICAgICAgIC8vIE9ubHkgYXR0YWNoIGxpc3RlbmVycyBvbmNlIHdoZW4gY3JlYXRpbmcgdGhlIGVsZW1lbnRcbiAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgICAgdmFyIGtleXNQcmVzc2VkOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHsgdzogZmFsc2UsIGE6IGZhbHNlLCBzOiBmYWxzZSwgZDogZmFsc2UgfTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgayA9IGUua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCEoayBpbiBrZXlzUHJlc3NlZCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBrZXlzUHJlc3NlZFtrXSA9IHRydWU7XG4gICAgICAgICAgICAgICAga2V5c3Ryb2tlcy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiICR7a2V5c1ByZXNzZWQudyA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtrZXlzUHJlc3NlZC53ID8gXCJXXCIgOiBcIndcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwICR7a2V5c1ByZXNzZWQuYSA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtrZXlzUHJlc3NlZC5hID8gXCJBXCIgOiBcImFcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwICR7a2V5c1ByZXNzZWQucyA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtrZXlzUHJlc3NlZC5zID8gXCJTXCIgOiBcInNcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwICR7a2V5c1ByZXNzZWQuZCA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgayA9IGUua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCEoayBpbiBrZXlzUHJlc3NlZCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBrZXlzUHJlc3NlZFtrXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGtleXN0cm9rZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj4ke2tleXNQcmVzc2VkLncgPyBcIldcIiA6IFwid1wifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtrZXlzUHJlc3NlZC5hID8gXCJBXCIgOiBcImFcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7a2V5c1ByZXNzZWQucyA/IFwiU1wiIDogXCJzXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2tleXNQcmVzc2VkLmQgPyBcIkRcIiA6IFwiZFwifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2V5c3Ryb2tlc19cIik7XG4gICAgICAgIGlmIChlbCkgZWwucmVtb3ZlKCk7XG4gICAgfVxufSIsICJpbXBvcnQge3RvZ2dsZXN9IGZyb20gXCIuLi9tYWluXCJcblxuaW1wb3J0ICcuL2Zwc21vZENTUy5jc3MnXG5leHBvcnQgdmFyIGluaXRGcHNNb2QgPSAoKSA9PiB7XG4gICAgaWYgKHRvZ2dsZXMuZnBzTW9kID09IHRydWUpIHtcbiAgICAgICAgdmFyIGZwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmcHMuaWQgPSBcImZwc21fXCJcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJ1cGRhdGVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZnBzLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImZwc20taW5uZXJcIj4ke01vZEFQSS5nZXRGUFMoKX08L3NwYW4+YFxuICAgICAgICB9KVxuICAgIH0gZWxzZSBpZiAodG9nZ2xlcy5mcHNNb2QgPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnBzbV9cIikpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnBzbV9cIikucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cbiAgICB9XG59IiwgImltcG9ydCB7IGluaXRLZXlzdHJva2VzLCBpbml0a2V5c3Ryb2tlc0NTUyB9IGZyb20gXCIuL2d1aV9iYXNlZF9tb2RzL2tleXN0clwiO1xuaW1wb3J0IHsgaW5pdEZwc01vZCB9IGZyb20gJy4vZ3VpX2Jhc2VkX21vZHMvZnBzbW9kJ1xuaW5pdGtleXN0cm9rZXNDU1MoKVxuY29uc3QgbSA9IE1vZEFQSTtcbmV4cG9ydCBjb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlLFxuICAgIGtleXN0cm9rZXM6IGZhbHNlLFxuICAgIGZwc01vZDogZmFsc2Vcbn07XG52YXIgZXYxOiBhbnlbXSA9IFtdO1xubGV0IGxhc3RMb2cgPSAwO1xuXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJldmVudFwiLCAoZTogYW55KSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChub3cgLSBsYXN0TG9nID49IDUwMDAwKSB7IC8vIDMwIHNlY29uZHNcbiAgICAgICAgbGFzdExvZyA9IG5vdztcblxuICAgICAgICBldjEucHVzaCh7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgICAgZXZlbnQ6IGUuZXZlbnQsXG4gICAgICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIGV2MS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5jb25zdCBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzXG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIChlOiBhbnkpID0+IHtcbiAgICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgXHUwMEE3bEZ1bGxicmlnaHQgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiBcdTAwQTdsIGhlbHBcXG5cdTAwQTczICFmYiAoRnVsbEJyaWdodClcXG5cdTAwQTcyICFoZWxwICh0aGlzIHRleHQpXFxuXHUwMEE3NiAha2V5c3Ryb2tlcyAoc2VsZiBleHBsYW5hdG9yeSlcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVxcblx1MDBBN2IgIXZlcnNpb24gKHNlbGYgZXhwbGFuYXRvcnkpXFxuXFxuIFx1MDBBN2wgREVWIFRPT0xTXFxuXHUwMEE3OCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIFx1MDBBNzcgIWRldmxvZyAobG9nIG9mIGV2ZW50cylcIilcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIilcbiAgICB7IFxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc5IEN1cnJlbnQgQ2xpZW50IFZlcnNpb246IDAuMC4xXCIpXG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcbiAgICAgICAgICAgIFwiXHUwMEE3ZCBMb2c6IFxcblwiICsgZXYxLm1hcChpID0+IFwiXHUwMEE3ZSBFdmVudDogXCIgKyBpLmV2ZW50ICsgXCJcXG5cdTAwQTdkIERhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShpLmRhdGEpKS5qb2luKFwiXFxuXCIpXG4gICAgICAgIClcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiYgZS5tZXNzYWdlID09PSBcInZcIiAmJiBlLm1lc3NhZ2VbMV0gPT09IFwiYVwiICYmIGUubWVzc2FnZSA9PT0gXCJsXCIpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2QgRXZhbDpcXG5cdTAwQTdlIFwiICsgZXZhbChjb2RlKSlcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIha2V5c3Ryb2tlc1wiKSB7XG4gICAgICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gZmFsc2VcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEtleXN0cm9rZXMgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMua2V5c3Ryb2tlcyA9IHRydWVcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgXHUwMEE3bEtleXN0cm9rZXMgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaW5pdEtleXN0cm9rZXMoKVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09IFwiIWZwc1wiKSB7XG4gICAgICAgIGlmICh0b2dnbGVzLmZwc01vZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIFx1MDBBN2xGUFMgbW9kIGVuYWJsZWRcIik7XG4gICAgICAgICAgICB0b2dnbGVzLmZwc01vZCA9IGZhbHNlXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0b2dnbGVzLmZwc01vZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsRlBTIG1vZCBkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnBzTW9kID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGluaXRGcHNNb2QoKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBVbmtub3duIENvbW1hbmQ6XCIpXG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2NcIiArIGUubWVzc2FnZSlcbiAgICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiOztBQUlPLE1BQUksb0JBQW9CLE1BQU07QUFBQSxFQUVyQztBQUVPLE1BQUksaUJBQWlCLE1BQU07QUFDOUIsVUFBTSxXQUFXLFNBQVMsZUFBZSxhQUFhO0FBQ3RELFFBQUksUUFBUSxZQUFZO0FBQ3BCLFlBQU0sYUFBYSxZQUFZLFNBQVMsY0FBYyxLQUFLO0FBQzNELGlCQUFXLEtBQUs7QUFDaEIsVUFBSSxDQUFDLFNBQVUsVUFBUyxLQUFLLFlBQVksVUFBVTtBQUduRCxVQUFJLENBQUMsVUFBVTtBQUNYLFlBQUksY0FBMEMsRUFBRSxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLE1BQU07QUFFdkYsZUFBTyxpQkFBaUIsV0FBVyxDQUFDQSxPQUFNO0FBQ3RDLGdCQUFNLElBQUlBLEdBQUUsSUFBSSxZQUFZO0FBQzVCLGNBQUksRUFBRSxLQUFLLGFBQWM7QUFDekIsc0JBQVksQ0FBQyxJQUFJO0FBQ2pCLHFCQUFXLFlBQVk7QUFBQSwrQ0FDUSxZQUFZLElBQUksb0JBQW9CLEVBQUUsSUFBSSxZQUFZLElBQUksTUFBTSxHQUFHO0FBQUE7QUFBQSw2QkFFckYsWUFBWSxJQUFJLG9CQUFvQixFQUFFLElBQUksWUFBWSxJQUFJLE1BQU0sR0FBRztBQUFBLDZCQUNuRSxZQUFZLElBQUksb0JBQW9CLEVBQUUsSUFBSSxZQUFZLElBQUksTUFBTSxHQUFHO0FBQUEsNkJBQ25FLFlBQVksSUFBSSxvQkFBb0IsRUFBRSxJQUFJLFlBQVksSUFBSSxNQUFNLEdBQUc7QUFBQTtBQUFBO0FBQUEsUUFHcEYsQ0FBQztBQUVELGVBQU8saUJBQWlCLFNBQVMsQ0FBQ0EsT0FBTTtBQUNwQyxnQkFBTSxJQUFJQSxHQUFFLElBQUksWUFBWTtBQUM1Qixj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QU0sU0FBUztBQUN6QixtQkFBVyx1QkFBdUI7QUFDbEMsbUJBQVcsTUFBTTtBQUNqQixtQkFBVyxlQUFlO0FBQzFCLG1CQUFXLFNBQVM7QUFDcEIsbUJBQVcsY0FBYztBQUN6QixtQkFBVyxnQkFBZ0I7QUFDM0IsbUJBQVcsV0FBVztBQUN0QixtQkFBVyxjQUFjO0FBQUEsTUFDN0IsT0FBTztBQUNILFVBQUUsY0FBYywrQkFBK0IsS0FBSyxFQUFFO0FBQUEsTUFDMUQ7QUFBQSxJQUNKLFdBQVcsRUFBRSxZQUFZLFlBQ3pCO0FBQ0ksUUFBRSxjQUFjLHFDQUFrQztBQUFBLElBQ3RELFdBQVcsRUFBRSxZQUFZLFdBQVc7QUFDaEMsUUFBRTtBQUFBLFFBQ0Usa0JBQWUsSUFBSSxJQUFJLE9BQUssa0JBQWUsRUFBRSxRQUFRLGtCQUFlLEtBQUssVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSTtBQUFBLE1BQ3pHO0FBQUEsSUFDSixXQUFXLEVBQUUsUUFBUSxDQUFDLE1BQU0sT0FBTyxFQUFFLFlBQVksT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLE9BQU8sRUFBRSxZQUFZLEtBQUs7QUFDL0YsVUFBSSxPQUFPLEVBQUUsUUFBUSxNQUFNLFFBQVEsRUFBRSxDQUFDO0FBQ3RDLFFBQUUsY0FBYyx3QkFBa0IsS0FBSyxJQUFJLENBQUM7QUFBQSxJQUNoRCxXQUFXLEVBQUUsWUFBWSxlQUFlO0FBQ3BDLFVBQUksUUFBUSxjQUFjLE1BQU07QUFDNUIsZ0JBQVEsYUFBYTtBQUNyQixVQUFFLGNBQWMsK0JBQXlCO0FBQUEsTUFDN0MsV0FBVyxRQUFRLGNBQWMsT0FBTztBQUNwQyxnQkFBUSxhQUFhO0FBQ3JCLFVBQUUsY0FBYyxnQ0FBMEI7QUFBQSxNQUM5QztBQUNBLHFCQUFlO0FBQUEsSUFDbkIsV0FBVyxFQUFFLFdBQVcsUUFBUTtBQUM1QixVQUFJLFFBQVEsVUFBVSxNQUFNO0FBQ3hCLFVBQUUsY0FBYyw0QkFBc0I7QUFDdEMsZ0JBQVEsU0FBUztBQUFBLE1BRXJCLFdBQVcsUUFBUSxVQUFVLE9BQU87QUFDaEMsVUFBRSxjQUFjLDZCQUF1QjtBQUN2QyxnQkFBUSxTQUFTO0FBQUEsTUFDckI7QUFDQSxpQkFBVztBQUFBLElBQ2YsT0FDSztBQUNELFFBQUUsY0FBYyx3QkFBcUI7QUFDckMsUUFBRSxjQUFjLFVBQU8sRUFBRSxPQUFPO0FBQUEsSUFDcEM7QUFBQSxFQUNKLENBQUM7IiwKICAibmFtZXMiOiBbImUiLCAiZSJdCn0K
