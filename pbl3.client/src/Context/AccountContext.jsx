import { createContext, useState } from "react";

export const AccountContext = createContext();
export const AccountProvider = (props) => {
    const [account, setAccount] = useState({});
    const value = {
        account: {
            fullName: "Huỳnh Phước Nguyên",
            email: "huynhphuocnguyen2412@gmail.com",
            phoneNumber: "0931960822",
            typeOfEmployee: true ,
            coefficientsSalary: "12",
            duty: "Admin",
            status: true,
            id: "69",
            idDuty: "1",
        },
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
