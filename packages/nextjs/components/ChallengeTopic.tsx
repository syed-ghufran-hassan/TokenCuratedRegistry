import React from 'react';

const ChallengeTopic: React.FC = () => {
  const topics = ['Topic 1', 'Topic 2', 'Topic 3']; // Replace with actual topics

  const handleChallenge = (topic: string) => {
    // Add logic to handle challenging a topic
    console.log('Challenged:', topic);
  };

  return (
    <div className="challenge-topic">
      <h2>Challenge a Topic</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            {topic} <button onClick={() => handleChallenge(topic)} className="btn">Challenge</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeTopic;
