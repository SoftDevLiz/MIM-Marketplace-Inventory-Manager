import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // The below are the necessary APIs for file importing and reading
    contextBridge.exposeInMainWorld('fileSystem', {openFileDialog: () => ipcRenderer.invoke('dialog:openFile'), 
    readFile: (filePath) => ipcRenderer.invoke('file:read', filePath)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
