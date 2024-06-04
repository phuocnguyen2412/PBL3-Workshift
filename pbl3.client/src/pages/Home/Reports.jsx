import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Context/AccountContext";
import { Alert, Button, Col, Row, Spin, Table } from "antd";
import ReportContent from "../WorkShift/ShiftReport/ReportContent";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";

export default function Reports() {
    const { getApi, loading } = useFetch(localhost);

    const account = useContext(AccountContext);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let data;

        if (account.account.dutyName === "Admin")
            data = await getApi("/Violate");
        else {
            data = await getApi(
                `/Violate/ByemployeeId/${account.account.employeeId}`
            );
        }

        setData(() => data.filter((e) => e.checked === false));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: "Employee",
            dataIndex: "employeeName",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "shiftName",
            key: "shiftName",
        },
        {
            title: "Address",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Start time",
            key: "startTime",
            dataIndex: "startTime",
        },
        {
            title: "End time",
            key: "endTime",
            dataIndex: "endTime",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        More
                    </Button>
                    <ReportContent
                        fetchData={fetchData}
                        data={record}
                        setOpen={setOpen}
                        open={open}
                    />
                </>
            ),
        },
    ];

    return (
        <Row gutter={16} style={{ marginBottom: "12px" }}>
            <Col span={24}>
                <Spin spinning={loading}>
                    {data.length > 0 && (
                        <Alert
                            message={`${
                                account.account.dutyName === "Admin"
                                    ? "Your shop"
                                    : "You"
                            } had ${
                                data.length === 1
                                    ? `1 report`
                                    : `${data.length} reports`
                            }  that haven't been reviewed`}
                            description=<Table
                                rowKey="id"
                                dataSource={data}
                                columns={columns}
                            />
                            type="info"
                            showIcon
                            closable
                        />
                    )}
                </Spin>
            </Col>
        </Row>
    );
}
