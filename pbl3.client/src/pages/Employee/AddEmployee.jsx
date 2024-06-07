import { Drawer } from "antd";
import InputEmployeeForm from "../../components/InputEmployeeForm/InputEmployeeForm";
import PropsType from "prop-types";
const AddEmployee = ({ setEmployee, onClose, open }) => {
    return (
        <>
            <Drawer
                title="Create a new employee"
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
AddEmployee.propTypes = {
    setEmployee: PropsType.func.isRequired,
    onClose: PropsType.func.isRequired,
    open: PropsType.bool.isRequired,
};
export default AddEmployee;
