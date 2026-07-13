import { toggles } from "../main";
import { 
    keysPressed, 
    handleRender, 
    handlers
} from "./handler/handler";
// @ts-ignore: side-effect import so webpack can bundle and inject CSS
import "./keystrokesCSS.css";
export var keystrokesRndr: HTMLElement;
export var initkeystrokesCSS = () => {
  // CSS is imported at module load; with style-loader it will be injected automatically.
};

export var initKeystrokes = () => {
  const existing = document.getElementById("keystrokes_") as HTMLElement | null;
  if (toggles.keystrokes) {
    const keystrokes = existing ?? document.createElement("div");    
    keystrokes.id = "keystrokes_";
    if (!existing) document.body.appendChild(keystrokes);
    keystrokesRndr = keystrokes
    // Only attach listeners once when creating the element
    if (!existing) {
      window.addEventListener("keydown", handlers.keyDown);

      window.addEventListener("keyup", handlers.keyUp);
      document.addEventListener("mousedown", handlers.mouseDown);
      document.addEventListener("mouseup", handlers.mouseUp);
    }
  } else {
    const el = document.getElementById("keystrokes_");
    window.removeEventListener("keydown", handlers.keyDown)
    window.removeEventListener("keyup", handlers.keyUp)
    document.removeEventListener("mousedown", handlers.mouseDown)
    document.removeEventListener("mouseup", handlers.mouseUp)
    if (el) el.remove();
  }
};
