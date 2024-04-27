import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Spin,
    notification,
} from "antd";
import useFetch from "../../custom hook/useFetch";
import { useEffect, useState } from "react";

export default function EditEmployeeForm({ employeeIdToEdit }) {
    const [optionsDuty, setOptionsDuty] = useState([]);
    const [employee, setEmployee] = useState(null);
    const { postApi, loading } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    const { getApi, loadingForm } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    const [api, contextHolder] = notification.useNotification();
    const handleSubmitForm = (e) => {
        postApi("employee", e).then((response) => {
            if (!response.ok) {
                api.error({
                    message: "Notification Title",
                    description:
                        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                });
            } else
                api.success({
                    message: "Notification Title",
                    description:
                        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
                });
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const dutyList = await getApi("Duty");
            setOptionsDuty(
                dutyList.map((item) => {
                    return {
                        label: <span>{item.DutyName}</span>,
                        value: item.id,
                    };
                })
            );
            const dataEmployee = await getApi(`employee/${employeeIdToEdit}`);
            setEmployee(dataEmployee);
        };
        fetchData();
    }, [employeeIdToEdit]);

    return (
        <>
            {loadingForm && <Spin size="large" />}
            <Form
                layout="vertical"
                hideRequiredMark
                onFinish={handleSubmitForm}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="FullName"
                            label="FullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter user name",
                                },
                            ]}
                        >
                            <Input
                                value={employee?.FullName} // Sử dụng value
                                autoFocus
                                placeholder="Please enter user name"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="TypeOfEmployee"
                            label="Type Of Employee"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the type",
                                },
                            ]}
                        >
                            <Flex vertical gap="middle">
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button
                                        value="FullTime"
                                        checked={
                                            employee?.TypeOfEmployee ===
                                            "FullTime"
                                        }
                                    >
                                        Full Time
                                    </Radio.Button>
                                    <Radio.Button
                                        value="PartTime"
                                        checked={
                                            employee?.TypeOfEmployee ===
                                            "PartTime"
                                        }
                                    >
                                        Part Time
                                    </Radio.Button>
                                </Radio.Group>
                            </Flex>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="PhoneNumber"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter Phone Number",
                                },
                            ]}
                        >
                            <Input
                                value={employee?.PhoneNumber} // Sử dụng value
                                placeholder="Please enter phone number"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Email"
                            label="Email Address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter url",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                }}
                                value={employee?.Email} // Sử dụng value
                                placeholder="Please enter your email!"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="IdDuty"
                            label="Duty Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the approver",
                                },
                            ]}
                        >
                            <Select
                                value={employee?.DutyName}
                                showSearch
                                placeholder="Please choose the approver"
                                options={optionsDuty}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="CoefficientsSalary"
                            label="CoefficientsSalary"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter the CoefficientsSalary",
                                },
                            ]}
                        >
                            <Input
                                value={employee?.CoefficientsSalary} // Sử dụng value
                                placeholder="Please enter the CoefficientsSalary"
                                type="number"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit" loading={loading}>
                    Edit employee
                </Button>
            </Form>
        </>
    );
}
