import { Button, Form, Modal, Spin, Table } from "antd";
import useFetch from "../../../custom hook/useFetch";
import { useEffect, useState } from "react";
import {
    DeleteColumnOutlined,
    DeleteOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import InputEmployeeForm from "../../../components/InputEmployeeForm/InputEmployeeForm";
import EditEmployeeForm from "../../../components/EditEmployeeForm/EditEmployeeForm";
const { Search } = Input;
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

const TableEmployee = ({ data, setEmployee, setReload, reload }) => {
    const { getApi, loading, deleteApi, updateApi } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState("");
    const [employeeIdToEdit, setEmployeeIdToEdit] = useState("");
    const confirmDelete = () => {
        deleteApi(`employee`, employeeIdToDelete).then((data) => {
            console.log(data);
            setReload(!reload);
            setOpenDelete(false);
        });
    };
    const cancelDelete = () => {
        setOpenDelete(false);
    };

    const handleSearch = (value) => {
        getApi("employee/2").then((data) => {
            if (typeof data === "object") setEmployee([data]);
            else setEmployee(data);
        });
    };
    const confirmEdit = () => {};
    const cancelEdit = () => {
        setOpenEdit(false);
    };
    useEffect(() => {
        getApi("employee").then((data) => {
            setEmployee(
                data.map((item, index) => {
                    return {
                        ...item,
                        Change: (
                            <Button
                                shape="circle"
                                icon={<SettingOutlined />}
                                onClick={() => {
                                    setEmployeeIdToEdit(item.key);
                                    setOpenEdit(true);
                                }}
                            />
                        ),
                        Delete: (
                            <Button
                                danger
                                shape="circle"
                                onClick={() => {
                                    setEmployeeIdToDelete(item.key);
                                    setOpenDelete(true);
                                }}
                                icon={<DeleteOutlined />}
                            />
                        ),
                        key: index,
                    };
                })
            );
        });
    }, [reload]);

    return (
        <>
            <Modal
                title="Edit Employee"
                open={openEdit}
                onCancel={cancelEdit}
                cancelText="Cancel"
            >
                <EditEmployeeForm
                    employeeIdToEdit={employeeIdToEdit}
                    setReload={setReload}
                    reload={reload}
                />
            </Modal>
            <Modal
                title="Confirm your decision"
                open={openDelete}
                onCancel={cancelDelete}
                cancelText="Cancel"
            >
                <p>Bạn có chắc chắn muốn xóa?</p>
            </Modal>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                loading={false}
                onSearch={handleSearch}
            />
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
