import { Drawer } from "antd";
import InputEmployeeForm from "../../components/InputEmployeeForm/InputEmployeeForm";

const AddEmployee = ({ setEmployee, onClose, open }) => {
    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <InputEmployeeForm
                    onClose={onClose}
                    setEmployee={setEmployee}
                />
            </Drawer>
        </>
    );
};

export default AddEmployee;
