// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TokenCuratedRegistry {
    struct Topic {
        string name; // Name of the topic
        uint256 voteCount; // Number of votes for the topic
        bool isListed; // Flag indicating if the topic is listed
        address[] voters; // Addresses of voters who voted for the topic
        mapping(address => bool) hasVoted; // Mapping to track if an address has voted for the topic
    }

    mapping(string => Topic) public topics; // Mapping to store topics by their name

    // Events to log various actions
    event TopicSubmitted(string topicName, address submitter);
    event TopicListed(string topicName);
    event TopicChallenged(string topicName, address challenger);
    event ChallengeResolved(string topicName, bool successful);

    // Modifier to check if caller has staked Ether
    modifier onlyEtherHolder() {
        require(msg.value >= 0.01 ether, "Insufficient Ether staked");
        _;
    }

    // Function to submit a new topic
    function submitTopic(string memory _topicName) public payable onlyEtherHolder {
        require(!topics[_topicName].isListed, "Topic is already listed");

        // Initialize struct properties individually
        topics[_topicName].name = _topicName;
        topics[_topicName].voteCount = 1;
        topics[_topicName].isListed = false;
        topics[_topicName].voters = new address[](0);

        // Add the submitter as the first voter
        topics[_topicName].voters.push(msg.sender);

        emit TopicSubmitted(_topicName, msg.sender);
    }

    // Function to vote for a topic
    function voteForTopic(string memory _topicName) public payable onlyEtherHolder {
        require(!topics[_topicName].hasVoted[msg.sender], "Already voted");
        require(!topics[_topicName].isListed, "Topic is already listed");

        topics[_topicName].voteCount++;
        topics[_topicName].voters.push(msg.sender);
        topics[_topicName].hasVoted[msg.sender] = true;

        if (topics[_topicName].voteCount >= 2) {
            topics[_topicName].isListed = true;
            emit TopicListed(_topicName);
        }
    }

    // Function to challenge a listed topic
    function challengeTopic(string memory _topicName) public payable onlyEtherHolder {
        require(topics[_topicName].isListed, "Topic is not listed");

        topics[_topicName].voteCount--;
        emit TopicChallenged(_topicName, msg.sender);
    }

    // Function to resolve a challenge
    function resolveChallenge(string memory _topicName, bool _successful) public {
        require(topics[_topicName].isListed, "Topic is not listed");

        if (_successful) {
            topics[_topicName].isListed = false;
        } else {
            topics[_topicName].voteCount++;
        }

        emit ChallengeResolved(_topicName, _successful);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
