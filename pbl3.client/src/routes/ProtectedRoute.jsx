import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./../Context/AccountContext";
import PropsType from "prop-types";
const ProtectedRoute = ({ element, roles }) => {
    const { account } = useContext(AccountContext);

    if (!account || (roles && !roles.includes(account.dutyName))) {
        return <Navigate to="/404" />;
    }

    return element;
};
ProtectedRoute.propTypes = {
    element: PropsType.element.isRequired,
    roles: PropsType.array.isRequired,
};
export default ProtectedRoute;
