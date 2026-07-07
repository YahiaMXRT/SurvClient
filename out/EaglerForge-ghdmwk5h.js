// src/gui_based_mods/keystr.ts
var a = document.createElement("link");
a.rel = "stylesheet";
a.href = "./keystrokesCSS.css";
document.head.appendChild(a);
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
  if (now - lastLog >= 50000) {
    lastLog = now;
    ev1.push({
      time: new Date().toLocaleTimeString(),
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
  if (!e.message.startsWith("!"))
    return;
  e.preventDefault = true;
  if (e.message === "!fb") {
    if (!toggles.fullbright) {
      toggles.fullbright = true;
      m.settings.gammaSetting = 1000;
      m.displayToChat("§a §lFullbright enabled");
    } else {
      toggles.fullbright = false;
      m.settings.gammaSetting = 1;
      m.displayToChat("§c §lFullbright disabled");
    }
  } else if (e.message === "!help") {
    m.displayToChat(` §l help
§3 !fb (FullBright)
§2 !help (this text)
§6 !keystrokes (self explanatory)
§1 !mode (fps, fancy)
§b !version (self explanatory)

 §l DEV TOOLS
§8 !eval (run JS code)
 §7 !devlog (log of events)`);
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
    m.displayToChat("§9 Current Client Version: 0.0.1");
  } else if (e.message === "!devlog") {
    m.displayToChat(`§d Log: 
` + ev1.map((i) => "§e Event: " + i.event + `
§d Data:` + JSON.stringify(i.data)).join(`
`));
  } else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
    var code = e.message.split("!eval ")[1];
    m.displayToChat(`§d Eval:
§e ` + eval(code));
  } else if (e.message === "!keystrokes") {
    if (toggles.keystrokes == true) {
      toggles.keystrokes = false;
    } else if (toggles.keystrokes == false) {
      toggles.keystrokes = true;
    }
    initKeystrokes();
  } else {
    m.displayToChat("§c Unknown Command:");
    m.displayToChat("§c" + e.message);
  }
});
export {
  toggles
};
