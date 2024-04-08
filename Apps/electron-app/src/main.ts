import { app, BrowserWindow, ipcMain, systemPreferences } from "electron";
import * as path from "path";
import { recognize } from "module-tessaract/src/Node/index";
function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 1500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("recognizeText", async (event, data: string) => {
  const result = await recognize(data);
  return result;
});
