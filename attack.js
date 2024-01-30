const Web3 = require('web3');
const ethers = require('ethers');
const abi = require('./contractABI.json');
const fs = require('fs');
const ethapi = require('etherscan-api').init('NF84Z95WF45S8XNHEQHGXJQPUQC2U8929E')

// Set your Ethereum node provider
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/5UbsEn287kpoFAKher3L-X4sFxka8Leu');
const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/5UbsEn287kpoFAKher3L-X4sFxka8Leu');


// Replace with your contract address and ABI
const contractAddress = '0x7F06E18980B1c697422bE0b6831f18c73e27BD98';
const contractAbi = [abi];

// Replace with the timestamp you want to wait for (in seconds)
const targetTimestamp = 1706716944; // Example: February 3, 2022 00:00:00 UTC

// Replace with your private key (for the account that will send the transaction)
const privateKey = 'dec68c695698c57c05cd2aab7b731f16e091edb104cdb4256d381d251c53a4f3';

const wallet = new ethers.Wallet(privateKey, provider);
// Connect to the wallet using the private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);


// Function to check the current block timestamp
async function getCurrentBlockTimestamp() {
    const block = await web3.eth.getBlock('latest');
    return block.timestamp;
}

// Function to wait until the target timestamp is reached
async function waitUntilTargetTimestamp() {
    while (true) {
        const currentTimestamp = await getCurrentBlockTimestamp();
        if ((targetTimestamp - currentTimestamp) < 20) {
            console.log('Target timestamp reached!');
            break;
        }
        console.log(`Current timestamp: ${currentTimestamp}`);
        console.log(`Time Remaining: ${targetTimestamp - currentTimestamp}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 5 seconds before checking again
    }
}

// Function to call the smart contract method after the target timestamp is reached
async function callContractMethod() {
    await waitUntilTargetTimestamp();

    // Replace with the method you want to call and its parameters
    const contractJson = fs.readFileSync('./contractABI.json');
    console.log(contractJson)
    const abi = JSON.parse(contractJson);
    console.log(abi.abi)
    const contract = new ethers.Contract(contractAddress, abi.abi, wallet)

    let _tx = await contract.tryToSit('abdelrahman sheta');
    console.log("tx hash: ", _tx?.hash)
    let _receipt = await _tx.wait()
    console.log("tx receipt: ", _receipt)
    console.log("tx status: ", _receipt.status)
}

// Call the function to start the process
callContractMethod();
