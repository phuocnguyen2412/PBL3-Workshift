import { Button, Card, Modal } from "antd";
import React, { useState } from "react";

export default function CardItem() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Modal
                open={open}
                title="Chi tiết report"
                onCancel={() => setOpen(false)}
            >
                ádasdasd
            </Modal>
            <Card
                type="inner"
                title="Inner Card title"
                extra={<Button onClick={() => setOpen(true)}>More</Button>}
            >
                aloalo
            </Card>
        </>
    );
}
