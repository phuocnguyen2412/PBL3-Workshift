import { Card, Col, Row, Spin, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";
import { UserOutlined } from "@ant-design/icons";
const formatter = (value) => <CountUp end={value} separator="," />;
const Home = () => {
    const { getApi, loading } = useFetch(localhost);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setEmployee(await getApi("/Employee"));
        };
        fetchData();
    }, []);
    const admin = employee.filter((item) => item.dutyName === "Admin");
    const manager = employee.filter((item) => item.dutyName === "Quản lý");
    const others = employee.filter(
        (item) => item.dutyName !== "Quản lý" && item.dutyName !== "Admin"
    );

    return (
        <>
            <Spin spinning={loading}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total employee"
                                value={employee.length}
                                formatter={formatter}
                                prefix=<UserOutlined />
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total admin"
                                value={admin.length}
                                precision={2}
                                formatter={formatter}
                                prefix=<UserOutlined />
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Total manager"
                                value={manager.length}
                                precision={2}
                                formatter={formatter}
                                prefix=<UserOutlined />
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            {" "}
                            <Statistic
                                title="Others"
                                value={others.length}
                                precision={2}
                                formatter={formatter}
                                prefix=<UserOutlined />
                            />
                        </Card>{" "}
                    </Col>
                </Row>
            </Spin>
        </>
    );
};

export default Home;
