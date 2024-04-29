import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Switch,
    notification,
} from "antd";
import useFetch from "../../custom hook/useFetch";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export default function EditEmployeeForm({
    employeeToEdit,
    form,
    setEmployee,
    setOpenEdit,
}) {
    const [optionsDuty, setOptionsDuty] = useState([]);
    const { getApi, updateApi, loading } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );

    const [api, contextHolder] = notification.useNotification();
    const handleSubmitForm = async (e) => {
        try {
            const response = await updateApi("employee", e, employeeToEdit.id);

            api.success({
                message: "Thành công!",
                description: `Đã edit thành công nhân viên ${e.fullName}`,
            });
            setOpenEdit(false);
        } catch (err) {
            console.log(err);
            api.error({
                message: "Thất bại",
                description: `Edit thất bại nhân viên ${e.fullName}`,
            });
        }
        setEmployee(await getApi("/employee"));
    };

    useEffect(() => {
        const fetchData = async () => {
            const dutyList = await getApi("Duty");
            setOptionsDuty(
                dutyList.map((item) => {
                    return {
                        label: <span>{item.DutyName}</span>,
                        defaultValue: item.id,
                    };
                })
            );
        };
        fetchData();
    }, []);

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                onFinish={handleSubmitForm}
                initialValues={employeeToEdit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            autoFocus
                            name="fullName"
                            label="Full Name"
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
                                <Radio.Group buttonStyle="solid">
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
                            name="idDuty"
                            label="Duty Name"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: "Please choose the approver",
                            //     },
                            // ]}
                        >
                            <Select
                                showSearch
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
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter the CoefficientsSalary",
                                },
                            ]}
                        >
                            <Switch
                                checkedChildren=<span>
                                    Đang đi làm
                                    <CheckOutlined />
                                </span>
                                unCheckedChildren=<span>
                                    Nghỉ làm <CloseOutlined />
                                </span>
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
