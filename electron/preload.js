// بيقول للتطبيق لو Nono's World متثبّت على نفس الكمبيوتر، عشان واحد بس هو اللي يأذّن
const { contextBridge } = require("electron");
const fs = require("fs"), path = require("path");
const base = process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "Programs") : "";
const hasNonos = !!base && ["Nono's World", "nonos-world-desktop"].some((d) => { try { return fs.existsSync(path.join(base, d)); } catch (e) { return false; } });
contextBridge.exposeInMainWorld("tubaDesktop", { hasNonos });
