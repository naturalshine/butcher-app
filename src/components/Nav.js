import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Account } from '.'
import { useAccount } from 'wagmi'


const NavBar = (Account) => {
    const { isConnected } = useAccount()
    const { asPath } = useRouter()

    return(
        <Navbar expand="lg">
          { asPath != "/" && <Navbar.Brand href="/">BUTCHER</Navbar.Brand> }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/info">Info</Nav.Link>
              <Nav.Link href="/gallery">Gallery</Nav.Link>
              { isConnected && asPath != "/" && <Nav.Link href="/import">Slaughter NFT</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  
    )

}

export default NavBar