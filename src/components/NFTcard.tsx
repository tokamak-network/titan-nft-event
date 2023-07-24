import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import CARD_IMAGE from "../assets/cards/001.png";

export function NFTcardForCart() {
  return (
    <Flex flexDir={"column"} rowGap={"10px"}>
      <Box w={"60px"} h={"90px"} pos={"relative"}>
        <Image
          src={CARD_IMAGE}
          alt={"CARD_IMAGE"}
          style={{ position: "absolute" }}
        />
        <Flex
          pos={"absolute"}
          zIndex={100}
          w={"60px"}
          h={"92px"}
          opacity={0.75}
          bg={"#000"}
          mb={"auto"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"#e23738"} fontSize={13} fontWeight={600}>
            Sold
          </Text>
        </Flex>
      </Box>
      <Flex flexDir={"column"} alignItems={"center"}>
        <Text color={"#ddd"}>001</Text>
        <Text color={"#707070"} cursor={"pointer"}>
          Delete
        </Text>
      </Flex>
    </Flex>
  );
}
