import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    if(!localStorage.getItem("token")){
        return <div>
            <button onClick={() => {
                navigate("/signin")
            }}>Session-id expired please click here to signin</button>
        </div>
    }
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => setBalance(response.data.balance))
    }, [balance])

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
        <logout />
    </div>
}

export default Dashboard