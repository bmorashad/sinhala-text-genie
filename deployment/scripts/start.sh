#!bin/bash

git pull

# Remove old containers and images
docker compose down
backend=($docker compose config --images backend)
frontend=($docker compose config --images backend)
docker image rm "$backend:*"
docker image rm "$frontend:*"

# Build and run the new ones
docker compose build
docker compose up