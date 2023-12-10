import toast from "react-hot-toast"
import "./Logout.css"
const Logout=({web3authInstance,isLoggedIn,setIsLoggedIn})=>{

    const handleLogout=async()=>{
        try{
          if(web3authInstance){
            await web3authInstance.logout()
            setIsLoggedIn(!isLoggedIn)
            toast.success("Logout Successful")
          }else{
            throw new Error('Web3auth instance not available');
          }
        }catch(error){
            toast.error('Logout Failed!');
            console.error("Logout failed:",error)
        }
    }

    return (
        <div>
            {isLoggedIn && <button className="logout-btn top-left" onClick={handleLogout}>Logout</button>}
        </div>
    )
}
export default Logout;