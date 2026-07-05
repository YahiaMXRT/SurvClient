// src/main.ts
var m = ModAPI;
var toggles = {
  fullbright: false
};
var playerLocation = {
  x: 0,
  y: 0,
  z: 0
};
m.addEventListener("sendpacketplayer", (e) => {
  playerLocation = {
    x: e.x,
    y: e.y,
    z: e.z
  };
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
      m.displayToChat("§a Fullbright enabled");
    } else {
      toggles.fullbright = false;
      m.settings.gammaSetting = 1;
      m.displayToChat("§c Fullbright disabled");
    }
  } else if (e.message === "!help") {
    m.displayToChat(` §k help
§3 !fb (FullBright)
§2 !help (this text)
§1 !mode (fps, fancy)
§b !cLocation (Current Coordinates)`);
  } else if (e.message.startsWith("!mode")) {
    var args = {
      a1: e.message.split(" ")[0],
      a2: e.message.split(" ")[1]
    };
    if (args.a2 == "fps") {
      mcSettings.renderDistanceChunks = 2;
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
  } else if (e.message === "!cLocation") {
    m.displayToChat(`§10Current location
§4 X: ` + playerLocation.x + `
§4 Y: ` + playerLocation.y + `
§4 Z: ` + playerLocation.z);
  }
});
