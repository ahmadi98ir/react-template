const axios = require('axios');
require('dotenv').config();

const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN;
const COOLIFY_URL = process.env.COOLIFY_URL;

async function checkDeployment() {
  try {
    // Get server status
    const statusResponse = await axios.get(`${COOLIFY_URL}/api/v2/status`, {
      headers: {
        'Authorization': `Bearer ${COOLIFY_API_TOKEN}`
      }
    });
    console.log('Server Status:', statusResponse.data);

    // Get deployments
    const deploymentsResponse = await axios.get(`${COOLIFY_URL}/api/v2/resources`, {
      headers: {
        'Authorization': `Bearer ${COOLIFY_API_TOKEN}`
      }
    });
    console.log('Deployments:', deploymentsResponse.data);

  } catch (error) {
    console.error('Error:', {
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

checkDeployment(); 