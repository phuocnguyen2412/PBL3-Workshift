import { createContext, useState } from "react";

export const AccountContext = createContext();
export const AccountProvider = (props) => {
    const [account, setAccount] = useState({});
    return (
        <AccountContext.Provider value={account}>
            {props.children}
        </AccountContext.Provider>
    );
};
