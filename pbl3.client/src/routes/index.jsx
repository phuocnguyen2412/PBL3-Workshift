import Employee from "../pages/Employee";
import Login from "../pages/Login";
import MainLayout from "../pages/MainLayout";
import WorkShift from "../pages/WorkShift";
import Page404 from "../pages/page404";

const routes = [
    {
        path: "/home",
        element: <MainLayout />,
        children: [
            {
                path: "/home/employee",
                element: <Employee />,
            },
            {
                path: "/home/workshift",
                element: <WorkShift />,
            },
        ],
    },
    {
        path: "*",
        element: <Page404 />,
    },
    {
        path: "/login",
        element: <Login />,
    },
];
export default routes;
