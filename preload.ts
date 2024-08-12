// Preload.ts bridges the gap between the main process and the renderer processes, it also exposes a few Node API's, the DOM, and a few Electron API's

// To add features to your renderer that require privileged access, you can define global objects through the contextBridge API
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})