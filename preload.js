const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('brightnessAPI', {
    getBrightness: () => ipcRenderer.invoke('get-brightness'),
    setBrightness: (value) => ipcRenderer.invoke('set-brightness', value),
    adjustBrightness: (delta) => ipcRenderer.invoke('adjust-brightness', delta),
    minimize: () => ipcRenderer.send('minimize'),
    close: () => ipcRenderer.send('close'),
    onBrightnessUpdated: (callback) => {
        ipcRenderer.on('brightness-updated', (event, value) => callback(value));
    }
});