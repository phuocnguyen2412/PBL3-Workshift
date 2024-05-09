import { Button, Card } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import BonusContent from "./BonusContent";

export default function CardBonus({ data }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <BonusContent data={data} setOpen={setOpen} open={open} />

            <Card
                type="inner"
                title={`Báo cáo ${data.fullName}`}
                extra={<Button onClick={() => setOpen(true)}>More</Button>}
            >
                {`Báo cáo ${dayjs(data.dateTime).format(
                    "DD-MM-YYYY HH:mm:ss"
                )}  `}
            </Card>
        </>
    );
}
CardBonus.propTypes = {
    data: PropTypes.object.isRequired,
};
