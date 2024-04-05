import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  recognizeText: async (data: string) => {
    return ipcRenderer.invoke("recognizeText", data);
  },
});
