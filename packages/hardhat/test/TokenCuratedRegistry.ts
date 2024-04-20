//const { expect } = require("chai");
//const { ethers } = require("ethers");

import { ethers } from "ethers";
import { expect } from "chai";
import { Signer, Contract } from "ethers";

describe("TokenCuratedRegistry", function () {
  let TokenCuratedRegistry: ethers.ContractFactory;
  let tokenCuratedRegistry: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let tokenContract: Contract;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the ERC20 token contract
    const ERC20Token = await ethers.getContractFactory("MyERC20Token");
    tokenContract = await ERC20Token.deploy("MyToken", "MTK");
    console.log("Token contract address:", tokenContract.address);

    // Deploy the TokenCuratedRegistry contract, passing the address of the ERC20 token contract
    TokenCuratedRegistry = await ethers.getContractFactory("TokenCuratedRegistry");
    tokenCuratedRegistry = await TokenCuratedRegistry.deploy(tokenContract.address, 1, 3600);
    await tokenCuratedRegistry.deployed(); // Wait for deployment to complete
  });

  it("Should allow submission of a new topic", async function () {
    const topicName = "Test Topic";

    await tokenCuratedRegistry.submitTopic(topicName);

    // Check if the topic has been submitted successfully
    expect(await tokenCuratedRegistry.topics(topicName)).to.exist;
  });

  it("Should allow voting for a topic", async function () {
    const topicName = "Test Topic";

    await tokenCuratedRegistry.submitTopic(topicName);
    await tokenCuratedRegistry.connect(addr1).voteForTopic(topicName);

    // Check if the topic has been voted for successfully
    const topic = await tokenCuratedRegistry.topics(topicName);
    expect(topic.voteCount).to.equal(2); // Two votes including the initial submitter
  });

  it("Should allow challenging a listed topic", async function () {
    const topicName = "Test Topic";

    await tokenCuratedRegistry.submitTopic(topicName);
    await tokenCuratedRegistry.voteForTopic(topicName);
    await tokenCuratedRegistry.connect(addr1).challengeTopic(topicName);

    // Check if the topic has been challenged successfully
    const topic = await tokenCuratedRegistry.topics(topicName);
    expect(topic.voteCount).to.equal(1); // Vote count should decrease by 1 after challenging
  });

  it("Should allow resolving a challenge", async function () {
    const topicName = "Test Topic";

    await tokenCuratedRegistry.submitTopic(topicName);
    await tokenCuratedRegistry.voteForTopic(topicName);
    await tokenCuratedRegistry.connect(addr1).challengeTopic(topicName);
    await tokenCuratedRegistry.resolveChallenge(topicName, true);

    // Check if the challenge has been resolved successfully
    const topic = await tokenCuratedRegistry.topics(topicName);
    expect(topic.isListed).to.be.false; // Topic should not be listed after successful challenge
  });
});
