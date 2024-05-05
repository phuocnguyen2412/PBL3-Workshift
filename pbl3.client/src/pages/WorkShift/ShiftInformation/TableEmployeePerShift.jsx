import { Button, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import RemoveEmployee from "./RemoveEmployee";

const TableEmployeePerShift = () => {
    const data = [
        {
            id: "1",
            fullName: "Nguyen 1",
            dutyName: "Quản lý",
            typeOfEmployee: true,
        },
        {
            id: "2",
            fullName: "Nguyen 2 ",
            dutyName: "Nhân viên",
            typeOfEmployee: true,
        },
        {
            id: "3",
            fullName: "Nguyen 3",
            dutyName: "Nhân viên",
            typeOfEmployee: false,
        },
        {
            id: "4",
            fullName: "Nguyen 4",
            dutyName: "Nhân viên",
            typeOfEmployee: false,
        },
        {
            id: "5",
            fullName: "Nguyen 5",
            dutyName: "Nhân viên",
            typeOfEmployee: true,
        },
    ];
    return (
        <Table rowKey="id" dataSource={data}>
            <Column title="Full name" dataIndex="fullName" key="fullName" />
            <Column
                title="Duty"
                dataIndex="dutyName"
                key="dutyName"
                render={(_, record) => (
                    <>
                        {record.dutyName === "Admin" ? (
                            <Tag bordered={false} color="red">
                                {record.dutyName}
                            </Tag>
                        ) : record.dutyName === "Quản lý" ? (
                            <Tag bordered={false} color="blue">
                                {record.dutyName}
                            </Tag>
                        ) : (
                            <Tag bordered={false} color="purple">
                                {record.dutyName}
                            </Tag>
                        )}
                    </>
                )}
            />
            <Column
                title="Type of employee"
                dataIndex="typeOfEmployee"
                key="typeOfEmployee"
                render={(_, record) => (
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
                )}
            />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <RemoveEmployee record={record} />
                    </Space>
                )}
            />
        </Table>
    );
};

export default TableEmployeePerShift;
