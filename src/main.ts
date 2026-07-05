const m = ModAPI;

const toggles = {
    fullbright: false
};

m.settings.gammaSetting = 1.0

m.addEventListener("sendchatmessage", (e: any) => {
    if (!e.message.startsWith("!")) return;

    e.preventDefault = true;

    if (e.message === "!fb") {
        if (!toggles.fullbright) {
            toggles.fullbright = true;
            m.settings.gammaSetting = 1000.0
            m.displayToChat("§a Fullbright enabled");
        } else {
            toggles.fullbright = false;
            m.settings.gammaSetting = 1.0
            m.displayToChat("§c Fullbright disabled");
        }
    } else if (e.message === "!help") {
        m.displayToChat("   help   \n§3 !fb (FullBright)\n §2 !help (this text)")
    }
});