import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    const routeList = useRoutes(
        routes.map((route) => ({
            ...route,
            element: route.roles ? (
                <ProtectedRoute element={route.element} roles={route.roles} />
            ) : (
                route.element
            ),
            children:
                route.children &&
                route.children.map((child) => ({
                    ...child,
                    element: child.roles ? (
                        <ProtectedRoute
                            element={child.element}
                            roles={child.roles}
                        />
                    ) : (
                        child.element
                    ),
                })),
        }))
    );

    return <>{routeList}</>;
}

export default App;
