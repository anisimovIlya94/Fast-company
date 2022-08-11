import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/layouts/users";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users}/>
            </Switch>
        </div>
    );
}

export default App;
