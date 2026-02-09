// const { app, BrowserWindow, Tray, Menu, ipcMain, nativeTheme } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

// let mainWindow;
// let tray;
// let brightnessController;

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 400,
//         height: 300,
//         resizable: false,
//         frame: false,
//         show: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js')
//         }
//     });

//     mainWindow.loadFile('index.html');
    
//     mainWindow.on('blur', () => {
//         mainWindow.hide();
//     });
// }

// function createTray() {
//     const iconPath = path.join(__dirname, 'assets', 'icon.png');
    
//     tray = new Tray(iconPath || path.join(__dirname, 'icon.png'));
    
//     const contextMenu = Menu.buildFromTemplate([
//         {
//             label: 'Ouvrir',
//             click: () => {
//                 mainWindow.show();
//                 mainWindow.focus();
//             }
//         },
//         {
//             label: 'Luminosité Rapide',
//             submenu: [
//                 { label: '25%', click: () => setBrightness(25) },
//                 { label: '50%', click: () => setBrightness(50) },
//                 { label: '75%', click: () => setBrightness(75) },
//                 { label: '100%', click: () => setBrightness(100) }
//             ]
//         },
//         { type: 'separator' },
//         {
//             label: 'Quitter',
//             click: () => {
//                 app.quit();
//             }
//         }
//     ]);
    
//     tray.setToolTip('Contrôle de Luminosité');
//     tray.setContextMenu(contextMenu);
    
//     tray.on('click', () => {
//         mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
//     });
// }

// async function setBrightness(value) {
//     try {
//         await brightnessController.setBrightness(value);
//         if (mainWindow) {
//             mainWindow.webContents.send('brightness-updated', value);
//         }
//     } catch (error) {
//         console.error('Erreur:', error);
//     }
// }

// app.whenReady().then(() => {
//     brightnessController = new BrightnessController();
//     createWindow();
//     createTray();
    
//     ipcMain.handle('get-brightness', async () => {
//         return await brightnessController.getBrightness();
//     });
    
//     ipcMain.handle('set-brightness', async (event, value) => {
//         return await brightnessController.setBrightness(value);
//     });
    
//     ipcMain.handle('adjust-brightness', async (event, delta) => {
//         return await brightnessController.adjustBrightness(delta);
//     });
    
//     ipcMain.on('minimize', () => {
//         mainWindow.hide();
//     });
    
//     ipcMain.on('close', () => {
//         mainWindow.hide();
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });



















// const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX POUR L'ERREUR GPU : exit_code=-1073740791                            ║
// // ║  Désactive l'accélération matérielle pour éviter le crash sur GPU hybrides    ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// // Solution 1 : Désactiver complètement l'accélération matérielle (RECOMMANDÉ)
// app.disableHardwareAcceleration();

// // Solution 2 : Désactiver le sandbox GPU (sécurisé, à combiner avec Solution 1)
// app.commandLine.appendSwitch('disable-gpu-sandbox');

// // Solution 3 (optionnel) : Désactiver le sandbox complet si le problème persiste
// // Décommente la ligne suivante si les solutions 1+2 ne fonctionnent pas :
// // app.commandLine.appendSwitch('no-sandbox');

// // Alternative : Limiter le GPU pour plus de stabilité
// app.commandLine.appendSwitch('disable-software-rasterizer');

// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  RESTE DU CODE (inchangé)                                                    ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// let mainWindow;
// let tray;
// let brightnessController;

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 400,
//         height: 300,
//         resizable: false,
//         frame: false,
//         show: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js')
//         }
//     });

//     mainWindow.loadFile('index.html');
    
//     // Décommente pour ouvrir les DevTools (utile pour debug)
//     // mainWindow.webContents.openDevTools({ mode: 'detach' });
    
//     mainWindow.on('blur', () => {
//         mainWindow.hide();
//     });
// }

// function createTray() {
//     const iconPath = path.join(__dirname, 'assets', 'icon.png');
    
//     tray = new Tray(iconPath || path.join(__dirname, 'icon.png'));
    
//     const contextMenu = Menu.buildFromTemplate([
//         {
//             label: 'Ouvrir',
//             click: () => {
//                 mainWindow.show();
//                 mainWindow.focus();
//             }
//         },
//         {
//             label: 'Luminosité Rapide',
//             submenu: [
//                 { label: '25%', click: () => setBrightness(25) },
//                 { label: '50%', click: () => setBrightness(50) },
//                 { label: '75%', click: () => setBrightness(75) },
//                 { label: '100%', click: () => setBrightness(100) }
//             ]
//         },
//         { type: 'separator' },
//         {
//             label: 'Quitter',
//             click: () => {
//                 app.quit();
//             }
//         }
//     ]);
    
//     tray.setToolTip('Contrôle de Luminosité');
//     tray.setContextMenu(contextMenu);
    
//     tray.on('click', () => {
//         mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
//     });
// }

// async function setBrightness(value) {
//     try {
//         await brightnessController.setBrightness(value);
//         if (mainWindow) {
//             mainWindow.webContents.send('brightness-updated', value);
//         }
//     } catch (error) {
//         console.error('Erreur:', error);
//     }
// }

// app.whenReady().then(() => {
//     brightnessController = new BrightnessController();
//     createWindow();
//     createTray();
    
//     ipcMain.handle('get-brightness', async () => {
//         return await brightnessController.getBrightness();
//     });
    
//     ipcMain.handle('set-brightness', async (event, value) => {
//         return await brightnessController.setBrightness(value);
//     });
    
//     ipcMain.handle('adjust-brightness', async (event, delta) => {
//         return await brightnessController.adjustBrightness(delta);
//     });
    
//     ipcMain.on('minimize', () => {
//         mainWindow.hide();
//     });
    
//     ipcMain.on('close', () => {
//         mainWindow.hide();
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });




















// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  🛠️ FIX GPU - DOIT ÊTRE EN TOUT PREMIER (avant les imports)                  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const { app } = require('electron');

// Désactiver l'accélération matérielle AVANT toute autre initialisation
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-sandbox');

// MAINTENANT on peut importer le reste
const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const BrightnessController = require('./brightness-control');

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  RESTE DU CODE (inchangé)                                                    ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

let mainWindow;
let tray;
let brightnessController;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
    
    // Décommente pour ouvrir les DevTools (utile pour debug)
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
    
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });
}

function createTray() {
    const iconPath = path.join(__dirname, 'assets', 'icon.png');
    
    tray = new Tray(iconPath || path.join(__dirname, 'icon.png'));
    
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Ouvrir',
            click: () => {
                mainWindow.show();
                mainWindow.focus();
            }
        },
        {
            label: 'Luminosité Rapide',
            submenu: [
                { label: '25%', click: () => setBrightness(25) },
                { label: '50%', click: () => setBrightness(50) },
                { label: '75%', click: () => setBrightness(75) },
                { label: '100%', click: () => setBrightness(100) }
            ]
        },
        { type: 'separator' },
        {
            label: 'Quitter',
            click: () => {
                app.quit();
            }
        }
    ]);
    
    tray.setToolTip('Contrôle de Luminosité');
    tray.setContextMenu(contextMenu);
    
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

async function setBrightness(value) {
    try {
        await brightnessController.setBrightness(value);
        if (mainWindow) {
            mainWindow.webContents.send('brightness-updated', value);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

app.whenReady().then(() => {
    brightnessController = new BrightnessController();
    createWindow();
    createTray();
    
    ipcMain.handle('get-brightness', async () => {
        return await brightnessController.getBrightness();
    });
    
    ipcMain.handle('set-brightness', async (event, value) => {
        return await brightnessController.setBrightness(value);
    });
    
    ipcMain.handle('adjust-brightness', async (event, delta) => {
        return await brightnessController.adjustBrightness(delta);
    });
    
    ipcMain.on('minimize', () => {
        mainWindow.hide();
    });
    
    ipcMain.on('close', () => {
        mainWindow.hide();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});