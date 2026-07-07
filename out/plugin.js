(() => {
  // src/gui_based_mods/keystr.ts
  var initKeystrokes = () => {
    if (toggles.keystrokes) {
      const keystrokes = document.createElement("div");
      keystrokes.id = "keystrokes_";
      keystrokes.style.position = "absolute";
      keystrokes.style.top = "10px";
      keystrokes.style.display = "flex";
      keystrokes.style.flexDirection = "column";
      keystrokes.style.gap = "2px";
      keystrokes.style.justifyContent = "center";
      keystrokes.style.right = "10px";
      keystrokes.style.fontSize = "20px";
      keystrokes.style.color = "white";
      keystrokes.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      keystrokes.style.padding = "5px";
      keystrokes.style.borderRadius = "5px";
      document.body.appendChild(keystrokes);
      var keysPressed = { w: false, a: false, s: false, d: false };
      window.addEventListener("keydown", (e2) => {
        if (e2.key.toLowerCase() in keysPressed) {
          keysPressed[e2.key.toLowerCase()] = true;
        } else {
          return;
        }
        keystrokes.innerHTML = `
                <p style="display:block">W: ${keysPressed.w}</p></br>
                <div style="display:flex;gap:10px;">
                    <p>A: ${keysPressed.a}</p></br>
                    <p>S: ${keysPressed.s}</p></br>
                    <p>D: ${keysPressed.d}</p></br>
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
                <p style="display:block">W: ${keysPressed.w}</p></br>
                <div style="display:flex;gap:10px;">
                    <p>A: ${keysPressed.a}</p></br>
                    <p>S: ${keysPressed.s}</p></br>
                    <p>D: ${keysPressed.d}</p></br>
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2tleXN0ci50cyIsICIuLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgdG9nZ2xlcyB9IGZyb20gXCIuLi9tYWluXCI7XG5leHBvcnQgdmFyIGluaXRLZXlzdHJva2VzID0gKCkgPT4ge1xuICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMpIHtcbiAgICAgICAgY29uc3Qga2V5c3Ryb2tlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGtleXN0cm9rZXMuaWQgPSBcImtleXN0cm9rZXNfXCJcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS50b3AgPSBcIjEwcHhcIjtcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5kaXNwbGF5ID1cImZsZXhcIjtcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5mbGV4RGlyZWN0aW9uID0gXCJjb2x1bW5cIlxuICAgICAgICBrZXlzdHJva2VzLnN0eWxlLmdhcCA9IFwiMnB4XCJcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCJcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5yaWdodCA9IFwiMTBweFwiO1xuICAgICAgICBrZXlzdHJva2VzLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgICAgIGtleXN0cm9rZXMuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGtleXN0cm9rZXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5wYWRkaW5nID0gXCI1cHhcIjtcbiAgICAgICAga2V5c3Ryb2tlcy5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGtleXN0cm9rZXMpO1xuICAgICAgICB2YXIga2V5c1ByZXNzZWQ6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge3c6IGZhbHNlLCBhOiBmYWxzZSwgczogZmFsc2UsIGQ6IGZhbHNlfTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSBpbiBrZXlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGtleXNQcmVzc2VkW2Uua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzdHJva2VzLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj5XOiAke2tleXNQcmVzc2VkLnd9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+QTogJHtrZXlzUHJlc3NlZC5hfTwvcD48L2JyPlxuICAgICAgICAgICAgICAgICAgICA8cD5TOiAke2tleXNQcmVzc2VkLnN9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgIDxwPkQ6ICR7a2V5c1ByZXNzZWQuZH08L3A+PC9icj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfSlcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSBpbiBrZXlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGtleXNQcmVzc2VkW2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXN0cm9rZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPlc6ICR7a2V5c1ByZXNzZWQud308L3A+PC9icj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5BOiAke2tleXNQcmVzc2VkLmF9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlM6ICR7a2V5c1ByZXNzZWQuc308L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPHA+RDogJHtrZXlzUHJlc3NlZC5kfTwvcD48L2JyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfSBlbHNlIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpPy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgMFxuICAgICAgICB9XG4gICAgfVxufSIsICJpbXBvcnQgeyBpbml0S2V5c3Ryb2tlcyB9IGZyb20gXCIuL2d1aV9iYXNlZF9tb2RzL2tleXN0clwiO1xuXG5jb25zdCBtID0gTW9kQVBJO1xuZXhwb3J0IGNvbnN0IHRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2UsXG4gICAga2V5c3Ryb2tlczogZmFsc2Vcbn07XG52YXIgZXYxOiBhbnlbXSA9IFtdO1xubGV0IGxhc3RMb2cgPSAwO1xuXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJldmVudFwiLCAoZTogYW55KSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChub3cgLSBsYXN0TG9nID49IDUwMDAwKSB7IC8vIDMwIHNlY29uZHNcbiAgICAgICAgbGFzdExvZyA9IG5vdztcblxuICAgICAgICBldjEucHVzaCh7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgICAgZXZlbnQ6IGUuZXZlbnQsXG4gICAgICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIGV2MS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5jb25zdCBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzXG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIChlOiBhbnkpID0+IHtcbiAgICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgXHUwMEE3bEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgXHUwMEE3bEZ1bGxicmlnaHQgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiBcdTAwQTdsIGhlbHBcXG5cdTAwQTczICFmYiAoRnVsbEJyaWdodClcXG5cdTAwQTcyICFoZWxwICh0aGlzIHRleHQpXFxuXHUwMEE3NiAha2V5c3Ryb2tlcyAoc2VsZiBleHBsYW5hdG9yeSlcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVxcblx1MDBBN2IgIXZlcnNpb24gKHNlbGYgZXhwbGFuYXRvcnkpXFxuXFxuIFx1MDBBN2wgREVWIFRPT0xTXFxuXHUwMEE3OCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIFx1MDBBNzcgIWRldmxvZyAobG9nIG9mIGV2ZW50cylcIilcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIilcbiAgICB7IFxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc5IEN1cnJlbnQgQ2xpZW50IFZlcnNpb246IDAuMC4xXCIpXG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcbiAgICAgICAgICAgIFwiXHUwMEE3ZCBMb2c6IFxcblwiICsgZXYxLm1hcChpID0+IFwiXHUwMEE3ZSBFdmVudDogXCIgKyBpLmV2ZW50ICsgXCJcXG5cdTAwQTdkIERhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShpLmRhdGEpKS5qb2luKFwiXFxuXCIpXG4gICAgICAgIClcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiYgZS5tZXNzYWdlID09PSBcInZcIiAmJiBlLm1lc3NhZ2VbMV0gPT09IFwiYVwiICYmIGUubWVzc2FnZSA9PT0gXCJsXCIpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2QgRXZhbDpcXG5cdTAwQTdlIFwiICsgZXZhbChjb2RlKSlcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIha2V5c3Ryb2tlc1wiKSB7XG4gICAgICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMua2V5c3Ryb2tlcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpbml0S2V5c3Ryb2tlcygpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFVua25vd24gQ29tbWFuZDpcIilcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3Y1wiICsgZS5tZXNzYWdlKVxuICAgIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQ08sTUFBSSxpQkFBaUIsTUFBTTtBQUM5QixRQUFJLFFBQVEsWUFBWTtBQUNwQixZQUFNLGFBQWEsU0FBUyxjQUFjLEtBQUs7QUFDL0MsaUJBQVcsS0FBSztBQUNoQixpQkFBVyxNQUFNLFdBQVc7QUFDNUIsaUJBQVcsTUFBTSxNQUFNO0FBQ3ZCLGlCQUFXLE1BQU0sVUFBUztBQUMxQixpQkFBVyxNQUFNLGdCQUFnQjtBQUNqQyxpQkFBVyxNQUFNLE1BQU07QUFDdkIsaUJBQVcsTUFBTSxpQkFBaUI7QUFDbEMsaUJBQVcsTUFBTSxRQUFR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QUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFDOUI7QUFDQSxVQUFJLEtBQUssTUFBTSxPQUFPO0FBQ2xCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixXQUNTLEtBQUssTUFBTSxTQUFTO0FBQ3pCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixPQUFPO0FBQ0gsVUFBRSxjQUFjLCtCQUErQixLQUFLLEVBQUU7QUFBQSxNQUMxRDtBQUFBLElBQ0osV0FBVyxFQUFFLFlBQVksWUFDekI7QUFDSSxRQUFFLGNBQWMscUNBQWtDO0FBQUEsSUFDdEQsV0FBVyxFQUFFLFlBQVksV0FBVztBQUNoQyxRQUFFO0FBQUEsUUFDRSxrQkFBZSxJQUFJLElBQUksT0FBSyxrQkFBZSxFQUFFLFFBQVEsa0JBQWUsS0FBSyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJO0FBQUEsTUFDekc7QUFBQSxJQUNKLFdBQVcsRUFBRSxRQUFRLENBQUMsTUFBTSxPQUFPLEVBQUUsWUFBWSxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sT0FBTyxFQUFFLFlBQVksS0FBSztBQUMvRixVQUFJLE9BQU8sRUFBRSxRQUFRLE1BQU0sUUFBUSxFQUFFLENBQUM7QUFDdEMsUUFBRSxjQUFjLHdCQUFrQixLQUFLLElBQUksQ0FBQztBQUFBLElBQ2hELFdBQVcsRUFBRSxZQUFZLGVBQWU7QUFDcEMsVUFBSSxRQUFRLGNBQWMsTUFBTTtBQUM1QixnQkFBUSxhQUFhO0FBQUEsTUFDekIsV0FBVyxRQUFRLGNBQWMsT0FBTztBQUNwQyxnQkFBUSxhQUFhO0FBQUEsTUFDekI7QUFDQSxxQkFBZTtBQUFBLElBQ25CLE9BQ0s7QUFDRCxRQUFFLGNBQWMsd0JBQXFCO0FBQ3JDLFFBQUUsY0FBYyxVQUFPLEVBQUUsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJlIiwgImUiXQp9Cg==
