#!/bin/bash

# Coolify API configuration
API_URL="http://cool.ahmadi98.ir:8000"
API_TOKEN="2|Qrt3JGyGGXz8GNq3LH9pCgb3i1bKMuUWh2kmT4Vr24660458"

echo "Testing API connection..."
curl -v "$API_URL/api/v1/status" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Accept: application/json"