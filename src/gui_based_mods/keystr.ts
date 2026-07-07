import { toggles } from "../main";
// @ts-ignore: Cannot find module or type declarations for side-effect import of './keystrokesCSS.css'
import './keystrokesCSS.css';
export var initkeystrokesCSS = () => {
    var a= document.createElement('link')
    a.rel = "stylesheet"
    a.href = "./keystrokesCSS.css"
    document.head.appendChild(a)
}
export var initKeystrokes = () => {
    if (toggles.keystrokes) {
        const keystrokes = document.createElement("div");
        document.body.appendChild(keystrokes);
        var keysPressed: { [key: string]: boolean } = {w: false, a: false, s: false, d: false};
        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = true
            } else {
                return;
            }
            keystrokes.innerHTML = `
                <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ''}>${keysPressed.w ? "W" : "w"}</p></br>
                <div style="display:flex;gap:10px;">
                    <p ${keysPressed.a ? 'class="lighter"' : ''}>${keysPressed.a ? "A" : "a"}</p></br>
                    <p ${keysPressed.s ? 'class="lighter"' : ''}>${keysPressed.s ? "S" : "s"}</p></br>
                    <p ${keysPressed.d ? 'class="lighter"' : ''}>${keysPressed.d ? "D" : "d"}</p></br>
                </div>
            `
        })

        window.addEventListener("keyup", (e) => {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = false;
            } else {
                return;
            }
            keystrokes.innerHTML = `
                <p style="display:block">${keysPressed.w ? "W" : "w"}</p></br>
                <div style="display:flex;gap:10px;">
                    <p>A: ${keysPressed.a ? "A" : "a"}</p></br>
                    <p>S: ${keysPressed.s ? "S" : "s"}</p></br>
                    <p>D: ${keysPressed.d ? "D" : "d"}</p></br>
                </div>
            `
        });
        
    } else if (toggles.keystrokes === false) {
        if (document.getElementById("keystrokes_")) {
            document.getElementById("keystrokes_")?.remove()
        } else {
            0
        }
    }
}