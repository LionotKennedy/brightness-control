const { execSync, spawn } = require('child_process');
const path = require('path');

class BrightnessController {
    constructor() {
        this.pythonScript = path.join(__dirname, 'brightness.py');
        this.isPythonAvailable = this.checkPython();
    }

    checkPython() {
        try {
            execSync('python --version', { stdio: 'ignore' });
            return true;
        } catch {
            try {
                execSync('python3 --version', { stdio: 'ignore' });
                return true;
            } catch {
                return false;
            }
        }
    }

    async getBrightness() {
        if (!this.isPythonAvailable) {
            throw new Error('Python non installé');
        }

        return new Promise((resolve, reject) => {
            const python = spawn('python', [this.pythonScript]);

            let output = '';
            let error = '';

            python.stdout.on('data', (data) => {
                output += data.toString();
            });

            python.stderr.on('data', (data) => {
                error += data.toString();
            });

            python.on('close', (code) => {
                if (code === 0) {
                    // Extraire la valeur de la sortie
                    const match = output.match(/Luminosite actuelle : (.*)%/);
                    if (match && match[1]) {
                        resolve(parseInt(match[1].replace('[', '').replace(']', '')));
                    } else {
                        resolve(50); // Valeur par défaut
                    }
                } else {
                    reject(new Error(`Erreur Python: ${error}`));
                }
            });
        });
    }

    async setBrightness(value) {
        if (!this.isPythonAvailable) {
            throw new Error('Python non installé');
        }

        if (value < 0 || value > 100) {
            throw new Error('Valeur doit être entre 0 et 100');
        }

        return new Promise((resolve, reject) => {
            const python = spawn('python', [this.pythonScript, value.toString()]);

            let output = '';
            let error = '';

            python.stdout.on('data', (data) => {
                output += data.toString();
            });

            python.stderr.on('data', (data) => {
                error += data.toString();
            });

            python.on('close', (code) => {
                if (code === 0) {
                    resolve({ success: true, message: output.trim() });
                } else {
                    reject(new Error(`Erreur: ${error}`));
                }
            });
        });
    }

    async adjustBrightness(delta) {
        const current = await this.getBrightness();
        const newValue = Math.max(0, Math.min(100, current + delta));
        return await this.setBrightness(newValue);
    }
}

// Exemple d'utilisation
if (require.main === module) {
    const controller = new BrightnessController();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        controller.getBrightness()
            .then(brightness => console.log(`Luminosité: ${brightness}%`))
            .catch(err => console.error(err));
    } else if (args[0].startsWith('+') || args[0].startsWith('-')) {
        controller.adjustBrightness(parseInt(args[0]))
            .then(result => console.log(result.message))
            .catch(err => console.error(err));
    } else {
        controller.setBrightness(parseInt(args[0]))
            .then(result => console.log(result.message))
            .catch(err => console.error(err));
    }
}

module.exports = BrightnessController;