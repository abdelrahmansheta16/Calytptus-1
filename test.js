const Web3 = require("web3");

// Set your Ethereum node provider
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/5UbsEn287kpoFAKher3L-X4sFxka8Leu');

// Replace with the contract address and ABI
const contractAddress = '0x7F06E18980B1c697422bE0b6831f18c73e27BD98';

// Replace with the slot you want to read (in hexadecimal)
const storageSlot = '0x0'; // Example: Reading from slot 0

// Function to read the storage of the contract in the specified slot
async function readStorage() {
    try {
        // Use the callStatic method to read from the contract without sending a transaction
        const storageValue = await web3.eth.getStorageAt(contractAddress, 1, console.log);
        const intValue = parseInt(storageValue);
        console.log(`Value in storage slot ${storageSlot}: ${intValue}`);
        const block = await web3.eth.getBlock('latest');
        const currentTimestamp = block.timestamp;

        console.log(`Current timestamp: ${currentTimestamp}`);
    } catch (error) {
        console.error('Error reading storage:', error);
    }
}

// Call the function to read the storage
readStorage();
