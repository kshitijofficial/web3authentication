import abi from "../abi/ABI.json";
import Web3 from "web3";
import { contractAddress } from "../config/config";

const intializeWeb3State=async(web3authProvider)=>{
    try{
       if(!web3authProvider){
        throw new Error("Web3 Provider is undefined or null")
       }

       const web3 = new Web3(web3authProvider);
       const contract = new web3.eth.Contract(abi,contractAddress);
       const accounts = await web3.eth.getAccounts();
       const connectedAccount=accounts[0];
       return {web3,contract,connectedAccount};
    }catch(error){
      console.error(error)
    }
}
export default intializeWeb3State;