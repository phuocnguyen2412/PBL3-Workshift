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
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropsType from "prop-types";

const AddShiftForm = ({ setData }) => {
    const { getApi, postApi, loading } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [form] = Form.useForm();
    const handleSubmit = async (e) => {
        try {
            const data = {
                ...e,
                date: `${e.date.format("YYYY-MM-DD")}T00:00:00.000Z`,
                startTime: `${e.startTime.format("HH:mm:ss")}`,
                endTime: `${e.endTime.format("HH:mm:ss")}`,
                managerId: null,
                checked: false,
            };

            const response = await postApi("/ShiftInfo", data);
            apiNotification.success({
                message: "Success!",
                description: `You created a shift ${response.shiftName}`,
                placement: "topRight",
            });
            form.resetFields();
            setData(await getApi("/ShiftInfo"));
        } catch (e) {
            apiNotification.error({
                message: "Error!",
                description: `${e}`,
                placement: "topRight",
            });
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
                            <Button block htmlType="submit">
                                Tạo ca làm
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
