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

  // src/main.ts
  initkeystrokesCSS();
  var m = ModAPI;
  var toggles = {
    fullbright: false,
    keystrokes: false
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
      } else if (toggles.keystrokes == false) {
        toggles.keystrokes = true;
      }
      initKeystrokes();
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2tleXN0ci50cyIsICIuLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgdG9nZ2xlcyB9IGZyb20gXCIuLi9tYWluXCI7XG4vLyBAdHMtaWdub3JlOiBzaWRlLWVmZmVjdCBpbXBvcnQgc28gd2VicGFjayBjYW4gYnVuZGxlIGFuZCBpbmplY3QgQ1NTXG5pbXBvcnQgJy4va2V5c3Ryb2tlc0NTUy5jc3MnO1xuXG5leHBvcnQgdmFyIGluaXRrZXlzdHJva2VzQ1NTID0gKCkgPT4ge1xuICAgIC8vIENTUyBpcyBpbXBvcnRlZCBhdCBtb2R1bGUgbG9hZDsgd2l0aCBzdHlsZS1sb2FkZXIgaXQgd2lsbCBiZSBpbmplY3RlZCBhdXRvbWF0aWNhbGx5LlxufVxuXG5leHBvcnQgdmFyIGluaXRLZXlzdHJva2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcykge1xuICAgICAgICBjb25zdCBrZXlzdHJva2VzID0gZXhpc3RpbmcgPz8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAga2V5c3Ryb2tlcy5pZCA9IFwia2V5c3Ryb2tlc19cIjtcbiAgICAgICAgaWYgKCFleGlzdGluZykgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChrZXlzdHJva2VzKTtcblxuICAgICAgICAvLyBPbmx5IGF0dGFjaCBsaXN0ZW5lcnMgb25jZSB3aGVuIGNyZWF0aW5nIHRoZSBlbGVtZW50XG4gICAgICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHZhciBrZXlzUHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7IHc6IGZhbHNlLCBhOiBmYWxzZSwgczogZmFsc2UsIGQ6IGZhbHNlIH07XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGsgPSBlLmtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmICghKGsgaW4ga2V5c1ByZXNzZWQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAga2V5c1ByZXNzZWRba10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGtleXN0cm9rZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiAke2tleXNQcmVzc2VkLncgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7a2V5c1ByZXNzZWQudyA/IFwiV1wiIDogXCJ3XCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OmZsZXg7Z2FwOjEwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCAke2tleXNQcmVzc2VkLmEgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7a2V5c1ByZXNzZWQuYSA/IFwiQVwiIDogXCJhXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCAke2tleXNQcmVzc2VkLnMgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7a2V5c1ByZXNzZWQucyA/IFwiU1wiIDogXCJzXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCAke2tleXNQcmVzc2VkLmQgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7a2V5c1ByZXNzZWQuZCA/IFwiRFwiIDogXCJkXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGsgPSBlLmtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmICghKGsgaW4ga2V5c1ByZXNzZWQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAga2V5c1ByZXNzZWRba10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBrZXlzdHJva2VzLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+JHtrZXlzUHJlc3NlZC53ID8gXCJXXCIgOiBcIndcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7a2V5c1ByZXNzZWQuYSA/IFwiQVwiIDogXCJhXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2tleXNQcmVzc2VkLnMgPyBcIlNcIiA6IFwic1wifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpO1xuICAgICAgICBpZiAoZWwpIGVsLnJlbW92ZSgpO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgaW5pdEtleXN0cm9rZXMsIGluaXRrZXlzdHJva2VzQ1NTIH0gZnJvbSBcIi4vZ3VpX2Jhc2VkX21vZHMva2V5c3RyXCI7XG5pbml0a2V5c3Ryb2tlc0NTUygpXG5jb25zdCBtID0gTW9kQVBJO1xuZXhwb3J0IGNvbnN0IHRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2UsXG4gICAga2V5c3Ryb2tlczogZmFsc2Vcbn07XG52YXIgZXYxOiBhbnlbXSA9IFtdO1xubGV0IGxhc3RMb2cgPSAwO1xuXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJldmVudFwiLCAoZTogYW55KSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChub3cgLSBsYXN0TG9nID49IDUwMDAwKSB7IC8vIDMwIHNlY29uZHNcbiAgICAgICAgbGFzdExvZyA9IG5vdztcblxuICAgICAgICBldjEucHVzaCh7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgICAgZXZlbnQ6IGUuZXZlbnQsXG4gICAgICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIGV2MS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5jb25zdCBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzXG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIChlOiBhbnkpID0+IHtcbiAgICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgXHUwMEE3bEZ1bGxicmlnaHQgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiBcdTAwQTdsIGhlbHBcXG5cdTAwQTczICFmYiAoRnVsbEJyaWdodClcXG5cdTAwQTcyICFoZWxwICh0aGlzIHRleHQpXFxuXHUwMEE3NiAha2V5c3Ryb2tlcyAoc2VsZiBleHBsYW5hdG9yeSlcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVxcblx1MDBBN2IgIXZlcnNpb24gKHNlbGYgZXhwbGFuYXRvcnkpXFxuXFxuIFx1MDBBN2wgREVWIFRPT0xTXFxuXHUwMEE3OCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIFx1MDBBNzcgIWRldmxvZyAobG9nIG9mIGV2ZW50cylcIilcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIilcbiAgICB7IFxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc5IEN1cnJlbnQgQ2xpZW50IFZlcnNpb246IDAuMC4xXCIpXG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcbiAgICAgICAgICAgIFwiXHUwMEE3ZCBMb2c6IFxcblwiICsgZXYxLm1hcChpID0+IFwiXHUwMEE3ZSBFdmVudDogXCIgKyBpLmV2ZW50ICsgXCJcXG5cdTAwQTdkIERhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShpLmRhdGEpKS5qb2luKFwiXFxuXCIpXG4gICAgICAgIClcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiYgZS5tZXNzYWdlID09PSBcInZcIiAmJiBlLm1lc3NhZ2VbMV0gPT09IFwiYVwiICYmIGUubWVzc2FnZSA9PT0gXCJsXCIpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2QgRXZhbDpcXG5cdTAwQTdlIFwiICsgZXZhbChjb2RlKSlcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIha2V5c3Ryb2tlc1wiKSB7XG4gICAgICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMua2V5c3Ryb2tlcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpbml0S2V5c3Ryb2tlcygpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFVua25vd24gQ29tbWFuZDpcIilcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3Y1wiICsgZS5tZXNzYWdlKVxuICAgIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBSU8sTUFBSSxvQkFBb0IsTUFBTTtBQUFBLEVBRXJDO0FBRU8sTUFBSSxpQkFBaUIsTUFBTTtBQUM5QixVQUFNLFdBQVcsU0FBUyxlQUFlLGFBQWE7QUFDdEQsUUFBSSxRQUFRLFlBQVk7QUFDcEIsWUFBTSxhQUFhLFlBQVksU0FBUyxjQUFjLEtBQUs7QUFDM0QsaUJB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QU0sR0FBRyxFQUFFLENBQUM7QUFBQSxRQUMxQixJQUFJLEVBQUUsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFDOUI7QUFDQSxVQUFJLEtBQUssTUFBTSxPQUFPO0FBQ2xCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixXQUNTLEtBQUssTUFBTSxTQUFTO0FBQ3pCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixPQUFPO0FBQ0gsVUFBRSxjQUFjLCtCQUErQixLQUFLLEVBQUU7QUFBQSxNQUMxRDtBQUFBLElBQ0osV0FBVyxFQUFFLFlBQVksWUFDekI7QUFDSSxRQUFFLGNBQWMscUNBQWtDO0FBQUEsSUFDdEQsV0FBVyxFQUFFLFlBQVksV0FBVztBQUNoQyxRQUFFO0FBQUEsUUFDRSxrQkFBZSxJQUFJLElBQUksT0FBSyxrQkFBZSxFQUFFLFFBQVEsa0JBQWUsS0FBSyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJO0FBQUEsTUFDekc7QUFBQSxJQUNKLFdBQVcsRUFBRSxRQUFRLENBQUMsTUFBTSxPQUFPLEVBQUUsWUFBWSxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sT0FBTyxFQUFFLFlBQVksS0FBSztBQUMvRixVQUFJLE9BQU8sRUFBRSxRQUFRLE1BQU0sUUFBUSxFQUFFLENBQUM7QUFDdEMsUUFBRSxjQUFjLHdCQUFrQixLQUFLLElBQUksQ0FBQztBQUFBLElBQ2hELFdBQVcsRUFBRSxZQUFZLGVBQWU7QUFDcEMsVUFBSSxRQUFRLGNBQWMsTUFBTTtBQUM1QixnQkFBUSxhQUFhO0FBQUEsTUFDekIsV0FBVyxRQUFRLGNBQWMsT0FBTztBQUNwQyxnQkFBUSxhQUFhO0FBQUEsTUFDekI7QUFDQSxxQkFBZTtBQUFBLElBQ25CLE9BQ0s7QUFDRCxRQUFFLGNBQWMsd0JBQXFCO0FBQ3JDLFFBQUUsY0FBYyxVQUFPLEVBQUUsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJlIiwgImUiXQp9Cg==
