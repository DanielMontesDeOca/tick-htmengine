#!/bin/bash

until nc -z -v -w30 mysql 3306
do
  echo "Waiting for mysql to start..."
  sleep 5
done

until nc -z -v -w30 rabbitmq 5672
do
  echo "Waiting for rabbitmq to start..."
  sleep 5
done

export APPLICATION_CONFIG_PATH=/home/docker/htmengine-app/src/conf

cd /home/docker/htmengine-app/src/
mysql -u root -h http://mysql:3306 --execute="CREATE DATABASE IF NOT EXISTS htmengine" & \
  python repository/migrate.py & \
  supervisord -c conf/supervisord.conf
python webapp.py > logs/webapp.log 2> logs/webapp.error
