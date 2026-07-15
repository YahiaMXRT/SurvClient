import {toggles} from "../main"
// @ts-ignore: side-effect import so webpack can bundle and inject CSS
import './fpsmodCSS.css'

let fpsElement: HTMLDivElement | null = null;
let updateHandler: ((e?: any) => void) | null = null;
let Interval: any = null;

const renderFps = () => {
    if (!fpsElement) return;
    const fps = typeof ModAPI.getFPS === "function" ? ModAPI.getFPS() : 0;
    fpsElement.innerHTML = `<span class="fpsm-inner">${fps}</span>`;
}

export var initFpsMod = () => {
    if (!document.body) return;

    if (toggles.fpsMod) {
        if (!fpsElement) {
            fpsElement = document.createElement('div');
            fpsElement.id = "fpsm_";
            document.body.appendChild(fpsElement);
        }

        if (!updateHandler) {
            updateHandler = () => renderFps();
            Interval = setInterval(updateHandler,30);
        }

        renderFps();
    } else {
        if (updateHandler) {
            if (Interval) {
                clearInterval(Interval)
            }
        }

        if (fpsElement && fpsElement.isConnected) {
            fpsElement.remove();
        }

        fpsElement = null;
        updateHandler = null;
    }
}