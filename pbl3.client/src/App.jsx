import { useRoutes } from "react-router-dom";

import { AccountProvider } from "./Context/AccountContext";

import routes from "./routes";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";

function App() {
    const routeList = useRoutes(routes);
    const [darkMode, setDarkMode] = useState(true);
    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode
                    ? theme.darkAlgorithm
                    : theme.compactAlgorithm,
            }}
        >
            <AccountProvider>{routeList}</AccountProvider>
        </ConfigProvider>
    );
}

export default App;
