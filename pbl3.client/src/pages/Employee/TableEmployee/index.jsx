import { Button, Spin, Table } from "antd";
import useFetch from "../../../custom hook/useFetch";
import { useEffect } from "react";
import { DeleteColumnOutlined, SettingOutlined } from "@ant-design/icons";
const columns = [
    {
        title: "Full Name",
        dataIndex: "FullName",
    },
    {
        title: "Email",
        dataIndex: "Email",
    },
    {
        title: "Phone Number",
        dataIndex: "PhoneNumber",
    },
    {
        title: "Type of employee",
        dataIndex: "TypeOfEmployee",
    },
    {
        title: "Coeficients Salary",
        dataIndex: "CoeficientsSalary",
    },
    {
        title: "Duty",
        dataIndex: "Duty",
    },
    {
        title: "Change",
        dataIndex: "Change",
    },
    {
        title: "Delete",
        dataIndex: "Delete",
    },
];

const TableEmployee = ({ data, setEmployee }) => {
    const { getApi, loading } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    useEffect(() => {
        getApi("employee").then((data) => {
            setEmployee(
                data.map((item, index) => {
                    return {
                        ...item,
                        change: (
                            <Button
                                shape="circle"
                                icon={<DeleteColumnOutlined />}
                            />
                        ),
                        delete: (
                            <Button shape="circle" icon={<SettingOutlined />} />
                        ),
                        key: index,
                    };
                })
            );
        });
    }, []);
    console.log(data);
    return (
        <>
            {loading && <Spin size="large" />}
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 20,
                }}
                scroll={{
                    y: "600px",
                }}
            />
        </>
    );
};

export default TableEmployee;
