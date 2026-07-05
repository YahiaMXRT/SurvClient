// src/main.ts
var m = ModAPI;
var toggles = {
  fullbright: false
};
m.displayToChat("Client commands start with: !");
m.addEventListener("sendchatmessage", (e) => {
  if (!e.message.startsWith("!"))
    return;
  e.preventDefault = true;
  if (e.message === "!fb") {
    if (!toggles.fullbright) {
      toggles.fullbright = true;
      m.displayToChat("§9Fullbright enabled");
    } else {
      toggles.fullbright = false;
      m.displayToChat("§3Fullbright disabled");
    }
  }
});
