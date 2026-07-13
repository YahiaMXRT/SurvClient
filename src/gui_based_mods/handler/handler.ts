import { keystrokesRndr } from "../keystr";
export var keysPressed: { [key: string]: boolean } = {
  w: false,
  a: false,
  s: false,
  d: false,
  lmb: false,
  rmb: false,
};

export var handleRender = () => {
  keystrokesRndr.innerHTML = `
                    <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ""}>${keysPressed.w ? "W" : "w"}</p></br>
                    <div style="display:flex;gap:10px;">
                        <p ${keysPressed.a ? 'class="lighter"' : ""}>${keysPressed.a ? "A" : "a"}</p></br>
                        <p ${keysPressed.s ? 'class="lighter"' : ""}>${keysPressed.s ? "S" : "s"}</p></br>
                        <p ${keysPressed.d ? 'class="lighter"' : ""}>${keysPressed.d ? "D" : "d"}</p></br>
                    </div>
                    <div style="display:flex;gap:10px;"></div>
                        <p ${keysPressed.lmb ? 'class="lighter"' : ""}>${keysPressed.lmb ? "LMB" : "lmb"}</p></br>
                        <p ${keysPressed.rmb ? 'class="lighter"' : ""}>${keysPressed.rmb ? "RMB" : "rmb"}</p></br>
                    </div>
                    `;
};
export var handlers = {
  mouseUp: (e: MouseEvent) => {
    if (e.button === 0) {
      keysPressed.lmb = false;
    } else if (e.button === 2) {
      keysPressed.rmb = false;
    }
    handleRender();
  },
  mouseDown: (e: MouseEvent) => {
    if (e.button === 0) {
      keysPressed.lmb = false;
    } else if (e.button === 2) {
      keysPressed.rmb = false;
    }
    handleRender();
  },
  keyUp: (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (!(k in keysPressed)) return;
    keysPressed[k] = false;
    handleRender();
  },
  keyDown: (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (!(k in keysPressed)) return;
    keysPressed[k] = true;
    handleRender();
  },
};
