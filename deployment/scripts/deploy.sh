#!bin/bash

echo "Remove old containers and images"
docker compose down
backend=$(docker images -q sinhala-text-genie-backend | uniq)
frontend=$(docker images -q sinhala-text-genie-frontend | uniq)

if [ -n "$backend" ]; then
  echo "Removing backend image with the id $backend"
  docker image rm -f $backend
fi
if [ -n "$frontend" ]; then
  echo "Removing frontend image with the id $frontend"
  docker image rm -f $frontend
fi

docker compose build
docker compose up -d

echo "Update nginx config"
sudo cp deployment/nginx/nginx.conf /etc/nginx/nginx.con
sudo systemctl restart nginx