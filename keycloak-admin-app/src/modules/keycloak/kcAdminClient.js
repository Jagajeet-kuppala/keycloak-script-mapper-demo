import KcAdminClient from 'keycloak-admin';

export const getKcAdminClient = (realmConfig) => new KcAdminClient(realmConfig);

export const authKcAdmin = (kcAdmin, authConfig) => kcAdmin.auth(authConfig);

export const getAllUsers = (kcAdmin) => kcAdmin.users.find();

export const getRealmExport = (kcAdmin, realmConfig) => kcAdmin.realms.export(realmConfig);

export const createClient = (kcAdmin, createClientConfig) => kcAdmin.clients.create({
    'clientId': createClientConfig.clientId,
    'baseUrl': createClientConfig.baseUrl,
    'protocol': 'openid-connect',
    'redirectUris': createClientConfig.redirectUris
});

export const getClient = (kcAdmin, clientId) => kcAdmin.clients.findOne({
    id: clientId,
});

export const createClientScope = (kcAdmin, clientScopeName) => kcAdmin.clientScopes.create({
    name: clientScopeName,
    protocol: 'openid-connect'
});

export const getClientScope = (kcAdmin, clientScopeName) => kcAdmin.clientScopes.findOneByName({
    name: clientScopeName,
});

export const listScopeProtocolMappers = (kcAdmin, clientScopeId) => kcAdmin.clientScopes.listProtocolMappers({
    id: clientScopeId,
});
export const addProtocolMapperToScope = (kcAdmin, clientScope, dummyMapper) => kcAdmin.clientScopes.addProtocolMapper(
    clientScope, dummyMapper
);

export const mapClientScopeToClient = (kcAdmin, clientId, clientScopeId) => kcAdmin.clients.addDefaultClientScope(
    {
        id: clientId,
        clientScopeId: clientScopeId,
    }
);

export default getKcAdminClient;
