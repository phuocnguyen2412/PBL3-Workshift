import { Collapse, Empty, Spin } from "antd";
import TableEmployeePerShift from "./TableEmployeePerShift";

import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropTypes from "prop-types";
const WorkInDay = ({ date }) => {
    const [items, setItems] = useState([]);
    const { getApi, loading } = useFetch(localhost);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getApi(
                    `/ShiftInfo/shifts-and-employees-by-date/${date}`
                );
                setItems(() =>
                    data.map((e, index) => {
                        return {
                            key: index,
                            label: (
                                <h3>{`${e.shiftName}: ${e.startTime} - ${
                                    e.endTime
                                } ( ${
                                    e.checked ? "Đã khóa" : "Đang mở"
                                } ) `}</h3>
                            ),
                            children: (
                                <TableEmployeePerShift
                                    shift={e}
                                    setItems={async () => {
                                        fetchData();
                                    }}
                                />
                            ),
                        };
                    })
                );
            } catch (e) {
                setItems([]);
                console.log(e);
            }
        };
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
};
WorkInDay.propTypes = {
    date: PropTypes.string.isRequired,
};
export default WorkInDay;
