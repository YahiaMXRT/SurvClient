(() => {
  // src/gui_based_mods/keystr.ts
  var initkeystrokesCSS = () => {
    var a = document.createElement("link");
    a.rel = "stylesheet";
    a.href = "./keystrokesCSS.css";
    document.head.appendChild(a);
  };
  var initKeystrokes = () => {
    if (toggles.keystrokes) {
      const keystrokes = document.createElement("div");
      document.body.appendChild(keystrokes);
      var keysPressed = { w: false, a: false, s: false, d: false };
      window.addEventListener("keydown", (e2) => {
        if (e2.key.toLowerCase() in keysPressed) {
          keysPressed[e2.key.toLowerCase()] = true;
        } else {
          return;
        }
        keystrokes.innerHTML = `
                <p style="display:block">${keysPressed.w ? "W" : "w"}</p></br>
                <div style="display:flex;gap:10px;">
                    <p>A: ${keysPressed.a ? "A" : "a"}</p></br>
                    <p>S: ${keysPressed.s ? "S" : "s"}</p></br>
                    <p>D: ${keysPressed.d ? "D" : "d"}</p></br>
                </div>
            `;
      });
      window.addEventListener("keyup", (e2) => {
        if (e2.key.toLowerCase() in keysPressed) {
          keysPressed[e2.key.toLowerCase()] = false;
        } else {
          return;
        }
        keystrokes.innerHTML = `
                <p style="display:block">${keysPressed.w ? "W" : "w"}</p></br>
                <div style="display:flex;gap:10px;">
                    <p>A: ${keysPressed.a ? "A" : "a"}</p></br>
                    <p>S: ${keysPressed.s ? "S" : "s"}</p></br>
                    <p>D: ${keysPressed.d ? "D" : "d"}</p></br>
                </div>
            `;
      });
    } else if (toggles.keystrokes === false) {
      if (document.getElementById("keystrokes_")) {
        document.getElementById("keystrokes_")?.remove();
      } else {
        0;
      }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2tleXN0ci50cyIsICIuLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgdG9nZ2xlcyB9IGZyb20gXCIuLi9tYWluXCI7XG5leHBvcnQgdmFyIGluaXRrZXlzdHJva2VzQ1NTID0gKCkgPT4ge1xuICAgIHZhciBhPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICBhLnJlbCA9IFwic3R5bGVzaGVldFwiXG4gICAgYS5ocmVmID0gXCIuL2tleXN0cm9rZXNDU1MuY3NzXCJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGEpXG59XG5leHBvcnQgdmFyIGluaXRLZXlzdHJva2VzID0gKCkgPT4ge1xuICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMpIHtcbiAgICAgICAgY29uc3Qga2V5c3Ryb2tlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoa2V5c3Ryb2tlcyk7XG4gICAgICAgIHZhciBrZXlzUHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7dzogZmFsc2UsIGE6IGZhbHNlLCBzOiBmYWxzZSwgZDogZmFsc2V9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpIGluIGtleXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAga2V5c1ByZXNzZWRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXN0cm9rZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPiR7a2V5c1ByZXNzZWQudyA/IFwiV1wiIDogXCJ3XCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+QTogJHtrZXlzUHJlc3NlZC5hID8gXCJBXCIgOiBcImFcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPHA+UzogJHtrZXlzUHJlc3NlZC5zID8gXCJTXCIgOiBcInNcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPHA+RDogJHtrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfSlcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSBpbiBrZXlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGtleXNQcmVzc2VkW2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXN0cm9rZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPiR7a2V5c1ByZXNzZWQudyA/IFwiV1wiIDogXCJ3XCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+QTogJHtrZXlzUHJlc3NlZC5hID8gXCJBXCIgOiBcImFcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPHA+UzogJHtrZXlzUHJlc3NlZC5zID8gXCJTXCIgOiBcInNcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPHA+RDogJHtrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH0gZWxzZSBpZiAodG9nZ2xlcy5rZXlzdHJva2VzID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrZXlzdHJva2VzX1wiKT8ucmVtb3ZlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIDBcbiAgICAgICAgfVxuICAgIH1cbn0iLCAiaW1wb3J0IHsgaW5pdEtleXN0cm9rZXMsIGluaXRrZXlzdHJva2VzQ1NTIH0gZnJvbSBcIi4vZ3VpX2Jhc2VkX21vZHMva2V5c3RyXCI7XG5pbml0a2V5c3Ryb2tlc0NTUygpXG5jb25zdCBtID0gTW9kQVBJO1xuZXhwb3J0IGNvbnN0IHRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2UsXG4gICAga2V5c3Ryb2tlczogZmFsc2Vcbn07XG52YXIgZXYxOiBhbnlbXSA9IFtdO1xubGV0IGxhc3RMb2cgPSAwO1xuXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJldmVudFwiLCAoZTogYW55KSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChub3cgLSBsYXN0TG9nID49IDUwMDAwKSB7IC8vIDMwIHNlY29uZHNcbiAgICAgICAgbGFzdExvZyA9IG5vdztcblxuICAgICAgICBldjEucHVzaCh7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgICAgZXZlbnQ6IGUuZXZlbnQsXG4gICAgICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIGV2MS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5jb25zdCBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzXG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIChlOiBhbnkpID0+IHtcbiAgICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgXHUwMEE3bEZ1bGxicmlnaHQgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiBcdTAwQTdsIGhlbHBcXG5cdTAwQTczICFmYiAoRnVsbEJyaWdodClcXG5cdTAwQTcyICFoZWxwICh0aGlzIHRleHQpXFxuXHUwMEE3NiAha2V5c3Ryb2tlcyAoc2VsZiBleHBsYW5hdG9yeSlcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVxcblx1MDBBN2IgIXZlcnNpb24gKHNlbGYgZXhwbGFuYXRvcnkpXFxuXFxuIFx1MDBBN2wgREVWIFRPT0xTXFxuXHUwMEE3OCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIFx1MDBBNzcgIWRldmxvZyAobG9nIG9mIGV2ZW50cylcIilcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIilcbiAgICB7IFxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc5IEN1cnJlbnQgQ2xpZW50IFZlcnNpb246IDAuMC4xXCIpXG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcbiAgICAgICAgICAgIFwiXHUwMEE3ZCBMb2c6IFxcblwiICsgZXYxLm1hcChpID0+IFwiXHUwMEE3ZSBFdmVudDogXCIgKyBpLmV2ZW50ICsgXCJcXG5cdTAwQTdkIERhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShpLmRhdGEpKS5qb2luKFwiXFxuXCIpXG4gICAgICAgIClcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiYgZS5tZXNzYWdlID09PSBcInZcIiAmJiBlLm1lc3NhZ2VbMV0gPT09IFwiYVwiICYmIGUubWVzc2FnZSA9PT0gXCJsXCIpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2QgRXZhbDpcXG5cdTAwQTdlIFwiICsgZXZhbChjb2RlKSlcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIha2V5c3Ryb2tlc1wiKSB7XG4gICAgICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMua2V5c3Ryb2tlcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpbml0S2V5c3Ryb2tlcygpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFVua25vd24gQ29tbWFuZDpcIilcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3Y1wiICsgZS5tZXNzYWdlKVxuICAgIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQ08sTUFBSSxvQkFBb0IsTUFBTTtBQUNqQyxRQUFJLElBQUcsU0FBUyxjQUFjLE1BQU07QUFDcEMsTUFBRSxNQUFNO0FBQ1IsTUFBRSxPQUFPO0FBQ1QsYUFBUyxLQUFLLFlBQVksQ0FBQztBQUFBLEVBQy9CO0FBQ08sTUFBSSxpQkFBaUIsTUFBTTtBQUM5QixRQUFJLFFBQVEsWUFBWTtBQUNwQixZQUFNLGFBQWEsU0FBUyxjQUFjLEtBQUs7QUFDL0MsZUFBUyxLQUFLLFlBQVksVUFBVTtBQUNwQyxVQUFJLGNBQTBDLEVBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxNQUFLO0FBQ3JGLGFBQU8saUJBQWlCLFdBQVcsQ0FBQ0EsT0FBTTtBQUN0QyxZQUFJQSxHQUFFLElBQUksWUFBWSxLQUFLLGFBQWE7QUFDcEMsc0JBQVlBLEdBQUUsSUFBSSxZQUFZLENBQUMsSUFBSTtBQUFBLFFBQ3ZDLE9BQU87QUFDSDtBQUFBLFFBQ0o7QUFDQSxtQkFBVyxZQUFZO0FBQUEsMkNBQ1EsWUFBWSxJQUFJLE1BQU0sR0FBRztBQUFBO0FBQUEsNEJBRXhDLFlBQVksSUFBSSxNQUFNLEdBQUc7QUFBQSw0QkFDekIsWUFBWSxJQUFJ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
