import { Button, Flex } from "antd";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext";

export default function ShiftAction() {
    const account = useContext(AccountContext);
    const handleDelete = async () => {};
    const handleUpdate = async () => {};
    const handleCreate = async () => {};
    return (
        <Flex justify="space-between"   >
            <span>Ca làm</span>
            {account.account.dutyName === "Admin" && (
                <Button onClick={handleDelete}>Xóa ca làm</Button>
            )}
            {account.account.dutyName === "Quản lý" && (
                <Button onClick={handleUpdate}>Đăng kí quản lý</Button>
            )}
            {account.account.dutyName === "Nhân viên" && (
                <Button onClick={handleCreate}>Đăng kí nhân viên</Button>
            )}
        </Flex>
    );
}
