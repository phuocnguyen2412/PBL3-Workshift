import {
    Button,
    DatePicker,
    Drawer,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Row,
    Col,
} from "antd";
import "./Drawer.css";
import { useEffect } from "react";
export default function InputEmployeeFormádbjaksd({
    openDrawer,
    setOpenDrawer,
}) {
    useEffect(()=>{
        
    })
    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={() => setOpenDrawer(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setOpenDrawer(false)}
                            type="primary"
                        >
                            Submit
                        </Button>
                    </Space>
                }
            ></Drawer>
        </>
    );
}
