import {
    Badge,
    Button,
    Descriptions,
    Input,
    Modal,
    Spin,
    notification,
} from "antd";
import PropTypes from "prop-types";

import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountContext";
import violateApi from "../../../Services/violateApi";
import dayjs from "dayjs";
ReportContent.propTypes = {
    data: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function ReportContent({ data, setOpen, open, fetchData }) {
    const [isEdit, setisEdit] = useState(false);
    const [loading, setloading] = useState(false);
    const account = useContext(AccountContext);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [handleValue, setHandleValue] = useState(data.handle);
    const handleUpdateCheck = async () => {
        try {
            setloading(true);
            if (account.account.dutyName !== "Admin") return;
            await violateApi.updateChecked(data.id, !data.checked);

            apiNotification.success({
                message: "Success!",
                description: `You updated report!`,
                placement: "topRight",
            });
            fetchData();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };
    const handleUpdateHandleValue = async () => {
        try {
            setloading(true);

            await violateApi.updateHandle(data.id, handleValue);

            apiNotification.success({
                message: "Success!",
                description: `You updated report!`,
                placement: "topRight",
            });
            fetchData();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };
    const items = [
        {
            key: "1",
            label: "Shift name",
            children: data.shiftName,
        },
        {
            key: "2",
            label: "Date",
            children: dayjs(data.date).format("DD-MM-YYYY"),
        },
        {
            key: "3",
            label: "Start time",
            children: data.startTime,
        },
        {
            key: "4",
            label: "End time",
            children: data.endTime,
        },
        {
            key: "5",
            label: "Employee",
            children: data.employeeName,
        },
        {
            key: "10",
            label: "Handle",
            children: (
                <Input
                    type="number"
                    value={handleValue}
                    disabled={!isEdit}
                    onChange={(e) => setHandleValue(e.target.value)}
                />
            ),
        },
        {
            key: "7",
            label: "Reason",
            children: data.reason,
            span: 3,
        },
        {
            key: "8",
            label: "Manager name",
            children: data.managerName,
        },
        {
            key: "6",
            label: "Check",
            children: data.checked ? (
                <Badge color="green" text={"Cheked"} />
            ) : (
                <Badge color="red" text={`Uncheck`} />
            ),
        },
    ];
    const handleClose = () => {
        setisEdit(false);
        setOpen(false);
    };
    return (
        <>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Modal
                    open={open}
                    title="Detail report"
                    onCancel={handleClose}
                    footer={
                        account.account.dutyName === "Admin" && [
                            <Button key="back" onClick={handleClose}>
                                Return
                            </Button>,

                            <>
                                {isEdit ? (
                                    <Button
                                        type="primary"
                                        onClick={handleUpdateHandleValue}
                                        loading={loading}
                                    >
                                        Update
                                    </Button>
                                ) : (
                                    <Button
                                        key="edit"
                                        onClick={() => setisEdit(true)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </>,
                            <>
                                {!data.checked && (
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={loading}
                                        onClick={() => {
                                            handleUpdateCheck();
                                        }}
                                    >
                                        Check
                                    </Button>
                                )}
                            </>,
                        ]
                    }
                >
                    <Descriptions layout="vertical" bordered items={items} />
                </Modal>
            </Spin>
        </>
    );
}
