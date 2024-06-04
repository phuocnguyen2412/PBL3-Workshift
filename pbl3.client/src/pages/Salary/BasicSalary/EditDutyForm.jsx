import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    Spin,
    notification,
} from "antd";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import dutyApi from "../../../Services/dutyApi";

export default function EditDutyForm({
    form,
    record,
    setOpenEdit,
    setDutyList,
}) {
    const [loading, setloading] = useState(false);
    const [optionsDuty, setOptionsDuty] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const data = await dutyApi.getAll();
                setOptionsDuty(
                    data.map((item) => {
                        return {
                            label: <span>{item.dutyName}</span>,
                            value: item.id,
                        };
                    })
                );
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false);
            }
        };
        fetchData();
    }, []);
    const handleSubmitForm = async (e) => {
        try {
            console.log({
                ...e,
                id: record.id,
            });
            await dutyApi.change({
                ...e,
                id: record.id,
            });

            api.success({
                message: "Success!",
                description: `You have edited successfully`,
            });
            setOpenEdit(false);
        } catch (err) {
            console.log(err);
            api.error({
                message: "Error",
                description: `Failed to edit!`,
            });
        }
        setDutyList(await dutyApi.getAll());
    };
    return (
        <div>
            {contextHolder}
            <Spin spinning={loading}>
                <Form
                    layout="vertical"
                    onFinish={handleSubmitForm}
                    form={form}
                    initialValues={record}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="dutyName"
                                label="Duty"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter user name",
                                    },
                                ]}
                            >
                                <Select disabled options={optionsDuty} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="basicSalary"
                                label="Basic salary"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the type",
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Please enter basic salary"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button htmlType="submit">Change Duty</Button>
                </Form>
            </Spin>
        </div>
    );
}
EditDutyForm.propTypes = {
    form: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    setOpenEdit: PropTypes.func.isRequired,
    setDutyList: PropTypes.func.isRequired,
};
