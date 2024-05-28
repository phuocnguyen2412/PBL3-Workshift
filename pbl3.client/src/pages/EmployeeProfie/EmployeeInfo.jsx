import {
    Badge,
    Button,
    Col,
    Descriptions,
    Image,
    Result,
    Row,
    Spin,
    Tag,
} from "antd";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";
const EmployeeInfo = () => {
    const { getApi, loading } = useFetch(localhost);
    const params = useParams();
    const [employee, setEmployee] = useState({});
    const [error, setError] = useState(false);
    const naviagte = useNavigate();
    const fetchData = async () => {
        try {
            const data = await getApi(`/Employee/${params.id}`);

            setEmployee(data);
        } catch (e) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const items = [
        {
            key: "1",
            label: "Full name",
            children: employee.fullName,
            span: 4,
        },
        {
            key: "2",
            label: "Email",
            children: employee.email,
            span: 2,
        },

        {
            key: "3",
            label: "Phone number",
            children: employee.phoneNumber,
            span: 2,
        },

        {
            key: "4",
            label: "Duty",
            children:
                employee.dutyName === "Admin" ? (
                    <Tag bordered={false} color="red">
                        {employee.dutyName}
                    </Tag>
                ) : employee.dutyName === "Quản lý" ? (
                    <Tag bordered={false} color="blue">
                        {employee.dutyName}
                    </Tag>
                ) : (
                    <Tag bordered={false} color="purple">
                        {employee.dutyName}
                    </Tag>
                ),
        },
        {
            key: "5",
            label: "Type of employee",
            children: employee.typeOfEmployee ? (
                <Tag bordered={false} color="success">
                    Full Time
                </Tag>
            ) : (
                <Tag bordered={false} color="warning">
                    Part Time
                </Tag>
            ),
            span: 2,
        },

        {
            key: "6",
            label: "Coefficient salary",
            children: employee.coefficientsSalary,
            span: 2,
        },
        {
            key: "7",
            label: "Basic salary",
            children: employee.basicSalary,
            span: 2,
        },
        {
            key: "8",
            label: "Status",
            children: employee.status ? (
                <Badge status="success" text="Đang làm" />
            ) : (
                <Badge status="error" text="Đã nghỉ làm" />
            ),
            span: 4,
        },
    ];
    return (
        <>
            {error ? (
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the employee's page you visited does not exist."
                    extra={
                        <Button
                            type="primary"
                            onClick={() => naviagte("/home")}
                        >
                            Back Home
                        </Button>
                    }
                />
            ) : (
                <Spin spinning={loading}>
                    <Row gutter={24} align="middle">
                        <Col span={8}>
                            <Image
                                width="100%"
                                src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
                            />
                        </Col>
                        <Col span={16}>
                            <Descriptions
                                layout="vertical"
                                title={`Employee Information`}
                                bordered
                                items={items}
                            />
                        </Col>
                    </Row>
                </Spin>
            )}
        </>
    );
};

export default EmployeeInfo;
