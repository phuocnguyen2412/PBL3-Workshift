import { Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import RemoveEmployee from "./RemoveEmployee";
import ShiftAction from "./ShiftAction";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext";
const TableEmployeePerShift = ({ shift, setItems }) => {
    const account = useContext(AccountContext);

    return (
        <>
            <ShiftAction shift={shift} setItems={setItems} />
            <Table rowKey="id" dataSource={shift.employees}>
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
                {account.account.dutyName === "Admin" && (
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <RemoveEmployee record={record} />
                            </Space>
                        )}
                    />
                )}
            </Table>
        </>
    );
};
TableEmployeePerShift.propTypes = {
    shift: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default TableEmployeePerShift;
