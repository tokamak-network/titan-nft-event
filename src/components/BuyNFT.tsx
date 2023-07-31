import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Input, useNumberInput, Link, Wrap, Box } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nftCartList, nftSelect } from "../recoil/atomState";
import { useCallback, useEffect, useMemo } from "react";
import { NFTcardForCarousell, NFTcardForCart } from "./NFTcard";
import { useNFTContract } from "../hooks/useNFTContract";
import { useGetNFT } from "../hooks/useSubgraph";
import Image from "next/image";
import BG_IMAGE from "../assets/images/bg2.png";
import useMediaView, { useWindowDimension } from "../hooks/useMediaView";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";

const Buttons = () => {
  const nftSelectState = useRecoilValue(nftSelect);
  const [nft, setNft] = useRecoilState(nftCartList);
  const { callToMint, isApproved, callToApprove, saleIsStart } =
    useNFTContract();

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
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { chain } = useNetwork();
  const { switchNetworkAsync, isError, switchNetwork } = useSwitchNetwork();

  const switchToTitan = useCallback(() => {
    switchNetwork?.(55004);
  }, [switchNetwork]);

  const connectToWallet = useCallback(() => {
    connect({ connector: connectors[0] });
  }, [connectors, connect]);

  const addBtnIsDisabled = useMemo(() => {
    if (nftSelectedNumber && isSold(nftSelectedNumber)) {
      return true;
    }
    return false;
  }, [nftSelectedNumber, isSold]);

  const connectedWrongNetwork = useMemo(() => {
    if (chain?.id !== 55004 && chain?.id !== 5050) return true;
    return false;
  }, [chain]);

  const buyBtnIsDisabled = useMemo(() => {
    //connected not supported network
    if (connectedWrongNetwork) return false;
    //not match the condition on the supported network
    if (nft === null || nft?.length === 0 || (isConnected && !saleIsStart))
      return true;
    return false;
  }, [nft, saleIsStart, isConnected, connectedWrongNetwork]);

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
        onClick={
          !isConnected
            ? connectToWallet
            : connectedWrongNetwork
            ? switchToTitan
            : isApproved
            ? callToMint
            : callToApprove
        }
        lineHeight={1.53}
      >
        <Flex
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          pb={"2px"}
        >
          <Text>
            {!isConnected
              ? "Connect Wallet"
              : connectedWrongNetwork
              ? "Change network"
              : isApproved
              ? "Buy Now"
              : "Approve"}
          </Text>
          {nft && nft.length > 0 && isApproved && (
            <Flex
              fontWeight={"normal"}
              ml={"5px"}
              columnGap={"5px"}
              alignItems={"center"}
            >
              <Text fontSize={12}>|</Text>
              <Text>{nft.length * 30} TON</Text>
            </Flex>
          )}
        </Flex>
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
    if (input.value > 100) return;
    if (input.value) return setNft(Number(input.value));
  }, [input.value, setNft]);

  // <Image src={MINUS_ICON} alt={"MINUS_ICON"} />

  return (
    <Flex mb={"12px"} w={"150px"} h={"35px"} zIndex={100}>
      <Button
        {...dec}
        w={"40px"}
        bgColor={"#fff"}
        borderRadius={0}
        borderLeftRadius={"19px"}
        color={"#2775ff"}
        _disabled={{
          color: "#7e7e8f",
        }}
        fontSize={23}
        _hover={{}}
      >
        -
      </Button>
      <Input
        {...input}
        w={"100%"}
        _focus={{ boxShadow: "none !important", borderColor: "none" }}
        border={"none"}
        bgColor={"#fff"}
        borderRadius={0}
        color={"#07070c"}
        textAlign={"center"}
        fontSize={20}
        fontWeight={"bold"}
      />
      <Button
        {...inc}
        w={"40px"}
        bgColor={"#fff"}
        borderRadius={0}
        borderRightRadius={"19px"}
        color={"#2775ff"}
        _disabled={{
          color: "#7e7e8f",
        }}
        fontSize={23}
        _hover={{}}
        pb={"3px"}
      >
        +
      </Button>
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
      <Text
        fontSize={13}
        color={"#e23738"}
        pos={"absolute"}
        top={"50px"}
        zIndex={100}
      >
        This number has been sold
      </Text>
    );
  return null;
};

const CardCarousell = () => {
  const [nftSelectedNumber] = useRecoilState(nftSelect);

  const formmatImageNumber = (num: number) => {
    if (num === 100) {
      return 0;
    }
    if (num === 101) {
      return 1;
    }
    if (num === -1) {
      return 99;
    }
    if (num === -2) {
      return 98;
    }
    return num;
  };

  return (
    <Flex
      w={"100%"}
      h={"321px"}
      mt={"50px"}
      columnGap={"30px"}
      pos={"relative"}
    >
      <Box pos={"absolute"} left={"23%"} top={"-350px"}>
        <Image src={BG_IMAGE} alt={"BG_IMAGE"} />
      </Box>
      <NFTcardForCarousell
        imageNumber={formmatImageNumber(nftSelectedNumber - 3)}
        style={{ opacity: 0.1 }}
      />
      <NFTcardForCarousell
        imageNumber={formmatImageNumber(nftSelectedNumber - 2)}
        style={{ opacity: 0.2 }}
      />
      <NFTcardForCarousell
        imageNumber={formmatImageNumber(nftSelectedNumber - 1)}
        style={{ zIndex: 100 }}
      />
      <NFTcardForCarousell
        imageNumber={formmatImageNumber(nftSelectedNumber)}
        style={{ opacity: 0.2 }}
      />
      <NFTcardForCarousell
        imageNumber={formmatImageNumber(nftSelectedNumber + 1)}
        style={{ opacity: 0.1 }}
      />
    </Flex>
  );
};

const MoreList = () => {
  return (
    <Text mt={"15px"} mb={"55px"} color={"#ddd"} fontSize={13} zIndex={100}>
      See how limited edition NFTs are organized.{" "}
      <Link textDecor={"underline"} href="" isExternal>
        GO
      </Link>
    </Text>
  );
};

const Cart = () => {
  const nftCartListData = useRecoilValue(nftCartList);
  const { bp750px } = useMediaView();
  const { width } = useWindowDimension();

  if (nftCartListData && nftCartListData?.length > 0) {
    return (
      <Flex
        flexDir={"column"}
        mt={"60px"}
        rowGap={"30px"}
        alignItems={"center"}
      >
        <Text fontSize={15} fontWeight={600}>
          Shopping Cart
        </Text>
        <Wrap
          spacingX={"15px"}
          spacingY={"30px"}
          w={bp750px ? width : "750px"}
          px={["38px", "38px", ""]}
          justify={"center"}
        >
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
  }

  return null;
};

const CardSection = () => {
  return (
    <Flex flexDir={"column"} pos={"relative"} alignItems={"center"}>
      <InputSelector />
      <Warning />
      <CardCarousell />
      <MoreList />
      <Buttons />
      <Cart />
    </Flex>
  );
};

const Title = () => {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      mb={"30px"}
      zIndex={100}
      w={"348px"}
    >
      <Text fontSize={40} fontWeight={"bold"}>
        Buy an NFT
      </Text>
      <Flex
        flexDir={"column"}
        fontSize={13}
        color={"#aaa"}
        alignItems={"center"}
        mt={"10px"}
        mb={"60px"}
      >
        <Text color={"#fff"}>Before you buy</Text>
        <Text mt={"25px"}>
          Our NFTs are being sold in Titan network. So, you should:{" "}
        </Text>
        <Text mt={"15px"}>
          1. Make sure you have enough TON &amp; ETH(for gas fee){" "}
        </Text>
        <Text>2. Deposit TON &amp; ETH(for gas fee) into Titan network. </Text>
        <Text mt={"15px"}>
          For this, visit to{" "}
          <Link
            href="https://bridge.tokamak.network/"
            textDecor={"underline"}
            isExternal
          >
            Bridge &amp; Swap
          </Link>{" "}
        </Text>
      </Flex>

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
