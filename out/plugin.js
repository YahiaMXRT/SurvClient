(() => {
  // src/main.ts
  var m = ModAPI;
  var toggles = {
    fullbright: false
  };
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
      m.displayToChat(" \xA7k help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA71 !mode (fps, fancy)");
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
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5jb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xuY29uc3QgbWNTZXR0aW5ncyA9IE1vZEFQSS5zZXR0aW5nc1xubS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCAoZTogYW55KSA9PiB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuXG4gICAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgICAgICBpZiAoIXRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiIFx1MDBBN2sgaGVscFxcblx1MDBBNzMgIWZiIChGdWxsQnJpZ2h0KVxcblx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVwiKVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFtb2RlXCIpKSB7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICAgICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSAyXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDAuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmEyID09IFwiZmFuY3lcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDhcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMTAwXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpXG4gICAgICAgIH1cbiAgICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLE1BQU0sSUFBSTtBQUNWLE1BQU0sVUFBVTtBQUFBLElBQ1osWUFBWTtBQUFBLEVBQ2hCO0FBQ0EsTUFBTSxhQUFhLE9BQU87QUFDMUIsSUFBRSxTQUFTLGVBQWU7QUFDMUIsSUFBRSxpQkFBaUIsbUJBQW1CLENBQUMsTUFBVztBQUM5QyxRQUFJLENBQUMsRUFBRSxRQUFRLFdBQVcsR0FBRyxFQUFHO0FBRWhDLE1BQUUsaUJBQWlCO0FBRW5CLFFBQUksRUFBRSxZQUFZLE9BQU87QUFDckIsVUFBSSxDQUFDLFFBQVEsWUFBWTtBQUNyQixnQkFBUSxhQUFhO0FBQ3JCLFVBQUUsU0FBUyxlQUFlO0FBQzFCLFVBQUUsY0FBYywwQkFBdUI7QUFBQSxNQUMzQyxPQUFPO0FBQ0gsZ0JBQVEsYUFBYTtBQUNyQixVQUFFLFNBQVMsZUFBZTtBQUMxQixVQUFFLGNBQWMsMkJBQXdCO0FBQUEsTUFDNUM7QUFBQSxJQUNKLFdBQVcsRUFBRSxZQUFZLFNBQVM7QUFDOUIsUUFBRSxjQUFjLHdGQUE0RTtBQUFBLElBQ2hHLFdBQ1MsRUFBRSxRQUFRLFdBQVcsT0FBTyxHQUFHO0FBQ3BDLFVBQUksT0FBTztBQUFBLFFBQ1AsSUFBSSxFQUFFLFFBQVEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLFFBQzFCLElBQUksRUFBRSxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFBQSxNQUM5QjtBQUNBLFVBQUksS0FBSyxNQUFNLE9BQU87QUFDbEIsbUJBQVcsdUJBQXVCO0FBQ2xDLG1CQUFXLE1BQU07QUFDakIsbUJBQVcsZUFBZTtBQUMxQixtQkFBVyxTQUFTO0FBQ3BCLG1CQUFXLGNBQWM7QUFDekIsbUJBQVcsZ0JBQWdCO0FBQzNCLG1CQUFXLFdBQVc7QUFDdEIsbUJBQVcsY0FBYztBQUFBLE1BQzdCLFdBQ1MsS0FBSyxNQUFNLFNBQVM7QUFDekIsbUJBQVcsdUJBQXVCO0FBQ2xDLG1CQUFXLE1BQU07QUFDakIsbUJBQVcsZUFBZTtBQUMxQixtQkFBVyxTQUFTO0FBQ3BCLG1CQUFXLGNBQWM7QUFDekIsbUJBQVcsZ0JBQWdCO0FBQzNCLG1CQUFXLFdBQVc7QUFDdEIsbUJBQVcsY0FBYztBQUFBLE1BQzdCLE9BQU87QUFDSCxVQUFFLGNBQWMsK0JBQStCLEtBQUssRUFBRTtBQUFBLE1BQzFEO0FBQUEsSUFDSjtBQUFBLEVBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
