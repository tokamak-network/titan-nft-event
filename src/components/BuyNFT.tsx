import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";

const Buttons = () => {
  return (
    <Flex columnGap={"15px"}>
      <Button
        w={"180px"}
        h={"44px"}
        bgColor={"#2775ff"}
        _hover={{}}
        _active={{}}
        borderRadius={"100px"}
      >
        Add to Card
      </Button>
      <Button
        w={"180px"}
        h={"44px"}
        bgColor={"#2775ff"}
        _hover={{}}
        _active={{}}
        borderRadius={"100px"}
      >
        Buy Now
      </Button>
    </Flex>
  );
};

const CardSection = () => {
  return <Buttons />;
};

const Title = () => {
  return (
    <Flex flexDir={"column"} rowGap={"6px"} mb={"30px"}>
      <Text fontSize={40} fontWeight={"bold"}>
        Buy an NFT
      </Text>
      <Text color={"#aaaaaa"} fontSize={13}>
        Select your desired NFT serial number
      </Text>
    </Flex>
  );
};

export function BuyNFT() {
  return (
    <Flex w={"100%"} flexDir={"column"} alignItems={"center"}>
      <Title />
      <CardSection />
    </Flex>
  );
}
