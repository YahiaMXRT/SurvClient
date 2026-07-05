const m = ModAPI;

m.addEventListener("sendchatmessage", (e: any) => {
    if (e.message[0] == "!") {
        e.preventDefault = true
        if (e.message == "!fb on") {
            m.settings.gammaSetting = 1000.0
        } else if (e.message == "!fb off") {
            m.settings.gammaSetting = 1.0
        }
    }
})