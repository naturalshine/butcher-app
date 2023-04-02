import * as React from 'react'

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi'


export async function mintEth(minterAddress, metadata) {
    try{

        console.log("minting eth... ")
        console.log("ACCOUNT =>", minterAddress);

        console.log("METADATA =>", metadata)

        const finalRoyalty = Math.trunc(metadata.royaltyAmount * 100)
        console.log("setting up tx")

        const {
            config,
            error: prepareError,
            isError: isPrepareError,
          } = usePrepareContractWrite({
            address: process.env.NEXT_PUBLIC_CONTRACT,
            abi: [
              {
                name: 'mintWithRoyalty',
                type: 'function',
                stateMutability: 'nonpayable',
                inputs: [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "uri",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "royaltFeeReceiver",
                        "type": "address"
                    },
                    {
                        "internalType": "uint96",
                        "name": "fee",
                        "type": "uint96"
                    }
                ],
                outputs: [],
              },
            ],
            functionName: 'mintWithRoyalty',
            args: [minterAddress, metadata.ipfsMetadata, metadata.royaltyHolder, finalRoyalty]
          })

          const { data, error, isError, write } = useContractWrite(config)

          console.log("post-writer")
          console.log("isError =>", isError)
          console.log("ERROR =>", error)
          

          const { isLoading, isSuccess } = useWaitForTransaction({
            hash: data?.hash,
          });

          console.log("TX DONE")
          const txHash = data.hash;

          console.log(txHash);


        /*
            abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
        outputs: [],
      },
    ],
    functionName: 'mint',
    args: [parseInt(debouncedTokenId)],
    enabled: Boolean(debouncedTokenId),

    */

    /*

        //set up your Ethereum transaction
        const transactionParameters = {
            to: contractAddress,
            from: window.ethereum.selectedAddress,
            'data': window.contract.methods.mintWithRoyalty(Account, data.ipfsMetadata, data.royaltyHolder, finalRoyalty).encodeABI() 
        };
        console.log("triggering tx")
        //sign transaction via Metamask
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        console.log("tx hash =>", txHash);
        */

        const etherscan = "https://goerli.etherscan.io/tx/" + txHash
        console.log("ETHERSCAN => ", etherscan)
        
        //let ethTokenId;
        /*
        const transactionReceipt = await web3.eth.getTransactionReceipt(txHash).then(function(data){
            console.log("DATA => ", data);
            ethTokenId = web3.utils.hexToNumber(data.logs[0].topics[3]);
            console.log("DELAYED TOKEN ID => ", ethTokenId)
        });*/


        return {
            success: true,
            status: "Done minting Ethereum token... Minting polygon token...",
            txHash: txHash,
        }

    } catch (err) {
        console.log("ERROR! =>", err)
        return {
            success: false,
            status: "😥 Something went wrong: " + err.message
       }    
    }


    
}



