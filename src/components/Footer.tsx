import { Flex, Text } from "@chakra-ui/react";
import TOP_ARROW_ICON from "../assets/images/top_arrow_icon.svg";
import Image from "next/image";

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Flex
      w={"1200px"}
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
  );
}
