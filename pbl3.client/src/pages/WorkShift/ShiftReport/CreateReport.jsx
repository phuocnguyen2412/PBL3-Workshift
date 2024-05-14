import { Button, Drawer } from "antd";

import ReportForm from "./ReportForm";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PropTypes from "prop-types";

CreateReport.propTypes = {
    fetchData: PropTypes.func.isRequired,
};
export default function CreateReport({ fetchData }) {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create report
            </Button>
            <Drawer
                title="Create a new report"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <ReportForm fetchData={fetchData} />
            </Drawer>
        </>
    );
}
