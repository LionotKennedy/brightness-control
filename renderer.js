let currentBrightness = 50;

async function updateBrightness(value) {
    try {
        await window.brightnessAPI.setBrightness(value);
        currentBrightness = value;
        updateDisplay();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de régler la luminosité');
    }
}

function updateDisplay() {
    document.getElementById('brightness-value').textContent = `${currentBrightness}%`;
    document.getElementById('brightness-slider').value = currentBrightness;
    
    // Mettre à jour les boutons rapides
    document.querySelectorAll('.quick-btn').forEach(btn => {
        if (parseInt(btn.dataset.value) === currentBrightness) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

async function loadCurrentBrightness() {
    try {
        currentBrightness = await window.brightnessAPI.getBrightness();
        updateDisplay();
    } catch (error) {
        console.error('Impossible de charger la luminosité:', error);
    }
}

// Écouteurs d'événements
document.getElementById('brightness-slider').addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('brightness-value').textContent = `${value}%`;
});

document.getElementById('brightness-slider').addEventListener('change', (e) => {
    updateBrightness(parseInt(e.target.value));
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

// Écouter les mises à jour de luminosité
window.brightnessAPI.onBrightnessUpdated((value) => {
    currentBrightness = value;
    updateDisplay();
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadCurrentBrightness();
});