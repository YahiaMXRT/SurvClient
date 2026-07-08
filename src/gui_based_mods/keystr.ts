import { toggles } from "../main";
// @ts-ignore: side-effect import so webpack can bundle and inject CSS
import './keystrokesCSS.css';

export var initkeystrokesCSS = () => {
    // CSS is imported at module load; with style-loader it will be injected automatically.
}

export var initKeystrokes = () => {
    const existing = document.getElementById("keystrokes_") as HTMLElement | null;
    if (toggles.keystrokes) {
        const keystrokes = existing ?? document.createElement("div");
        keystrokes.id = "keystrokes_";
        if (!existing) document.body.appendChild(keystrokes);

        // Only attach listeners once when creating the element
        if (!existing) {
            var keysPressed: { [key: string]: boolean } = { w: false, a: false, s: false, d: false };

            window.addEventListener("keydown", (e) => {
                const k = e.key.toLowerCase();
                if (!(k in keysPressed)) return;
                keysPressed[k] = true;
                keystrokes.innerHTML = `
                    <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ''}>${keysPressed.w ? "W" : "w"}</p></br>
                    <div style="display:flex;gap:10px;">
                        <p ${keysPressed.a ? 'class="lighter"' : ''}>${keysPressed.a ? "A" : "a"}</p></br>
                        <p ${keysPressed.s ? 'class="lighter"' : ''}>${keysPressed.s ? "S" : "s"}</p></br>
                        <p ${keysPressed.d ? 'class="lighter"' : ''}>${keysPressed.d ? "D" : "d"}</p></br>
                    </div>
                `;
            });

            window.addEventListener("keyup", (e) => {
                const k = e.key.toLowerCase();
                if (!(k in keysPressed)) return;
                keysPressed[k] = false;
                keystrokes.innerHTML = `
                    <p style="display:block">${keysPressed.w ? "W" : "w"}</p></br>
                    <div style="display:flex;gap:10px;">
                        <p>A: ${keysPressed.a ? "A" : "a"}</p></br>
                        <p>S: ${keysPressed.s ? "S" : "s"}</p></br>
                        <p>D: ${keysPressed.d ? "D" : "d"}</p></br>
                    </div>
                `;
            });
        }
    } else {
        const el = document.getElementById("keystrokes_");
        if (el) el.remove();
    }
}