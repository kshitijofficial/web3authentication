import { useRef } from 'react';
import toast from 'react-hot-toast';
import './StoreData.css';
const StoreData = ({web3State,setReload,reload}) => {
  const numRef = useRef()
  const {contract,connectedAccount}=web3State;
  console.log(contract,connectedAccount)
  const storeValue = async (e) => {
    e.preventDefault();
    try{
      if(!contract || !connectedAccount){
        throw new Error("Contract instance or connected account are not available");
      }
      const inputNum = numRef.current.value.trim();
      if(!inputNum || isNaN(inputNum)){
        console.log('Please provide a valid number');
        return
      }
      await toast.promise(contract.methods.store(inputNum).send({ from: connectedAccount }),
      {
        loading: "Transaction is pending...",
        success: 'Transaction successful 👌',
        error: 'Transaction failed 🤯'
      });
      setReload(!reload)
      console.log("Transaction is completed")
      numRef.current.value=''
    }catch(error){
       toast.error("Error while storing value!")
        console.error('Error while storing value:', error)
    }
  };

  return (
    <div className="store-data-container "> 
      <form onSubmit={storeValue}>
        <div className="input-field"> 
          <label htmlFor="inputData">Input Data:</label>
          <input type="text" id="inputData" ref={numRef}/>
        </div>
        <button type="submit" className='store-btn'>Store Value</button>
      </form>
    </div>
  );
};

export default StoreData;
