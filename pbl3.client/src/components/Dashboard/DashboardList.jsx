import {
    SolutionOutlined,
    HomeFilled,
    IdcardFilled,
    ScheduleFilled,
    CalendarFilled,
    FileExclamationFilled,
    PayCircleFilled,
    RedEnvelopeFilled,
    LockFilled,
    GoldFilled,
    GiftFilled,
    CloseSquareFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const AdminList = [
    {
        key: "/home",
        icon: <HomeFilled />,
        label: <Link to="/home">Home</Link>,
    },
    {
        key: "/employee",
        icon: <IdcardFilled />,
        label: <Link to="/employee">Employee</Link>,
    },
    {
        key: "/work_shift",
        icon: <ScheduleFilled />,
        label: "Work Shift",
        children: [
            {
                key: "/work_shift/shift",
                icon: <CalendarFilled />,
                label: (
                    <Link to="/work_shift/shift_information">
                        Shift Information
                    </Link>
                ),
            },
            {
                key: "/work_shift/shift_report",
                icon: <FileExclamationFilled />,
                label: <Link to="/work_shift/shift_report">Shift Report</Link>,
            },
        ],
    },
    {
        key: "/salary",
        icon: <PayCircleFilled />,
        label: "Salary",
        children: [
            {
                key: "/salary/basic_salary",
                icon: <GoldFilled />,
                label: <Link to="/salary/basic_salary">Basic Salary</Link>,
            },
            {
                key: "/salary/bonus_salary",
                icon: <GiftFilled />,
                label: <Link to="/salary/bonus_salary">Bonus Salary</Link>,
            },
            {
                key: "/salary/salary_history",
                icon: <RedEnvelopeFilled />,
                label: <Link to="/salary/salary_history">Salary History</Link>,
            },
        ],
    },
    {
        key: "/change-password",
        icon: <LockFilled />,
        label: <Link to="/change-password">Change Password</Link>,
    },
    {
        key: "/login",
        icon: <CloseSquareFilled />,
        label: <Link to="/login">Logout</Link>,
    },
];
export const Manager = [
    {
        key: "1",
        icon: <HomeFilled />,
        label: <Link to="./home/">Home</Link>,
    },
    {
        key: "2",
        icon: <CalendarFilled />,
        label: <Link to="./work_shift/shift_information">Work Shift</Link>,
    },
    {
        key: "7",
        icon: <SolutionOutlined />,
        label: <Link to="./work_shift/shift_report">Shift reports</Link>,
    },
    {
        key: "/change-password",
        icon: <LockFilled />,
        label: <Link to="/change-password">Change Password</Link>,
    },
    {
        key: "/login",
        icon: <CloseSquareFilled />,
        label: <Link to="/login">Logout</Link>,
    },
];
export const Employee = [
    {
        key: "1",
        icon: <HomeFilled />,
        label: <Link to="./home/">Home</Link>,
    },
    {
        key: "2",
        icon: <CalendarFilled />,
        label: <Link to="./work_shift/shift_information">Work Shift</Link>,
    },
    {
        key: "/change-password",
        icon: <LockFilled />,
        label: <Link to="/change-password">Change Password</Link>,
    },
    {
        key: "/login",
        icon: <CloseSquareFilled />,
        label: <Link to="/login">Logout</Link>,
    },
];
