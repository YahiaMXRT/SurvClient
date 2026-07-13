// src/gui_based_mods/handler/handler.ts
var keysPressed = {
  w: false,
  a: false,
  s: false,
  d: false,
  lmb: false,
  rmb: false
};
var keystrokes;
var handleRender = () => {
  keystrokes.innerHTML = `
                    <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ""}>${keysPressed.w ? "W" : "w"}</p></br>
                    <div style="display:flex;gap:10px;">
                        <p ${keysPressed.a ? 'class="lighter"' : ""}>${keysPressed.a ? "A" : "a"}</p></br>
                        <p ${keysPressed.s ? 'class="lighter"' : ""}>${keysPressed.s ? "S" : "s"}</p></br>
                        <p ${keysPressed.d ? 'class="lighter"' : ""}>${keysPressed.d ? "D" : "d"}</p></br>
                    </div>
                    <div style="display:flex;gap:10px;"></div>
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
      keysPressed.lmb = false;
    } else if (e2.button === 2) {
      keysPressed.rmb = false;
    }
    handleRender();
  },
  keyUp: (e2) => {
    const k = e2.key.toLowerCase();
    if (!(k in keysPressed))
      return;
    keysPressed[k] = false;
    handleRender();
  },
  keyDown: (e2) => {
    const k = e2.key.toLowerCase();
    if (!(k in keysPressed))
      return;
    keysPressed[k] = true;
    handleRender();
  }
};

// src/gui_based_mods/keystr.ts
var initkeystrokesCSS = () => {};
var initKeystrokes = () => {
  const existing = document.getElementById("keystrokes_");
  if (toggles.keystrokes) {
    const keystrokes2 = existing ?? document.createElement("div");
    keystrokes2.id = "keystrokes_";
    if (!existing)
      document.body.appendChild(keystrokes2);
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
    document.removeEventListener("mousedown", handlers.mouseDown);
    document.removeEventListener("mousedown", handlers.mouseUp);
    if (el)
      el.remove();
  }
};

// src/gui_based_mods/fpsmod.ts
var fpsElement = null;
var updateHandler = null;
var renderFps = () => {
  if (!fpsElement)
    return;
  const fps = typeof ModAPI.getFPS === "function" ? ModAPI.getFPS() : 0;
  fpsElement.innerHTML = `<span class="fpsm-inner">${fps}</span>`;
};
var initFpsMod = () => {
  if (!document.body)
    return;
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
      m.displayToChat("§c §lKeystrokes disabled");
    } else if (toggles.keystrokes == false) {
      toggles.keystrokes = true;
      m.displayToChat("§a §lKeystrokes enabled");
    }
    initKeystrokes();
  } else if (e.message == "!fps") {
    if (toggles.fpsMod == true) {
      toggles.fpsMod = false;
      m.displayToChat("§c §lFPS mod disabled");
    } else if (toggles.fpsMod == false) {
      toggles.fpsMod = true;
      m.displayToChat("§a §lFPS mod enabled");
    }
    initFpsMod();
  } else {
    m.displayToChat("§c Unknown Command:");
    m.displayToChat("§c" + e.message);
  }
});
export {
  toggles
};
