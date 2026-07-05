// src/main.ts
var m = ModAPI;
m.addEventListener("sendchatmessage", (e) => {
  if (e.message[0] == "!") {
    e.preventDefault = true;
    if (e.message == "!fb on") {
      m.settings.gammaSetting = 1000;
    } else if (e.message == "!fb off") {
      m.settings.gammaSetting = 1;
    }
  }
});
