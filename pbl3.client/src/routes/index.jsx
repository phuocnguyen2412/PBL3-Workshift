import ChangePassword from "../pages/ChangePassword";
import Employee from "../pages/Employee";
import EmployeeProfile from "../pages/EmployeeProfie";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MainLayout from "../pages/MainLayout";
import BasicSalary from "../pages/Salary/BasicSalary";
import BonusSalary from "../pages/Salary/BonusSalary";
import SalaryHistory from "../pages/Salary/SalaryHistory";
import ShiftInformation from "../pages/WorkShift/ShiftInformation";
import ShiftReport from "../pages/WorkShift/ShiftReport";
import Page404 from "../pages/page404";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "employee/:id",
                element: <EmployeeProfile />,
            },
            {
                path: "employee",
                element: <Employee />,
                roles: ["Admin"],
            },
            {
                path: "work_shift/shift_information",
                element: <ShiftInformation />,
            },
            {
                path: "work_shift/shift_report",
                element: <ShiftReport />,
                roles: ["Admin", "Manager"],
            },
            {
                path: "salary/basic_salary",
                element: <BasicSalary />,
                roles: ["Admin"],
            },
            {
                path: "salary/bonus_salary",
                element: <BonusSalary />,
                roles: ["Admin"],
            },
            {
                path: "salary/salary_history",
                element: <SalaryHistory />,
                roles: ["Admin"],
            },
            {
                path: "change-password",
                element: <ChangePassword />,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Page404 />,
    },
];
