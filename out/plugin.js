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
                <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ""}>${keysPressed.w ? "W" : "w"}</p></br>
                <div style="display:flex;gap:10px;">
                    <p ${keysPressed.a ? 'class="lighter"' : ""}>${keysPressed.a ? "A" : "a"}</p></br>
                    <p ${keysPressed.s ? 'class="lighter"' : ""}>${keysPressed.s ? "S" : "s"}</p></br>
                    <p ${keysPressed.d ? 'class="lighter"' : ""}>${keysPressed.d ? "D" : "d"}</p></br>
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2tleXN0ci50cyIsICIuLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgdG9nZ2xlcyB9IGZyb20gXCIuLi9tYWluXCI7XG5leHBvcnQgdmFyIGluaXRrZXlzdHJva2VzQ1NTID0gKCkgPT4ge1xuICAgIHZhciBhPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICBhLnJlbCA9IFwic3R5bGVzaGVldFwiXG4gICAgYS5ocmVmID0gXCIuL2tleXN0cm9rZXNDU1MuY3NzXCJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGEpXG59XG5leHBvcnQgdmFyIGluaXRLZXlzdHJva2VzID0gKCkgPT4ge1xuICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMpIHtcbiAgICAgICAgY29uc3Qga2V5c3Ryb2tlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoa2V5c3Ryb2tlcyk7XG4gICAgICAgIHZhciBrZXlzUHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7dzogZmFsc2UsIGE6IGZhbHNlLCBzOiBmYWxzZSwgZDogZmFsc2V9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpIGluIGtleXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAga2V5c1ByZXNzZWRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXN0cm9rZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiICR7a2V5c1ByZXNzZWQudyA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtrZXlzUHJlc3NlZC53ID8gXCJXXCIgOiBcIndcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICA8cCAke2tleXNQcmVzc2VkLmEgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogJyd9PiR7a2V5c1ByZXNzZWQuYSA/IFwiQVwiIDogXCJhXCJ9PC9wPjwvYnI+XG4gICAgICAgICAgICAgICAgICAgIDxwICR7a2V5c1ByZXNzZWQucyA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiAnJ30+JHtrZXlzUHJlc3NlZC5zID8gXCJTXCIgOiBcInNcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICAgICAgPHAgJHtrZXlzUHJlc3NlZC5kID8gJ2NsYXNzPVwibGlnaHRlclwiJyA6ICcnfT4ke2tleXNQcmVzc2VkLmQgPyBcIkRcIiA6IFwiZFwifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICB9KVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpIGluIGtleXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAga2V5c1ByZXNzZWRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5c3Ryb2tlcy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+JHtrZXlzUHJlc3NlZC53ID8gXCJXXCIgOiBcIndcIn08L3A+PC9icj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICA8cD5BOiAke2tleXNQcmVzc2VkLmEgPyBcIkFcIiA6IFwiYVwifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgICAgICA8cD5TOiAke2tleXNQcmVzc2VkLnMgPyBcIlNcIiA6IFwic1wifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgICAgICA8cD5EOiAke2tleXNQcmVzc2VkLmQgPyBcIkRcIiA6IFwiZFwifTwvcD48L2JyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfSBlbHNlIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpPy5yZW1vdmUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgMFxuICAgICAgICB9XG4gICAgfVxufSIsICJpbXBvcnQgeyBpbml0S2V5c3Ryb2tlcywgaW5pdGtleXN0cm9rZXNDU1MgfSBmcm9tIFwiLi9ndWlfYmFzZWRfbW9kcy9rZXlzdHJcIjtcbmluaXRrZXlzdHJva2VzQ1NTKClcbmNvbnN0IG0gPSBNb2RBUEk7XG5leHBvcnQgY29uc3QgdG9nZ2xlcyA9IHtcbiAgICBmdWxsYnJpZ2h0OiBmYWxzZSxcbiAgICBrZXlzdHJva2VzOiBmYWxzZVxufTtcbnZhciBldjE6IGFueVtdID0gW107XG5sZXQgbGFzdExvZyA9IDA7XG5cbm0uYWRkRXZlbnRMaXN0ZW5lcihcImV2ZW50XCIsIChlOiBhbnkpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKG5vdyAtIGxhc3RMb2cgPj0gNTAwMDApIHsgLy8gMzAgc2Vjb25kc1xuICAgICAgICBsYXN0TG9nID0gbm93O1xuXG4gICAgICAgIGV2MS5wdXNoKHtcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgICBldmVudDogZS5ldmVudCxcbiAgICAgICAgICAgIGRhdGE6IGUuZGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXYxLmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgZXYxLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmNvbnN0IG1jU2V0dGluZ3MgPSBNb2RBUEkuc2V0dGluZ3Ncbm0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgKGU6IGFueSkgPT4ge1xuICAgIGlmICghZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhXCIpKSByZXR1cm47XG5cbiAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcblxuICAgIGlmIChlLm1lc3NhZ2UgPT09IFwiIWZiXCIpIHtcbiAgICAgICAgaWYgKCF0b2dnbGVzLmZ1bGxicmlnaHQpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IHRydWU7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEwMDAuMFxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBcdTAwQTdsRnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiIFx1MDBBN2wgaGVscFxcblx1MDBBNzMgIWZiIChGdWxsQnJpZ2h0KVxcblx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcXG5cdTAwQTc2ICFrZXlzdHJva2VzIChzZWxmIGV4cGxhbmF0b3J5KVxcblx1MDBBNzEgIW1vZGUgKGZwcywgZmFuY3kpXFxuXHUwMEE3YiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcXG5cXG4gXHUwMEE3bCBERVYgVE9PTFNcXG5cdTAwQTc4ICFldmFsIChydW4gSlMgY29kZSlcXG4gXHUwMEE3NyAhZGV2bG9nIChsb2cgb2YgZXZlbnRzKVwiKVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFtb2RlXCIpKSB7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICAgICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSAxXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDAuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmEyID09IFwiZmFuY3lcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDhcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMTAwXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhdmVyc2lvblwiKVxuICAgIHsgXG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBNzkgQ3VycmVudCBDbGllbnQgVmVyc2lvbjogMC4wLjFcIilcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhZGV2bG9nXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFxuICAgICAgICAgICAgXCJcdTAwQTdkIExvZzogXFxuXCIgKyBldjEubWFwKGkgPT4gXCJcdTAwQTdlIEV2ZW50OiBcIiArIGkuZXZlbnQgKyBcIlxcblx1MDBBN2QgRGF0YTpcIiArIEpTT04uc3RyaW5naWZ5KGkuZGF0YSkpLmpvaW4oXCJcXG5cIilcbiAgICAgICAgKVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlWzFdID09PSBcImVcIiAmJiBlLm1lc3NhZ2UgPT09IFwidlwiICYmIGUubWVzc2FnZVsxXSA9PT0gXCJhXCIgJiYgZS5tZXNzYWdlID09PSBcImxcIikge1xuICAgICAgICB2YXIgY29kZSA9IGUubWVzc2FnZS5zcGxpdChcIiFldmFsIFwiKVsxXTtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3ZCBFdmFsOlxcblx1MDBBN2UgXCIgKyBldmFsKGNvZGUpKVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFrZXlzdHJva2VzXCIpIHtcbiAgICAgICAgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0b2dnbGVzLmtleXN0cm9rZXMgPSBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGluaXRLZXlzdHJva2VzKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgVW5rbm93biBDb21tYW5kOlwiKVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjXCIgKyBlLm1lc3NhZ2UpXG4gICAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjs7QUFDTyxNQUFJLG9CQUFvQixNQUFNO0FBQ2pDLFFBQUksSUFBRyxTQUFTLGNBQWMsTUFBTTtBQUNwQyxNQUFFLE1BQU07QUFDUixNQUFFLE9BQU87QUFDVCxhQUFTLEtBQUssWUFBWSxDQUFDO0FBQUEsRUFDL0I7QUFDTyxNQUFJLGlCQUFpQixNQUFNO0FBQzlCLFFBQUksUUFBUSxZQUFZO0FBQ3BCLFlBQU0sYUFBYSxTQUFTLGNBQWMsS0FBSztBQUMvQyxlQUFTLEtBQUssWUFBWSxVQUFVO0FBQ3BDLFVBQUksY0FBMEMsRUFBQyxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLE1BQUs7QUFDckYsYUFBTyxpQkFBaUIsV0FBVyxDQUFDQSxPQUFNO0FBQ3RDLFlBQUlBLEdBQUUsSUFBSSxZQUFZLEtBQUssYUFBYTtBQUNwQyxz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
