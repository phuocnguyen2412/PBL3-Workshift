import { useRoutes } from "react-router-dom";

import { AccountProvider } from "./Context/AccountContext";

import routes from "./routes";


function App() {
    const routeList = useRoutes(routes);

    return <AccountProvider>{routeList}</AccountProvider>;
}

export default App;
