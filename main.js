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




















// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX GPU - DOIT ÊTRE EN TOUT PREMIER (avant les imports)                  ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// const { app } = require('electron');

// // Désactiver l'accélération matérielle AVANT toute autre initialisation
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-sandbox');

// // MAINTENANT on peut importer le reste
// const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

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







































// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// // Forcer les variables d'environnement AVANT tout
// process.env.ELECTRON_DISABLE_GPU = '1';
// process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = '1';

// const { app } = require('electron');

// // Désactiver TOUT ce qui touche au GPU
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-dev-shm-usage');

// // MAINTENANT on peut importer le reste
// const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
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
//             preload: path.join(__dirname, 'preload.js'),
//             // Forcer le rendu software
//             offscreen: false,
//             enableWebSQL: false
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


















// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// // Forcer les variables d'environnement AVANT tout
// process.env.ELECTRON_DISABLE_GPU = '1';
// process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = '1';

// const { app } = require('electron');

// // Désactiver TOUT ce qui touche au GPU
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-dev-shm-usage');

// // Ignorer les erreurs de certificat (si nécessaire)
// app.commandLine.appendSwitch('ignore-certificate-errors');

// // MAINTENANT on peut importer le reste
// const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

// let mainWindow;
// let tray;
// let brightnessController;

// // function createWindow() {
// //     mainWindow = new BrowserWindow({
// //         width: 400,
// //         height: 300,
// //         resizable: false,
// //         frame: false,
// //         show: true, // ← CHANGÉ : afficher la fenêtre au démarrage
// //         skipTaskbar: false, // ← AJOUTÉ : montrer dans la barre des tâches
// //         webPreferences: {
// //             nodeIntegration: false,
// //             contextIsolation: true,
// //             preload: path.join(__dirname, 'preload.js'),
// //             offscreen: false,
// //             enableWebSQL: false
// //         }
// //     });

// //     mainWindow.loadFile('index.html');
    
// //     // ← MODIFIÉ : ne cacher que si on clique en dehors ET que la fenêtre est déjà visible
// //     mainWindow.on('blur', () => {
// //         // Attendre un peu avant de cacher (pour éviter de cacher au démarrage)
// //         setTimeout(() => {
// //             if (mainWindow && !mainWindow.webContents.isDevToolsOpened()) {
// //                 mainWindow.hide();
// //             }
// //         }, 100);
// //     });

// //     // ← AJOUTÉ : afficher la fenêtre une fois chargée
// //     mainWindow.once('ready-to-show', () => {
// //         mainWindow.show();
// //         mainWindow.focus();
// //         console.log('✅ Fenêtre affichée avec succès !');
// //     });

// //     // ← AJOUTÉ : Debug pour voir si le HTML se charge
// //     mainWindow.webContents.on('did-finish-load', () => {
// //         console.log('✅ index.html chargé !');
// //     });

// //     // ← AJOUTÉ : Capturer les erreurs
// //     mainWindow.webContents.on('crashed', () => {
// //         console.error('❌ La fenêtre a crashé !');
// //     });
// // }


// function createWindow() {
//     mainWindow = new BrowserWindow({
//         // width: 450,           // Taille par défaut un peu plus grande
//         // height: 550,
//         // minWidth: 360,        // Empêche de réduire trop petit → évite scroll
//         // minHeight: 480,
//         // resizable: true,      // ← ACTIVÉ : maintenant on peut resize
//         // frame: false,
//         // show: true,
//         // skipTaskbar: false,
//         // transparent: false,   // Garde false pour perf
//          width: 420,      // ✅ Un peu plus large
//     height: 680,     // ✅ Plus haut pour contenu
//     resizable: true, // ✅ ACTIVÉ ! 
//     minWidth: 320,   // ✅ MINIMUM MOBILE
//     minHeight: 400,  // ✅ MINIMUM HAUT
//     frame: false,
//     show: true,
//     skipTaskbar: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js'),
//             offscreen: false,
//             enableWebSQL: false
//         }
//     });

//     mainWindow.loadFile('index.html');

//     mainWindow.on('blur', () => {
//         setTimeout(() => {
//             if (mainWindow && !mainWindow.webContents.isDevToolsOpened()) {
//                 mainWindow.hide();
//             }
//         }, 100);
//     });

//     mainWindow.once('ready-to-show', () => {
//         mainWindow.show();
//         mainWindow.focus();
//     });

//     // Optionnel : centrer la fenêtre à l'ouverture
//     mainWindow.center();
// }

// function createTray() {
//     // ← MODIFIÉ : Créer une icône par défaut si le fichier n'existe pas
//     let iconPath;
//     try {
//         iconPath = path.join(__dirname, 'assets', 'icon.png');
//         // Si le fichier n'existe pas, utiliser une icône vide
//         const fs = require('fs');
//         if (!fs.existsSync(iconPath)) {
//             console.warn('⚠️ Icône non trouvée, utilisation de l\'icône par défaut');
//             iconPath = null;
//         }
//     } catch (e) {
//         iconPath = null;
//     }

//     // Créer une icône temporaire si besoin (pour Windows)
//     if (!iconPath) {
//         // Electron sur Windows nécessite une icône, on crée un fichier temporaire
//         const nativeImage = require('electron').nativeImage;
//         const image = nativeImage.createEmpty();
//         tray = new Tray(image);
//     } else {
//         tray = new Tray(iconPath);
//     }
    
//     const contextMenu = Menu.buildFromTemplate([
//         {
//             label: '🌤️ Ouvrir',
//             click: () => {
//                 mainWindow.show();
//                 mainWindow.focus();
//             }
//         },
//         {
//             label: '💡 Luminosité Rapide',
//             submenu: [
//                 { label: '🌑 0%', click: () => setBrightness(0) },
//                 { label: '🌘 25%', click: () => setBrightness(25) },
//                 { label: '🌗 50%', click: () => setBrightness(50) },
//                 { label: '🌖 75%', click: () => setBrightness(75) },
//                 { label: '🌕 100%', click: () => setBrightness(100) }
//             ]
//         },
//         { type: 'separator' },
//         {
//             label: '❌ Quitter',
//             click: () => {
//                 app.quit();
//             }
//         }
//     ]);
    
//     tray.setToolTip('Contrôle de Luminosité');
//     tray.setContextMenu(contextMenu);
    
//     tray.on('click', () => {
//         if (mainWindow.isVisible()) {
//             mainWindow.hide();
//         } else {
//             mainWindow.show();
//             mainWindow.focus();
//         }
//     });

//     console.log('✅ Tray créé avec succès !');
// }

// async function setBrightness(value) {
//     try {
//         await brightnessController.setBrightness(value);
//         if (mainWindow) {
//             mainWindow.webContents.send('brightness-updated', value);
//         }
//         console.log(`✅ Luminosité réglée à ${value}%`);
//     } catch (error) {
//         console.error('❌ Erreur lors du réglage:', error);
//     }
// }

// app.whenReady().then(() => {
//     console.log('🚀 Application démarrée !');
    
//     brightnessController = new BrightnessController();
//     createWindow();
//     createTray();
    
//     ipcMain.handle('get-brightness', async () => {
//         try {
//             const brightness = await brightnessController.getBrightness();
//             console.log(`📊 Luminosité actuelle: ${brightness}%`);
//             return brightness;
//         } catch (error) {
//             console.error('❌ Erreur get-brightness:', error);
//             return 50; // Valeur par défaut
//         }
//     });
    
//     ipcMain.handle('set-brightness', async (event, value) => {
//         try {
//             const result = await brightnessController.setBrightness(value);
//             console.log(`✅ Luminosité changée: ${value}%`);
//             return result;
//         } catch (error) {
//             console.error('❌ Erreur set-brightness:', error);
//             throw error;
//         }
//     });
    
//     ipcMain.handle('adjust-brightness', async (event, delta) => {
//         try {
//             const result = await brightnessController.adjustBrightness(delta);
//             console.log(`✅ Luminosité ajustée de ${delta}%`);
//             return result;
//         } catch (error) {
//             console.error('❌ Erreur adjust-brightness:', error);
//             throw error;
//         }
//     });
    
//     ipcMain.on('minimize', () => {
//         mainWindow.hide();
//     });
    
//     ipcMain.on('close', () => {
//         mainWindow.hide();
//     });
// });

// app.on('window-all-closed', () => {
//     // Ne pas quitter l'app quand on ferme la fenêtre (elle continue dans le tray)
//     // On garde l'app active pour le tray
//     console.log('ℹ️ Fenêtre fermée, app reste active dans le tray');
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// // ← AJOUTÉ : Capturer les erreurs non gérées
// process.on('uncaughtException', (error) => {
//     console.error('❌ Erreur non gérée:', error);
// });







































// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// Forcer les variables d'environnement AVANT tout
process.env.ELECTRON_DISABLE_GPU = '1';
process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = '1';

const { app, screen } = require('electron');

// Désactiver TOUT ce qui touche au GPU
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-dev-shm-usage');
app.commandLine.appendSwitch('ignore-certificate-errors');

// MAINTENANT on peut importer le reste
const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const BrightnessController = require('./brightness-control');

let mainWindow;
let tray;
let brightnessController;

function createWindow() {
    // Obtenir les dimensions de l'écran
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
    // Calculer la taille responsive (80% de l'écran avec min/max)
    const windowWidth = Math.min(500, Math.max(300, width * 0.4));
    const windowHeight = Math.min(600, Math.max(400, height * 0.5));
    
    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        minWidth: 280,
        minHeight: 680,
        maxWidth: 600,
        maxHeight: 700,
        resizable: true, // ← CHANGÉ : Permettre le redimensionnement pour le responsive
        frame: false,
        show: true,
        skipTaskbar: false,
        transparent: false,
        backgroundColor: '#667eea',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            offscreen: false,
            enableWebSQL: false,
            webSecurity: true
        }
    });

    mainWindow.loadFile('index.html');
    
    // Centrer la fenêtre
    mainWindow.center();
    
    // Optimiser la fenêtre pour le responsive
    mainWindow.on('resize', () => {
        // Forcer un redessin de la fenêtre
        mainWindow.webContents.send('window-resized');
    });
    
    // Gérer le blur (cacher quand on clique ailleurs)
    mainWindow.on('blur', () => {
        setTimeout(() => {
            if (mainWindow && !mainWindow.webContents.isDevToolsOpened()) {
                mainWindow.hide();
            }
        }, 100);
    });

    // Afficher la fenêtre une fois chargée
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
        console.log('✅ Fenêtre responsive affichée avec succès !');
    });

    // Debug
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('✅ index.html chargé !');
        console.log(`📐 Taille fenêtre: ${windowWidth}x${windowHeight}`);
    });
}

function createTray() {
    let iconPath;
    try {
        iconPath = path.join(__dirname, 'assets', 'icon.png');
        const fs = require('fs');
        if (!fs.existsSync(iconPath)) {
            console.warn('⚠️ Icône non trouvée, création icône par défaut');
            iconPath = null;
        }
    } catch (e) {
        iconPath = null;
    }

    if (!iconPath) {
        const nativeImage = require('electron').nativeImage;
        const image = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
        tray = new Tray(image || nativeImage.createEmpty());
    } else {
        tray = new Tray(iconPath);
    }
    
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '🌤️ Ouvrir',
            click: () => {
                mainWindow.show();
                mainWindow.focus();
            }
        },
        {
            label: '💡 Luminosité Rapide',
            submenu: [
                { label: '🌑 0%', click: () => setBrightness(0) },
                { label: '🌘 25%', click: () => setBrightness(25) },
                { label: '🌗 50%', click: () => setBrightness(50) },
                { label: '🌖 75%', click: () => setBrightness(75) },
                { label: '🌕 100%', click: () => setBrightness(100) }
            ]
        },
        {
            label: '📐 Mode Fenêtre',
            submenu: [
                { 
                    label: 'Petite (300x400)', 
                    click: () => mainWindow.setSize(300, 400) 
                },
                { 
                    label: 'Moyenne (400x500)', 
                    click: () => mainWindow.setSize(400, 500) 
                },
                { 
                    label: 'Grande (500x600)', 
                    click: () => mainWindow.setSize(500, 600) 
                }
            ]
        },
        { type: 'separator' },
        {
            label: '❌ Quitter',
            click: () => {
                app.quit();
            }
        }
    ]);
    
    tray.setToolTip('Contrôle de Luminosité Responsive');
    tray.setContextMenu(contextMenu);
    
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    console.log('✅ Tray créé avec succès !');
}

async function setBrightness(value) {
    try {
        await brightnessController.setBrightness(value);
        if (mainWindow) {
            mainWindow.webContents.send('brightness-updated', value);
        }
        console.log(`✅ Luminosité réglée à ${value}%`);
    } catch (error) {
        console.error('❌ Erreur lors du réglage:', error);
    }
}

app.whenReady().then(() => {
    console.log('🚀 Application démarrée !');
    
    brightnessController = new BrightnessController();
    createWindow();
    createTray();
    
    // Gestionnaires IPC
    ipcMain.handle('get-brightness', async () => {
        try {
            const brightness = await brightnessController.getBrightness();
            console.log(`📊 Luminosité actuelle: ${brightness}%`);
            return brightness;
        } catch (error) {
            console.error('❌ Erreur get-brightness:', error);
            return 50;
        }
    });
    
    ipcMain.handle('set-brightness', async (event, value) => {
        try {
            const result = await brightnessController.setBrightness(value);
            console.log(`✅ Luminosité changée: ${value}%`);
            return result;
        } catch (error) {
            console.error('❌ Erreur set-brightness:', error);
            throw error;
        }
    });
    
    ipcMain.handle('adjust-brightness', async (event, delta) => {
        try {
            const result = await brightnessController.adjustBrightness(delta);
            console.log(`✅ Luminosité ajustée de ${delta}%`);
            return result;
        } catch (error) {
            console.error('❌ Erreur adjust-brightness:', error);
            throw error;
        }
    });
    
    ipcMain.on('minimize', () => {
        mainWindow.hide();
    });
    
    ipcMain.on('close', () => {
        mainWindow.hide();
    });
    
    ipcMain.on('get-window-size', (event) => {
        const size = mainWindow.getSize();
        event.reply('window-size', size);
    });
});

app.on('window-all-closed', () => {
    // Garder l'app active pour le tray
    console.log('ℹ️ Fenêtre fermée, app reste active dans le tray');
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Gestion des erreurs
process.on('uncaughtException', (error) => {
    console.error('❌ Erreur non gérée:', error);
});