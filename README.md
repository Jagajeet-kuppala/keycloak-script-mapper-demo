### Keycloak Script Mapper Demo

- Start Keycloak server using docker image, with UploadScripts flag enabled.
 
  ```sh deployKeycloak.sh```
- Deploy Custom Script Mapper, register client in keycloak, start client and Transition Layer apps

    ```sh setupE2E.sh```
- List Nodejs apps & port numbers
    
    ```sh killServers.sh```
- Kill processes using kill command

    ```kill <Process ID>```  
