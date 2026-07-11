import {toggles} from "../main"

import './fpsmodCSS.css'
export var initFpsMod = () => {
    if (toggles.fpsMod == true) {
        var fps = document.createElement('div');
        fps.id = "fpsm_"
        ModAPI.addEventListener("update", () => {
            fps.innerHTML = `<span class="fpsm-inner">${ModAPI.getFPS()}</span>`
        })
        document.body.appendChild(fps)
    } else if (toggles.fpsMod == false) {
        if (document.getElementById("fpsm_")) {
            document.getElementById("fpsm_").remove()
        } else {
            return 0
        }
    }
}