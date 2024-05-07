import { Button, Flex } from "antd";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext";

export default function ShiftAction() {
    const account = useContext(AccountContext);
    return (
        <Flex justify="space-between">
            <span>Ca llafm</span>
            {account.account.dutyName === "Admin" && (
                <Button>Xóa ca làm</Button>
            )}
            {account.account.dutyName === "Quản lý" && (
                <Button>Đăng kí quản lý</Button>
            )}
            {account.account.dutyName === "Nhân viên" && (
                <Button>Đăng kí nhân viên</Button>
            )}
        </Flex>
    );
}
