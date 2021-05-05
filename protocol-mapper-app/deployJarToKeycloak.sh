#!/bin/sh
echo "Building async_mapper JAR"
jar cf async_mapper.jar META-INF randomClaim.js
KEYCLOAK_DOCKER_ID=$(docker ps -qf "name=keycloak-server")
echo "Deploying JAR to keycloak server"
docker cp async_mapper.jar "$KEYCLOAK_DOCKER_ID":/opt/jboss/keycloak/standalone/deployments
