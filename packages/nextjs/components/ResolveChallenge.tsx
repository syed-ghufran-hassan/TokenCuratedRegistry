import React, { useState } from 'react';
import { useScaffoldContract, useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { notification } from "~~/utils/scaffold-eth";
import { ethers } from 'ethers';


const ResolveChallenge: React.FC = () => {
  const [topicName, setTopicName] = useState('');
  const [successful, setSuccessful] = useState(false);

  const { data: TokenCuratedRegistry } = useScaffoldContract({
    contractName: "TokenCuratedRegistry",
  });

  const { write: resolveChallenge } = useScaffoldWriteContract({
    contractName: "TokenCuratedRegistry",
    functionName: "resolveChallenge",
  });

  const handleResolve = async () => {
    if (topicName.trim() !== '') {
      try {
        // Call resolveChallenge function on the blockchain
        await resolveChallenge({
          args: [topicName, successful],
        });

        console.log('Resolved challenge for topic:', topicName, 'Successful:', successful);
        setTopicName('');
        setSuccessful(false);
      } catch (error) {
        console.error('Error resolving challenge:', error);
      }
    }
  };

  return (
    <div className="resolve-challenge">
      <h2>Resolve a Challenge</h2>
      <input
        type="text"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Enter topic to resolve challenge"
        className="input"
      />
      <label>
        Successful:
        <input
          type="checkbox"
          checked={successful}
          onChange={(e) => setSuccessful(e.target.checked)}
        />
      </label>
      <button onClick={handleResolve} className="btn">
        Resolve
      </button>
    </div>
  );
};

export default ResolveChallenge;
