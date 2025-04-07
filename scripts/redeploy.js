require('dotenv').config();
const axios = require('axios');

const COOLIFY_URL = process.env.COOLIFY_URL || 'http://cool.ahmadi98.ir';
const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN || 'Inru3eHjfOq4jFga79NRqQ68XVV9qlVaDpS19I9U023ba165';
const COOLIFY_RESOURCE_UUID = process.env.COOLIFY_RESOURCE_UUID || 'rwscw04s0sws08kk4kkssw04';

async function triggerRedeploy() {
  try {
    console.log('Triggering redeployment...');
    console.log('Using URL:', COOLIFY_URL);
    console.log('Using Resource UUID:', COOLIFY_RESOURCE_UUID);
    
    const url = `${COOLIFY_URL}/api/v2/applications/${COOLIFY_RESOURCE_UUID}/deploy`;
    console.log('Request URL:', url);
    
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          'Authorization': `Bearer ${COOLIFY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Redeployment triggered successfully:', response.data);
  } catch (error) {
    console.error('Error triggering redeployment:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
  }
}

triggerRedeploy(); 