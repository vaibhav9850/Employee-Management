import React, { Component } from "react";
import RegisterLocal from "./RegisterLocal";
import Login from './Login'
import ShowToNormalUser from './ShowToNormalUser'
import ShowToAdmin from './ShowToAdmin'
import AddBulk from './AddBulk'
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Search from "./Search";
import Report from "./Report";

export default class App extends Component {

    render() {

        return (

            <Router  component={Login}  history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />          
                    <Route path="/registerLocal" component={RegisterLocal} />
                    <Route path="/showToNormalUser" component={ShowToNormalUser} />
                    <Route path="/showToAdmin" component={ShowToAdmin} />
                    <Route path="/addBulk" component={AddBulk} />
                    <Route path="/search" component={Search} />
                    <Route path="/report" component={Report} />
                </Switch>
            </Router>

        );
    }

}
