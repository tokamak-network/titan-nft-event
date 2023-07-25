import { Box, Button, Flex, Input, Text, Wrap } from "@chakra-ui/react";
import { useGetNFT } from "../hooks/useSubgraph";
import { NFTcardForCart } from "./NFTcard";

type InputComponentProps = {
  w?: string;
  placeHolder?: string;
};

const InputComponent = (props: InputComponentProps) => {
  return (
    <Input
      border={"1px solid #313442"}
      borderRadius={"5px"}
      w={props?.w ?? "100%"}
      h={"32px"}
      placeholder={props?.placeHolder}
      _placeholder={{ color: "#64646f" }}
      _focus={{
        boxShadow: "none !important",
        border: "1px solid #313442 !important",
      }}
      _hover={{}}
      boxShadow={"none !important"}
      fontSize={15}
    />
  );
};

const InputAddress = () => {
  return (
    <Flex flexDir={"column"} w={"320px"}>
      <Flex columnGap={"6px"}>
        <InputComponent w="120px" placeHolder="ZIP Code" />
        <Button
          w={"68px"}
          h={"32px"}
          bgColor={"#1e1e24"}
          borderRadius={"5px"}
          color={"#64646f"}
          _hover={{}}
          _active={{}}
        >
          Find
        </Button>
      </Flex>
      <Box my={"10px"}>
        <InputComponent placeHolder="base address" />
      </Box>
      <InputComponent placeHolder="Detailed Address" />
      <Flex flexDir={"column"} rowGap={"6px"} textAlign={"left"} mt={"21px"}>
        <Text fontSize={15} color={"#ddd"}>
          Recipient’s name
        </Text>
        <InputComponent />
      </Flex>
      <Flex flexDir={"column"} rowGap={"6px"} textAlign={"left"} mt={"21px"}>
        <Text fontSize={15} color={"#ddd"}>
          Phone number
        </Text>
        <InputComponent />
        <Text fontSize={13} color={"#666"}>
          Shipping information is sent to your mobile phone.
        </Text>
      </Flex>
      <Flex justifyContent={"center"} mt={"30px"}>
        <Button
          w={"180px"}
          h={"44px"}
          bgColor={"#2775ff"}
          color={"#fff"}
          _hover={{}}
          _active={{}}
          borderRadius={"100px"}
          // onClick={addToCard}
          // isDisabled={addBtnIsDisabled}
          _disabled={{ bgColor: "#1e1e24", color: "#5a5a5a" }}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

const Shipping = () => {
  return (
    <Flex
      flexDir={"column"}
      textAlign={"center"}
      w={"400px"}
      alignItems={"center"}
    >
      <Text fontSize={22} fontWeight={600} h={"34px"} mb={"3px"}>
        Shipping address
      </Text>
      <Text fontSize={15} color={"#aaa"} lineHeight={"1.53"} mb={"30px"}>
        A free merchandise package will be sent for each NFT to the person who
        owns it as of the end of the event. (But only if the shipping address
        has been entered)
      </Text>
      <InputAddress />
    </Flex>
  );
};

const PurcasedCards = () => {
  const { myNFTs } = useGetNFT();

  console.log("myNFTs");
  console.log(myNFTs?.nfts);

  return (
    <Wrap
      spacingX={"15px"}
      spacingY={"30px"}
      w={"750px"}
      justify={"center"}
      mb={"55px"}
    >
      {myNFTs?.nfts.map((nft: { id: string }) => {
        return <NFTcardForCart key={nft.id} />;
      })}
    </Wrap>
  );
};

const Title = () => {
  return (
    <Flex flexDir={"column"} rowGap={"6px"} mb={"55px"}>
      <Text fontSize={40} fontWeight={"bold"}>
        Purchased Order
      </Text>
    </Flex>
  );
};

export function Order() {
  return (
    <Flex flexDir={"column"} alignItems={"center"}>
      <Title />
      <PurcasedCards />
      <Shipping />
    </Flex>
  );
}
