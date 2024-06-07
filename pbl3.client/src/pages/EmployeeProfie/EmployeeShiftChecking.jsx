import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { Alert, Badge, Calendar, Flex, Modal, Spin } from "antd";

import { useParams } from "react-router-dom";
import WorkShiftInfo from "./WorkShiftInfo";
import shiftInfo from "../../Services/shiftInfoApi";

export default function EmployeeShiftChecking() {
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [value, setValue] = useState(() => dayjs());
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const yourData = await shiftInfo.getAllOfEmployee(id);

            setData(yourData);
        };

        try {
            setloading(true);
            fetchData();
        } catch (e) {
            console.log(e);
        } finally {
            setloading(false);
        }
    }, []);

    const onSelect = (newValue) => {
        if (newValue.isValid()) {
            setOpenModal(true);
        }
        setValue(newValue);
    };

    const getListData = (value) => {
        let listData = [];
        data.forEach((shift) => {
            if (dayjs(shift.date).isSame(value, "day")) {
                const item = {
                    content: `${shift.shiftName}: ${shift.startTime}-${shift.endTime}`,
                };

                const timeStart = dayjs(shift.startTime, "HH:mm:ss");
                const setTime = () => {
                    if (timeStart.isBefore(dayjs("05:00:00", "HH:mm:ss")))
                        return "black";
                    if (timeStart.isBefore(dayjs("12:00:00", "HH:mm:ss")))
                        return "yellow";
                    if (timeStart.isBefore(dayjs("17:00:00", "HH:mm:ss")))
                        return "orange";
                    return "purple";
                };
                item.type = setTime();
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
            </Flex>

            <Modal
                title={`Lịch làm việc ngày ${value?.format("DD-MM-YYYY")}`}
                centered
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
                width={1000}
                footer={null}
            >
                <WorkShiftInfo date={value?.format("YYYY-MM-DD")} />
            </Modal>
            <Spin spinning={loading}>
                <Calendar
                    cellRender={cellRender}
                    value={value}
                    onSelect={onSelect}
                />
            </Spin>
        </div>
    );
}
