require('dotenv').config({ path: '.env.coolify' });
const axios = require('axios');

// Coolify API settings
const COOLIFY_URL = process.env.COOLIFY_URL;
const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN;
const COOLIFY_RESOURCE_UUID = process.env.COOLIFY_RESOURCE_UUID;

if (!COOLIFY_URL || !COOLIFY_API_TOKEN || !COOLIFY_RESOURCE_UUID) {
  console.error('Missing required environment variables. Please check .env.coolify file.');
  process.exit(1);
}

// API endpoints
const endpoints = {
  status: '/api/v1/status',
  resources: '/api/v1/resources',
  applications: '/api/v1/applications',
  deployments: '/api/v1/deployments'
};

// Helper function for making API requests
async function makeRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${COOLIFY_URL}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${COOLIFY_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: function (status) {
        return status < 500; // Accept all status codes less than 500
      },
      timeout: 10000 // 10 seconds timeout
    };

    if (data) {
      config.data = data;
    }

    console.log(`Making ${method} request to: ${config.url}`);
    const response = await axios(config);
    
    if (response.status === 404) {
      console.log('Endpoint not found, trying v2 API...');
      config.url = config.url.replace('/v1/', '/v2/');
      return await axios(config);
    }
    
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Please check if the Coolify server is running and accessible.');
    } else {
      console.error('API request failed:', {
        endpoint,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        code: error.code
      });
    }
    throw error;
  }
}

// API functions
async function checkServerStatus() {
  console.log('Checking server status...');
  return makeRequest('GET', endpoints.status);
}

async function listResources() {
  console.log('Getting resources list...');
  return makeRequest('GET', endpoints.resources);
}

async function getResourceStatus(uuid = COOLIFY_RESOURCE_UUID) {
  console.log(`Getting status for resource: ${uuid}`);
  return makeRequest('GET', `${endpoints.resources}/${uuid}`);
}

async function triggerDeploy(uuid = COOLIFY_RESOURCE_UUID) {
  console.log(`Triggering deployment for resource: ${uuid}`);
  return makeRequest('POST', `${endpoints.deployments}/${uuid}/deploy`);
}

// Test all functions
async function testAPI() {
  try {
    console.log('\n1. Testing server status:');
    await checkServerStatus();

    console.log('\n2. Testing resources list:');
    await listResources();

    console.log('\n3. Testing resource status:');
    await getResourceStatus();

    console.log('\n4. Testing deployment trigger:');
    await triggerDeploy();
  } catch (error) {
    if (!error.response) {
      console.error('Network error:', error.message);
    }
  }
}

// Run tests
testAPI(); 