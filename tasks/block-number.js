const { task } = require("hardhat/config")

task("block-number", "Print the current number").setAction(
    async (taskArgs, hre) => {
        //this function is known s an anonymous function because the function does not have a name it only has an argument
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current blockNumber: ${blockNumber}`)
    }
) //first argument is the task name "block-number" and the second argument is the description of the task "Print the current number"
module.exports = {}
