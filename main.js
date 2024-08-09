const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('index.html')
}

// Electron can only create an app window after the ready event is fired. The below listens for it.
app.whenReady().then(() => {
    createWindow()
// MacOS apps run even when the windows are closed. The below calls createWindow when no app windows are found to be open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Listens for 'window-all-closed' event & quits the app if the user is not on MacOS (darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})