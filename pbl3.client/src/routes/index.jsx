import ChangePassword from "../pages/ChangePassword";
import Employee from "../pages/Employee";
import Login from "../pages/Login";
import MainLayout from "../pages/MainLayout";
import BasicSalary from "../pages/Salary/BasicSalary";
import BonusSalary from "../pages/Salary/BonusSalary";
import SalaryHistory from "../pages/Salary/SalaryHistory";

import ShiftInformation from "../pages/WorkShift/ShiftInformation";
import ShiftReport from "../pages/WorkShift/ShiftReport";
import Page404 from "../pages/page404";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/employee",
                element: <Employee />,
            },
            {
                path: "/work_shift",

                children: [
                    {
                        path: "/work_shift/shift_information",
                        element: <ShiftInformation />,
                    },
                    {
                        path: "/work_shift/shift_report",
                        element: <ShiftReport />,
                    },
                ],
            },
            {
                path: "/salary",

                children: [
                    {
                        path: "/salary/basic_salary",
                        element: <BasicSalary />,
                    },
                    {
                        path: "/salary/bonus_salary",
                        element: <BonusSalary />,
                    },
                    {
                        path: "/salary/salary_history",
                        element: <SalaryHistory />,
                    },
                ],
            },
            {
                path: "/change-password",
                element: <ChangePassword />,
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
