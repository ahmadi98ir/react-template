const { exec } = require('child_process');
const { BuildLogger } = require('../utils/logger');

async function build() {
    try {
        BuildLogger.log('Starting build process...');
        
        await new Promise((resolve, reject) => {
            exec('npm run build', (error, stdout, stderr) => {
                if (error) {
                    BuildLogger.error('Build failed', error);
                    reject(error);
                    return;
                }
                if (stderr) {
                    BuildLogger.log(stderr, 'warning');
                }
                BuildLogger.log(stdout);
                resolve();
            });
        });
    } catch (error) {
        BuildLogger.error('Build process failed', error);
        process.exit(1);
    }
}

build();
