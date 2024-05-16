import { Button, Card } from "antd";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import BonusContent from "./BonusContent";
import DeleteBonus from "./DeleteBonus";
import { AccountContext } from "../../../Context/AccountContext";

export default function CardBonus({ data }) {
    const account = useContext(AccountContext);
    const [open, setOpen] = useState(false);
    return (
        <>
            <BonusContent data={data} setOpen={setOpen} open={open} />

            <Card
                type="inner"
                title={`Bonus ${data.fullName}`}
                extra={
                    <>
                        {account.account.dutyName === "Admin " && (
                            <DeleteBonus record={data} />
                        )}
                        <Button onClick={() => setOpen(true)}>More</Button>
                    </>
                }
            >
                {`Bonus ${dayjs(data.dateTime).format(
                    "DD-MM-YYYY HH:mm:ss"
                )}  `}
            </Card>
        </>
    );
}
CardBonus.propTypes = {
    data: PropTypes.object.isRequired,
};
