#!/bin/bash

REPO_NAME=sinhala-text-genie
if [ -d "$REPO_NAME" ]; then
  echo "Repository already exists, skipping clone & pulling"
  cd $REPO_NAME
  git pull
else
  echo "Cloning repository"
  git clone https://github.com/bmorashad/sinhala-text-genie.git
fi