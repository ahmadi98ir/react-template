const { exec } = require('child_process');

const CONTAINER_NAME = 'rwscw04s0sws08kk4kkssw04';

console.log('Restarting container...');

exec(`docker restart ${CONTAINER_NAME}`, (error, stdout, stderr) => {
  if (error) {
    console.error('Error restarting container:', error);
    return;
  }
  if (stderr) {
    console.error('stderr:', stderr);
    return;
  }
  console.log('Container restarted successfully:', stdout);
}); 