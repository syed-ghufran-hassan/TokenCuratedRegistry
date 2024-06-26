
# 🏗️ Scaffold-Base <img src="https://github.com/damianmarti/se-2/assets/466652/a795d1f3-980b-4e53-9784-ac53b6dd980e" width="35">

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

Scaffold-Base is a fork of Scaffold-ETH2 ready to ship to Base. This fork provides native support for Base and Base Sepolia testnet, and direct access to the Base faucets. 

![Scaffold-Base)](https://github.com/damianmarti/se-2/assets/466652/eac667a7-68fb-4f69-a427-126f7de4114d)

We highly recommend the Scaffold-ETH2 docs as the primary guideline.

# (forked from 🏗 Scaffold-ETH2)

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/damianmarti/se-2/assets/466652/672d178c-38c9-4c9a-953d-d36acf08f3cd)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-Base, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/BuidlGuidl/scaffold-base
cd scaffold-base
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`


Redeploy your contracts:

```
yarn deploy --reset
```


# 🔵 Deploy to Base


When you are ready to deploy to Base, generate a deployer account: 

```
yarn generate
```



Fund the deployer account with ETH on Base at:

```
yarn account
```


Deploy to Base:

```
yarn deploy --network base 
```


Set your target network to Base:

> Change "chains.hardhat" to "chains.base" in targetNetworks from `scaffold.config.ts` in `packages/nextjs`


Deploy your app to Vercel:

```
yarn vercel:yolo --prod
```

# 🍽️ Fork Mainnet Base

> stop your `yarn chain`

```

yarn fork

```

(now your local hardhat chain is a fork of Base and you can talk to forked Base contracts)


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

## User Journey

## Deployment: 

The developer deploys the TokenCuratedRegistry (TCR) smart contract to the blockchain using a development environment like Hardhat. During deployment, the developer specifies the parameters required by the contract, such as the address of the ERC20 token (if applicable), staking amount, and challenge period. However, in your case, you've decided to remove the dependency on the ERC20 token, so only the TCR contract is deployed.

## Interaction: 

After deployment, users can interact with the deployed TCR contract. They can submit topics to the registry, vote for or against topics, challenge listed topics, and resolve challenges. Each interaction with the contract may require the user to send transactions, which incur gas fees.

## Submitting a Topic: 

Users submit topics they want to add to the registry. This action involves calling the submitTopic function of the TCR contract, providing the name of the topic as an argument. The contract verifies that the caller has met the necessary requirements, such as having a sufficient balance of staked tokens (in your original contract) or simply being an EOA (Externally Owned Account) in your updated contract. If successful, the topic is added to the registry.

## Voting: 

Users can vote for or against topics in the registry. Voting typically requires users to stake tokens or, in your updated contract, simply send a transaction to register their vote. Each vote affects the vote count for a topic.

## Challenging a Topic: 

If a topic receives enough votes to be listed in the registry, other users can challenge its listing. This process involves calling the challengeTopic function of the TCR contract, which decreases the vote count for the challenged topic. If the vote count drops below a certain threshold, the topic is removed from the registry.

## Resolving Challenges: 

Challenges can be resolved either by determining that the challenge was successful (in which case the topic is removed) or unsuccessful (in which case the topic remains listed). Users can call the resolveChallenge function of the TCR contract to finalize the outcome of a challenge.

## Important note

Against every action the user needs to utilize base sepolia tokens in the form of wei so it needs to be converted from eth accordingly.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
