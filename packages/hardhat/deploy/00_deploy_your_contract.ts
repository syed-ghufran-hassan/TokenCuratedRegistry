import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployTokenCuratedRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    // Deploy TokenCuratedRegistry contract
    await deploy("TokenCuratedRegistry", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
    });
};

export default deployTokenCuratedRegistry;

deployTokenCuratedRegistry.tags = ["TokenCuratedRegistry"];
