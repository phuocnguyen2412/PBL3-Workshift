import { Button, Col, Form, Row, Select, Spin, notification } from "antd";
import { AccountContext } from "../../../Context/AccountContext";
import { useContext, useEffect, useState } from "react";

import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import violateApi from "../../../Services/violateApi";

import shiftInfo from "../../../Services/shiftInfoApi";
ReportForm.propTypes = {
    fetchData: PropTypes.func.isRequired,
};
export default function ReportForm({ fetchData }) {
    const [loading, setLoading] = useState(false);
    const account = useContext(AccountContext);
    const [employeeList, setEmployeeList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [form] = Form.useForm();
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const fetchDataEmployee = async (e) => {
        try {
            setLoading(true);
            const response = await shiftInfo.getAllOfEmployeeInShiftInfo(e);
            setEmployeeList(
                response.map((item) => {
                    return {
                        value: item.id,
                        label: item.fullName,
                    };
                })
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchDataShift = async () => {
            try {
                const response = await shiftInfo.getAllOfEmployee(
                    account.account.employeeId
                );

                setShiftList(
                    response.map((item) => {
                        return {
                            value: item.id,
                            label: `${item.shiftName} : ${dayjs(
                                item.date
                            ).format("DD/MM/YYYY")} - ${item.startTime} - ${
                                item.endTime
                            }`,
                        };
                    })
                );
            } catch (err) {
                console.log(err);
            }
        };

        fetchDataShift();
    }, []);

    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const handleSubmitForm = async (e) => {
        try {
            const data = {
                ...e,
                checked: false,
                handle: 0,
            };

            const response = await violateApi.add(data);
            console.log(response);
            apiNotification.success({
                message: "Success!",
                description: `You created a new report`,
                placement: "topRight",
            });
            form.resetFields();
            fetchData();
        } catch (err) {
            apiNotification.error({
                message: "Error!",
                description: `${err}`,
                placement: "topRight",
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
                                name="shiftInfoId"
                                label="Shift name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select name",
                                    },
                                ]}
                            >
                                <Select
                                    onSelect={fetchDataEmployee}
                                    showSearch
                                    placeholder="Select a shift"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    options={shiftList}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="employeeId"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a work shift",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    options={employeeList}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="reason"
                                label="Reason"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter reason",
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button htmlType="submit" type="primary" block>
                        Submit
                    </Button>
                </Form>
            </Spin>
        </>
    );
}
