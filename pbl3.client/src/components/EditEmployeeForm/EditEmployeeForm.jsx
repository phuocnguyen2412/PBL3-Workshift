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
import PropType from "prop-types";
import useFetch from "../../custom hook/useFetch";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import localhost from "../../Services/localhost";

export default function EditEmployeeForm({
    record,
    form,
    setEmployee,
    setOpenEdit,
}) {
    const [optionsDuty, setOptionsDuty] = useState([]);
    const [employeeEdit, setEmployeeEdit] = useState({
        id: 15,
        fullName: "Huỳnh Phước Nguyên",
        email: "huynhphuocnguyen2412@gmail.com",
        phoneNumber: "0931960822",
        typeOfEmployee: "false",
        coefficientsSalary: 1,
        dutyId: 1,
        status: false,
    });
    const { getApi, updateApi, loading } = useFetch(localhost);

    const [api, contextHolder] = notification.useNotification();
    const handleSubmitForm = async (e) => {
        try {
            console.log({ ...e, id: record.id });
            await updateApi("/Employee", {
                ...e,
                id: record.id,
                typeOfEmployee: e.typeOfEmployee === "true",
            });

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
        setEmployee(await getApi("/Employee"));
    };

    useEffect(() => {
        const fetchData = async () => {
            const dutyList = await getApi("/Duty");
            const data = await getApi(`/Employee/${record.id}`);

            console.log({
                ...data,
                typeOfEmployee: String(data.typeOfEmployee),
                status: String(data.status),
            });

            setEmployeeEdit({
                ...data,
                typeOfEmployee: String(data.typeOfEmployee),
                status: String(data.status),
            });

            setOptionsDuty(
                dutyList.map((item) => {
                    return {
                        label: <span>{item.dutyName}</span>,
                        value: item.id, // Sử dụng value thay vì defaultValue
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
                onFinish={handleSubmitForm}
                initialValues={employeeEdit}
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
                    <Col span={8}>
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
                                    <Radio.Button value="true">
                                        Full Time
                                    </Radio.Button>
                                    <Radio.Button value="false">
                                        Part Time
                                    </Radio.Button>
                                </Radio.Group>
                            </Flex>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="status" label="Status">
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

                <Button htmlType="submit" loading={loading}>
                    Edit employee
                </Button>
            </Form>
        </>
    );
}
EditEmployeeForm.propTypes = {
    record: PropType.object.isRequired,
    form: PropType.object.isRequired,
    setEmployee: PropType.func.isRequired,
    setOpenEdit: PropType.func.isRequired,
};
