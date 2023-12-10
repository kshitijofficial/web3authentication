import { useState, useEffect } from 'react';
const ViewData = ({ web3State,reload}) => {
  const [value, setValue] = useState("Not available");
  const { contract } = web3State;

  useEffect(() => {
    const viewValue = async () => {
      try {
        if (contract) {
          const bigNumberValue = await contract.methods.retrieve().call();
          const numValue = Number(bigNumberValue);
          setValue(numValue);
        }
      } catch (error) {
        console.error('Error while retrieving data:', error);
      }
    };

    viewValue();
  }, [contract,reload]);

  return (
    <div>
      <p>Stored Data: {value}</p>
    </div>
  );
};

export default ViewData;
