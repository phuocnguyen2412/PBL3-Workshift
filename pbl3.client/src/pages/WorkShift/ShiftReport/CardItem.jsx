import { Button, Card } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import ReportContent from "./ReportContent";
export default function CardItem({ data }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ReportContent data={data} setOpen={setOpen} open={open} />

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
CardItem.propTypes = {
    data: PropTypes.object.isRequired,
};
