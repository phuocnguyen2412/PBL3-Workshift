import { Table } from "antd";
const dataArray = [];
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
];
// Lặp qua từng đối tượng trong mảng columns và tạo 50 đối tượng dựa trên các trường trong mỗi đối tượng
for (let i = 0; i < 50; i++) {
    const dataObject = {};
    columns.forEach((column) => {
        dataObject[column.dataIndex] = generateRandomData(column.dataIndex); // Thay hàm generateRandomData() bằng cách sinh dữ liệu ngẫu nhiên cho mỗi trường
    });
    dataArray.push(dataObject);
}

// Hàm sinh dữ liệu ngẫu nhiên cho từng trường
function generateRandomData(dataIndex) {
    switch (dataIndex) {
        case "FullName":
            return "John Doe";
        case "Email":
            return "john.doe@example.com";
        case "PhoneNumber":
            return "123-456-7890";
        case "TypeOfEmployee":
            return "Full-time";
        case "CoeficientsSalary":
            return 1.5;
        case "Duty":
            return "Manager";
        default:
            return "";
    }
}

const TableEmployee = ({ data }) => {
    return (
        <Table
            columns={columns}
            dataSource={dataArray}
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
