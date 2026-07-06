/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
var m = ModAPI;
var toggles = {
    fullbright: false
};
var ev1 = [];
var lastLog = 0;
m.addEventListener("event", function (e) {
    var now = Date.now();
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
var mcSettings = ModAPI.settings;
m.settings.gammaSetting = 1.0;
m.addEventListener("sendchatmessage", function (e) {
    if (!e.message.startsWith("!"))
        return;
    e.preventDefault = true;
    if (e.message === "!fb") {
        if (!toggles.fullbright) {
            toggles.fullbright = true;
            m.settings.gammaSetting = 1000.0;
            m.displayToChat("§a §lFullbright enabled");
        }
        else {
            toggles.fullbright = false;
            m.settings.gammaSetting = 1.0;
            m.displayToChat("§c §lFullbright disabled");
        }
    }
    else if (e.message === "!help") {
        m.displayToChat(" §l help\n§3 !fb (FullBright)\n§2 !help (this text)\n§1 !mode (fps, fancy)\n§b !version (self explanatory)\n\n §l DEV TOOLS\n§8 !eval (run JS code)\n §7 !devlog (log of events)");
    }
    else if (e.message.startsWith("!mode")) {
        var args = {
            a1: e.message.split(" ")[0],
            a2: e.message.split(" ")[1]
        };
        if (args.a2 == "fps") {
            mcSettings.renderDistanceChunks = 1;
            mcSettings.fog = false;
            mcSettings.mipmapLevels = 0.0;
            mcSettings.clouds = 0.0;
            mcSettings.viewBobbing = false;
            mcSettings.fancyGraphics = false;
            mcSettings.chunkFix = true;
            mcSettings.enableVsync = false;
        }
        else if (args.a2 == "fancy") {
            mcSettings.renderDistanceChunks = 8;
            mcSettings.fog = true;
            mcSettings.mipmapLevels = 3.0;
            mcSettings.clouds = 100;
            mcSettings.viewBobbing = true;
            mcSettings.fancyGraphics = true;
            mcSettings.chunkFix = true;
            mcSettings.enableVsync = false;
        }
        else {
            m.displayToChat("No mode exists with name: " + args.a2);
        }
    }
    else if (e.message === "!version") {
        m.displayToChat("§9 Current Client Version: 0.0.1");
    }
    else if (e.message === "!devlog") {
        m.displayToChat("§d Log: \n" + ev1.map(function (i) { return "§e Event: " + i.event + "\n§d Data:" + JSON.stringify(i.data); }).join("\n"));
    }
    else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
        var code = e.message.split("!eval ")[1];
        m.displayToChat("§d Eval:\n§e " + eval(code));
    }
    else {
        m.displayToChat("§c Unknown Command:");
        m.displayToChat("§c" + e.message);
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELHdFQUF3RTtBQUN0STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU3VydkNsaWVudC4vLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbSA9IE1vZEFQSTtcbnZhciB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xudmFyIGV2MSA9IFtdO1xudmFyIGxhc3RMb2cgPSAwO1xubS5hZGRFdmVudExpc3RlbmVyKFwiZXZlbnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAobm93IC0gbGFzdExvZyA+PSA1MDAwMCkgeyAvLyAzMCBzZWNvbmRzXG4gICAgICAgIGxhc3RMb2cgPSBub3c7XG4gICAgICAgIGV2MS5wdXNoKHtcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgICBldmVudDogZS5ldmVudCxcbiAgICAgICAgICAgIGRhdGE6IGUuZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGV2MS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIGV2MS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG52YXIgbWNTZXR0aW5ncyA9IE1vZEFQSS5zZXR0aW5ncztcbm0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wO1xubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpXG4gICAgICAgIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjA7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2EgwqdsRnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMDtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnYyDCp2xGdWxsYnJpZ2h0IGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiDCp2wgaGVscFxcbsKnMyAhZmIgKEZ1bGxCcmlnaHQpXFxuwqcyICFoZWxwICh0aGlzIHRleHQpXFxuwqcxICFtb2RlIChmcHMsIGZhbmN5KVxcbsKnYiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcXG5cXG4gwqdsIERFViBUT09MU1xcbsKnOCAhZXZhbCAocnVuIEpTIGNvZGUpXFxuIMKnNyAhZGV2bG9nIChsb2cgb2YgZXZlbnRzKVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFyZ3MuYTIgPT0gXCJmcHNcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDE7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IGZhbHNlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjA7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDAuMDtcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWU7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4O1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjA7XG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMDtcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZTtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlO1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhdmVyc2lvblwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnOSBDdXJyZW50IENsaWVudCBWZXJzaW9uOiAwLjAuMVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFkZXZsb2dcIikge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCLCp2QgTG9nOiBcXG5cIiArIGV2MS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIFwiwqdlIEV2ZW50OiBcIiArIGkuZXZlbnQgKyBcIlxcbsKnZCBEYXRhOlwiICsgSlNPTi5zdHJpbmdpZnkoaS5kYXRhKTsgfSkuam9pbihcIlxcblwiKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiYgZS5tZXNzYWdlID09PSBcInZcIiAmJiBlLm1lc3NhZ2VbMV0gPT09IFwiYVwiICYmIGUubWVzc2FnZSA9PT0gXCJsXCIpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnZCBFdmFsOlxcbsKnZSBcIiArIGV2YWwoY29kZSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiwqdjIFVua25vd24gQ29tbWFuZDpcIik7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIsKnY1wiICsgZS5tZXNzYWdlKTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==