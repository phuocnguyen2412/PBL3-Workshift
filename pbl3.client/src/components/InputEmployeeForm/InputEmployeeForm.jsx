import { Button, Col, Flex, Form, Input, Radio, Row, Select, Spin } from "antd";
import useFetch from "../../custom hook/useFetch";
import { useEffect, useState } from "react";

export default function InputEmployeeForm() {
    const [optionsDuty, setOptionsDuty] = useState([]);
    const { postApi, loading } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    const { getApi, loadingForm } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    const handleSubmitForm = (e) => {
        postApi("employee", e).then((response) => {
            console.log(response);
        });
    };

    useEffect(() => {
        getApi("Duty").then((data) =>
            setOptionsDuty(
                data.map((item) => {
                    return {
                        label: <span>{item.DutyName}</span>,
                        value: item.id,
                    };
                })
            )
        );
    }, []);

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
                            <Input placeholder="Please enter user name" />
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
                                <Radio.Group
                                    defaultValue="a"
                                    buttonStyle="solid"
                                >
                                    <Radio.Button value="FullTime">
                                        Full Time
                                    </Radio.Button>
                                    <Radio.Button value="PartTime">
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
                            <Input placeholder="Please enter phone number" />
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
                                placeholder="Please enter the CoefficientsSalary"
                                type="number"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit" loading={loading}>
                    Thêm nhân viên
                </Button>
            </Form>
        </>
    );
}
