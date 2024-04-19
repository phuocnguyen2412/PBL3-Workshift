import { createContext, useState } from "react";

export const AccountContext = createContext();
export const AccountProvider = (props) => {
    const [account, setAccount] = useState({});
    const value = {
        account,
        onChange: function (account) {
            setAccount(account);
        },
    };
    return (
        <AccountContext.Provider value={value}>
            {props.children}
        </AccountContext.Provider>
    );
};
