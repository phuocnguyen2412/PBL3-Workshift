import { Button, Flex, notification } from "antd";
import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountContext";
import PropTypes from "prop-types";

import DeleteWorkShift from "./DeleteWorkShift";
import shiftApi from "../../../Services/shiftApi";
import shiftInfo from "../../../Services/shiftInfoApi";
ShiftAction.propTypes = {
    shift: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default function ShiftAction({ shift, setItems }) {
    const account = useContext(AccountContext);
    console.log(shift);
    const [loading, setloading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

    const handleDeleteShift = async () => {
        try {
            setloading(true);
            if (shift.check)
                throw { message: "Work shift is checked! You can't out" };
            const data = shift.employees.find(
                (e) => e.employeeId === account.account.employeeId
            );

            await shiftApi.detele(data.shiftId);

            apiNotification.success({
                message: "Success!",
                description: `Unregistration successful`,
                placement: "topRight",
            });
            setItems();
        } catch (error) {
            console.log(error);
            apiNotification.error({
                message: "Error!",
                description: `${error.message}`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };
    const handleCheck = async (id, checked) => {
        await shiftInfo.changeChecked(id, !checked);

        apiNotification.success({
            message: "Success!",
            description: `You updated successfully ${shift.shiftName}: ${shift.startTime} - ${shift.endTime}`,
            placement: "topRight",
        });
        setItems();
    };

    const handleCreate = async () => {
        try {
            if (shift.checked)
                throw { message: "Work shift is checked! You can't submit" };
            const data = {
                employeeId: account.account.employeeId,
                shiftInfoId: shift.id,
                checkInTime: "2000-01-01T00:00:00.000Z",
                checkOutTime: "2000-01-01T00:00:00.000Z",
            };

            await shiftApi.add(data);

            apiNotification.success({
                message: "Success!",
                description: `Registration successful`,
                placement: "topRight",
            });
            setItems();
        } catch (e) {
            console.log(e);
            apiNotification.error({
                message: "Error!",
                description: `${e}`,
                placement: "topRight",
            });
        }
    };

    return (
        <>
            {contextHolderNotification}
            <Flex justify="end" style={{ marginBottom: "16px" }}>
                {account.account.dutyName === "Admin" && (
                    <Button
                        loading={loading}
                        onClick={() => {
                            handleCheck(shift.id, shift.checked);
                        }}
                    >
                        {shift.checked ? "Open" : "Lock"}
                    </Button>
                )}
                {account.account.dutyName === "Admin" && (
                    <DeleteWorkShift shift={shift} setItems={setItems} />
                )}

                {(account.account.dutyName === "Manager" ||
                    account.account.dutyName === "Employee") &&
                    (shift.employees.some(
                        (employee) =>
                            employee.employeeId === account.account.employeeId
                    ) ? (
                        <Button onClick={handleDeleteShift}>
                            UNREGISTRATION
                        </Button>
                    ) : (
                        <Button onClick={handleCreate}>REGISTRATION</Button>
                    ))}
            </Flex>
        </>
    );
}
