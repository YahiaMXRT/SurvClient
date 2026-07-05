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
      m.displayToChat(" \xA7k help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA71 !mode (fps, fancy)\n\xA7b !version (self explanatory)");
    } else if (e.message.startsWith("!mode")) {
      var args = {
        a1: e.message.split(" ")[0],
        a2: e.message.split(" ")[1]
      };
      if (args.a2 == "fps") {
        mcSettings.renderDistanceChunks = 1;
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
    } else if (e.message === "!version") {
      m.displayToChat("\xA79 Current Client Version: 0.0.1");
    } else if (e.message === "!devlog") {
      m.displayToChat("\xA7d Log: \n" + m.javaClient);
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5jb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xuXG5jb25zdCBtY1NldHRpbmdzID0gTW9kQVBJLnNldHRpbmdzXG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxubS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIChlOiBhbnkpID0+IHtcbiAgICBpZiAoIWUubWVzc2FnZS5zdGFydHNXaXRoKFwiIVwiKSkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgICBpZiAoZS5tZXNzYWdlID09PSBcIiFmYlwiKSB7XG4gICAgICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2EgRnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBtLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMFxuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBGdWxsYnJpZ2h0IGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWhlbHBcIikge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCIgXHUwMEE3ayBoZWxwXFxuXHUwMEE3MyAhZmIgKEZ1bGxCcmlnaHQpXFxuXHUwMEE3MiAhaGVscCAodGhpcyB0ZXh0KVxcblx1MDBBNzEgIW1vZGUgKGZwcywgZmFuY3kpXFxuXHUwMEE3YiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcIilcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIXZlcnNpb25cIilcbiAgICB7IFxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc5IEN1cnJlbnQgQ2xpZW50IFZlcnNpb246IDAuMC4xXCIpXG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2QgTG9nOiBcXG5cIiArIG0uamF2YUNsaWVudClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgVW5rbm93biBDb21tYW5kOlwiKVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjXCIgKyBlLm1lc3NhZ2UpXG4gICAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxNQUFNLElBQUk7QUFDVixNQUFNLFVBQVU7QUFBQSxJQUNaLFlBQVk7QUFBQSxFQUNoQjtBQUVBLE1BQU0sYUFBYSxPQUFPO0FBQzFCLElBQUUsU0FBUyxlQUFlO0FBQzFCLElBQUUsaUJBQWlCLG1CQUFtQixDQUFDLE1BQVc7QUFDOUMsUUFBSSxDQUFDLEVBQUUsUUFBUSxXQUFXLEdBQUcsRUFBRztBQUVoQyxNQUFFLGlCQUFpQjtBQUVuQixRQUFJLEVBQUUsWUFBWSxPQUFPO0FBQ3JCLFVBQUksQ0FBQyxRQUFRLFlBQVk7QUFDckIsZ0JBQVEsYUFBYTtBQUNyQixVQUFFLFNBQVMsZUFBZTtBQUMxQixVQUFFLGNBQWMsMEJBQXVCO0FBQUEsTUFDM0MsT0FBTztBQUNILGdCQUFRLGFBQWE7QUFDckIsVUFBRSxTQUFTLGVBQWU7QUFDMUIsVUFBRSxjQUFjLDJCQUF3QjtBQUFBLE1BQzVDO0FBQUEsSUFDSixXQUFXLEVBQUUsWUFBWSxTQUFTO0FBQzlCLFFBQUUsY0FBYywySEFBNEc7QUFBQSxJQUNoSSxXQUNTLEVBQUUsUUFBUSxXQUFXLE9BQU8sR0FBRztBQUNwQyxVQUFJLE9BQU87QUFBQSxRQUNQLElBQUksRUFBRSxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFBQSxRQUMxQixJQUFJLEVBQUUsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFDOUI7QUFDQSxVQUFJLEtBQUssTUFBTSxPQUFPO0FBQ2xCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixXQUNTLEtBQUssTUFBTSxTQUFTO0FBQ3pCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixPQUFPO0FBQ0gsVUFBRSxjQUFjLCtCQUErQixLQUFLLEVBQUU7QUFBQSxNQUMxRDtBQUFBLElBQ0osV0FBVyxFQUFFLFlBQVksWUFDekI7QUFDSSxRQUFFLGNBQWMscUNBQWtDO0FBQUEsSUFDdEQsV0FBVyxFQUFFLFlBQVksV0FBVztBQUNoQyxRQUFFLGNBQWMsa0JBQWUsRUFBRSxVQUFVO0FBQUEsSUFDL0MsT0FDSztBQUNELFFBQUUsY0FBYyx3QkFBcUI7QUFDckMsUUFBRSxjQUFjLFVBQU8sRUFBRSxPQUFPO0FBQUEsSUFDcEM7QUFBQSxFQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
