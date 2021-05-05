import {
    addProtocolMapperToScope,
    authKcAdmin,
    createClient, createClientScope,
    getAllUsers, getClient, getClientScope,
    getKcAdminClient,
    getRealmExport, listScopeProtocolMappers, mapClientScopeToClient
} from "./modules/keycloak/kcAdminClient";
import realmConfig from './modules/kcConfigs/kcRealmConfig.json';
import authConfig from './modules/kcConfigs/adminAuthConfig.json';
import createClientConfig from './modules/kcConfigs/createClientConfig.json';
import dummyMapper from './modules/kcConfigs/dummy-mapper.json';
import realmExportConfig from './modules/kcConfigs/exportRealmConfig.json';

import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const initKeycloak = async () => {
    const clientScopeName = 'demo-scope';
    const updatedRealmConfig = realmConfig;

    updatedRealmConfig.requestConfig['httpsAgent'] = httpsAgent;
    try {
        const kcAdmin = getKcAdminClient(updatedRealmConfig)
        console.log("Logging in as Admin...");

        await authKcAdmin(kcAdmin, authConfig)
        console.log("Adding new client - demo-app");

        const client = await createClient(kcAdmin, createClientConfig);
        // create scope
        console.log("Create scope - demo-scope");
        await createClientScope(kcAdmin, clientScopeName);

        // add mapper to the scope - async_mapper
        const clientScope = await getClientScope(kcAdmin, clientScopeName);
        console.log("Add async_mapper to scope");
        await addProtocolMapperToScope(kcAdmin, clientScope, dummyMapper);

        // add the scope to client
        console.log("Add demo-scope to demo-client", client);
        await mapClientScopeToClient(kcAdmin, client.id, clientScope.id,);
    } catch (err) {
        console.log(err);
    }
    // const users = await getAllUsers(kcAdmin);
    // console.log(users);

    // const realmExport = await getRealmExport(kcAdmin, realmExportConfig);
    // console.log(JSON.stringify(realmExport))
};

initKeycloak().then(console.log).catch(console.log);

export default initKeycloak;
