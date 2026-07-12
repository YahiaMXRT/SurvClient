import { toggles } from "../main";
// @ts-ignore: side-effect import so webpack can bundle and inject CSS
import './keystrokesCSS.css';

let keystrokesElement: HTMLElement | null = null;
let keysPressed: { [key: string]: boolean } | null = null;
let listenersAttached = false;
let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;
let handleKeyUp: ((e: KeyboardEvent) => void) | null = null;
let handleMouseDown: ((e: MouseEvent) => void) | null = null;
let handleMouseUp: ((e: MouseEvent) => void) | null = null;
let handleContextMenu: ((e: MouseEvent) => void) | null = null;

export var initkeystrokesCSS = () => {
    // CSS is imported at module load; with style-loader it will be injected automatically.
}

const createDefaultKeyState = () => ({ w: false, a: false, s: false, d: false, lmb: false, rmb: false });

const renderKeystrokes = () => {
    if (!keystrokesElement) return;
    const state = keysPressed ?? createDefaultKeyState();
    keystrokesElement.innerHTML = `
        <p style="display:block" ${state.w ? 'class="lighter"' : ''}>${state.w ? "W" : "w"}</p></br>
        <div style="display:flex;gap:10px;">
            <p ${state.a ? 'class="lighter"' : ''}>${state.a ? "A" : "a"}</p></br>
            <p ${state.s ? 'class="lighter"' : ''}>${state.s ? "S" : "s"}</p></br>
            <p ${state.d ? 'class="lighter"' : ''}>${state.d ? "D" : "d"}</p></br>
        </div>
        <div style="display:flex;gap:10px;">
            <p ${state.lmb ? 'class="lighter"' : ''}>${state.lmb ? "LMB" : "lmb"}</p></br>
            <p ${state.rmb ? 'class="lighter"' : ''}>${state.rmb ? "RMB" : "rmb"}</p></br>
        </div>
    `;
};

const attachListeners = () => {
    if (listenersAttached) return;

    keysPressed = createDefaultKeyState();

    handleKeyDown = (e: KeyboardEvent) => {
        const k = e.key.toLowerCase();
        if (!keysPressed || !(k in keysPressed)) return;
        keysPressed[k] = true;
        renderKeystrokes();
    };

    handleKeyUp = (e: KeyboardEvent) => {
        const k = e.key.toLowerCase();
        if (!keysPressed || !(k in keysPressed)) return;
        keysPressed[k] = false;
        renderKeystrokes();
    };

    handleMouseDown = (e: MouseEvent) => {
        if (!keysPressed) return;
        if (e.button === 0) {
            keysPressed.lmb = true;
        } else if (e.button === 2) {
            keysPressed.rmb = true;
            e.preventDefault();
        }
        renderKeystrokes();
    };

    handleMouseUp = (e: MouseEvent) => {
        if (!keysPressed) return;
        if (e.button === 0) {
            keysPressed.lmb = false;
        } else if (e.button === 2) {
            keysPressed.rmb = false;
            e.preventDefault();
        }
        renderKeystrokes();
    };

    handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);
    listenersAttached = true;
};

const detachListeners = () => {
    if (!listenersAttached) return;

    if (handleKeyDown) window.removeEventListener("keydown", handleKeyDown);
    if (handleKeyUp) window.removeEventListener("keyup", handleKeyUp);
    if (handleMouseDown) document.removeEventListener("mousedown", handleMouseDown);
    if (handleMouseUp) document.removeEventListener("mouseup", handleMouseUp);
    if (handleContextMenu) window.removeEventListener("contextmenu", handleContextMenu);

    handleKeyDown = null;
    handleKeyUp = null;
    handleMouseDown = null;
    handleMouseUp = null;
    handleContextMenu = null;
    listenersAttached = false;
    keysPressed = null;
};

export var initKeystrokes = () => {
    if (!document.body) return;

    if (toggles.keystrokes) {
        attachListeners();

        const existing = document.getElementById("keystrokes_") as HTMLElement | null;
        if (existing) {
            keystrokesElement = existing;
        } else if (!keystrokesElement) {
            keystrokesElement = document.createElement("div");
            keystrokesElement.id = "keystrokes_";
            document.body.appendChild(keystrokesElement);
        }

        renderKeystrokes();
    } else {
        if (keystrokesElement && keystrokesElement.isConnected) {
            keystrokesElement.remove();
        }
        keystrokesElement = null;
        detachListeners();
    }
}