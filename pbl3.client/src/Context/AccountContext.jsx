import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const AccountContext = createContext();

export const AccountProvider = (props) => {
    const [account, setAccount] = useState({});
    const value = {
        account: account,
        onChange: function (newAccount) {
            setAccount(() => newAccount);
        },
    };
    return (
        <AccountContext.Provider value={value}>
            {props.children}
        </AccountContext.Provider>
    );
};

AccountContext.propTypes = {
    props: PropTypes.object.isRequired,
};
