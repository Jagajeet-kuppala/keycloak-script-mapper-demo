import React, {Component} from 'react';
import Keycloak from 'keycloak-js';
import jwt_decode from "jwt-decode";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {keycloak: null, authenticated: false};
    }

    componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            this.setState({keycloak: keycloak, authenticated: authenticated});
            if(authenticated) {
                window.accessToken = keycloak.token;
            }
        })
    }

    render() {
        if(this.state.keycloak) {
            if(this.state.authenticated) {
                return (
                    <div><p>
                        Keycloak secured component<p></p>
                        <pre>{JSON.stringify(jwt_decode(this.state.keycloak.token), null, 4)}</pre>
                    </p></div>
                )
            } else {
                return (
                    <div><p>
                        Unable to authenticate
                    </p></div>
                )
            }
        }
        return (
            <div><p>
                Initialising keycloak...
            </p></div>
        )
    }
}

export default Auth;