(() => {
  // src/main.ts
  var m = ModAPI;
  var toggles = {
    fullbright: false
  };
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
      m.displayToChat("\xA7khelp\n \xA73 !fb (FullBright)\n \xA72 !help (this text)");
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5cbmNvbnN0IHRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2Vcbn07XG5cbm0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wXG5cbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCAoZTogYW55KSA9PiB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuXG4gICAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgICAgICBpZiAoIXRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3a2hlbHBcXG4gXHUwMEE3MyAhZmIgKEZ1bGxCcmlnaHQpXFxuIFx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcIilcbiAgICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLE1BQU0sSUFBSTtBQUVWLE1BQU0sVUFBVTtBQUFBLElBQ1osWUFBWTtBQUFBLEVBQ2hCO0FBRUEsSUFBRSxTQUFTLGVBQWU7QUFFMUIsSUFBRSxpQkFBaUIsbUJBQW1CLENBQUMsTUFBVztBQUM5QyxRQUFJLENBQUMsRUFBRSxRQUFRLFdBQVcsR0FBRyxFQUFHO0FBRWhDLE1BQUUsaUJBQWlCO0FBRW5CLFFBQUksRUFBRSxZQUFZLE9BQU87QUFDckIsVUFBSSxDQUFDLFFBQVEsWUFBWTtBQUNyQixnQkFBUSxhQUFhO0FBQ3JCLFVBQUUsU0FBUyxlQUFlO0FBQzFCLFVBQUUsY0FBYywwQkFBdUI7QUFBQSxNQUMzQyxPQUFPO0FBQ0gsZ0JBQVEsYUFBYTtBQUNyQixVQUFFLFNBQVMsZUFBZTtBQUMxQixVQUFFLGNBQWMsMkJBQXdCO0FBQUEsTUFDNUM7QUFBQSxJQUNKLFdBQVcsRUFBRSxZQUFZLFNBQVM7QUFDOUIsUUFBRSxjQUFjLDhEQUFxRDtBQUFBLElBQ3pFO0FBQUEsRUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
