import { app, BrowserWindow, ipcMain, systemPreferences } from "electron";
import * as path from "path";
import { recognizeText } from "module-tessaract";
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
  const [_, body] = data.split(",");
  const buff = Buffer.from(body, "base64");
  const result = await recognizeText(buff);
  return result;
});
