
import { Container, Row, Col } from 'react-bootstrap';
import { useAccount } from 'wagmi'
import Link from 'next/link'

import NavBar from '../components/Nav';
import { Account } from '../components'
import { ConnectLink } from '../components/ConnectKitButton'


function Page() {
  const { isConnected } = useAccount()


  return (
    <>
    <Container id="index" className="pageBody">
      <NavBar></NavBar>
      <Row>
        <Col>
          <h2>CLAIRE TOLAN AND CAMILLA STEINUM PRESENT</h2>

          <h1>THE <br/> BUTCHER </h1>

          { !isConnected && <ConnectLink></ConnectLink> }

          { isConnected && <h1 className="slaughter"><Link href="/import">SLAUGHTER NFT</Link></h1> }


          <h3>In COLLABORATION with <a href="jpg.space">JPG</a></h3>
        </Col>
      
      </Row>


    </Container>

    </>
  )
}

export default Page

