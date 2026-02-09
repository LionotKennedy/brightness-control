// const { execSync, spawn } = require('child_process');
// const path = require('path');

// class BrightnessController {
//     constructor() {
//         this.pythonScript = path.join(__dirname, 'brightness.py');
//         this.isPythonAvailable = this.checkPython();
//     }

//     checkPython() {
//         try {
//             execSync('python --version', { stdio: 'ignore' });
//             return true;
//         } catch {
//             try {
//                 execSync('python3 --version', { stdio: 'ignore' });
//                 return true;
//             } catch {
//                 return false;
//             }
//         }
//     }

//     async getBrightness() {
//         if (!this.isPythonAvailable) {
//             throw new Error('Python non installé');
//         }

//         return new Promise((resolve, reject) => {
//             const python = spawn('python', [this.pythonScript]);

//             let output = '';
//             let error = '';

//             python.stdout.on('data', (data) => {
//                 output += data.toString();
//             });

//             python.stderr.on('data', (data) => {
//                 error += data.toString();
//             });

//             python.on('close', (code) => {
//                 if (code === 0) {
//                     // Extraire la valeur de la sortie
//                     const match = output.match(/Luminosite actuelle : (.*)%/);
//                     if (match && match[1]) {
//                         resolve(parseInt(match[1].replace('[', '').replace(']', '')));
//                     } else {
//                         resolve(50); // Valeur par défaut
//                     }
//                 } else {
//                     reject(new Error(`Erreur Python: ${error}`));
//                 }
//             });
//         });
//     }

//     async setBrightness(value) {
//         if (!this.isPythonAvailable) {
//             throw new Error('Python non installé');
//         }

//         if (value < 0 || value > 100) {
//             throw new Error('Valeur doit être entre 0 et 100');
//         }

//         return new Promise((resolve, reject) => {
//             const python = spawn('python', [this.pythonScript, value.toString()]);

//             let output = '';
//             let error = '';

//             python.stdout.on('data', (data) => {
//                 output += data.toString();
//             });

//             python.stderr.on('data', (data) => {
//                 error += data.toString();
//             });

//             python.on('close', (code) => {
//                 if (code === 0) {
//                     resolve({ success: true, message: output.trim() });
//                 } else {
//                     reject(new Error(`Erreur: ${error}`));
//                 }
//             });
//         });
//     }

//     async adjustBrightness(delta) {
//         const current = await this.getBrightness();
//         const newValue = Math.max(0, Math.min(100, current + delta));
//         return await this.setBrightness(newValue);
//     }
// }

// // Exemple d'utilisation
// if (require.main === module) {
//     const controller = new BrightnessController();
    
//     const args = process.argv.slice(2);
    
//     if (args.length === 0) {
//         controller.getBrightness()
//             .then(brightness => console.log(`Luminosité: ${brightness}%`))
//             .catch(err => console.error(err));
//     } else if (args[0].startsWith('+') || args[0].startsWith('-')) {
//         controller.adjustBrightness(parseInt(args[0]))
//             .then(result => console.log(result.message))
//             .catch(err => console.error(err));
//     } else {
//         controller.setBrightness(parseInt(args[0]))
//             .then(result => console.log(result.message))
//             .catch(err => console.error(err));
//     }
// }

// module.exports = BrightnessController;




























const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

class BrightnessController {
    constructor() {
        // ← MODIFIÉ : Gérer les chemins pour l'app empaquetée
        this.pythonScript = this.getPythonScriptPath();
        this.isPythonAvailable = this.checkPython();
        
        console.log(`🐍 Chemin Python script: ${this.pythonScript}`);
        console.log(`🐍 Python disponible: ${this.isPythonAvailable}`);
    }

    getPythonScriptPath() {
        // Vérifier si on est en mode développement ou production
        if (app.isPackaged) {
            // Mode production : le fichier est dans resources/app.asar.unpacked
            const unpackedPath = path.join(
                process.resourcesPath,
                'app.asar.unpacked',
                'brightness.py'
            );
            
            // Fallback si non trouvé dans unpacked
            if (fs.existsSync(unpackedPath)) {
                return unpackedPath;
            }
            
            // Autre fallback : extraResources
            const extraResourcesPath = path.join(
                process.resourcesPath,
                'brightness.py'
            );
            
            if (fs.existsSync(extraResourcesPath)) {
                return extraResourcesPath;
            }
            
            // Dernier fallback
            return path.join(__dirname, 'brightness.py');
        } else {
            // Mode développement : chemin normal
            return path.join(__dirname, 'brightness.py');
        }
    }

    checkPython() {
        try {
            execSync('python --version', { stdio: 'ignore' });
            console.log('✅ Python trouvé (python)');
            return 'python';
        } catch {
            try {
                execSync('python3 --version', { stdio: 'ignore' });
                console.log('✅ Python trouvé (python3)');
                return 'python3';
            } catch {
                console.error('❌ Python non trouvé');
                return false;
            }
        }
    }

    async getBrightness() {
        if (!this.isPythonAvailable) {
            throw new Error('Python non installé');
        }

        // Vérifier que le script existe
        if (!fs.existsSync(this.pythonScript)) {
            throw new Error(`Script Python non trouvé: ${this.pythonScript}`);
        }

        return new Promise((resolve, reject) => {
            const python = spawn(this.isPythonAvailable, [this.pythonScript]);

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
                    const match = output.match(/Luminosite actuelle : (.*)%/);
                    if (match && match[1]) {
                        const brightness = parseInt(match[1].replace('[', '').replace(']', ''));
                        console.log(`📊 Luminosité récupérée: ${brightness}%`);
                        resolve(brightness);
                    } else {
                        console.warn('⚠️ Format de sortie inattendu, utilisation de 50%');
                        resolve(50);
                    }
                } else {
                    console.error(`❌ Erreur Python (code ${code}): ${error}`);
                    reject(new Error(`Erreur Python: ${error}`));
                }
            });

            python.on('error', (err) => {
                console.error('❌ Erreur lors du spawn:', err);
                reject(err);
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

        // Vérifier que le script existe
        if (!fs.existsSync(this.pythonScript)) {
            throw new Error(`Script Python non trouvé: ${this.pythonScript}`);
        }

        return new Promise((resolve, reject) => {
            const python = spawn(this.isPythonAvailable, [this.pythonScript, value.toString()]);

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
                    console.log(`✅ Luminosité définie: ${value}%`);
                    resolve({ success: true, message: output.trim() });
                } else {
                    console.error(`❌ Erreur lors de la définition (code ${code}): ${error}`);
                    reject(new Error(`Erreur: ${error}`));
                }
            });

            python.on('error', (err) => {
                console.error('❌ Erreur lors du spawn:', err);
                reject(err);
            });
        });
    }

    async adjustBrightness(delta) {
        const current = await this.getBrightness();
        const newValue = Math.max(0, Math.min(100, current + delta));
        return await this.setBrightness(newValue);
    }
}

module.exports = BrightnessController;