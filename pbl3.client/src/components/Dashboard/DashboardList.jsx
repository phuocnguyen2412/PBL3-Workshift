import {
    ReconciliationFilled,
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
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const AdminList = [
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
// export const Employee = [
//     {
//         key: "1",
//         icon: <UserOutlined />,
//         label: <Link to="./employee">My information</Link>,
//     },
//     {
//         key: "2",
//         icon: <VideoCameraOutlined />,
//         label: <Link to="./workshift">Work Shift</Link>,
//     },
//     {
//         key: "3",
//         icon: <UploadOutlined />,
//         label: "nav 3",
//     },
// ];
// export const LeadList = [
//     {
//         key: "1",
//         icon: <UserOutlined />,
//         label: <Link to="./employee">Employee</Link>,
//     },
//     {
//         key: "2",
//         icon: <VideoCameraOutlined />,
//         label: <Link to="./workshift">Work Shift</Link>,
//     },
//     {
//         key: "3",
//         icon: <UploadOutlined />,
//         label: "nav 3",
//     },
// ];
