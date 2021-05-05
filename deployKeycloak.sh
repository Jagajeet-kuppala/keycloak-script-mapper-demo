#!/bin/sh
docker rm keycloak-server
docker run -p 8080:8080 --name keycloak-server -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak -Dkeycloak.profile.feature.upload_scripts=enabled -b 0.0.0.0
