import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

export const Appbar = () => {
    const navigate = useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
            <button className="mr-4" onClick={()=>{
                localStorage.removeItem("token");
                navigate("/signin")
            }} label={"Logout"}>Logout</button>
        </div>
    </div>
}