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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5jb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xuY29uc3QgbWNTZXR0aW5ncyA9IE1vZEFQSS5zZXR0aW5nc1xubS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCAoZTogYW55KSA9PiB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuXG4gICAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgICAgICBpZiAoIXRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiIFx1MDBBN2sgaGVscFxcblx1MDBBNzMgIWZiIChGdWxsQnJpZ2h0KVxcblx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVwiKVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFtb2RlXCIpKSB7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICAgICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDAuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuYTIgPT0gXCJmYW5jeVwiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gOFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDMuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAxMDBcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJObyBtb2RlIGV4aXN0cyB3aXRoIG5hbWU6IFwiICsgYXJncy5hMilcbiAgICAgICAgfVxuICAgIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsTUFBTSxJQUFJO0FBQ1YsTUFBTSxVQUFVO0FBQUEsSUFDWixZQUFZO0FBQUEsRUFDaEI7QUFDQSxNQUFNLGFBQWEsT0FBTztBQUMxQixJQUFFLFNBQVMsZUFBZTtBQUMxQixJQUFFLGlCQUFpQixtQkFBbUIsQ0FBQyxNQUFXO0FBQzlDLFFBQUksQ0FBQyxFQUFFLFFBQVEsV0FBVyxHQUFHLEVBQUc7QUFFaEMsTUFBRSxpQkFBaUI7QUFFbkIsUUFBSSxFQUFFLFlBQVksT0FBTztBQUNyQixVQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3JCLGdCQUFRLGFBQWE7QUFDckIsVUFBRSxTQUFTLGVBQWU7QUFDMUIsVUFBRSxjQUFjLDBCQUF1QjtBQUFBLE1BQzNDLE9BQU87QUFDSCxnQkFBUSxhQUFhO0FBQ3JCLFVBQUUsU0FBUyxlQUFlO0FBQzFCLFVBQUUsY0FBYywyQkFBd0I7QUFBQSxNQUM1QztBQUFBLElBQ0osV0FBVyxFQUFFLFlBQVksU0FBUztBQUM5QixRQUFFLGNBQWMsd0ZBQTRFO0FBQUEsSUFDaEcsV0FDUyxFQUFFLFFBQVEsV0FBVyxPQUFPLEdBQUc7QUFDcEMsVUFBSSxPQUFPO0FBQUEsUUFDUCxJQUFJLEVBQUUsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsUUFDMUIsSUFBSSxFQUFFLFFBQVEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLE1BQzlCO0FBQ0EsVUFBSSxLQUFLLE1BQU0sT0FBTztBQUNsQixtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixXQUNTLEtBQUssTUFBTSxTQUFTO0FBQ3pCLG1CQUFXLHVCQUF1QjtBQUNsQyxtQkFBVyxNQUFNO0FBQ2pCLG1CQUFXLGVBQWU7QUFDMUIsbUJBQVcsU0FBUztBQUNwQixtQkFBVyxjQUFjO0FBQ3pCLG1CQUFXLGdCQUFnQjtBQUMzQixtQkFBVyxXQUFXO0FBQ3RCLG1CQUFXLGNBQWM7QUFBQSxNQUM3QixPQUFPO0FBQ0gsVUFBRSxjQUFjLCtCQUErQixLQUFLLEVBQUU7QUFBQSxNQUMxRDtBQUFBLElBQ0o7QUFBQSxFQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
