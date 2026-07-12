import {toggles} from "../main"
var handler = (el: HTMLDivElement) => {
    el.innerHTML = `<span class="fpsm-inner">${ModAPI.getFPS()}</span>`
}
import './fpsmodCSS.css'
export var initFpsMod = () => {
    if (toggles.fpsMod == true) {
        var fps = document.createElement('div');
        fps.id = "fpsm_"
        var uHandler = () => handler(fps)
        var tempEvent = ModAPI.addEventListener("update", uHandler)
        document.body.appendChild(fps)
    } else if (toggles.fpsMod == false) {
        if (document.getElementById("fpsm_") && uHandler) {
            document.getElementById("fpsm_").remove()
            ModAPI.removeEventListener("update", uHandler)
        } else {
            return 0
        }
    }
}