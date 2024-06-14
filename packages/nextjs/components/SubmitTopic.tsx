import React, { useState } from 'react';

const SubmitTopic: React.FC = () => {
  const [topic, setTopic] = useState('');

  const handleSubmit = () => {
    // Add logic to handle topic submission
    console.log('Topic submitted:', topic);
    setTopic('');
  };

  return (
    <div className="submit-topic">
      <h2>Submit a Topic</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your topic"
        className="input"
      />
      <button onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
};

export default SubmitTopic;
