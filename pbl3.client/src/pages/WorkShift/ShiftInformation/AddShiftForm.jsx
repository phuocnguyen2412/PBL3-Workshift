import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Spin,
    TimePicker,
    notification,
} from "antd";

import PropsType from "prop-types";
import shiftInfo from "../../../Services/shiftInfoApi";
import { useState } from "react";

const AddShiftForm = ({ setData }) => {
    const [loading, setLoading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [form] = Form.useForm();
    const handleSubmit = async (e) => {
        try {
            setLoading(true);
            const data = {
                ...e,
                date: `${e.date.format("YYYY-MM-DD")}T00:00:00.000Z`,
                startTime: `${e.startTime.format("HH:mm:ss")}`,
                endTime: `${e.endTime.format("HH:mm:ss")}`,
                managerId: null,
                checked: false,
            };

            const response = await shiftInfo.add(data);
            apiNotification.success({
                message: "Success!",
                description: `You created a shift ${response.shiftName}`,
                placement: "topRight",
            });
            form.resetFields();
            setData(await shiftInfo.getAll());
        } catch (e) {
            apiNotification.error({
                message: "Error!",
                description: `${e}`,
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="shiftName"
                                label="Shift name"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter!",
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter your shift name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter",
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    type="time"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="startTime"
                                label="Start time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the dateTime",
                                    },
                                ]}
                            >
                                <TimePicker
                                    style={{
                                        width: "100%",
                                    }}
                                    getPopupContainer={(trigger) =>
                                        trigger.parentElement
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="endTime"
                                label="End time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the dateTime",
                                    },
                                ]}
                            >
                                <TimePicker
                                    style={{
                                        width: "100%",
                                    }}
                                    getPopupContainer={(trigger) =>
                                        trigger.parentElement
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Button block htmlType="submit" type="primary">
                                Add a work shift
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </>
    );
};
AddShiftForm.propTypes = {
    setData: PropsType.func.isRequired,
};
export default AddShiftForm;
