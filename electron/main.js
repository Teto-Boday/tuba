// برنامج طُوبَى للويندوز: بيفتح التطبيق، وبيفضل في شريط المهام عشان تنبيه الأذان يوصل في معاده.
const { app, BrowserWindow, Tray, Menu, shell, nativeImage, session } = require("electron");
const path = require("path");
const URL = "https://teto-boday.github.io/tuba/app/";
let win, tray, quitting = false;
if (!app.requestSingleInstanceLock()) app.quit();
app.setAppUserModelId("app.tuba.teto");
function create(show = true) {
  win = new BrowserWindow({ width: 460, height: 860, minWidth: 360, show, title: "طُوبَى", icon: path.join(__dirname, "icon.png"), autoHideMenuBar: true, backgroundColor: "#F7F4EC", webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: false } });
  win.loadURL(URL);
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: "deny" }; });
  win.on("close", (e) => { if (!quitting) { e.preventDefault(); win.hide(); } });
}
app.on("second-instance", () => { if (win) { win.show(); win.focus(); } });
app.whenReady().then(async () => {
  await session.defaultSession.clearCache().catch(() => {});
  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => cb(permission === "notifications" || permission === "geolocation"));
  app.setLoginItemSettings({ openAtLogin: true, args: ["--hidden"] });
  create(!process.argv.includes("--hidden"));
  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "icon.png")).resize({ width: 16, height: 16 }));
  tray.setToolTip("طُوبَى");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "افتح طُوبَى", click: () => { win.show(); win.focus(); } },
    { label: "خروج", click: () => { quitting = true; app.quit(); } }
  ]));
  tray.on("click", () => { win.show(); win.focus(); });
});
app.on("before-quit", () => { quitting = true; });
