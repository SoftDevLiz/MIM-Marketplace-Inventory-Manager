import { app, shell, BrowserWindow, ipcMain, dialog} from 'electron';
import { promises as fs } from 'fs';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  mainWindow.webContents.openDevTools({ mode: 'right' });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // Listens for the file dialog event
  ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select a file',
      filters: [
        {
          name: 'Spreadsheets',
          extensions: ['xls', 'xlsx', 'xlsb', 'csv'],
        },
      ],
      properties: ['openFile'],
    });

    return result.filePaths;
  });
}

// Listens for the readFile event if invoked from renderer
ipcMain.handle('file:read', async (event, filePath) => {
  try {
    // Read the file as a buffer
    const fileData = await fs.readFile(filePath);
    return fileData;
  } catch (error) {
    console.error("Error reading file (main):", error);
    throw error
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
