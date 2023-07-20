"use client";

import { Box, Flex } from "@chakra-ui/layout";
import Image from "next/image";
import LOGO_IMAGE from "../assets/images/tn_logo.png";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useCallback } from "react";
import { trimAddress } from "../utils/trimAddress";

export function Header() {
  const { connector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const onClickHandler = useCallback(() => {
    if (isConnected) return disconnect();
    return connect({ connector: connectors[0] });
  }, [isConnected, connectors, connect, disconnect]);

  return (
    <Flex
      w={"100%"}
      h={"72px"}
      bg={"transparent"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"40px"}
      pos={"absolute"}
    >
      <Box h={"30px"}>
        <Image src={LOGO_IMAGE} alt={"LOGO_IMAGE"} />
      </Box>
      <Box
        w={"136px"}
        h={"35px"}
        border={"1px solid #707070"}
        borderRadius={"19px"}
        textAlign={"center"}
        verticalAlign={"center"}
        lineHeight={"31px"}
        fontSize={15}
        fontWeight={600}
        cursor={"pointer"}
        onClick={onClickHandler}
        color={"#707070"}
      >
        {isConnected ? trimAddress({ address }) : "Connect Wallet"}
      </Box>
    </Flex>
  );
}
