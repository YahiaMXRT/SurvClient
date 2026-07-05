(() => {
  // src/main.ts
  var m = ModAPI;
  var toggles = {
    fullbright: false
  };
  var playerLocation = {
    x: 0,
    y: 0,
    z: 0
  };
  m.addEventListener("sendpacketplayer", (e) => {
    playerLocation = {
      x: e.x,
      y: e.y,
      z: e.z
    };
  });
  var mcSettings = ModAPI.settings;
  m.settings.gammaSetting = 1;
  m.addEventListener("sendchatmessage", (e) => {
    if (!e.message.startsWith("!")) return;
    e.preventDefault = true;
    if (e.message === "!fb") {
      if (!toggles.fullbright) {
        toggles.fullbright = true;
        m.settings.gammaSetting = 1e3;
        m.displayToChat("\xA7a Fullbright enabled");
      } else {
        toggles.fullbright = false;
        m.settings.gammaSetting = 1;
        m.displayToChat("\xA7c Fullbright disabled");
      }
    } else if (e.message === "!help") {
      m.displayToChat(" \xA7k help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA71 !mode (fps, fancy)\n\xA7b !cLocation (Current Coordinates)");
    } else if (e.message.startsWith("!mode")) {
      var args = {
        a1: e.message.split(" ")[0],
        a2: e.message.split(" ")[1]
      };
      if (args.a2 == "fps") {
        mcSettings.renderDistanceChunks = 2;
        mcSettings.fog = false;
        mcSettings.mipmapLevels = 0;
        mcSettings.clouds = 0;
        mcSettings.viewBobbing = false;
        mcSettings.fancyGraphics = false;
        mcSettings.chunkFix = true;
        mcSettings.enableVsync = false;
      } else if (args.a2 == "fancy") {
        mcSettings.renderDistanceChunks = 8;
        mcSettings.fog = true;
        mcSettings.mipmapLevels = 3;
        mcSettings.clouds = 100;
        mcSettings.viewBobbing = true;
        mcSettings.fancyGraphics = true;
        mcSettings.chunkFix = true;
        mcSettings.enableVsync = false;
      } else {
        m.displayToChat("No mode exists with name: " + args.a2);
      }
    } else if (e.message === "!cLocation") {
      m.displayToChat("\xA75 Current Location");
      m.displayToChat("\xA74 X:" + playerLocation.x);
      m.displayToChat("\xA74 Y:" + playerLocation.y);
      m.displayToChat("\xA74 Z:" + playerLocation.z);
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5jb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xudmFyIHBsYXllckxvY2F0aW9uPXtcbiAgICB4OjAsXG4gICAgeTowLFxuICAgIHo6MFxufTtcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRwYWNrZXRwbGF5ZXJcIiwgKGU6YW55KSA9PiB7XG4gICAgcGxheWVyTG9jYXRpb24gPSB7XG4gICAgICAgIHg6IGUueCxcbiAgICAgICAgeTogZS55LFxuICAgICAgICB6OiBlLnpcbiAgICB9XG59KTtcbmNvbnN0IG1jU2V0dGluZ3MgPSBNb2RBUEkuc2V0dGluZ3Ncbm0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgKGU6IGFueSkgPT4ge1xuICAgIGlmICghZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhXCIpKSByZXR1cm47XG5cbiAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcblxuICAgIGlmIChlLm1lc3NhZ2UgPT09IFwiIWZiXCIpIHtcbiAgICAgICAgaWYgKCF0b2dnbGVzLmZ1bGxicmlnaHQpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IHRydWU7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEwMDAuMFxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBGdWxsYnJpZ2h0IGVuYWJsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIEZ1bGxicmlnaHQgZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhaGVscFwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIiBcdTAwQTdrIGhlbHBcXG5cdTAwQTczICFmYiAoRnVsbEJyaWdodClcXG5cdTAwQTcyICFoZWxwICh0aGlzIHRleHQpXFxuXHUwMEE3MSAhbW9kZSAoZnBzLCBmYW5jeSlcXG5cdTAwQTdiICFjTG9jYXRpb24gKEN1cnJlbnQgQ29vcmRpbmF0ZXMpXCIpXG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZS5zdGFydHNXaXRoKFwiIW1vZGVcIikpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSB7XG4gICAgICAgICAgICBhMTogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVswXSxcbiAgICAgICAgICAgIGEyOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzFdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MuYTIgPT0gXCJmcHNcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDJcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDAuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuYTIgPT0gXCJmYW5jeVwiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gOFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDMuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAxMDBcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJObyBtb2RlIGV4aXN0cyB3aXRoIG5hbWU6IFwiICsgYXJncy5hMilcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWNMb2NhdGlvblwiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBNzUgQ3VycmVudCBMb2NhdGlvblwiKVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc0IFg6XCIgKyBwbGF5ZXJMb2NhdGlvbi54KVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc0IFk6XCIgKyBwbGF5ZXJMb2NhdGlvbi55KVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc0IFo6XCIgKyBwbGF5ZXJMb2NhdGlvbi56KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBVbmtub3duIENvbW1hbmQ6XCIpXG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2NcIiArIGUubWVzc2FnZSlcbiAgICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLE1BQU0sSUFBSTtBQUNWLE1BQU0sVUFBVTtBQUFBLElBQ1osWUFBWTtBQUFBLEVBQ2hCO0FBQ0EsTUFBSSxpQkFBZTtBQUFBLElBQ2YsR0FBRTtBQUFBLElBQ0YsR0FBRTtBQUFBLElBQ0YsR0FBRTtBQUFBLEVBQ047QUFDQSxJQUFFLGlCQUFpQixvQkFBb0IsQ0FBQyxNQUFVO0FBQzlDLHFCQUFpQjtBQUFBLE1BQ2IsR0FBRyxFQUFFO0FBQUEsTUFDTCxHQUFHLEVBQUU7QUFBQSxNQUNMLEdBQUcsRUFBRTtBQUFBLElBQ1Q7QUFBQSxFQUNKLENBQUM7QUFDRCxNQUFNLGFBQWEsT0FBTztBQUMxQixJQUFFLFNBQVMsZUFBZTtBQUMxQixJQUFFLGlCQUFpQixtQkFBbUIsQ0FBQyxNQUFXO0FBQzlDLFFBQUksQ0FBQyxFQUFFLFFBQVEsV0FBVyxHQUFHLEVBQUc7QUFFaEMsTUFBRSxpQkFBaUI7QUFFbkIsUUFBSSxFQUFFLFlBQVksT0FBTztBQUNyQixVQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3JCLGdCQUFRLGFBQWE7QUFDckIsVUFBRSxTQUFTLGVBQWU7QUFDMUIsVUFBRSxjQUFjLDBCQUF1QjtBQUFBLE1BQzNDLE9BQU87QUFDSCxnQkFBUSxhQUFhO0FBQ3JCLFVBQUUsU0FBUyxlQUFlO0FBQzFCLFVBQUUsY0FBYywyQkFBd0I7QUFBQSxNQUM1QztBQUFBLElBQ0osV0FBVyxFQUFFLFlBQVksU0FBUztBQUM5QixRQUFFLGNBQWMsZ0lBQWlIO0FBQUEsSUFDckksV0FDUyxFQUFFLFFBQVEsV0FBVyxPQUFPLEdBQUc7QUFDcEMsVUFBSSxPQUFPO0FBQUEsUUFDUCxJQUFJLEVBQUUsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsUUFDMUIsSUFBSSxFQUFFLFFBQVEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLE1BQzlCO0FBQ0EsVUFBSSxLQUFLLE1BQU0sT0FBTztBQUNsQixtQkFBVyx1QkFBdUI7QUFDbEMsbUJBQVcsTUFBTTtBQUNqQixtQkFBVyxlQUFlO0FBQzFCLG1CQUFXLFNBQVM7QUFDcEIsbUJBQVcsY0FBYztBQUN6QixtQkFBVyxnQkFBZ0I7QUFDM0IsbUJBQVcsV0FBVztBQUN0QixtQkFBVyxjQUFjO0FBQUEsTUFDN0IsV0FDUyxLQUFLLE1BQU0sU0FBUztBQUN6QixtQkFBVyx1QkFBdUI7QUFDbEMsbUJBQVcsTUFBTTtBQUNqQixtQkFBVyxlQUFlO0FBQzFCLG1CQUFXLFNBQVM7QUFDcEIsbUJBQVcsY0FBYztBQUN6QixtQkFBVyxnQkFBZ0I7QUFDM0IsbUJBQVcsV0FBVztBQUN0QixtQkFBVyxjQUFjO0FBQUEsTUFDN0IsT0FBTztBQUNILFVBQUUsY0FBYywrQkFBK0IsS0FBSyxFQUFFO0FBQUEsTUFDMUQ7QUFBQSxJQUNKLFdBQ1MsRUFBRSxZQUFZLGNBQWM7QUFDakMsUUFBRSxjQUFjLHdCQUFxQjtBQUNyQyxRQUFFLGNBQWMsYUFBVSxlQUFlLENBQUM7QUFDMUMsUUFBRSxjQUFjLGFBQVUsZUFBZSxDQUFDO0FBQzFDLFFBQUUsY0FBYyxhQUFVLGVBQWUsQ0FBQztBQUFBLElBRTlDLE9BQU87QUFDSCxRQUFFLGNBQWMsd0JBQXFCO0FBQ3JDLFFBQUUsY0FBYyxVQUFPLEVBQUUsT0FBTztBQUFBLElBQ3BDO0FBQUEsRUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
