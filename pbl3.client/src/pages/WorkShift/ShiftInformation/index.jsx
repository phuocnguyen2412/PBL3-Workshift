import {
    Alert,
    Badge,
    Button,
    Calendar,
    Drawer,
    Flex,
    Modal,
    Spin,
} from "antd";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import WorkInDay from "./WorkInDay";
import AddShiftForm from "./AddShiftForm";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import { AccountContext } from "../../../Context/AccountContext";

const ShiftInformation = () => {
    const account = useContext(AccountContext);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(() => dayjs());
    const [openModal, setOpenModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const { getApi, loading } = useFetch(localhost);
    useEffect(() => {
        const fetchData = async () => {
            const yourData = await getApi("/ShiftInfo");

            setData(yourData);
        };
        fetchData();
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

                if (timeStart.isBefore(dayjs("05:00:00", "HH:mm:ss"))) {
                    item.type = "black";
                } else if (timeStart.isBefore(dayjs("12:00:00", "HH:mm:ss"))) {
                    item.type = "yellow";
                }
                if (timeStart.isBefore(dayjs("17:00:00", "HH:mm:ss")))
                    item.type === "orange";
                else {
                    item.type = "purple";
                }

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
                {account.account.dutyName === "Admin" && (
                    <Button onClick={() => setOpenDrawer(true)}>
                        Create a new work shift
                    </Button>
                )}
            </Flex>
            <Drawer
                title="Create a new work shift"
                width={720}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <AddShiftForm setData={setData} />
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
                <WorkInDay date={value?.format("YYYY-MM-DD")} />
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
};

export default ShiftInformation;
