import { useEffect, useState } from "react";

import { Badge, Button, Modal, Spin, Table, Input } from "antd";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
const { Search } = Input;

import useFetch from "../../../custom hook/useFetch";
import EditEmployeeForm from "../../../components/EditEmployeeForm/EditEmployeeForm";
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const TableEmployee = ({ data, setEmployee }) => {
    const { getApi, loading, deleteApi, updateApi } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3/"
    );
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            age: "",
            address: "",
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey("");
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState("");
    const [employeeIdToEdit, setEmployeeIdToEdit] = useState("");
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
            dataIndex: "CoefficientsSalary",
        },
        {
            title: "Duty",
            dataIndex: "Duty",
        },
        {
            title: "Status",
            dataIndex: "Status",
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
            title: "Change",
            dataIndex: "Change",
            render: (_, record) => (
                <>
                    <Button
                        shape="circle"
                        icon={<SettingOutlined />}
                        onClick={() => {
                            setEmployeeIdToEdit(record.id);
                            setOpenEdit(true);
                        }}
                    />
                </>
            ),
        },
        {
            title: "Delete",
            dataIndex: "Delete",
            render: (_, record) => (
                <>
                    <Button
                        danger
                        shape="circle"
                        onClick={() => {
                            setEmployeeIdToDelete(record.id);
                            setOpenDelete(true);
                        }}
                        icon={<DeleteOutlined />}
                    />
                </>
            ),
        },
    ];

    const confirmDelete = async () => {
        await deleteApi(`employee`, employeeIdToDelete);
        const data = await getApi("employee");

        setEmployee(data);
        setOpenDelete(false);
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
        const fetchData = async () => {
            const data = await getApi("employee");
            setEmployee(data);
        };

        fetchData();
    }, []);

    return (
        <>
            <Modal
                title="Edit Employee"
                open={openEdit}
                onCancel={cancelEdit}
                cancelText="Cancel"
            >
                <EditEmployeeForm employeeIdToEdit={employeeIdToEdit} />
            </Modal>
            <Modal
                title="Confirm your decision"
                open={openDelete}
                onCancel={cancelDelete}
                cancelText="Cancel"
                onOk={confirmDelete}
                okText="Yes"
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
        </>
    );
};

export default TableEmployee;
