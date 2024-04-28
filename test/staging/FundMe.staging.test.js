const { assert } = require("chai")
const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name) //here we are using the hardhat network that why we put
    ? describe.skip
    : describe("FundMe Staging Tests", function () {
          let deployer
          let fundMe
          const sendValue = ethers.utils.parseEther("0.1") //equivalent to 0.1*10^8
          beforeEach(async () => {
              //   deployer = (await getNamedAccounts()).deployer
              //   fundMe = await ethers.getContract("FundMe", deployer)
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              const fundTxResponse = await fundMe.fund({ value: sendValue })
              await fundTxResponse.wait(1)
              const withdrawTxResponse = await fundMe.withdraw()
              await withdrawTxResponse.wait(1)
              //   await fundMe.fund({ value: sendValue })
              //   await fundMe.withdraw()

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
