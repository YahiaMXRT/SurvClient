// src/main.ts
var m = ModAPI;
var toggles = {
  fullbright: false
};
m.addEventListener("sendchatmessage", (e) => {
  if (!e.message.startsWith("!"))
    return;
  e.preventDefault = true;
  if (e.message === "!fb") {
    if (!toggles.fullbright) {
      toggles.fullbright = true;
      m.settings.gammaSetting = 1000;
      m.displayToChat("§9Fullbright enabled");
    } else {
      toggles.fullbright = false;
      m.settings.gammaSetting = 0;
      m.displayToChat("§3Fullbright disabled");
    }
  }
});
