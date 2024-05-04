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
import localhost from "../../../Services/localhost";
import useFetch from "../../../custom hook/useFetch";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function EditDutyForm({
    form,
    record,
    setOpenEdit,
    setDutyList,
}) {
    const { getApi, updateApi, loading } = useFetch(localhost);
    const [optionsDuty, setOptionsDuty] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getApi("/Duty");

            setOptionsDuty(
                data.map((item) => {
                    return {
                        label: <span>{item.dutyName}</span>,
                        value: item.id,
                    };
                })
            );
        };
        fetchData();
    }, []);
    const handleSubmitForm = async (e) => {
        try {
            console.log({
                ...e,
                id: record.id,
            });
            await updateApi("/Duty", {
                ...e,
                id: record.id,
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
        setDutyList(await getApi("/Duty"));
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
