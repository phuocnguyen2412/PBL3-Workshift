import { useEffect, useState } from "react";

import { Badge, Spin, Table, Tag } from "antd";

import DeleteEmployee from "./DeleteEmployee";
import SearchEmployee from "./SearchEmployee";
import EditEmployee from "./EditEmployee";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import employeeApi from "../../Services/employeeApi";
const TableEmployee = ({ data, setEmployee }) => {
    const [loading, setloading] = useState(false);

    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            render: (_, record) => {
                return (
                    <>
                        <Link to={`/Employee/${record.id}`}>
                            {record.fullName}
                        </Link>
                    </>
                );
            },
        },

        {
            title: "Duty",
            dataIndex: "dutyName",

            render: (_, record) => (
                <>
                    {record.dutyName === "Admin" ? (
                        <Tag bordered={false} color="red">
                            {record.dutyName}
                        </Tag>
                    ) : record.dutyName === "Manager" ? (
                        <Tag bordered={false} color="blue">
                            {record.dutyName}
                        </Tag>
                    ) : (
                        <Tag bordered={false} color="purple">
                            {record.dutyName}
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: "Type of employee",
            dataIndex: "typeOfEmployee",
            render: (_, record) => (
                <>
                    {record.typeOfEmployee ? (
                        <Tag bordered={false} color="success">
                            Full Time
                        </Tag>
                    ) : (
                        <Tag bordered={false} color="warning">
                            Part Time
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_, record) => (
                <>
                    {record.status ? (
                        <Badge status="success" text="Đang làm" />
                    ) : (
                        <Badge status="error" text="Đã nghỉ làm" />
                    )}
                </>
            ),
        },
        {
            align: "center",
            width: "100px",
            title: "Change",
            dataIndex: "Change",
            render: (_, record) => (
                <EditEmployee record={record} setEmployee={setEmployee} />
            ),
        },
        {
            align: "center",
            width: "100px",
            title: "Delete",
            dataIndex: "Delete",
            render: (_, record) => (
                <DeleteEmployee record={record} setEmployee={setEmployee} />
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            const data = await employeeApi.getAll();
            setEmployee(data);
            setloading(false);
        };
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }, []);

    return (
        <>
            <SearchEmployee setEmployee={setEmployee} />

            <Spin spinning={loading}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 20,
                    }}
                    scroll={{
                        y: "600px",
                    }}
                />
            </Spin>
        </>
    );
};
TableEmployee.propTypes = {
    data: PropTypes.array.isRequired,
    setEmployee: PropTypes.func.isRequired,
};
export default TableEmployee;
