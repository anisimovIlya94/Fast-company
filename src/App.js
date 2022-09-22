import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./components/layouts/users";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import ProfessionProvider from "./hooks/useProfessions";
import QualityProvider from "./hooks/useQualityes";

function App() {
    return (
        <div>
            <NavBar/>
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/users/:userId?/:edit?" component={Users} />
                        <Redirect to="/" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
        </div>
    );
}

export default App;
