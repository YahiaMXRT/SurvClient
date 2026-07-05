const m = ModAPI;
const toggles = {
    fullbright: false,
    packetMoveDisabled: false
};
m.addEventListener("motionupdate", (e: any) => {
    e.preventDefault = toggles.packetMoveDisabled
})
const mcSettings = ModAPI.settings
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
        m.displayToChat(" §k help\n§3 !fb (FullBright)\n§2 !help (this text)\n§1 !mode (fps, fancy)\n§b !version (self explanatory)\n§8 !packetMove (toggles the sending of the motion packet)")
    }
    else if (e.message.startsWith("!mode")) {
        var args = {
            a1: e.message.split(" ")[0],
            a2: e.message.split(" ")[1]
        }
        if (args.a2 == "fps") {
            mcSettings.renderDistanceChunks = 2
            mcSettings.fog = false
            mcSettings.mipmapLevels = 0.0
            mcSettings.clouds = 0.0
            mcSettings.viewBobbing = false
            mcSettings.fancyGraphics = false
            mcSettings.chunkFix = true
            mcSettings.enableVsync = false
        }
        else if (args.a2 == "fancy") {
            mcSettings.renderDistanceChunks = 8
            mcSettings.fog = true
            mcSettings.mipmapLevels = 3.0
            mcSettings.clouds = 100
            mcSettings.viewBobbing = true
            mcSettings.fancyGraphics = true
            mcSettings.chunkFix = true
            mcSettings.enableVsync = false
        } else {
            m.displayToChat("No mode exists with name: " + args.a2)
        }
    } else if (e.message === "!version")
    { 
        m.displayToChat("§9 Current Client Version: 0.0.1")
    } else if (e.message == "!packetMove") {
        if (toggles.packetMoveDisabled === false) {
            toggles.packetMoveDisabled = true
        }
        if (toggles.packetMoveDisabled === true) {
            toggles.packetMoveDisabled = false
        }
    }
    else {
        m.displayToChat("§c Unknown Command:")
        m.displayToChat("§c" + e.message)
    }
});