import { Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import RemoveEmployee from "./RemoveEmployee";
import ShiftAction from "./ShiftAction";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext";
import CheckinEmployee from "./CheckinEmployee";
import CheckoutEmployee from "./CheckoutEmployee";
const TableEmployeePerShift = ({ shift, setItems }) => {
    const account = useContext(AccountContext);
    
    return (
        <>
            <ShiftAction shift={shift} setItems={setItems} />
            <Table dataSource={shift.employees} rowKey="employeeId">
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
                                <RemoveEmployee
                                    record={record}
                                    setItems={setItems}
                                />
                            </Space>
                        )}
                    />
                )}

                {account.account.dutyName === "Manager" && (
                    <Column
                        title="Check In"
                        key="checkIn"
                        render={(_, record) => (
                            <Space size="middle">
                                <CheckinEmployee
                                    record={record}
                                    setItems={setItems}
                                    shift={shift}
                                />
                            </Space>
                        )}
                    />
                )}
                {account.account.dutyName === "Manager" && (
                    <Column
                        title="Check Out"
                        key="checkOut"
                        render={(_, record) => (
                            <Space size="middle">
                                <CheckoutEmployee
                                    record={record}
                                    setItems={setItems}
                                />
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
