// src/main.ts
var m = ModAPI;
var toggles = {
  fullbright: false
};
m.settings.gammaSetting = 1;
m.addEventListener("update", () => {
  m.drawString(m.getFPS(), 10, 0, 100);
});
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
§2 !help (this text)`);
  } else if (e.message === "!help") {}
});
