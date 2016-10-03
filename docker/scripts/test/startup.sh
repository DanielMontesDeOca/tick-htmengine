#!/bin/bash

# Install dependecy here to avoid creating Dockerfile just for this
apt-get update && apt-get install -y netcat

until nc -z -v -w30 htmengine 8080
do
  echo "Waiting for htmengine to start..."
  sleep 5
done

until nc -z -v -w30 api 3000
do
  echo "Waiting for api to start..."
  sleep 5
done

cd /var/lib/tick-htm-integration/app && npm install && npm test
