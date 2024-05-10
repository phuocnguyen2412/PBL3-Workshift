import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import { AccountContext } from "../../../Context/AccountContext";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
export default function ReportForm() {
    const { getApi, postApi, loading } = useFetch(localhost);
    const account = useContext(AccountContext);
    const [employeeList, setEmployeeList] = useState([]);
    const [shiftList, setShiftList] = useState([]);

    useEffect(() => {
        const fetchDataEmployee = async () => {
            const response = await getApi(
                "/Employee/GetAllEmployeesByStatusAsync?status=true"
            );
            setEmployeeList(
                response.map((item) => {
                    return {
                        value: item.id,
                        label: item.fullName,
                    };
                })
            );
        };
        const fetchDataShift = async () => {
            try {
                const response = await getApi(
                    `/ShiftInfo/manager/${account.account.employeeId}`
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
        fetchDataEmployee();
        fetchDataShift();
    }, []);

    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const handleSubmitForm = async (e) => {
        try {
            const response = await postApi("/Violate", e);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Spin spinning={loading}>
            <Form layout="vertical" onFinish={handleSubmitForm}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="employeeId"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter user name",
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
                            name="shiftId"
                            label="Shift name"
                            rules={[
                                { required: true, message: "Please enter url" },
                            ]}
                        >
                            <Select
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
                            name="reason"
                            label="Reason"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the dateTime",
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="handle"
                            label="Handle"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the dateTime",
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit">Submit</Button>
            </Form>
        </Spin>
    );
}
