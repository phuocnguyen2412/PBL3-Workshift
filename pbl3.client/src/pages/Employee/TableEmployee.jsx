import { useEffect, useState } from "react";

import { Badge, Spin, Table, Tag } from "antd";

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
            sortDirections: ["ascend", "descend", "ascend"],
            sorter: (a, b) => {
                if (a.fullName < b.fullName) {
                    return -1;
                }
                if (a.fullName > b.fullName) {
                    return 1;
                }
                return 0;
            },
        },

        {
            title: "Duty",
            dataIndex: "dutyName",
            filters: [
                {
                    text: "Admin",
                    value: "Admin",
                },
                {
                    text: "Manager",
                    value: "Manager",
                },
                {
                    text: "Employee",
                    value: "Employee",
                },
            ],
            onFilter: (value, record) => record.dutyName === value,
            sorter: (a, b) => {
                if (a.dutyName < b.dutyName) {
                    return -1;
                }
                if (a.dutyName > b.dutyName) {
                    return 1;
                }
                return 0;
            },
            sortDirections: ["ascend", "descend", "ascend"],
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
            filters: [
                {
                    text: "Full time",
                    value: "true",
                },
                {
                    text: "Part time",
                    value: "false",
                },
            ],
            onFilter: (value, record) => {
                return record.typeOfEmployee == (value === "true");
            },
            sorter: (a, b) => {
                return a.typeOfEmployee - b.typeOfEmployee;
            },
            sortDirections: ["ascend", "descend", "ascend"],
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
            filters: [
                {
                    text: "Working",
                    value: "true",
                },
                {
                    text: "Off",
                    value: "false",
                },
            ],
            onFilter: (value, record) => {
                return record.status == (value === "true");
            },
            sorter: (a, b) => {
                return a.status - b.status;
            },
            sortDirections: ["ascend", "descend", "ascend"],
            render: (_, record) => (
                <>
                    {record.status ? (
                        <Badge status="success" text="Working" />
                    ) : (
                        <Badge status="error" text="Off" />
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
    ];

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            const data = await employeeApi.getAll();
            console.log(data);
            setEmployee(data);
            setloading(false);
        };
        try {
            setloading(true);
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
                        pageSize: 10,
                    }}
                    scroll={{
                        x: 482,
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
