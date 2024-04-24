import { Table } from "antd";

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

const TableEmployee = ({ data }) => {
    return (
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
    );
};

export default TableEmployee;
