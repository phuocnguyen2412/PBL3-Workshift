import { useEffect, useState } from "react";

import { Collapse, Empty, Spin } from "antd";
import { useParams } from "react-router-dom";
import ShiftDetail from "./ShiftDetail";
import dayjs from "dayjs";
import PropsType from "prop-types";
import shiftApi from "../../Services/shiftApi";
WorkShiftInfo.propTypes = {
    date: PropsType.string.isRequired,
};

export default function WorkShiftInfo({ date }) {
    const [loading, setloading] = useState(false);
    const { id } = useParams();
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        try {
            setloading(true);
            const data = await shiftApi.getAllOfEmployee(id);

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
        } finally {
            setloading(false);
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
