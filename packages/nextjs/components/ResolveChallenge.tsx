import React from 'react';

const ResolveChallenge: React.FC = () => {
  const challenges = ['Challenge 1', 'Challenge 2', 'Challenge 3']; // Replace with actual challenges

  const handleResolve = (challenge: string) => {
    // Add logic to handle resolving a challenge
    console.log('Resolved:', challenge);
  };

  return (
    <div className="resolve-challenge">
      <h2>Resolve a Challenge</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge}>
            {challenge} <button onClick={() => handleResolve(challenge)} className="btn">Resolve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResolveChallenge;
