import { toggles } from "../main";
export var initKeystrokes = () => {
    if (toggles.keystrokes) {
        const keystrokes = document.createElement("div");
        keystrokes.id = "keystrokes_"
        keystrokes.style.position = "absolute";
        keystrokes.style.top = "10px";
        keystrokes.style.display ="flex";
        keystrokes.style.flexDirection = "column"
        keystrokes.style.gap = "2px"
        keystrokes.style.justifyContent = "center"
        keystrokes.style.right = "10px";
        keystrokes.style.fontSize = "20px";
        keystrokes.style.color = "white";
        keystrokes.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        keystrokes.style.padding = "5px";
        keystrokes.style.borderRadius = "5px";
        document.body.appendChild(keystrokes);
        var keysPressed: { [key: string]: boolean } = {w: false, a: false, s: false, d: false};
        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() in keysPressed) {
                keysPressed[e.key.toLowerCase()] = true
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