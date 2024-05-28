import { useEffect, useState } from "react";
import localhost from "../../Services/localhost";
import useFetch from "../../custom hook/useFetch";
import { Collapse, Empty, Spin } from "antd";
import { useParams } from "react-router-dom";
import ShiftDetail from "./ShiftDetail";
import dayjs from "dayjs";

export default function WorkShiftInfo({ date }) {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const { getApi, loading } = useFetch(localhost);
    const fetchData = async () => {
        try {
            const data = await getApi(`/Shift/employee/${id}`);

            setItems(() =>
                data
                    .filter((e) => dayjs(e.date).format("YYYY-MM-DD") == date)
                    .map((e, index) => {
                        return {
                            key: index,
                            label: (
                                <h3>{`${e.shiftInfoName}: ${e.startTime} - ${e.endTime}`}</h3>
                            ),
                            children: <ShiftDetail shift={e} />,
                        };
                    })
            );
        } catch (e) {
            setItems([]);
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData();
    }, [date]);

    return (
        <Spin spinning={loading}>
            {items.length > 0 ? (
                <Collapse accordion items={items} />
            ) : (
                <Empty />
            )}
        </Spin>
    );
}
