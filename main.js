// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  🛠️ FIX GPU ULTIME - Mode compatibilité maximale                             ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// Forcer les variables d'environnement AVANT tout
process.env.ELECTRON_DISABLE_GPU = "1";
process.env.ELECTRON_DISABLE_HARDWARE_ACCELERATION = "1";

const { app, screen } = require("electron");

// Désactiver TOUT ce qui touche au GPU
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");
app.commandLine.appendSwitch("disable-software-rasterizer");
app.commandLine.appendSwitch("disable-gpu-sandbox");
app.commandLine.appendSwitch("no-sandbox");
app.commandLine.appendSwitch("disable-dev-shm-usage");
app.commandLine.appendSwitch("ignore-certificate-errors");

// MAINTENANT on peut importer le reste
const { BrowserWindow, Tray, Menu, ipcMain } = require("electron");
const path = require("path");
const BrightnessController = require("./brightness-control");

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

  console.log(
    `📐 Écran: ${width}x${height} | Fenêtre: ${windowWidth}x${windowHeight} | Position: ${centerX},${centerY}`,
  );

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
    // backgroundColor: '#667eea',
    transparent: true, // ← ACTIVÉ : fenêtre transparente
    // backgroundColor: '#00000000',
    backgroundColor: "#05B9F5E4",
    alwaysOnTop: false,
    // Empêcher le flash/blink au démarrage
    paintWhenInitiallyHidden: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      offscreen: false,
      enableWebSQL: false,
      webSecurity: true,
    },
  });

  mainWindow.loadFile("index.html");

  // Centrer ET montrer uniquement quand tout est prêt
  mainWindow.once("ready-to-show", () => {
    console.log("🎯 ready-to-show déclenché");

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
        console.log("✅ Première affichage centré avec succès !");
      }
    }, 100);
  });

  // Backup: si ready-to-show ne se déclenche pas
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("✅ did-finish-load déclenché");
    if (isFirstShow) {
      mainWindow.setPosition(centerX, centerY, false);
      mainWindow.center();
      mainWindow.show();
      mainWindow.focus();
      isFirstShow = false;
    }
  });

  // Gérer le redimensionnement
  mainWindow.on("resize", () => {
    mainWindow.webContents.send("window-resized");
  });
}

function createTray() {
  let iconPath;
  try {
    iconPath = path.join(__dirname, "assets", "icon.png");
    const fs = require("fs");
    if (!fs.existsSync(iconPath)) {
      console.warn("⚠️ Icône non trouvée, création icône par défaut");
      iconPath = null;
    }
  } catch (e) {
    iconPath = null;
  }

  if (!iconPath) {
    const nativeImage = require("electron").nativeImage;
    const image = nativeImage.createFromPath(path.join(__dirname, "icon.png"));
    tray = new Tray(image || nativeImage.createEmpty());
  } else {
    tray = new Tray(iconPath);
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "🌤️ Afficher",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.center(); // Recentrer quand on affiche depuis le tray
          mainWindow.focus();
        }
      },
    },
    {
      label: "💡 Luminosité Rapide",
      submenu: [
        { label: "🌑 0%", click: () => setBrightness(0) },
        { label: "🌘 25%", click: () => setBrightness(25) },
        { label: "🌗 50%", click: () => setBrightness(50) },
        { label: "🌖 75%", click: () => setBrightness(75) },
        { label: "🌕 100%", click: () => setBrightness(100) },
      ],
    },
    {
      label: "📐 Mode Fenêtre",
      submenu: [
        {
          label: "Petite (300x400)",
          click: () => {
            mainWindow.setSize(300, 400);
            mainWindow.center();
          },
        },
        {
          label: "Moyenne (400x500)",
          click: () => {
            mainWindow.setSize(400, 500);
            mainWindow.center();
          },
        },
        {
          label: "Grande (500x600)",
          click: () => {
            mainWindow.setSize(500, 600);
            mainWindow.center();
          },
        },
      ],
    },
    { type: "separator" },
    {
      label: "❌ Quitter",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Contrôle de Luminosité Responsive");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.center(); // Recentrer aussi ici
      mainWindow.focus();
    }
  });

  console.log("✅ Tray créé avec succès !");
}

async function setBrightness(value) {
  try {
    await brightnessController.setBrightness(value);
    if (mainWindow) {
      mainWindow.webContents.send("brightness-updated", value);
    }
    console.log(`✅ Luminosité réglée à ${value}%`);
  } catch (error) {
    console.error("❌ Erreur lors du réglage:", error);
  }
}

app.whenReady().then(() => {
  console.log("🚀 Application démarrée !");

  brightnessController = new BrightnessController();
  createWindow();
  createTray();

  // Gestionnaires IPC
  ipcMain.handle("get-brightness", async () => {
    try {
      const brightness = await brightnessController.getBrightness();
      console.log(`📊 Luminosité actuelle: ${brightness}%`);
      return brightness;
    } catch (error) {
      console.error("❌ Erreur get-brightness:", error);
      return 50;
    }
  });

  ipcMain.handle("set-brightness", async (event, value) => {
    try {
      const result = await brightnessController.setBrightness(value);
      console.log(`✅ Luminosité changée: ${value}%`);
      return result;
    } catch (error) {
      console.error("❌ Erreur set-brightness:", error);
      throw error;
    }
  });

  ipcMain.handle("adjust-brightness", async (event, delta) => {
    try {
      const result = await brightnessController.adjustBrightness(delta);
      console.log(`✅ Luminosité ajustée de ${delta}%`);
      return result;
    } catch (error) {
      console.error("❌ Erreur adjust-brightness:", error);
      throw error;
    }
  });

  ipcMain.on("minimize", () => {
    mainWindow.minimize();
    console.log("📉 Fenêtre minimisée");
  });

  ipcMain.on("close", () => {
    console.log("🚪 Fermeture complète de l'application");
    app.quit();
  });

  ipcMain.on("get-window-size", (event) => {
    const size = mainWindow.getSize();
    event.reply("window-size", size);
  });

  // Centrer quand on active l'app (clic sur l'icône dock/taskbar)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
      mainWindow.center();
      mainWindow.focus();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

// Gestion des erreurs
process.on("uncaughtException", (error) => {
  console.error("❌ Erreur non gérée:", error);
});
