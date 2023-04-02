import { useState, useContext, useEffect } from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';

import { useAccount } from 'wagmi'

import Link from 'next/link'
import { useRouter } from 'next/navigation';

import NavBar from '../../components/Nav';
import { Account } from '../../components'

import { ButcherContext } from '../../contexts/butcherContext';

const Butchered = () => {
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
    
    //State variables
    const [title, setTitle] = useState('BUTCHERED');

    const galleryPage = () => {
        router.push("/gallery");
    }


    return (
        <>
            <Container className="pageBody">
                <NavBar></NavBar>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <div className="Butchered">
                                <h1>{title}</h1>
                                
                                <img src={butcheredImage} />
                                
                                <h2>{metadata} </h2>     
                                
                                <h2>{ethTx}</h2>
                                
                                <h2>{polygonTx}</h2>

                                <Button className ="sample-btn" variant="primary" size="lg" active onClick={galleryPage}>GALLERY</Button>
                            </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
            </Container>

        </>
    )
}

export default Butchered;

