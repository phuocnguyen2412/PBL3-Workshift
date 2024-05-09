import { Collapse, Empty, Spin } from "antd";
import TableEmployeePerShift from "./TableEmployeePerShift";
import ShiftAction from "./ShiftAction";
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
                console.log(data);

                if (!Array.isArray(data)) {
                    setItems([]);
                    throw new Error("không tìm thấy");
                }
                setItems(
                    data.map((e, index) => {
                        return {
                            key: index,
                            label: <ShiftAction shift={e} />,
                            children: <TableEmployeePerShift shift={e} />,
                        };
                    })
                );
            } catch (e) {
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
