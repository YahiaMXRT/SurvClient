const m = ModAPI;
const toggles = {
    fullbright: false
};
var ev1: any[] = [];
let lastLog = 0;

m.addEventListener("event", (e: any) => {
    const now = Date.now();

    if (now - lastLog >= 50000) { // 30 seconds
        lastLog = now;

        ev1.push({
            time: new Date().toLocaleTimeString(),
            event: e.event,
            data: e.data
        });

        if (ev1.length > 100) {
            ev1.shift();
        }
    }
});
const mcSettings = ModAPI.settings
m.settings.gammaSetting = 1.0
m.addEventListener("sendchatmessage", (e: any) => {
    if (!e.message.startsWith("!")) return;

    e.preventDefault = true;

    if (e.message === "!fb") {
        if (!toggles.fullbright) {
            toggles.fullbright = true;
            m.settings.gammaSetting = 1000.0
            m.displayToChat("§a §lFullbright enabled");
        } else {
            toggles.fullbright = false;
            m.settings.gammaSetting = 1.0
            m.displayToChat("§c §lFullbright disabled");
        }
    } else if (e.message === "!help") {
        m.displayToChat(" §l help\n§3 !fb (FullBright)\n§2 !help (this text)\n§1 !mode (fps, fancy)\n§b !version (self explanatory)\n\n §l DEV TOOLS\n§8 !eval (run JS code)\n §7 !devlog (log of events)")
    }
    else if (e.message.startsWith("!mode")) {
        var args = {
            a1: e.message.split(" ")[0],
            a2: e.message.split(" ")[1]
        }
        if (args.a2 == "fps") {
            mcSettings.renderDistanceChunks = 1
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
    } else if (e.message === "!devlog") {
        m.displayToChat(
            "§d Log: \n" + ev1.map(i => "§e Event: " + i.event + "\n§d Data:" + JSON.stringify(i.data)).join("\n")
        )
    } else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
        var code = e.message.split("!eval ")[1];
        m.displayToChat("§d Eval:\n§e " + eval(code))
    }
    else {
        m.displayToChat("§c Unknown Command:")
        m.displayToChat("§c" + e.message)
    }
});