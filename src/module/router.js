
import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"
import StartScreen from '../components/viewes/StartScreen/StartScreen.js';
// import SignUpScreen from './components/viewes/SignUpScreen/SignUpScreen.js';
// import SignInScreen from './components/viewes/SignInScreen/SignInScreen.js';
// import ChangeProfileView from './components/viewes/Profile/Change/ChangeProfile.js';
// import NotFoundView from './components/viewes/NotFoundView/NotFoundView.js';
// import ProfileView from './components/viewes/Profile/Profile.js';
// import OfflineGameView from './components/viewes/OfflineGame/OfflineGameView.js';
class Router extends Component {
    render() {
        const { history } = this.props;
        return (
            <div className="App">
                <Switch>
                    <Route history={history} path='/' component={StartScreen}/>
                    <Route history={history} path='/smt' component={StartScreen}/>
                    {/*<Route history={history} path='/signIn' component={SignInScreen} />*/}
                    {/*<Route history={history} path='/signUn' component={SignUpScreen} />*/}
                    {/*<Route history={history} path='/signIn' component={SignInScreen} />*/}
                    {/*<Route history={history} path='/signIn' component={SignInScreen} />*/}
                    {/*<Route history={history} path='/signIn' component={SignInScreen} />*/}
                    <Route history={history} component={StartScreen}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Router)