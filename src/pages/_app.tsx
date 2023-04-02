import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/index.css";

import * as React from 'react'
import type { AppProps } from 'next/app'

import { ConnectKitProvider, ConnectKitButton } from 'connectkit'
import { WagmiConfig, useAccount } from 'wagmi'

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link'
import NextHead from 'next/head'

import Footer from '../components/Footer';
import { ConnectButton } from '../components/ConnectKitButton'

import { ButcherContextProvider } from '../contexts/butcherContext';

import { client } from '../wagmi.ts'
import CustomAvatar  from '../components/CustomAvatar'

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const { isConnected } = useAccount()
  return (
    <ButcherContextProvider>
    <WagmiConfig client={client}>
      <ConnectKitProvider
              customTheme={{
                "--ck-accent-color": "#d51015",
                "--ck-accent-text-color": "#d51015",
              }}

              options={{
                customAvatar: CustomAvatar,
              }}
      >
        <NextHead>
          <title>BUTCHER</title>
        </NextHead>

        <Container>
          <Row>
              <Col></Col>
              <Col></Col>
              <Col className="connectKitContainer">
                <ConnectButton></ConnectButton>
              </Col>
          </Row>
        </Container>


        {mounted && <Component {...pageProps} />}
        <Footer></Footer>
      </ConnectKitProvider>
    </WagmiConfig>
    </ButcherContextProvider>
  )
}

export default App
