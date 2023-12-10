import {useEffect,useState} from "react";
import initializeWeb3Auth from "./utils/authService";
import Login from "./components/Login";
import Logout from "./components/Logout";
import toast
 from "react-hot-toast";
function App() {
  const [web3authInstance,setweb3authInstance]=useState(null);
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  useEffect(()=>{
    const initWeb3Auth=async()=>{
       try{
         const web3authInstance = initializeWeb3Auth()
         console.log(web3authInstance)
         setweb3authInstance(web3authInstance)
         await web3authInstance.init();
       }catch(error){
        toast.error("Application error")
        console.error('Error during login:', error);
       }
    }
    initWeb3Auth();
  },[])
  return (
   <div>
    <Login web3authInstance={web3authInstance} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Logout web3authInstance={web3authInstance} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
   </div>
  );
}

export default App;
