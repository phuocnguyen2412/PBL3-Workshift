import { Alert, Button, Calendar, Drawer, Flex, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import WorkInDay from "./WorkInDay";
import AddShiftForm from "./AddShiftForm";
const ShiftInformation = () => {
    const [value, setValue] = useState(() => dayjs());
    const [openModal, setOpenModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const onSelect = (newValue) => {
        setOpenModal(true);
        setValue(newValue);
    };
    const onPanelChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Flex justify="space-between" align="center">
                <Alert
                    message={`You selected date: ${value?.format(
                        "YYYY-MM-DD"
                    )}`}
                />
                <Button onClick={() => setOpenDrawer(true)}>Thêm ca làm</Button>
            </Flex>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <AddShiftForm />
            </Drawer>
            <Modal
                title={`Lịch làm việc ngày ${value?.format("DD-MM-YYYY")}`}
                centered
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
                width={1000}
                footer={null}
            >
                <WorkInDay />
            </Modal>

            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
            />
        </>
    );
};

export default ShiftInformation;
