import {
    Button,
    Col,
    DatePicker,
    Form,
    Row,
    Select,
    Spin,
    TimePicker,
} from "antd";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropsType from "prop-types";

const AddShiftForm = ({ setData }) => {
    const { getApi, postApi, loading } = useFetch(localhost);
    const handleSubmit = async (e) => {
        const data = {
            ...e,
            date: `${e.date.format("YYYY-MM-DD")}T00:00:00.000Z`,
            startTime: `${e.startTime.format("HH:mm:ss")}`,
            endTime: `${e.endTime.format("HH:mm:ss")}`,
            managerId: null,
            checked: false,
        };
        console.log(data);
        const response = await postApi("/ShiftInfo", data);
        console.log(response);
        setData(await getApi("/ShiftInfo"));
    };
    return (
        <Spin spinning={loading}>
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
                            <DatePicker type="time" />
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
    );
};
AddShiftForm.propTypes = {
    setData: PropsType.func.isRequired,
};
export default AddShiftForm;
