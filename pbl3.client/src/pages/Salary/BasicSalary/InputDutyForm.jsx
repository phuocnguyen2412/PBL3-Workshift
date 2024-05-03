import { Button, Col, Form, Input, Row, Spin, notification } from "antd";

import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropTypes from "prop-types";
export default function InputDutyForm({ setDutyList, form }) {
    const { postApi, loading, getApi } = useFetch(localhost);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleSubmitForm = async (e) => {
        try {
            console.log(e);
            await postApi("/Employee", {});
            form.resetFields();
            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã thêm thành công nhân viên ${e.dutyName}`,
                placement: "bottomRight",
            });
            setDutyList(await getApi("/Duty"));
        } catch (err) {
            console.log(err);
            apiNotification.error({
                message: "Thất bại!",
                description: `Bạn đã thêm thất bại nhân viên ${e.dutyName}`,
                placement: "bottomRight",
            });
        }
    };

    return (
        <>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Form layout="vertical" onFinish={handleSubmitForm} form={form}>
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
                                <Input
                                    autoFocus
                                    placeholder="Please enter duty name"
                                />
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

                    <Button htmlType="submit">Thêm công việc</Button>
                </Form>
            </Spin>
        </>
    );
}
InputDutyForm.propTypes = {
    form: PropTypes.object.isRequired,
    setDutyList: PropTypes.func.isRequired,
};
