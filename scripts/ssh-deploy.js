const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// SSH configuration
const SSH_KEY = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZWQyNTUxOQAAACBDI5VMwxY3WHhWmTIgVqFuA1i/D91WrBcUABYJhaDBoAAAAKCb9H0Rm/R9EQAAAAtzc2gtZWQyNTUxOQAAACBDI5VMwxY3WHhWmTIgVqFuA1i/D91WrBcUABYJhaDBoAAAAEAsrOl13uJ3BAWMtAW16+cqdRe3vnMVxKAOeC8Ud2F/dkMjlUzDFjdYeFaZMiBWoW4DWL8P3VasFxQAFgmFoMGgAAAAF3BocHNlY2xpYi1nZW5lcmF0ZWQta2V5AQIDBAUG
-----END OPENSSH PRIVATE KEY-----`;

const SSH_USER = 'root';
const SSH_HOST = 'cool.ahmadi98.ir';
const SSH_PORT = '8443';
const CONTAINER_NAME = 'rwscw04s0sws08kk4kkssw04';

// Save SSH key to a temporary file
const tempKeyPath = path.join(__dirname, 'temp_ssh_key');
fs.writeFileSync(tempKeyPath, SSH_KEY);
fs.chmodSync(tempKeyPath, '600');

// SSH command with verbose output for debugging
const sshCommand = `ssh -v -i ${tempKeyPath} -p ${SSH_PORT} -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST}`;

// Docker commands
const dockerCommands = [
  `docker ps -a | grep ${CONTAINER_NAME}`,
  `docker restart ${CONTAINER_NAME}`,
  `docker logs ${CONTAINER_NAME} --tail 50`
];

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

async function deploy() {
  try {
    console.log('Starting deployment process...');
    
    // Test SSH connection first
    console.log('Testing SSH connection...');
    await runCommand(`${sshCommand} "echo Connection successful"`);
    
    // Run Docker commands via SSH
    for (const cmd of dockerCommands) {
      const fullCommand = `${sshCommand} "${cmd}"`;
      await runCommand(fullCommand);
    }
    
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
  } finally {
    // Clean up temporary SSH key
    try {
      fs.unlinkSync(tempKeyPath);
    } catch (error) {
      console.error('Error cleaning up temporary SSH key:', error);
    }
  }
}

deploy(); 