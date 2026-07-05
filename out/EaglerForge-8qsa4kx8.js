// src/main.ts
var m = ModAPI;
var toggles = {
  fullbright: false
};
m.displayToChat("Client Command has to start with: !");
m.addEventListener("sendchatmessage", (e) => {
  if (e.message[0] == "!") {
    e.preventDefault = true;
    if (e.message == "!fb") {
      if (toggles.fullbright == false) {
        m.displayToChat("§9 Fullbright enabled");
        toggles.fullbright = true;
      }
      if (toggles.fullbright == true) {
        m.displayToChat("§3 Fullbright disabled");
        toggles.fullbright = false;
      }
    }
  }
});
