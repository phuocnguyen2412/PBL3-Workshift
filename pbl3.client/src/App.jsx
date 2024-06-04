import { useRoutes } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";
import { useContext } from "react";
import { AccountContext } from "./Context/AccountContext";

function App() {
    const account = useContext(AccountContext);

    const routeList = useRoutes(
        Object.keys(account.account) === 0 ? publicRoutes : privateRoutes
    );

    return <>{routeList}</>;
}

export default App;
