import { Box, Flex, Text } from "@chakra-ui/react";
import TOP_ARROW_ICON from "../assets/images/top_arrow_icon.svg";
import Image from "next/image";
import useMediaView from "../hooks/useMediaView";

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { pcView } = useMediaView();

  return (
    <Box w={["100%", "100%", "1200px"]} px={["", "30px", ""]}>
      <Flex
        w={"100%"}
        h={"101px"}
        borderTop={"1px solid #313442"}
        justifyContent={"space-between"}
      >
        <Text mt={"36px"} color={"#9a9aaf"} fontSize={16}>
          © 2023 Tokamak Network
        </Text>
        <Image
          src={TOP_ARROW_ICON}
          alt={"TOP_ARROW_ICON"}
          style={{ cursor: "pointer" }}
          onClick={() => handleScrollToTop()}
        />
      </Flex>
    </Box>
  );
}
