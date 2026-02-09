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







































// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// // Forcer les variables d'environnement AVANT tout
// process.env.ELECTRON_DISABLE_GPU = '1';
// process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = '1';

// const { app, screen } = require('electron');

// // Désactiver TOUT ce qui touche au GPU
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-dev-shm-usage');
// app.commandLine.appendSwitch('ignore-certificate-errors');

// // MAINTENANT on peut importer le reste
// const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

// let mainWindow;
// let tray;
// let brightnessController;

// function createWindow() {
//     // Obtenir les dimensions de l'écran
//     const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
//     // Calculer la taille responsive (80% de l'écran avec min/max)
//     const windowWidth = Math.min(500, Math.max(300, width * 0.4));
//     const windowHeight = Math.min(600, Math.max(400, height * 0.5));
    
//     mainWindow = new BrowserWindow({
//         width: windowWidth,
//         height: windowHeight,
//         minWidth: 280,
//         minHeight: 680,
//         maxWidth: 600,
//         maxHeight: 700,
//         resizable: true, // ← CHANGÉ : Permettre le redimensionnement pour le responsive
//         frame: false,
//         show: true,
//         skipTaskbar: false,
//         transparent: false,
//         backgroundColor: '#667eea',
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js'),
//             offscreen: false,
//             enableWebSQL: false,
//             webSecurity: true
//         }
//     });

//     mainWindow.loadFile('index.html');
    
//     // Centrer la fenêtre
//     mainWindow.center();
    
//     // Optimiser la fenêtre pour le responsive
//     mainWindow.on('resize', () => {
//         // Forcer un redessin de la fenêtre
//         mainWindow.webContents.send('window-resized');
//     });
    
//     // Gérer le blur (cacher quand on clique ailleurs)
//     mainWindow.on('blur', () => {
//         setTimeout(() => {
//             if (mainWindow && !mainWindow.webContents.isDevToolsOpened()) {
//                 mainWindow.hide();
//             }
//         }, 100);
//     });

//     // Afficher la fenêtre une fois chargée
//     mainWindow.once('ready-to-show', () => {
//         mainWindow.show();
//         mainWindow.focus();
//         console.log('✅ Fenêtre responsive affichée avec succès !');
//     });

//     // Debug
//     mainWindow.webContents.on('did-finish-load', () => {
//         console.log('✅ index.html chargé !');
//         console.log(`📐 Taille fenêtre: ${windowWidth}x${windowHeight}`);
//     });
// }

// function createTray() {
//     let iconPath;
//     try {
//         iconPath = path.join(__dirname, 'assets', 'icon.png');
//         const fs = require('fs');
//         if (!fs.existsSync(iconPath)) {
//             console.warn('⚠️ Icône non trouvée, création icône par défaut');
//             iconPath = null;
//         }
//     } catch (e) {
//         iconPath = null;
//     }

//     if (!iconPath) {
//         const nativeImage = require('electron').nativeImage;
//         const image = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
//         tray = new Tray(image || nativeImage.createEmpty());
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
//         {
//             label: '📐 Mode Fenêtre',
//             submenu: [
//                 { 
//                     label: 'Petite (300x400)', 
//                     click: () => mainWindow.setSize(300, 400) 
//                 },
//                 { 
//                     label: 'Moyenne (400x500)', 
//                     click: () => mainWindow.setSize(400, 500) 
//                 },
//                 { 
//                     label: 'Grande (500x600)', 
//                     click: () => mainWindow.setSize(500, 600) 
//                 }
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
    
//     tray.setToolTip('Contrôle de Luminosité Responsive');
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
    
//     // Gestionnaires IPC
//     ipcMain.handle('get-brightness', async () => {
//         try {
//             const brightness = await brightnessController.getBrightness();
//             console.log(`📊 Luminosité actuelle: ${brightness}%`);
//             return brightness;
//         } catch (error) {
//             console.error('❌ Erreur get-brightness:', error);
//             return 50;
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
    
//     ipcMain.on('get-window-size', (event) => {
//         const size = mainWindow.getSize();
//         event.reply('window-size', size);
//     });
// });

// app.on('window-all-closed', () => {
//     // Garder l'app active pour le tray
//     console.log('ℹ️ Fenêtre fermée, app reste active dans le tray');
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// // Gestion des erreurs
// process.on('uncaughtException', (error) => {
//     console.error('❌ Erreur non gérée:', error);
// });



































// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// // Forcer les variables d'environnement AVANT tout
// process.env.ELECTRON_DISABLE_GPU = '1';
// process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = '1';

// const { app, screen } = require('electron');

// // Désactiver TOUT ce qui touche au GPU
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-dev-shm-usage');
// app.commandLine.appendSwitch('ignore-certificate-errors');

// // MAINTENANT on peut importer le reste
// const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

// let mainWindow;
// let tray;
// let brightnessController;

// function createWindow() {
//     // Obtenir les dimensions de l'écran
//     const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
//     // Calculer la taille responsive (80% de l'écran avec min/max)
//     const windowWidth = Math.min(500, Math.max(300, width * 0.4));
//     const windowHeight = Math.min(600, Math.max(400, height * 0.5));
    
//     mainWindow = new BrowserWindow({
//         width: windowWidth,
//         height: windowHeight,
//         minWidth: 280,
//         minHeight: 680,
//         maxWidth: 600,
//         maxHeight: 700,
//         resizable: true,
//         frame: false,
//         show: true,
//         skipTaskbar: false,
//         transparent: false,
//         backgroundColor: '#667eea',
//         alwaysOnTop: false, // ← La fenêtre ne reste pas au-dessus
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js'),
//             offscreen: false,
//             enableWebSQL: false,
//             webSecurity: true
//         }
//     });

//     mainWindow.loadFile('index.html');
    
//     // Centrer la fenêtre
//     mainWindow.center();
    
//     // Optimiser la fenêtre pour le responsive
//     mainWindow.on('resize', () => {
//         mainWindow.webContents.send('window-resized');
//     });
    
//     // ← SUPPRIMÉ : Plus de masquage automatique au blur
//     // La fenêtre se comporte comme une app normale maintenant

//     // Afficher la fenêtre une fois chargée
//     mainWindow.once('ready-to-show', () => {
//         mainWindow.show();
//         mainWindow.focus();
//         console.log('✅ Fenêtre responsive affichée avec succès !');
//     });

//     mainWindow.webContents.on('did-finish-load', () => {
//         console.log('✅ index.html chargé !');
//         console.log(`📐 Taille fenêtre: ${windowWidth}x${windowHeight}`);
//     });
// }

// function createTray() {
//     let iconPath;
//     try {
//         iconPath = path.join(__dirname, 'assets', 'icon.png');
//         const fs = require('fs');
//         if (!fs.existsSync(iconPath)) {
//             console.warn('⚠️ Icône non trouvée, création icône par défaut');
//             iconPath = null;
//         }
//     } catch (e) {
//         iconPath = null;
//     }

//     if (!iconPath) {
//         const nativeImage = require('electron').nativeImage;
//         const image = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
//         tray = new Tray(image || nativeImage.createEmpty());
//     } else {
//         tray = new Tray(iconPath);
//     }
    
//     const contextMenu = Menu.buildFromTemplate([
//         {
//             label: '🌤️ Afficher/Masquer',
//             click: () => {
//                 if (mainWindow.isVisible()) {
//                     mainWindow.hide();
//                 } else {
//                     mainWindow.show();
//                     mainWindow.focus();
//                 }
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
//         {
//             label: '📐 Mode Fenêtre',
//             submenu: [
//                 { 
//                     label: 'Petite (300x400)', 
//                     click: () => {
//                         mainWindow.setSize(300, 400);
//                         mainWindow.center();
//                     }
//                 },
//                 { 
//                     label: 'Moyenne (400x500)', 
//                     click: () => {
//                         mainWindow.setSize(400, 500);
//                         mainWindow.center();
//                     }
//                 },
//                 { 
//                     label: 'Grande (500x600)', 
//                     click: () => {
//                         mainWindow.setSize(500, 600);
//                         mainWindow.center();
//                     }
//                 }
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
    
//     tray.setToolTip('Contrôle de Luminosité Responsive');
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
    
//     // Gestionnaires IPC
//     ipcMain.handle('get-brightness', async () => {
//         try {
//             const brightness = await brightnessController.getBrightness();
//             console.log(`📊 Luminosité actuelle: ${brightness}%`);
//             return brightness;
//         } catch (error) {
//             console.error('❌ Erreur get-brightness:', error);
//             return 50;
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
//         mainWindow.hide(); // Cache dans le tray
//     });
    
//     ipcMain.on('close', () => {
//         mainWindow.hide(); // Cache dans le tray
//     });
    
//     ipcMain.on('get-window-size', (event) => {
//         const size = mainWindow.getSize();
//         event.reply('window-size', size);
//     });
// });

// app.on('window-all-closed', () => {
//     // Garder l'app active pour le tray
//     console.log('ℹ️ Fenêtre fermée, app reste active dans le tray');
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// // Gestion des erreurs
// process.on('uncaughtException', (error) => {
//     console.error('❌ Erreur non gérée:', error);
// });






























// // ╔══════════════════════════════════════════════════════════════════════════════╗
// // ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// // ╚══════════════════════════════════════════════════════════════════════════════╝

// // Forcer les variables d'environnement AVANT tout
// process.env.ELECTRON_DISABLE_GPU = '1';
// process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = '1';

// const { app, screen } = require('electron');

// // Désactiver TOUT ce qui touche au GPU
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
// app.commandLine.appendSwitch('disable-software-rasterizer');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-dev-shm-usage');
// app.commandLine.appendSwitch('ignore-certificate-errors');

// // MAINTENANT on peut importer le reste
// const { BrowserWindow, Tray, Menu, ipcMain } = require('electron');
// const path = require('path');
// const BrightnessController = require('./brightness-control');

// let mainWindow;
// let tray;
// let brightnessController;

// function createWindow() {
//     // Obtenir les dimensions de l'écran
//     const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
//     // Calculer la taille responsive (80% de l'écran avec min/max)
//     const windowWidth = Math.min(500, Math.max(300, width * 0.4));
//     const windowHeight = Math.min(600, Math.max(400, height * 0.5));
    
//     mainWindow = new BrowserWindow({
//         width: windowWidth,
//         height: windowHeight,
//         minWidth: 280,
//         minHeight: 680,
//         maxWidth: 600,
//         maxHeight: 700,
//         resizable: true,
//         frame: false,
//         show: false, // ← Ne pas afficher tout de suite
//         skipTaskbar: false, // ← Afficher dans la barre des tâches
//         transparent: false,
//         backgroundColor: '#667eea',
//         alwaysOnTop: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js'),
//             offscreen: false,
//             enableWebSQL: false,
//             webSecurity: true
//         }
//     });

//     mainWindow.loadFile('index.html');
    
//     // Optimiser la fenêtre pour le responsive
//     mainWindow.on('resize', () => {
//         mainWindow.webContents.send('window-resized');
//     });

//     // ← Afficher la fenêtre centrée une fois chargée
//     mainWindow.once('ready-to-show', () => {
//         mainWindow.center(); // ← CENTRER automatiquement
//         mainWindow.show();
//         mainWindow.focus();
//         console.log('✅ Fenêtre centrée et affichée avec succès !');
//     });

//     mainWindow.webContents.on('did-finish-load', () => {
//         console.log('✅ index.html chargé !');
//         console.log(`📐 Taille fenêtre: ${windowWidth}x${windowHeight}`);
//     });
// }


// function createWindow() {
//     // ✅ OBTENIR ÉCRAN PRINCIPAL + WORKAREA (sans barre tâches)
//     const primaryDisplay = screen.getPrimaryDisplay();
//     const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
    
//     // ✅ TAILLE RESPONSIVE OPTIMALE
//     const windowWidth = Math.min(500, Math.max(320, screenWidth * 0.4));
//     const windowHeight = Math.min(650, Math.max(450, screenHeight * 0.55));
    
//     mainWindow = new BrowserWindow({
//         width: windowWidth,
//         height: windowHeight,
//         minWidth: 300,
//         minHeight: 450,
//         maxWidth: 550,
//         maxHeight: 700,
//         resizable: true,
//         frame: false,
//         show: false, // ✅ IMPORTANT : ne pas montrer avant centrage
//         skipTaskbar: false,
//         transparent: false,
//         backgroundColor: '#667eea',
//         alwaysOnTop: false,
//         webPreferences: {
//             nodeIntegration: false,
//             contextIsolation: true,
//             preload: path.join(__dirname, 'preload.js'),
//             offscreen: false,
//             enableWebSQL: false,
//             webSecurity: true
//         }
//     });

//     mainWindow.loadFile('index.html');
    
//     // ✅ CENTRAGE PARFAIT + AFFICHAGE
//     mainWindow.once('ready-to-show', () => {
//         // ⚡ CALCUL CENTRAGE MANUEL (plus précis que .center())
//         const { x, y } = mainWindow.getPosition();
//         const centerX = Math.round((screenWidth - windowWidth) / 2);
//         const centerY = Math.round((screenHeight - windowHeight) / 2);
        
//         mainWindow.setPosition(centerX, centerY);
        
//         // ✅ FINALEMENT AFFICHÉ CENTRÉ
//         mainWindow.show();
//         mainWindow.focus();
//         mainWindow.moveTop(); // ✅ AU PREMIER PLAN
        
//         console.log(`✅ CENTRÉ: ${centerX}x${centerY} | Taille: ${windowWidth}x${windowHeight}`);
//     });

//     // ✅ GESTION RESIZE (déjà bien)
//     mainWindow.on('resize', () => {
//         mainWindow.center(); // ✅ RECENTRE au resize
//     });

//     mainWindow.webContents.on('did-finish-load', () => {
//         console.log('✅ HTML chargé');
//     });
// }


// function createTray() {
//     let iconPath;
//     try {
//         iconPath = path.join(__dirname, 'assets', 'icon.png');
//         const fs = require('fs');
//         if (!fs.existsSync(iconPath)) {
//             console.warn('⚠️ Icône non trouvée, création icône par défaut');
//             iconPath = null;
//         }
//     } catch (e) {
//         iconPath = null;
//     }

//     if (!iconPath) {
//         const nativeImage = require('electron').nativeImage;
//         const image = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
//         tray = new Tray(image || nativeImage.createEmpty());
//     } else {
//         tray = new Tray(iconPath);
//     }
    
//     const contextMenu = Menu.buildFromTemplate([
//         {
//             label: '🌤️ Afficher',
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
//         {
//             label: '📐 Mode Fenêtre',
//             submenu: [
//                 { 
//                     label: 'Petite (300x400)', 
//                     click: () => {
//                         mainWindow.setSize(300, 400);
//                         mainWindow.center();
//                     }
//                 },
//                 { 
//                     label: 'Moyenne (400x500)', 
//                     click: () => {
//                         mainWindow.setSize(400, 500);
//                         mainWindow.center();
//                     }
//                 },
//                 { 
//                     label: 'Grande (500x600)', 
//                     click: () => {
//                         mainWindow.setSize(500, 600);
//                         mainWindow.center();
//                     }
//                 }
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
    
//     tray.setToolTip('Contrôle de Luminosité Responsive');
//     tray.setContextMenu(contextMenu);
    
//     tray.on('click', () => {
//         if (mainWindow.isVisible()) {
//             mainWindow.minimize(); // ← MINIMISER au lieu de cacher
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
    
//     // Gestionnaires IPC
//     ipcMain.handle('get-brightness', async () => {
//         try {
//             const brightness = await brightnessController.getBrightness();
//             console.log(`📊 Luminosité actuelle: ${brightness}%`);
//             return brightness;
//         } catch (error) {
//             console.error('❌ Erreur get-brightness:', error);
//             return 50;
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
    
//     // ← MODIFIÉ : Minimiser au lieu de cacher
//     ipcMain.on('minimize', () => {
//         mainWindow.minimize();
//         console.log('📉 Fenêtre minimisée');
//     });
    
//     // ← MODIFIÉ : Fermer complètement l'application
//     ipcMain.on('close', () => {
//         console.log('🚪 Fermeture complète de l\'application');
//         app.quit();
//     });
    
//     ipcMain.on('get-window-size', (event) => {
//         const size = mainWindow.getSize();
//         event.reply('window-size', size);
//     });
// });

// app.on('window-all-closed', () => {
//     // ← MODIFIÉ : Quitter complètement quand toutes les fenêtres sont fermées
//     app.quit();
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// // Gestion des erreurs
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

// Variable pour suivre si c'est le premier lancement
let isFirstShow = true;

function createWindow() {
    // Obtenir le display principal
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    // Calculer la taille responsive
    const windowWidth = Math.min(500, Math.max(300, width * 0.4));
    const windowHeight = Math.min(600, Math.max(400, height * 0.5));
    
    // Calculer la position centrée
    const centerX = Math.round((width - windowWidth) / 2);
    const centerY = Math.round((height - windowHeight) / 2);
    
    console.log(`📐 Écran: ${width}x${height} | Fenêtre: ${windowWidth}x${windowHeight} | Position: ${centerX},${centerY}`);
    
    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        // Position explicite au centre AVANT show
        x: centerX,
        y: centerY,
        minWidth: 280,
        minHeight: 680,
        maxWidth: 600,
        maxHeight: 700,
        resizable: true,
        frame: false,
        show: false, // Important: ne pas montrer tout de suite
        skipTaskbar: false,
        transparent: false,
        backgroundColor: '#667eea',
        alwaysOnTop: false,
        // Empêcher le flash/blink au démarrage
        paintWhenInitiallyHidden: true,
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
    
    // Centrer ET montrer uniquement quand tout est prêt
    mainWindow.once('ready-to-show', () => {
        console.log('🎯 ready-to-show déclenché');
        
        // Forcer le centrage AVANT de montrer
        mainWindow.setPosition(centerX, centerY, false);
        mainWindow.center();
        
        // Petit délai pour s'assurer que le centrage est appliqué
        setTimeout(() => {
            if (isFirstShow) {
                mainWindow.setPosition(centerX, centerY, false);
                mainWindow.center();
                mainWindow.show();
                mainWindow.focus();
                isFirstShow = false;
                console.log('✅ Première affichage centré avec succès !');
            }
        }, 100);
    });

    // Backup: si ready-to-show ne se déclenche pas
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('✅ did-finish-load déclenché');
        if (isFirstShow) {
            mainWindow.setPosition(centerX, centerY, false);
            mainWindow.center();
            mainWindow.show();
            mainWindow.focus();
            isFirstShow = false;
        }
    });

    // Gérer le redimensionnement
    mainWindow.on('resize', () => {
        mainWindow.webContents.send('window-resized');
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
            label: '🌤️ Afficher',
            click: () => {
                if (mainWindow) {
                    mainWindow.show();
                    mainWindow.center(); // Recentrer quand on affiche depuis le tray
                    mainWindow.focus();
                }
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
                    click: () => {
                        mainWindow.setSize(300, 400);
                        mainWindow.center();
                    }
                },
                { 
                    label: 'Moyenne (400x500)', 
                    click: () => {
                        mainWindow.setSize(400, 500);
                        mainWindow.center();
                    }
                },
                { 
                    label: 'Grande (500x600)', 
                    click: () => {
                        mainWindow.setSize(500, 600);
                        mainWindow.center();
                    }
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
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.center(); // Recentrer aussi ici
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
        mainWindow.minimize();
        console.log('📉 Fenêtre minimisée');
    });
    
    ipcMain.on('close', () => {
        console.log('🚪 Fermeture complète de l\'application');
        app.quit();
    });
    
    ipcMain.on('get-window-size', (event) => {
        const size = mainWindow.getSize();
        event.reply('window-size', size);
    });
    
    // Centrer quand on active l'app (clic sur l'icône dock/taskbar)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        } else {
            mainWindow.show();
            mainWindow.center();
            mainWindow.focus();
        }
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

// Gestion des erreurs
process.on('uncaughtException', (error) => {
    console.error('❌ Erreur non gérée:', error);
});