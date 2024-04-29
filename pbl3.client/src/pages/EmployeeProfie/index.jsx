import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../custom hook/useFetch";
import { Spin, Tabs } from "antd";
import EmployeeInfo from "./EmployeeInfo";
import {
    DollarOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import EmployeeSalaryHistory from "./EmployeeSalaryHistory";
const EmployeeProfie = () => {
    const { getApi, loading } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3"
    );
    const params = useParams();
    const [employee, setEmployee] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const data = await getApi(`/employee/${params.id}`);
            setEmployee(data);
        };
        fetchData();
    }, []);
    console.log(employee);
    const items = [
        {
            key: "1",
            label: `Information`,
            children: <EmployeeInfo employee={employee} />,
            icon: <UserOutlined />,
        },
        {
            key: "2",
            label: `Shift checking`,
            children: <EmployeeSalaryHistory />,
            icon: <SolutionOutlined />,
        },
        {
            key: "3",
            label: `Shift report`,
            children: <EmployeeSalaryHistory />,
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
            children: <EmployeeSalaryHistory />,
            icon: <SmileOutlined />,
        },
    ];
    return (
        <Spin spinning={loading}>
            <Tabs defaultActiveKey="1" items={items} />
        </Spin>
    );
};

export default EmployeeProfie;
