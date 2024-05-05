import { Tabs } from "antd";
import EmployeeInfo from "./EmployeeInfo";
import {
    DollarOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import EmployeeSalaryHistory from "./EmployeeSalaryHistory";
import EmployeeShiftReport from "./EmployeeShiftReport";
import EmployeeShiftChecking from "./EmployeeShiftChecking";
import EmployeeBonusSalary from "./EmployeeBonusSalary";

const EmployeeProfie = () => {
    const items = [
        {
            key: "1",
            label: `Information`,
            children: <EmployeeInfo />,
            icon: <UserOutlined />,
        },
        {
            key: "2",
            label: `Shift checking`,
            children: <EmployeeShiftChecking />,
            icon: <SolutionOutlined />,
        },
        {
            key: "3",
            label: `Shift report`,
            children: <EmployeeShiftReport />,
            icon: <SolutionOutlined />,
        },
        {
            key: "4",
            label: `Salary History`,
            children: <EmployeeSalaryHistory />,
            icon: <DollarOutlined />,
        },

        {
            key: "5",
            label: `Bonus salary`,
            children: <EmployeeBonusSalary />,
            icon: <SmileOutlined />,
        },
    ];
    return <Tabs defaultActiveKey="1" items={items} />;
};

export default EmployeeProfie;
