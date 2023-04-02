import { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import { useAccount } from 'wagmi'

import Link from 'next/link'
import { useRouter } from 'next/navigation';

import NavBar from '../../components/Nav';

import { processImage, fetchImage } from "../../utils/retrieveMetadata.js";
import { mintEth } from "../../utils/mintEth";
import { mintPolygon } from "../../utils/mintPolygon";
import { butcherNft } from "../../utils/butcher"


import { ButcherContext } from '../../contexts/butcherContext';

const Butcher = () => {
    const { isConnected } = useAccount()

    const router = useRouter();

    useEffect(() => {
        if(!isConnected){
            router.push('/');
        }
    }, [isConnected]);

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

    const { address } = useAccount();
    const minterAddress = address;
    console.log("ACCOUNT =>", minterAddress);

    //State variables
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('starting!');
    const [visible, setVisible] = useState(true);

    // conditional variables for html
    let conditionalAddress = chain == "Solana" ? <h2>Address: {tokenContract} </h2> : <h2>Contract {tokenContract} <br/> Token ID: {tokenId} </h2>
    let royaltyHolder = metadata.royaltyHolder != "" ? <h2> Royalty Holder: {metadata.royaltyHolder} </h2>: <h2>Royalty Holder: None identified </h2>;
    let royaltyAmount = metadata.royaltyAmount != null ? <h2> Royalty Amount: {metadata.royaltyAmount} </h2>: <h2>Royalty Amount: None identified </h2>;


    const onMintPressed = async () => {
        setVisible((prev) => !prev);
    

        setStatus("Butchering image and creating metadata. This may take up to a minute.")

        // create butchered image
        const butcherReturn = await butcherNft(minterAddress, imgBlob, metadata, tokenContract, tokenId, chain);
        console.log("BUTCHER RETURN =>", butcherReturn)
        console.log("BUTCHER RET DATA =>", butcherReturn.data);
        setMetadata([butcherReturn.data]);

        if (butcherReturn.success){
            setStatus(butcherReturn.status)
        } else {
            setStatus("Something went wrong! " + butcherReturn.status + ":// You can <a href='/'>try again</a>");
        }

        // kill blob to save on mem
        URL.revokeObjectURL(imgBlob);

        router.push("/mint");

    };

    return (
        <>
            <Container className="pageBody">
                <NavBar></NavBar>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <div className="Butcher">
                                {title}

                                <img src={img} />
                                
                                <h2 id="status">
                                    {status}
                                </h2>
                                
                                <h1 id="title">On the chopping block:</h1>
                                {conditionalAddress}

                                <h2>Name: {metadata.nftName}</h2>
                                <h2>Owner: {metadata.owner}</h2>
                                
                                {royaltyHolder}
                                {royaltyAmount}

                                {visible && (
                                    <button id='mintButton' onClick={onMintPressed}>Mint NFT</button>
                                )}

                            </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
            </Container>

        </>
    )
}

export default Butcher

