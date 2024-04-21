import { Table } from "antd";

const columns = [
    {
        title: "Full Name",
        dataIndex: "FullName",
        width: 150,
    },
    {
        title: "Email",
        dataIndex: "Email",
        width: 150,
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
