"use client";

import { Flex } from "@chakra-ui/layout";
import { Header } from "../components/Header";
import { MainBg } from "../components/MainBg";
import { BuyNFT } from "../components/BuyNFT";
import { Order } from "../components/Order";

export default function Page() {
  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Flex
        flexDir={"column"}
        w={"1280px"}
        alignItems={"center"}
        rowGap={"183px"}
      >
        <Header />
        <MainBg />
        <BuyNFT />
        <Order />
      </Flex>
    </Flex>
  );
}
