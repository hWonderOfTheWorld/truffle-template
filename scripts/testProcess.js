const unpackAbi = require("../src/abis/unpack.json");

const { addresses } = require("../src/addresses.js");
const { YEAR, MONTH, WEEK, DAY, HOUR, MIN, DEADLINE, MAX_UINT, ZERO_ADDRESS } = require("./utils.js");

module.exports = async function(callback) {

    var startBal; 
    var endBal; 
    
    const makeContract = (abi, address) => {
        return new web3.eth.Contract(abi, address);
    }
    
    const balanceOfAddress = async (address) => {
        const bal = await web3.eth.getBalance(address);
        return bal; 
    }
    
    const formatEther = (input) => {
        return web3.utils.fromWei(input, 'ether');
    }
    
    const getChainID = async () => {
        const chainID = await web3.eth.getChainId();
        return chainID;
    }

    const accounts = await web3.eth.getAccounts();
    const chainID = await getChainID();
    console.log('[CHAIN-ID] ', chainID);

    var chainAddresses = addresses[chainID];
    chainAddresses.dev = accounts[0];

    /*-------------------------------------------------------------------------------------------------------------*/

    const UNPACK = makeContract(unpackAbi, '');

    const bal = await web3.eth.getBalance(address);
    return bal; 
 
    balanceOfAddress(chainAddresses.dev).then((r)=>{
        endBal = formatEther(r); 
        const spent = Number(startBal) - Number(endBal);

        console.log('[BALANCE]   End Balance:', endBal);
        console.log('[BALANCE]   Total Spent:', spent);
    });
};