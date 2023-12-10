import { getPublicCompressed } from "@toruslabs/eccrypto";

 //constructing the public key and getting the token
 export const serverAuthentication = async(web3authInstance)=>{
    try{
        const app_scoped_privkey = await web3authInstance.provider?.request({
            method: "eth_private_key", // use "private_key" for other non-evm chains
          });
          const app_pub_key = getPublicCompressed(Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")).toString("hex");
         
          const {idToken}=await web3authInstance.getUserInfo()

          const res = await fetch("http://localhost:1024/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + idToken, // or token.idToken
            },
            body: JSON.stringify({ appPubKey: app_pub_key }),
          });

          const data = await res.json()
          return data;
    }catch(error){
        console.error(error)
        return null;
    }
}