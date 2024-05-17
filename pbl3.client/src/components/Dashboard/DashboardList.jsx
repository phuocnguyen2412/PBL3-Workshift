import {
    TransactionOutlined,
    UserOutlined,
    CalendarOutlined,
    FormOutlined,
    CarryOutOutlined,
    DollarOutlined,
    AccountBookOutlined,
    CheckCircleOutlined,
    SafetyOutlined,
    CloseOutlined,
    HomeOutlined,
    ScheduleOutlined,
    SmileOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const AdminList = [
    {
        key: "/home",
        icon: <HomeOutlined />,
        label: <Link to="/home">Home</Link>,
    },
    {
        key: "/employee",
        icon: <UserOutlined />,
        label: <Link to="/employee">Employee</Link>,
    },
    {
        key: "/work_shift",
        icon: <CarryOutOutlined />,
        label: "Work Shift",
        children: [
            {
                key: "/work_shift/shift",
                icon: <CalendarOutlined />,
                label: (
                    <Link to="/work_shift/shift_information">
                        Shift Information
                    </Link>
                ),
            },
            {
                key: "/work_shift/shift_report",
                icon: <FormOutlined />,
                label: <Link to="/work_shift/shift_report">Shift Report</Link>,
            },
        ],
    },
    {
        key: "/salary",
        icon: <TransactionOutlined />,
        label: "Salary",
        children: [
            {
                key: "/salary/basic_salary",
                icon: <DollarOutlined />,
                label: <Link to="/salary/basic_salary">Basic Salary</Link>,
            },
            {
                key: "/salary/bonus_salary",
                icon: <CheckCircleOutlined />,
                label: <Link to="/salary/bonus_salary">Bonus Salary</Link>,
            },
            {
                key: "/salary/salary_history",
                icon: <AccountBookOutlined />,
                label: <Link to="/salary/salary_history">Salary History</Link>,
            },
        ],
    },
    {
        key: "/change-password",
        icon: <SafetyOutlined />,
        label: <Link to="/change-password">Change Password</Link>,
    },
    {
        key: "/login",
        icon: <CloseOutlined />,
        label: <Link to="/login">Logout</Link>,
    },
];
export const Manager = [
    {
        key: "1",
        icon: <UserOutlined />,
        label: <Link to="./home/">Home</Link>,
    },
    {
        key: "2",
        icon: <CalendarOutlined />,
        label: <Link to="./work_shift/shift_information">Work Shift</Link>,
    },
    {
        key: "7",
        icon: <SolutionOutlined />,
        label: <Link to="./work_shift/shift_report">Shift reports</Link>,
    },
    {
        key: "/change-password",
        icon: <SafetyOutlined />,
        label: <Link to="/change-password">Change Password</Link>,
    },
    {
        key: "/login",
        icon: <CloseOutlined />,
        label: <Link to="/login">Logout</Link>,
    },
];
export const Employee = [
    {
        key: "1",
        icon: <UserOutlined />,
        label: <Link to="./home/">Home</Link>,
    },
    {
        key: "2",
        icon: <CalendarOutlined />,
        label: <Link to="./work_shift/shift_information">Work Shift</Link>,
    },
    {
        key: "/change-password",
        icon: <SafetyOutlined />,
        label: <Link to="/change-password">Change Password</Link>,
    },
    {
        key: "/login",
        icon: <CloseOutlined />,
        label: <Link to="/login">Logout</Link>,
    },
];
