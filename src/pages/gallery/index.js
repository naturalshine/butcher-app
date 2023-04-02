import { useState, useContext, useEffect } from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';

import { useAccount } from 'wagmi'

import Link from 'next/link'
import { useRouter } from 'next/navigation';

import NavBar from '../../components/Nav';
import { Account } from '../../components'

import { fetchButcheredAll, fetchButcheredOwned, fetchButcheredProject } from "../../utils/fetchGallery";
import { ButcherContext } from '../../contexts/butcherContext';

const Gallery = () => {
    const { isConnected } = useAccount()

    const router = useRouter();

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
    const [title, setTitle] = useState('GALLERY');

    const importPage = () => {
        router.push("/import");
    }

    const showButcheredOwned = async () => {
        const butcheredOwned = await fetchButcheredOwned(Account);

    }

    const showButcheredProject = async () => {
        const butcheredProject = await fetchButcheredProject(metadata);

    }

    const showButcheredAll = async () => {
        const butcheredAll = await fetchButcheredAll();
    }


    useEffect(() => {
            if(isConnected){
                showButcheredOwned().then((res) => {
                    console.log("OWNED RESULTS =>", res);
                }).catch((e) => {
                    console.log(e.message)
                });  
            
            }

            if(!metadata == ''){
                showButcheredProject().then((res) => {
                    console.log("PROJECT RESULTS =>", res);
                }).catch((e) => {
                    console.log(e.message)
                });  
            
            }

            showButcheredAll().then((res) => {
                console.log("ALL RESULTS =>", res);
            }).catch((e) => {
                console.log(e.message)
            });  
        }, [isConnected]);


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

export default Gallery;

