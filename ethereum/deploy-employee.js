require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledEmployee = {
  data: require("./build/Employee.json"),
  args: ["my-worldcoin-nullifier-hash"]
}

const provider = new HDWalletProvider(
  process.env.ACCOUNT_PRIVATE_KEY,
  process.env.INFURA_ENDPOINT,
);
const web3 = new Web3(provider);

const deployEmployee = async (compiledOutput, web3Object) => {
  const accounts = await web3Object.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3Object.eth.Contract(compiledOutput.data.abi)
    .deploy({ data: compiledOutput.data.evm.bytecode.object, arguments:compiledOutput.args })
    .send({ gas: "1400000", from: accounts[0] });
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy(compiledEmployee, web3);

