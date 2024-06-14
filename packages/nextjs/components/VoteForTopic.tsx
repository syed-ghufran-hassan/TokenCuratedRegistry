import React from 'react';

const VoteForTopic: React.FC = () => {
  const topics = ['Topic 1', 'Topic 2', 'Topic 3']; // Replace with actual topics

  const handleVote = (topic: string) => {
    // Add logic to handle voting
    console.log('Voted for:', topic);
  };

  return (
    <div className="vote-for-topic">
      <h2>Vote for a Topic</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            {topic} <button onClick={() => handleVote(topic)} className="btn">Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteForTopic;
