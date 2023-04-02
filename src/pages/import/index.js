import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { useAccount } from 'wagmi'

import Link from 'next/link'
import { useRouter } from 'next/navigation';

import NavBar from '../../components/Nav';
import { Account } from '../../components'

import { retrieveMetadata, fetchImage } from "../../utils/retrieveMetadata.js";

import { ButcherContext } from '../../contexts/butcherContext';

const Import = () => {
    const { isConnected } = useAccount()

    const router = useRouter();

    useEffect(() => {
        if(!isConnected){
          router.push('/');
        }
    }, [isConnected]);

    const { img, setImg } = useContext(ButcherContext);
    const { imgBlob, setImgBlob } = useContext(ButcherContext);
    const { metadata, setMetadata } = useContext(ButcherContext);
    const { tokenContract, setTokenContract } = useContext(ButcherContext);
    const { tokenId, setTokenId } = useContext(ButcherContext);
    const { chain, setChain } = useContext(ButcherContext);

    const [status, setStatus] = useState('Enter token chain, contract, and id');
    
    let tokenContractLabel;
    let tokenIdLabel;
    let tokenIdField;


    const handleSubmit = async event => {

        try{
          if (chain == '' || chain == null){ setChain("Ethereum") }
          let incomingMetadata = await retrieveMetadata(tokenContract, tokenId, chain);
          console.log("INCOMING METADATA = ", incomingMetadata);
          if(incomingMetadata.success){
            console.log("INCOMING METADATA . METADATA ", incomingMetadata.metadata[0]);
            setMetadata(incomingMetadata.metadata[0]);

            try{
              console.log(metadata.image)
              let localImage = await fetchImage(incomingMetadata.metadata[0].image);
              if(localImage == undefined || localImage == null){
                throw "imageError";
              } 
              setImgBlob(localImage)
              const imageObjectURL = URL.createObjectURL(localImage);
              setImg(imageObjectURL);
              console.log("IMAGE BLOB", imgBlob);
              console.log("IMG", img);
              router.push('/butcher');
            } catch (error) {
              setStatus(error)
            }
          
    
          } else {
            setStatus(incomingMetadata.status)
        }
        } catch (error){
          console.log(error);
          setStatus(error)
        }
    
      }
    
      const handleTokenContract = event => {
        setTokenContract(event.target.value);
      };
    
      const handleTokenId = event => {
        setTokenId(event.target.value);
      };
      
      const handleChain = event => {
        setChain(event.target.value);
      }
  
    if (chain == "Solana"){
      tokenContractLabel = <h2>Token Address</h2>
      tokenIdLabel = "";
      tokenIdField = "";
    }else{
      tokenContractLabel = <h2>Token Contract: </h2>
      tokenIdLabel =  <h2>Token ID: </h2>
      tokenIdField =  <input
                        type="text"
                        placeholder="42"
                        value={tokenId}
                        onChange={handleTokenId}
                      />;
    }
      

    return (
        <>
            <Container className="pageBody">
                <NavBar></NavBar>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <div className="Butcher">
                                <h1 className="title">KILL IT</h1>

                                <h3>{status}</h3>

                                <form>
                                    <h2>Chain:</h2>
                                
                                    <select value={chain} onChange={handleChain}>
                                        <option value="Ethereum">Ethereum</option>
                                        <option value="Polygon">Polygon</option>
                                        <option value="Solana">Solana</option>
                                        <option value="BSC">BSC</option>
                                        <option value="Avalance">Avalanche</option>
                                        <option value="Fantom">Fantom</option>
                                        <option value="Palm">Palm</option>
                                        <option value="Cronos">Cronos</option>
                                        <option value="Arbitum">Arbitum</option>
                                    </select>
                                    
                                    {tokenContractLabel}
                                
                                    <input
                                        type="text"
                                        placeholder="0xkjdflksjdlfkjsdlf"
                                        value={tokenContract}
                                        onChange={handleTokenContract}
                                    />
                            
                                    {tokenIdLabel}
                            
                                    {tokenIdField}
                            
                                </form>
                                
                                <button id="metadataButton" onClick={handleSubmit}>
                                    Fetch NFT
                                </button>
                            
                            </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
            </Container>

        </>
    )
}

export default Import

