import ChangePassword from "../pages/ChangePassword";
import Employee from "../pages/Employee";
import EmployeeProfie from "../pages/EmployeeProfie";
import EmployeeBonusSalary from "../pages/EmployeeProfie/EmployeeBonusSalary";
import EmployeeSalaryHistory from "../pages/EmployeeProfie/EmployeeSalaryHistory";
import EmployeeShiftChecking from "../pages/EmployeeProfie/EmployeeShiftChecking";
import EmployeeShiftReport from "../pages/EmployeeProfie/EmployeeShiftReport";
import Home from "../pages/Home";
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
                path: "/home",
                element: <Home />,
            },
            {
                path: "/employee/:id",
                element: <EmployeeProfie />,
            },
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
            {
                path: "/bonus_salary",
                element: <EmployeeBonusSalary />,
            },
            {
                path: "/salary_history",
                element: <EmployeeSalaryHistory />,
            },
            {
                path: "/shift_checking",
                element: <EmployeeShiftChecking />,
            },
            {
                path: "/shift_report",
                element: <EmployeeShiftReport />,
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
