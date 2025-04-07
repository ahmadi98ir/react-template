const axios = require('axios');
require('dotenv').config();

const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN;
const COOLIFY_URL = process.env.COOLIFY_URL;

async function testConnection() {
  try {
    // Test base connection
    console.log('Testing base connection...');
    const baseResponse = await axios.get(COOLIFY_URL, {
      maxRedirects: 5,
      validateStatus: null
    });
    console.log('Base Response:', {
      status: baseResponse.status,
      statusText: baseResponse.statusText
    });

    // Test API connection
    console.log('\nTesting API connection...');
    const apiResponse = await axios.get(`${COOLIFY_URL}/api/v1/status`, {
      headers: {
        'Authorization': `Bearer ${COOLIFY_API_TOKEN}`
      },
      validateStatus: null
    });
    console.log('API Response:', {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      data: apiResponse.data
    });

    // Test resources endpoint
    console.log('\nTesting resources endpoint...');
    const resourcesResponse = await axios.get(`${COOLIFY_URL}/api/v1/resources`, {
      headers: {
        'Authorization': `Bearer ${COOLIFY_API_TOKEN}`
      },
      validateStatus: null
    });
    console.log('Resources Response:', {
      status: resourcesResponse.status,
      statusText: resourcesResponse.statusText,
      data: resourcesResponse.data
    });

  } catch (error) {
    console.error('Error:', {
      message: error.message,
      response: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      }
    });
  }
}

testConnection(); 