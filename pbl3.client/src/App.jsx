import { useRoutes } from "react-router-dom";

import { AccountContext, AccountProvider } from "./Context/AccountContext";

import routes from "./routes";
import { useContext } from "react";

function App() {
    const account = useContext(AccountContext);

    let routeList = useRoutes(routes);

    return <>{routeList}</>;
}

export default App;
