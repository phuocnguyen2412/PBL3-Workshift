import { useEffect, useState } from "react";

import CountUp from "react-countup";

import { Card, Col, Row, Spin, Statistic } from "antd";
import { UserOutlined } from "@ant-design/icons";
import employeeApi from "../../Services/employeeApi";
const formatter = (value) => <CountUp end={value} separator="," />;
export default function HomeAdmin() {
    const [loading, setloading] = useState(false);
    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setEmployee(await employeeApi.getAll());
        };
        setloading(true);
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }, []);
    const admin = employee.filter((item) => item.dutyName === "Admin");
    const manager = employee.filter((item) => item.dutyName === "Manager");
    const others = employee.filter(
        (item) => item.dutyName !== "Manager" && item.dutyName !== "Admin"
    );
    return (
        <Spin spinning={loading}>
            <Row gutter={16} style={{ marginBottom: "12px" }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total employee"
                            value={employee.length}
                            formatter={formatter}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total admin"
                            value={admin.length}
                            precision={2}
                            formatter={formatter}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total manager"
                            value={manager.length}
                            precision={2}
                            formatter={formatter}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Others"
                            value={others.length}
                            precision={2}
                            formatter={formatter}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </Spin>
    );
}
