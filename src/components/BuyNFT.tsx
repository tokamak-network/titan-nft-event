import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Input, useNumberInput, Link, Wrap, Box } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nftCartList, nftSelect } from "../recoil/atomState";
import { useCallback, useEffect, useMemo } from "react";
import { NFTcardForCart } from "./NFTcard";
import { useNFTContract } from "../hooks/useNFTContract";
import { useGetNFT } from "../hooks/useSubgraph";

const Buttons = () => {
  const nftSelectState = useRecoilValue(nftSelect);
  const [nft, setNft] = useRecoilState(nftCartList);
  const { callToMint, isApproved, callToApprove } = useNFTContract();

  const addToCard = useCallback(() => {
    if (nft && nftSelectState) {
      const duplicatedArr = [...nft, nftSelectState];
      const uniqueArray = duplicatedArr.reduce((acc: number[], curr) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      return setNft(uniqueArray);
    }
    if (nft === null && nftSelectState) {
      return setNft([nftSelectState]);
    }
  }, [nftSelectState, nft, setNft]);

  const [nftSelectedNumber] = useRecoilState(nftSelect);
  const { isSold } = useGetNFT();

  const addBtnIsDisabled = useMemo(() => {
    if (nftSelectedNumber && isSold(nftSelectedNumber)) {
      return true;
    }
    return false;
  }, [nftSelectedNumber, isSold]);

  const buyBtnIsDisabled = useMemo(() => {
    if (nft === null || nft?.length === 0) return true;
    return false;
  }, [nft]);

  return (
    <Flex columnGap={"15px"}>
      <Button
        w={"180px"}
        h={"44px"}
        bgColor={"#2775ff"}
        color={"#fff"}
        _hover={{}}
        _active={{}}
        borderRadius={"100px"}
        onClick={addToCard}
        isDisabled={addBtnIsDisabled}
        _disabled={{ bgColor: "#1e1e24", color: "#5a5a5a" }}
      >
        Add to Card
      </Button>
      <Button
        w={"180px"}
        h={"44px"}
        bgColor={"#2775ff"}
        color={"#fff"}
        _hover={{}}
        _active={{}}
        borderRadius={"100px"}
        isDisabled={buyBtnIsDisabled}
        _disabled={{ bgColor: "#1e1e24", color: "#5a5a5a" }}
        onClick={isApproved ? callToMint : callToApprove}
      >
        {isApproved ? "Buy Now" : "Approve"}
      </Button>
    </Flex>
  );
};

const InputSelector = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const [, setNft] = useRecoilState(nftSelect);

  useEffect(() => {
    if (input.value) return setNft(Number(input.value));
  }, [input.value, setNft]);

  return (
    <Flex mb={"12px"}>
      <Button {...dec}>-</Button>
      <Input
        {...input}
        _focus={{ boxShadow: "none !important", borderColor: "none" }}
      />
      <Button {...inc}>+</Button>
    </Flex>
  );
};

const Warning = () => {
  const [nftSelectedNumber] = useRecoilState(nftSelect);
  const { isSold } = useGetNFT();

  const isAlreadySold = useMemo(() => {
    if (nftSelectedNumber && isSold(nftSelectedNumber)) {
      return true;
    }
    return false;
  }, [nftSelectedNumber, isSold]);

  if (isAlreadySold)
    return (
      <Text fontSize={13} color={"#e23738"}>
        This number has been sold
      </Text>
    );
  return null;
};

const CardCarousell = () => {
  return null;
};

const MoreList = () => {
  return (
    <Text mt={"15px"} mb={"55px"} color={"#ddd"} fontSize={13}>
      See how limited edition NFTs are organized.{" "}
      <Link textDecor={"underline"} href="" isExternal>
        GO
      </Link>
    </Text>
  );
};

const Cart = () => {
  const nftCartListData = useRecoilValue(nftCartList);

  return (
    <Flex flexDir={"column"} mt={"60px"} rowGap={"30px"} alignItems={"center"}>
      <Text fontSize={15} fontWeight={600}>
        Shopping Cart
      </Text>
      <Wrap spacingX={"15px"} spacingY={"30px"} w={"750px"} justify={"center"}>
        {nftCartListData?.map((tokenId: number, index) => {
          return (
            <NFTcardForCart
              key={`${index}_${tokenId}`}
              tokenId={tokenId}
              isPurchased={false}
            />
          );
        })}
      </Wrap>
    </Flex>
  );
};

const CardSection = () => {
  return (
    <>
      <InputSelector />
      <Warning />
      <CardCarousell />
      <MoreList />
      <Buttons />
      <Cart />
    </>
  );
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
