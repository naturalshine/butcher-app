import { ConnectKitButton } from "connectkit";

import styled from "styled-components";
const StyledButton = styled.button`
  cursor: pointer;
  position: fixed;
  top: 0;
  right: 0;
  display: inline-block;
  padding: 14px 24px;
  color: #ffffff;
  background: #ff0000;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10rem;
  box-shadow: 0 4px 24px -6px #ff0000;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #ff0000;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #ff0000;
  }
`;


const LinkButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  color: #ffffff;
  border-bottom: 2px solid #fff;
  background: transparent;
  font-size: 4rem;
  border-radius: none;
  box-shadow: none;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: none;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: none;
  }
`;

export const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <StyledButton onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </StyledButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export const ConnectLink = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <LinkButton onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet To Slaughter"}
          </LinkButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};