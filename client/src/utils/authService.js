import { Web3AuthNoModal } from '@web3auth/no-modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { clientId, chainConfig } from '../config/config';

const initializeWeb3Auth=()=>{
    try{
        //web3 auth instance
        const web3authInstance = new Web3AuthNoModal({
            clientId,
            web3AuthNetwork: 'sapphire_devnet',
            chainConfig,
          });
        //private key
        const privateKeyProvider = new EthereumPrivateKeyProvider({
            config: { chainConfig },
          });

        // const openloginAdapter = new OpenloginAdapter({
        //  privateKeyProvider,
        // });

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
          adapterSettings: {
            // uxMode: "redirect",
            loginConfig: {
              jwt: {
                verifier: "demo_app", // Pass the Verifier name here
                typeOfLogin: "jwt", // Pass on the login provider of the verifier you've created
                clientId: "n9K32WE3FrdkSRlPaBpKLh2mjfm6AYvL", // Pass on the Auth0 `Client ID` here
              },
            },
          },
        });

        web3authInstance.configureAdapter(openloginAdapter);
        return web3authInstance;
        
    }catch(error){
        console.error('Error initializing web3Auth:',error)
        return null;
    }
}
export default initializeWeb3Auth;