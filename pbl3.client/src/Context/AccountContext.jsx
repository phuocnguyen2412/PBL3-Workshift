import { createContext, useState } from "react";

export const AccountContext = createContext();
export const AccountProvider = (props) => {
    const [account, setAccount] = useState({});
    const value = {
        account: account,
        onChange: function (newAccount) {
            setAccount(newAccount);
        },
    };
    return (
        <AccountContext.Provider value={value}>
            {props.children}
        </AccountContext.Provider>
    );
};
