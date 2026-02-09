// let currentBrightness = 50;

// async function updateBrightness(value) {
//     try {
//         await window.brightnessAPI.setBrightness(value);
//         currentBrightness = value;
//         updateDisplay();
//     } catch (error) {
//         console.error('Erreur:', error);
//         alert('Impossible de régler la luminosité');
//     }
// }

// function updateDisplay() {
//     document.getElementById('brightness-value').textContent = `${currentBrightness}%`;
//     document.getElementById('brightness-slider').value = currentBrightness;
    
//     // Mettre à jour les boutons rapides
//     document.querySelectorAll('.quick-btn').forEach(btn => {
//         if (parseInt(btn.dataset.value) === currentBrightness) {
//             btn.classList.add('active');
//         } else {
//             btn.classList.remove('active');
//         }
//     });
// }

// async function loadCurrentBrightness() {
//     try {
//         currentBrightness = await window.brightnessAPI.getBrightness();
//         updateDisplay();
//     } catch (error) {
//         console.error('Impossible de charger la luminosité:', error);
//     }
// }

// // Écouteurs d'événements
// document.getElementById('brightness-slider').addEventListener('input', (e) => {
//     const value = parseInt(e.target.value);
//     document.getElementById('brightness-value').textContent = `${value}%`;
// });

// document.getElementById('brightness-slider').addEventListener('change', (e) => {
//     updateBrightness(parseInt(e.target.value));
// });

// document.getElementById('decrease-btn').addEventListener('click', async () => {
//     await window.brightnessAPI.adjustBrightness(-10);
//     await loadCurrentBrightness();
// });

// document.getElementById('increase-btn').addEventListener('click', async () => {
//     await window.brightnessAPI.adjustBrightness(10);
//     await loadCurrentBrightness();
// });

// document.querySelectorAll('.quick-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//         updateBrightness(parseInt(btn.dataset.value));
//     });
// });

// document.getElementById('minimize-btn').addEventListener('click', () => {
//     window.brightnessAPI.minimize();
// });

// document.getElementById('close-btn').addEventListener('click', () => {
//     window.brightnessAPI.close();
// });

// // Écouter les mises à jour de luminosité
// window.brightnessAPI.onBrightnessUpdated((value) => {
//     currentBrightness = value;
//     updateDisplay();
// });

// // Initialisation
// document.addEventListener('DOMContentLoaded', () => {
//     loadCurrentBrightness();
// });




















































let currentBrightness = 50;

async function updateBrightness(value) {
    try {
        await window.brightnessAPI.setBrightness(value);
        currentBrightness = value;
        updateDisplay();
        
        // Animation de feedback
        const brightnessValue = document.getElementById('brightness-value');
        brightnessValue.classList.add('updated');
        setTimeout(() => {
            brightnessValue.classList.remove('updated');
        }, 500);
        
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Impossible de régler la luminosité', 'error');
    }
}

function updateDisplay() {
    const brightnessValue = document.getElementById('brightness-value');
    const brightnessSlider = document.getElementById('brightness-slider');
    
    brightnessValue.textContent = `${currentBrightness}%`;
    brightnessSlider.value = currentBrightness;
    
    // Mettre à jour les boutons rapides
    document.querySelectorAll('.quick-btn').forEach(btn => {
        if (parseInt(btn.dataset.value) === currentBrightness) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mettre à jour le statut
    updateStatus();
}

function updateStatus() {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
        const status = currentBrightness === 0 ? '🌙 Nuit' : 
                      currentBrightness <= 25 ? '🌘 Faible' :
                      currentBrightness <= 50 ? '🌗 Moyen' :
                      currentBrightness <= 75 ? '🌖 Élevé' : '🌕 Maximum';
        statusElement.textContent = `● ${status} (${currentBrightness}%)`;
    }
}

function showNotification(message, type = 'info') {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4757' : '#2ed573'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

async function loadCurrentBrightness() {
    try {
        currentBrightness = await window.brightnessAPI.getBrightness();
        updateDisplay();
    } catch (error) {
        console.error('Impossible de charger la luminosité:', error);
        showNotification('Connexion interrompue, réessayez', 'error');
    }
}

// Ajouter le CSS pour les animations de notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Écouteurs d'événements
document.getElementById('brightness-slider').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('brightness-value').textContent = `${value}%`;
});

document.getElementById('brightness-slider').addEventListener('change', (e) => {
    updateBrightness(parseInt(e.target.value));
});

// Délai pour éviter les appels trop fréquents
let brightnessTimeout;
document.getElementById('brightness-slider').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('brightness-value').textContent = `${value}%`;
    
    // Debounce pour éviter trop d'appels
    clearTimeout(brightnessTimeout);
    brightnessTimeout = setTimeout(() => {
        updateBrightness(value);
    }, 100);
});

document.getElementById('decrease-btn').addEventListener('click', async () => {
    await window.brightnessAPI.adjustBrightness(-10);
    await loadCurrentBrightness();
});

document.getElementById('increase-btn').addEventListener('click', async () => {
    await window.brightnessAPI.adjustBrightness(10);
    await loadCurrentBrightness();
});

document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        updateBrightness(parseInt(btn.dataset.value));
    });
});

document.getElementById('minimize-btn').addEventListener('click', () => {
    window.brightnessAPI.minimize();
});

document.getElementById('close-btn').addEventListener('click', () => {
    window.brightnessAPI.close();
});

// Gestion du responsive
function handleResize() {
    // Ajuster les éléments si nécessaire
    const container = document.querySelector('.app-container');
    if (container) {
        const width = container.clientWidth;
        
        // Changer la disposition des boutons rapides sur petits écrans
        const quickControls = document.querySelector('.quick-controls');
        if (width < 350) {
            quickControls.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            quickControls.style.gridTemplateColumns = 'repeat(5, 1fr)';
        }
    }
}

// Écouter les mises à jour de luminosité
window.brightnessAPI.onBrightnessUpdated((value) => {
    currentBrightness = value;
    updateDisplay();
});

// Écouter le redimensionnement de la fenêtre
window.addEventListener('resize', handleResize);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadCurrentBrightness();
    handleResize(); // Appel initial
    
    // Ajouter des événements tactiles pour mobile
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    console.log('✅ Interface responsive initialisée');
});

// Gestion du clavier pour l'accessibilité
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        case '+':
            e.preventDefault();
            document.getElementById('increase-btn').click();
            break;
        case 'ArrowDown':
        case '-':
            e.preventDefault();
            document.getElementById('decrease-btn').click();
            break;
        case 'Escape':
            window.brightnessAPI.minimize();
            break;
    }
});