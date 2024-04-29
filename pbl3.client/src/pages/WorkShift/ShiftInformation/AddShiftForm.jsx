import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";

const AddShiftForm = () => {
    const handleSubmit = (e) => {
        console.log(e);
    };
    return (
        <Spin spinning={false}>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="shiftName"
                            label="Shift name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose Shift name",
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        value: "Ca sáng",
                                        label: "Ca sáng",
                                    },
                                    {
                                        value: "Ca chiều",
                                        label: "Ca chiều",
                                    },
                                    {
                                        value: "Ca tối",
                                        label: "Ca tối",
                                    },
                                    {
                                        value: "Ca khuya",
                                        label: "Ca khuya",
                                    },
                                ]}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter url",
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="approver"
                            label="Approver"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the approver",
                                },
                            ]}
                        >
                            <Select placeholder="Please choose the approver">
                                <Select.Option value="jack">
                                    Jack Ma
                                </Select.Option>
                                <Select.Option value="tom">
                                    Tom Liu
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="dateTime"
                            label="DateTime"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the dateTime",
                                },
                            ]}
                        >
                            <DatePicker.RangePicker
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
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: "please enter url description",
                                },
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="please enter url description"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Button block htmlType="submit">
                            Tạo ca làm
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Spin>
    );
};

export default AddShiftForm;
