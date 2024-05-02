import { Alert, Badge, Button, Calendar, Drawer, Flex, Modal } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import WorkInDay from "./WorkInDay";
import AddShiftForm from "./AddShiftForm";

const ShiftInformation = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState(() => dayjs());
    const [openModal, setOpenModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        // Điều chỉnh hàm fetchData để lấy dữ liệu từ nguồn dữ liệu của bạn
        const fetchData = () => {
            // Lấy dữ liệu từ nguồn dữ liệu của bạn (API hoặc bất kỳ nguồn nào khác)
            // và thiết lập cho state `data`
            const yourData = [
                {
                    id: "1",
                    shiftName: "Ca sang",
                    date: "2024-5-2",
                    startTime: "8:00:00",
                    endTime: "21:00:00",
                },
                {
                    id: "2",
                    shiftName: "Ca toi",
                    date: "2024-5-2",
                    startTime: "17:00:00",
                    endTime: "21:00:00",
                },
                {
                    id: "3",
                    shiftName: "Ca chieu",
                    date: "2024-5-2",
                    startTime: "17:00:00",
                    endTime: "21:00:00",
                },
                {
                    id: "4",
                    shiftName: "Shift 1",
                    date: "2024-5-3",
                    startTime: "19:00:00",
                    endTime: "21:00:00",
                },
                // Thêm dữ liệu khác nếu cần
            ];
            setData(yourData);
        };
        fetchData();
    }, []);

    const onSelect = (newValue) => {
        if (newValue.isValid() && newValue.date() !== value.date()) {
            setOpenModal(true);
        }
        setValue(newValue);
    };

    const getListData = (value) => {
        let listData = [];
        data.forEach((shift) => {
            if (dayjs(shift.date).isSame(value, "day")) {
                const item = {
                    content: `${shift.shiftName} start ${shift.startTime} and end ${shift.endTime}`,
                };

                // So sánh thời gian bắt đầu của ca làm với một thời gian cụ thể
                const timeStart = dayjs(shift.startTime, "HH:mm:ss");

                // Xác định loại của ca làm dựa trên thời gian bắt đầu
                if (timeStart.isBefore(dayjs("12:00:00", "HH:mm:ss"))) {
                    item.type = "yellow";
                } else if (timeStart.isBefore(dayjs("18:00:00", "HH:mm:ss"))) {
                    item.type = "orange";
                } else {
                    item.type = "purple";
                }

                //console.log(item);
                listData.push(item);
            }
        });
        return listData;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge color={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === "date") return dateCellRender(current);

        return info.originNode;
    };

    return (
        <div style={{ overflow: "hidden" }}>
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
                cellRender={cellRender}
                value={value}
                onSelect={onSelect}
            />
        </div>
    );
};

export default ShiftInformation;
