#!/bin/sh
cd ./protocol-mapper-app
sh deployJarToKeycloak.sh
cd ..
cd ./keycloak-admin-app
npm install
npm run initKeycloak
cd ..
cd ./keycloak-mock-app
npm install
nohup npm start &
cd ..
cd ./keycloak-auth-service
npm install
nohup npm start &
