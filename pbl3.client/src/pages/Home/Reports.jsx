import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Context/AccountContext";
import { Alert, Button, Spin, Table } from "antd";
import ReportContent from "../WorkShift/ShiftReport/ReportContent";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";

export default function Reports() {
    const { getApi, loading } = useFetch(localhost);

    const account = useContext(AccountContext);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const data = await getApi("/Violate");
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
        <Spin spinning={loading}>
            {data.length > 0 && (
                <Alert
                    message={`Your shop had ${
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
    );
}
