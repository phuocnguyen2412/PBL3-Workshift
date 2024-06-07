import { Collapse, Empty, Spin } from "antd";
import TableEmployeePerShift from "./TableEmployeePerShift";

import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import shiftInfo from "../../../Services/shiftInfoApi";
const WorkInDay = ({ date }) => {
    const [loading, setloading] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        try {
            setloading(true);
            const data = await shiftInfo.getAllByDate(date);
            setItems(() =>
                data.map((e, index) => {
                    return {
                        key: index,
                        label: (
                            <h3>{`${e.shiftName}: ${e.startTime} - ${
                                e.endTime
                            } ( ${e.checked ? "Looked" : "Openning"} ) `}</h3>
                        ),
                        children: (
                            <TableEmployeePerShift
                                shift={e}
                                setItems={fetchData}
                            />
                        ),
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
};
WorkInDay.propTypes = {
    date: PropTypes.string.isRequired,
};
export default WorkInDay;
