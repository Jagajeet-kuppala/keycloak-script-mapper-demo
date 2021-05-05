/**
 * Available variables:
 * user - the current user (UserModel)
 * realm - the current realm (RealmModel)
 * token - the current token (TokenModel)
 * userSession - the current userSession (UserSessionModel)
 * keycloakSession - the current keycloakSession (KeycloakSessionModel)
 */


//insert your code here...
var HttpClients = Java.type("org.apache.http.impl.client.HttpClients");
var httpGet = Java.type("org.apache.http.client.methods.HttpGet");
var EntityUtils = Java.type("org.apache.http.util.EntityUtils");

function makeAsyncCall(baseUrl) {
    var httpClient = HttpClients.createDefault();
    var post = new httpGet(baseUrl);
    var res = null;
    try {
        print("Making Asyn call to:" + baseUrl);
        var response = httpClient.execute(post);
        print("Async call status:" + response.getStatusLine().getStatusCode());
        var data = EntityUtils.toString(response.getEntity());
        print("Async response data:" + data);
        if (response.getStatusLine().getStatusCode() == 200) {
            token.setOtherClaims('random_thing',data);
        }
        else {
            print("FAILED with status code != 200");
            token.setOtherClaims('random_thing', 'async failed');
            res = null;
        }
        response.close();
    }
    catch (error) {
        print("FAILED with error:" + error);
        token.setOtherClaims('random_thing', 'async Error');
    }
    return res;
}

makeAsyncCall("http://host.docker.internal:9000/");

// var axios = require('axios');
// axios.get('https://google.com', {}).then(function (data) {
//     token.setOtherClaims('random_thing','async passed');
// }).catch(function (err) {
//         token.setOtherClaims('random_thing', 'async failed');
//     }
// );
