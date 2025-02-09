#!/bin/bash

# Coolify API configuration
API_URL="http://91.107.131.43"
API_TOKEN="4|oogDjNhXgAUUjn2jfK96qMpa94qBDTuQeraw9SpZ87e89270"

echo "Testing API connection..."
curl -v "$API_URL/api/v1/resources" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Accept: application/json"

echo -e "\nCreating application..."
curl -X POST "$API_URL/api/v1/resources" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "application",
    "name": "website",
    "source": {
      "type": "github",
      "repository": "ahmadi98ir/react-template",
      "branch": "main"
    },
    "buildPack": "docker",
    "settings": {
      "port": 3000,
      "domain": "ahmadi98.ir",
      "buildCommand": "npm run build",
      "startCommand": "npm start"
    },
    "variables": [
      {"name": "HOST", "value": "0.0.0.0"},
      {"name": "PORT", "value": "3000"},
      {"name": "DOMAIN", "value": "ahmadi98.ir"}
    ]
  }' | jq .