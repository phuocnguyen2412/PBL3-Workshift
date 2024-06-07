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

import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import employeeApi from "../../Services/employeeApi";
import dutyApi from "../../Services/dutyApi";

export default function InputEmployeeForm({ setEmployee }) {
    const [form] = Form.useForm();
    const [optionsDuty, setOptionsDuty] = useState([]);
    const [loading, setloading] = useState(false);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleSubmitForm = async (e) => {
        try {
            setloading(true);
            const data = {
                ...e,
                status: true,
                typeOfEmployee: e.typeOfEmployee === "true",
            };

            await employeeApi.add(data);

            form.resetFields();
            apiNotification.success({
                message: "Success!",
                description: `You have added employee successfully ${e.fullName}`,
                placement: "bottomRight",
            });

            setEmployee(await employeeApi.getAll());
        } catch (err) {
            console.log(err);
            apiNotification.error({
                message: "Error!",
                description: `Bạn đã thêm thất bại nhân viên ${e.fullName}`,
                placement: "bottomRight",
            });
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const data = await dutyApi.getAll();
                setOptionsDuty(
                    data.map((item) => {
                        return {
                            label: <span>{item.dutyName}</span>,
                            value: item.id,
                        };
                    })
                );
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Form layout="vertical" onFinish={handleSubmitForm} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="fullName"
                                label="Full Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter user name",
                                    },
                                ]}
                            >
                                <Input
                                    autoFocus
                                    placeholder="Please enter user name"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="typeOfEmployee"
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
                                        <Radio.Button value={true}>
                                            Full Time
                                        </Radio.Button>
                                        <Radio.Button value={false}>
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
                                name="phoneNumber"
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
                                name="email"
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
                                name="dutyId"
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
                                name="coefficientsSalary"
                                label="Coefficient Salary"
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
            </Spin>
        </>
    );
}
InputEmployeeForm.propTypes = {
    setEmployee: PropTypes.func.isRequired,
};
