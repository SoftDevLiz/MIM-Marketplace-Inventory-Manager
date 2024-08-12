// Main.ts controls the app window and app window lifecycle
import { app, BrowserWindow } from 'electron'
import * as path from 'node:path'

const createWindow = (): void => {
    const window: BrowserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('index.html')
}

// Electron can only create an app window after the ready event is fired. The below listens for it.
app.whenReady().then((): void => {
    createWindow()
// MacOS apps run even when the windows are closed. The below calls createWindow when no app windows are found to be open.
    app.on('activate', (): void => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

// Listens for 'window-all-closed' event & quits the app if the user is not on MacOS (darwin)
app.on('window-all-closed', (): void => {
    if (process.platform !== 'darwin') app.quit()
})