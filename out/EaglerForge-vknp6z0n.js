/* src/gui_based_mods/keystrokesCSS.css */
#keystrokes_ {
  position: absolute;
  z-index: 9999;
  display: flex;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: #f4f7ff;
  backdrop-filter: blur(6px);
  pointer-events: none;
  background: #0a0e18d1;
  border: 1px solid #ffffff24;
  border-radius: 14px;
  flex-direction: column;
  justify-content: center;
  align-items:  center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 18px;
  font-weight: 700;
  bottom: 14px;
  left: 14px;
  box-shadow: 0 8px 24px #00000059;
}

#keystrokes_ p {
  display: flex;
  text-align: center;
  background: #ffffff1f;
  border: 1px solid #ffffff14;
  border-radius: 8px;
  justify-content: center;
  align-items:  center;
  width: 34px;
  height: 20px;
  margin: 0;
  padding: 10px 8px;
  transition: background-color .15s, transform .15s, color .15s;
  box-shadow: inset 0 1px #ffffff14;
}

#keystrokes_ p.lighter {
  color: #10131a;
  transform: translateY(-1px);
  box-shadow: 0 0 10px #fff3;
  background-color: #fffc !important;
}

/* src/gui_based_mods/fpsmodCSS.css */
#fpsm_ {
  position: absolute;
  z-index: 9999;
  display: flex;
  color: #f6fbff;
  letter-spacing: .04em;
  backdrop-filter: blur(5px);
  pointer-events: none;
  background: linear-gradient(135deg, #329898f2, #184e60e6);
  border: 1px solid #ffffff29;
  border-radius: 999px;
  justify-content: center;
  align-items:  center;
  min-width: 56px;
  height: 36px;
  padding: 0 12px;
  font-weight: 700;
  top: 16px;
  right: 16px;
  box-shadow: 0 8px 24px #00000047;
}

#fpsm_ .fpsm-inner {
  font-size: 14px;
  line-height: 1;
}
