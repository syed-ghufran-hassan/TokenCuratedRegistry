import React, { useState } from 'react';
import { useScaffoldContract, useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { notification } from "~~/utils/scaffold-eth";
import { ethers } from 'ethers';

const ChallengeTopic: React.FC = () => {
  const [topicName, setTopicName] = useState('');
  const [payableValue, setPayableValue] = useState('');
  //const [topics, setTopics] = useState<{ topic: string, value: string }[]>([]);

  const { data: TokenCuratedRegistry } = useScaffoldContract({
    contractName: "TokenCuratedRegistry",
  });

  const { writeAsync: challengeTopic } = useScaffoldtWriteContract({
    contractName: "TokenCuratedRegistry",
    functionName: "challengeTopic",
  });

  const handleChallenge = async () => {
    if (topicName.trim() !== '' && payableValue.trim() !== '') {
      try {
        // Assuming payableValue is in ether, convert it to Wei
        const weiValue = ethers.utils.parseEther(payableValue);

        // Call challengeTopic function on the blockchain
        await challengeTopic({
          args: [topicName],
          value: weiValue,
        });

        console.log('Challenged topic:', topicName, 'Payable value:', payableValue);
        setTopicName('');
        setPayableValue('');
      } catch (error) {
        console.error('Error challenging topic:', error);
      }
    }
  };

  return (
    <div className="challenge-topic">
      <h2>Challenge a Topic</h2>
      <input
        type="text"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Enter topic to challenge"
        className="input"
      />
      <input
        type="text"
        value={payableValue}
        onChange={(e) => setPayableValue(e.target.value)}
        placeholder="Enter staked Ether value"
        className="input"
      />
      <button onClick={handleChallenge} className="btn">
        Challenge
      </button>
    </div>
  );
};

export default ChallengeTopic;
