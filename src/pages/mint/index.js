import { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi'

import { ethers } from "ethers";

  
import { useAccount } from 'wagmi'

import Link from 'next/link'

import { useRouter } from 'next/navigation';

import NavBar from '../../components/Nav';

import { processImage, fetchImage } from "../../utils/retrieveMetadata.js";
import { mintPolygon } from "../../utils/mintPolygon";
import { butcherNft } from "../../utils/butcher"


import { ButcherContext } from '../../contexts/butcherContext';


const Mint = () => {    
    let txHash;
    const { isConnected } = useAccount()

    const router = useRouter();

    useEffect(() => {
        if(!isConnected){
            router.push('/');
        }
    }, [isConnected]);

    useEffect(() =>{
        console.log("TX HASH EFFECT")
        setEthTx(txHash);
        /*
        
        // mint polygon token
        const polygonReturn = await mintPolygon(butcherReturn.data);
        setPolygonTx(polygonReturn.polygonTokenId)

        if (polygoneReturn.success){
            setStatus(polygonReturn.status)
        } else {
            setStatus("Something went wrong! " + polygonReturn.status + "Polygon mint failed. However, we've already minted the Ethereum token, so all is good there... Redirecting...");
        }

        // save butchered image to context
        let hash = metadata.ipfsImage.split(/[/]+/).pop();   
        let normalisedImage = "https://butcher.infura-ipfs.io/ipfs/" + hash
        let localImage = await fetchImage(normalisedImage);
        if(localImage == undefined || localImage == null){
            console.log("imageError");
        } 
        let imageObjectUrl = URL.createObjectURL(localImage);
        setButcheredImage(imageObjectUrl);

        // nav to next page
        router.push('/butchered');
        */
    }, [txHash]);

    const { address } = useAccount();

    // context
    const { img, setImg } = useContext(ButcherContext);
    const { imgBlob, setImgBlob } = useContext(ButcherContext);
    const { metadata, setMetadata } = useContext(ButcherContext);
    const { tokenContract, setTokenContract } = useContext(ButcherContext);
    const { tokenId, setTokenId } = useContext(ButcherContext);
    const { chain, setChain } = useContext(ButcherContext);
    const { butcheredImage, setButcheredImage } = useContext(ButcherContext);
    const { ethTx, setEthTx } = useContext(ButcherContext);
    const { polygonTx, setPolygonTx } = useContext(ButcherContext);



    //State variables
    const [status, setStatus] = useState('The Butcher is Done. Click to mint token and view the results.');
    const [visible, setVisible] = useState(true);

    console.log("minting eth... ")

    console.log("METADATA =>", metadata);

    console.log("METADATA RH =>", metadata[0].royaltyHolder);

    const finalRoyalty = Math.trunc(metadata[0].royaltyAmount * 100)
    console.log("FINAL ROYALTY =>", finalRoyalty)
    console.log("setting up tx")

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
        } = usePrepareContractWrite({
            address: process.env.NEXT_PUBLIC_CONTRACT,
            abi: [{
                name: 'mintWithRoyalty',
                type: 'function',
                stateMutability: 'payable',
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
                outputs: []
            }
            ],
            functionName: 'mintWithRoyalty',
            args: [address, metadata[0].ipfsMetadata, metadata[0].royaltyHolder, finalRoyalty],
            overrides: {
                value: ethers.utils.parseEther('0.0000000106')
            }
        })

        const { data, error, isError, write } = useContractWrite(config)

        console.log("post-writer")
        console.log("isError =>", isError)
        console.log("ERROR =>", error)
        

        const { isLoading, isSuccess } = useWaitForTransaction({
            hash: data?.hash,
        });
        
        if(isSuccess){
            console.log("TX DONE")
            txHash = data?.hash;
    
            console.log(txHash);
    
    
            const etherscan = "https://goerli.etherscan.io/tx/" + txHash
            console.log("ETHERSCAN => ", etherscan)
        }



        //let ethTokenId;
        /*
        const transactionReceipt = await web3.eth.getTransactionReceipt(txHash).then(function(data){
            console.log("DATA => ", data);
            ethTokenId = web3.utils.hexToNumber(data.logs[0].topics[3]);
            console.log("DELAYED TOKEN ID => ", ethTokenId)
        });*/


        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <div>
                            <h1>{status}</h1>
                            <button disabled={!write || isLoading} onClick={() => write()}>
                                {isLoading ? 'Minting...' : 'Mint'}
                            </button>
                            {isSuccess && (
                                <div>
                                Successfully minted your NFT!
                                <div>
                                    <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                                </div>
                                </div>
                            )}
                            {(isPrepareError || isError) && (
                                <div>Error: {(prepareError || error)?.message}</div>
                            )}
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
          )


    
}



export default Mint;
