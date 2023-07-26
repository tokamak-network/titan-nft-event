import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import CARD_IMAGE from "../assets/cards/001.png";
import { useRecoilState } from "recoil";
import { nftCartList } from "../recoil/atomState";
import { useGetNFT } from "../hooks/useSubgraph";
import { CSSProperties } from "react";

const formatIndexNumber = (num: number) => {
  if (num < 10) return `00${num}`;
  if (num < 100) return `0${num}`;
  return num;
};

const imagePaths = Array.from({ length: 100 }, (_, index) =>
  require(`../assets/nft-all/${formatIndexNumber(index + 1)}.png`)
);

type NFTcardForCartProps = {
  tokenId: number;
  isPurchased: boolean;
};

export function NFTcardForCart(props: NFTcardForCartProps) {
  const { tokenId, isPurchased } = props;

  const [nftCart, setNftCartList] = useRecoilState(nftCartList);
  const removeItem = (item: number) => {
    if (nftCart) {
      const filteredCartList = nftCart.filter((e) => e !== item);
      setNftCartList(filteredCartList);
    }
  };
  const { isSold } = useGetNFT();

  return (
    <Flex flexDir={"column"} rowGap={"10px"}>
      <Box w={"60px"} h={"90px"} pos={"relative"}>
        <Image
          src={CARD_IMAGE}
          alt={"CARD_IMAGE"}
          style={{ position: "absolute" }}
        />
        {isSold(tokenId) && !isPurchased && (
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
        )}
      </Box>
      <Flex flexDir={"column"} alignItems={"center"}>
        <Text color={"#ddd"}>{tokenId}</Text>
        {!isPurchased && (
          <Text
            color={"#707070"}
            cursor={"pointer"}
            onClick={() => removeItem(tokenId)}
          >
            Delete
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export function NFTcardForCarousell(props: {
  imageNumber: number;
  style?: CSSProperties;
}) {
  return (
    <Box w={"212px"} h={"320px"} style={props.style}>
      <Image src={imagePaths[props.imageNumber]} alt={"NFT_CARD_IMAGE"} />
    </Box>
  );
}
