import { useContext } from "react";
import CreateBonusSalary from "./CreateBonusSalary";
import { AccountContext } from "../../../Context/AccountContext";

const BonusSalary = () => {
    const account = useContext(AccountContext);
    return <>{account.account.dutyName === "Admin" && <CreateBonusSalary />}</>;
};

export default BonusSalary;
