const m = ModAPI;
const toggles = {
    fullbright: false
};
var playerLocation={
    x: Number,
    y: Number,
    z: Number
};
m.addEventListener("sendpacketplayer", (e:any) => {
    playerLocation = {
        x: e.x,
        y: e.y,
        z: e.z
    }
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
        m.displayToChat(" §k help\n§3 !fb (FullBright)\n§2 !help (this text)\n§1 !mode (fps, fancy)\n§b !cLocation (Current Coordinates)")
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
    }
    else if (e.message === "!cLocation") {
        m.displayToChat(`§10Current location\n§4 X: ${playerLocation.x}\n§4 Y: ${playerLocation.y}\n§4 Z: ${playerLocation.z}`)
    }
});