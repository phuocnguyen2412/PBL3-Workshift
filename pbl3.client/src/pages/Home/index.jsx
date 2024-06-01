import { useContext } from "react";

import Reports from "./Reports";
import Salary from "./Salary";
import HomeAdmin from "./HomeAdmin";
import { AccountContext } from "../../Context/AccountContext";

const Home = () => {
    const account = useContext(AccountContext);

    return (
        <>
            {account.account.dutyName === "Admin" && <HomeAdmin />}

            <Reports />

            {account.account.dutyName === "Admin" && <Salary />}
        </>
    );
};

export default Home;
