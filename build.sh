#!/bin/bash

# Build the Docker image with proper naming
docker build \
  --add-host coolify:10.0.1.6 \
  --add-host coolify-db:10.0.1.2 \
  --add-host coolify-realtime:10.0.1.4 \
  --add-host coolify-redis:10.0.1.5 \
  --add-host x08ck488ogck404wgg84sgcc:10.0.1.7 \
  --network host \
  -f Dockerfile \
  --build-arg SOURCE_COMMIT='c4ab0545c1acda50c9ef5cb9a3f53d285d3973a0' \
  --build-arg 'COOLIFY_URL=https://ahmadi98.ir' \
  --build-arg 'COOLIFY_FQDN=ahmadi98.ir' \
  --build-arg 'COOLIFY_BRANCH="main"' \
  --build-arg 'COOLIFY_RESOURCE_UUID=k4og4swwww8w8ckw8c04c0g4' \
  --build-arg 'COOLIFY_CONTAINER_NAME=k4og4swwww8w8ckw8c04c0g4-000509792025' \
  --progress plain \
  -t ahmadi98ir/react-template:main . 