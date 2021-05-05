### To Jar
`jar cf async_mapper.jar META-INF randomClaim.js node_modules`
### Copy from a local directory to Pod
`kubectl cp script_jar.jar <POD_NAME>:/opt/jboss/keycloak/standalone/deployments`
### Copy from a local directory to Docker Container
`docker cp script_jar.jar <Container_id>:/opt/jboss/keycloak/standalone/deployments`
