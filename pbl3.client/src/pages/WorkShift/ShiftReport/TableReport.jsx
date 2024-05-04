import { Table } from "antd";

export default function TableReport({ data }) {
    const colunms = [];

    return (
        <div>
            <Table dataSource={data} columns={colunms} />
        </div>
    );
}
