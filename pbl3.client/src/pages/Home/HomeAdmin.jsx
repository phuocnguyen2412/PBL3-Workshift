import { useEffect, useState } from "react";
import useFetch from "../../custom hook/useFetch";
import CountUp from "react-countup";
import localhost from "../../Services/localhost";
import { Card, Col, Row, Spin, Statistic } from "antd";
import { UserOutlined } from "@ant-design/icons";
const formatter = (value) => <CountUp end={value} separator="," />;
export default function HomeAdmin() {
    const { getApi, loading } = useFetch(localhost);
    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setEmployee(await getApi("/Employee"));
        };
        fetchData();
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
