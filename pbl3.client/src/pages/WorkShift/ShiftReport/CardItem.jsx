import { Button, Card } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import ReportContent from "./ReportContent";
CardItem.propTypes = {
    data: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default function CardItem({ data, fetchData }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ReportContent
                data={data}
                setOpen={setOpen}
                open={open}
                fetchData={fetchData}
            />

            <Card
                type="inner"
                title={`Báo cáo ${data.employeeName}`}
                extra={<Button onClick={() => setOpen(true)}>More</Button>}
            >
                {`Báo cáo ${data.shiftName}: ${data.startTime} - ${data.endTime}  `}
            </Card>
        </>
    );
}
