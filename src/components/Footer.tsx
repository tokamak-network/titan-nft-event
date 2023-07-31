import { Box, Flex, Text } from "@chakra-ui/react";
import TOP_ARROW_ICON from "../assets/images/top_arrow_icon.svg";
import Image from "next/image";
import useMediaView from "../hooks/useMediaView";

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { mobileView } = useMediaView();

  return (
    <Box w={["100%", "100%", "1200px"]} zIndex={1000} px={["", "30px", ""]}>
      <Flex
        w={"100%"}
        h={mobileView ? "113px" : "101px"}
        justifyContent={mobileView ? "" : "space-between"}
        alignItems={"center"}
        color={"#9a9aaf"}
        fontSize={16}
        flexDir={mobileView ? "column" : "row"}
        borderTop={"1px solid #313442"}
      >
        <Text mt={mobileView ? "29px" : "36px"}>© 2023 Tokamak Network</Text>
        <Flex alignItems={"center"} columnGap={"30px"}>
          <Text>Contact : alex.k@onther.io</Text>
          {!mobileView && (
            <Image
              src={TOP_ARROW_ICON}
              alt={"TOP_ARROW_ICON"}
              style={{ cursor: "pointer" }}
              onClick={() => handleScrollToTop()}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
