import { useEffect, useState } from "react";
import { WALLET_ADAPTERS } from '@web3auth/base';
import intializeWeb3State from "../utils/Web3State";
import StoreData from "./StoreData";
import ViewData from "./ViewData"
import toast from "react-hot-toast";
import "./Login.css"
import { serverAuthentication } from "../utils/reponseHandler";

let web3authProvider=null;

const Login=({web3authInstance,isLoggedIn,setIsLoggedIn})=>{
    const [balance,setBalance]=useState(0)
    const [web3State,setWeb3State]=useState({
        web3:null,
        contract:null,
        connectedAccount:"not connected"
    })
    const [reload,setReload]=useState(false);
    //this will deal with state of the application once the use log out
    useEffect(()=>{
        if(!isLoggedIn){
            web3authProvider=null;
            setWeb3State({
                web3:null,
                contract:null,
                connectedAccount:"not connected"
            })
            setBalance(0)
        }
    },[isLoggedIn])
   
    const handleLogin=async()=>{
        try{
            if(!web3authProvider){
            //this is the main thing in order to connect with linkedIn
            //  web3authProvider = await web3authInstance.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            //       loginProvider: 'linkedin',
            //  });
            web3authProvider = await web3authInstance.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: "jwt",
                extraLoginOptions: {
                  domain: "https://dev-yepqgoh1027lep8m.us.auth0.com", // Pass on the Auth0 `Domain` here
                  verifierIdField: "sub", // Pass on the field name of the `sub` field in the JWT
                  connection: "linkedin", // Use this to skip Auth0 Modal for LinkedIn login
                },
            
            });
            }
            const data = await serverAuthentication(web3authInstance)

            if(data.name==='Verification Successful'){
                setIsLoggedIn(!isLoggedIn)
                const {web3,contract,connectedAccount}=await intializeWeb3State(web3authProvider);
                const balanceObj= await web3.eth.getBalance(connectedAccount);
                const accountBalance = web3.utils.fromWei(balanceObj,"ether");
                //converting upto two decimal places
                const formattedBalance = parseFloat(accountBalance).toFixed(2);
                setBalance(formattedBalance)
                setWeb3State({web3,contract,connectedAccount})
                toast.success("Login Successful")
            }else{
                throw new Error("Server side authentication failed")
            }
        }catch(error){
            toast.error("Login Failed!")
            console.error('Error during login:', error);
        }
    }
    return(
        <div>
            <div className="top-right">
                {!isLoggedIn && <button className="login-btn" onClick={handleLogin}>Login</button>}
                <p>Account:{web3State.connectedAccount}</p>
                <p>Account Balance: {balance}</p>
            </div>
            <div className="center">
                {isLoggedIn &&(
                    <>
                       <StoreData web3State={web3State} setReload={setReload} reload={reload}/>
                       <ViewData web3State={web3State} reload={reload}/> 
                    </>
                )}
                {!isLoggedIn && <p className="home-txt">You need to login first</p>}
            </div>
        </div>
    )
}
export default Login;