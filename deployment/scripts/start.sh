#!bin/bash

echo "Remove old containers and images"
docker compose down
backend=$(docker compose config --images backend)
frontend=$(docker compose config --images backend)
docker image rm "$backend:*"
docker image rm "$frontend:*"

echo "Build and run the new ones"
docker compose build
docker compose up