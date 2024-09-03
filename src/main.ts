// Main.ts controls the app window and app window lifecycle
const { app, BrowserWindow } = require('electron');
const path = require('node:path');

let win: InstanceType<typeof BrowserWindow> | null = null;

const createWindow = () => {
        win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173'); 
        } else {
            win.loadFile(path.join(__dirname, '../dist/index.html'));
        }

    win.on('closed', () => {
        win = null;
    });
}

// Electron can only create an app window after the ready event is fired. The below listens for it.
app.whenReady().then(() => {
    createWindow()
// MacOS apps run even when the windows are closed. The below calls createWindow when no app windows are found to be open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

// Listens for 'window-all-closed' event & quits the app if the user is not on MacOS (darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})