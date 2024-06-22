import React from 'react';
import { useState, useEffect } from 'react';
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

const VoteForTopic: React.FC = () => {
  const { read: readYourContract } = useScaffoldReadContract({
    contractName: "TokenCuratedRegistry",
  });

  // State to hold the list of topics, initialized as an empty array
  const [topics, setTopics] = useState<{ name: string; voteCount: number; }[]>([]);

  useEffect(() => {
    // Function to fetch topics from the blockchain
    const fetchTopics = async () => {
      try {
        // Call the contract function to get the number of topics
        const topicsCount = await readYourContract({
          functionName: 'topicsCount',
        });

        const fetchedTopics: { name: string; voteCount: number; }[] = [];
        // Loop through each topic index and fetch topic details
        for (let i = 0; i < topicsCount.toNumber(); i++) {
          const topicName = await readYourContract({
            functionName: 'getTopicName',
            args: [i],
          });

          const voteCount = await readYourContract({
            functionName: 'getVoteCount',
            args: [i],
          });

          // Push the fetched topic into the array
          fetchedTopics.push({
            name: topicName,
            voteCount: voteCount.toNumber(),
          });
        }

        // Set the state with the fetched topics
        setTopics(fetchedTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    // Call the fetchTopics function when component mounts
    fetchTopics();
  }, [readYourContract]);

  // Function to handle voting for a topic
  const handleVote = async (topicName: string) => {
    try {
      // Implement logic to vote for the selected topic
      console.log('Voted for:', topicName);
    } catch (error) {
      console.error('Error voting for topic:', error);
    }
  };

  return (
    <div className="vote-for-topic">
      <h2>Vote for a Topic</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            {topic.name} - Vote Count: {topic.voteCount}
            <button onClick={() => handleVote(topic.name)} className="btn">
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteForTopic;
