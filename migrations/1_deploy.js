const { keccak256 } = require("ethers/lib/utils");

const Fun = artifacts.require('Fun');

const nftAbi = require("../src/abis/nft.json");


module.exports = async function(deployer) {

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
    
    console.log("accounts", accounts)
    console.log("----------------------->>")
    console.log(">>>>", chainAddresses.dev)
    console.log("----------------------->>")


/*---------------------------------------------     UTILS   -------------------------------------------------------------*/
   

    const sha3 = (value) => keccak256(Buffer.from(value));

    
/*-------------------------------------------------------------------------------------------------------------*/

    balanceOfAddress(chainAddresses.dev).then((r)=>{
        startBal = formatEther(r); 
        console.log('[BALANCE]   Start Balance:', startBal);
    });

        
/*---------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                           */
/*                                              CORE CONTRACTS DEPLOYMENT                                                    */
/*                                                                                                                           */
/*---------------------------------------------------------------------------------------------------------------------------*/

    /*------------------------------------- DEPLOY --------------------------------------------*/
///*
    // if we cant find a oracle address we deploy one. 
   

        
        await deployer.deploy(
            Fun,
            'constructorVars',
        );
        const fun = await Fun.deployed();
        console.log('[INFO]   Fun deployed at: ', fun.address);
       
 
    /*------------------------------------- Finish  --------------------------------------*/
  

    balanceOfAddress(chainAddresses.dev).then((r)=>{
        endBal = formatEther(r); 
        const spent = Number(startBal) - Number(endBal);

        console.log('[BALANCE]   End Balance:', endBal);
        console.log('[BALANCE]   Total Spent:', spent);

    });


    console.log("------------------------------------------------------------------------")
    console.log('END');
};
