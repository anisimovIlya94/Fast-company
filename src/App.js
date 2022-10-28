import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./components/layouts/users";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./components/layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
        </div>
    );
}

export default App;
