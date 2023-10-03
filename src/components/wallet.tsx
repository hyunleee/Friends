import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import styled from "styled-components";

const BlackButton1 = styled.button`
  width: 140px; //가로 길이 100px
  height: 30px; //세로 길이 30px
  background-color: black; //배경색: 검은색
  color: white; //글씨 색깔: 하얀색
  border-radius: 20px;
  text-align: center; //글씨 정렬: 좌우로 가운데 정렬
`;

interface WalletProps {
  account: string;
  setAccount: (account: string) => void;
}

export const Wallet = ({ account, setAccount }: WalletProps) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  setAccount(address!);

  return (
    <>
      {isConnected ? (
        <>
          <div>
            Connected to {address}
            <BlackButton1 onClick={() => disconnect()}>Disconnect</BlackButton1>
          </div>
        </>
      ) : (
        <BlackButton1 onClick={() => connect()}>Connect Wallet</BlackButton1>
      )}
    </>
  );
};
