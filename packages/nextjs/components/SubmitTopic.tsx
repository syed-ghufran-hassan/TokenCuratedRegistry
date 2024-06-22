import React, { useState } from 'react';
import { useScaffoldContract, useScaffoldContractWrite, useScaffoldContractRead } from '~~/hooks/scaffold-eth';
import { notification } from "~~/utils/scaffold-eth";
import { ethers } from 'ethers';

const SubmitTopic: React.FC<{ onAddTopic: (topicName: string, value: string) => void }> = ({ onAddTopic }) => {
  const [topicName, setTopicName] = useState('');
  const [payableValue, setPayableValue] = useState('');

  const { data: TokenCuratedRegistry } = useScaffoldContract({
    contractName: "TokenCuratedRegistry",
  });

  const { writeAsync: submitTopic } = useScaffoldWriteContract({
    contractName: "TokenCuratedRegistry",
    functionName: "submitTopic",
  });

   const handleSubmit = async () => {
    if (topicName.trim() !== '' && payableValue.trim() !== '') {
      try {
        // Convert payableValue to Wei using ethers.js
        const weiValue = ethers.utils.parseEther(payableValue);

        // Call the submitTopic function on the blockchain
        await submitTopic({
          args: [topicName],
          value: weiValue, // Pass the value in Wei
        });

        // Notification or alert for successful submission
        notification.success(`Topic submitted: ${topicName}`);
        
        // Clear input fields
        setTopicName('');
        setPayableValue('');
      } catch (error) {
        console.error("Error submitting topic:", error);
        // Handle error notification if necessary
        notification.error("Error submitting topic");
      }
    } else {
      // Handle empty fields notification
      notification.error("Both topic name and payable value are required.");
    }
  };

  return (
    <div className="submit-topic">
      <h2>Submit a Topic</h2>
      <input
        type="text"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Enter your topic"
        className="input"
      />
      <input
        type="text"
        value={payableValue}
        onChange={(e) => setPayableValue(e.target.value)}
        placeholder="Enter payable value"
        className="input"
      />
      <button onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
};

export default SubmitTopic;
