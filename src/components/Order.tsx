import { Box, Button, Flex, Input, Text, Wrap } from "@chakra-ui/react";
import { useGetNFT } from "../hooks/useSubgraph";
import { NFTcardForCart } from "./NFTcard";
import { openPostCode, shippingAddress } from "../recoil/atomState";
import { ShippingAddress } from "../recoil/type";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { checkAllKeysHaveValues } from "../utils/checkAllKeysHavevalues";
import { useAccount } from "wagmi";
import { createNewShippingAddress } from "../firebase/controller";
import { useShippingAddress } from "../hooks/useShippingAddress";
import { PostCode } from "./PostCode";
import { useTimestampcomparator } from "../hooks/useTimestampComparator";
import ARROW_ICON from "../assets/icons/arrow-right.svg";
import ARROW_YELLOW_ICON from "../assets/icons/arrow-yellow.svg";
import Image from "next/image";
import { Round_T, checkSaleRound } from "../utils/checkSaleRound";
import { motion } from "framer-motion";

type InputComponentProps = {
  inputKey: keyof ShippingAddress;
  value: string | undefined;
  w?: string;
  placeHolder?: string;
};

const InputComponent = (props: InputComponentProps) => {
  const { inputKey, value } = props;
  const [shippingAddressData, setShippingAddress] =
    useRecoilState(shippingAddress);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShippingAddress({ ...shippingAddressData, [inputKey]: value });
  };

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
      onChange={(e) => onChangeHandler(e)}
      value={shippingAddressData[inputKey]}
      defaultValue={value}
    />
  );
};

const InputAddress = () => {
  const { address } = useAccount();
  const { addressData } = useShippingAddress();
  const [, setIsOpen] = useRecoilState(openPostCode);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const zipCode = event.target[0].value;
    const baseAddress = event.target[2].value;
    const defaultAddress = event.target[3].value;
    const name = event.target[4].value;
    const phoneNumber = event.target[5].value;

    const paramsToSave = {
      zipCode,
      baseAddress,
      defaultAddress,
      name,
      phoneNumber,
    };

    const hasAllValue = checkAllKeysHaveValues(paramsToSave);
    if (hasAllValue && address) {
      const res = await createNewShippingAddress({
        userAccountAddress: address,
        addressData: paramsToSave,
      });
      if (res) {
        return alert("Success to save your shipping address");
      }
      return alert("Failed to save your shipping address. Please try again.");
    }
  };

  return (
    <Flex flexDir={"column"} w={"320px"}>
      <PostCode />
      <form onSubmit={handleSubmit}>
        <Flex columnGap={"6px"}>
          <InputComponent
            inputKey="zipCode"
            w="120px"
            placeHolder="ZIP Code"
            value={addressData?.zipCode}
          />
          <Button
            w={"68px"}
            h={"32px"}
            bgColor={"#1e1e24"}
            borderRadius={"5px"}
            color={"#64646f"}
            _hover={{}}
            _active={{}}
            onClick={() => setIsOpen(true)}
          >
            Find
          </Button>
        </Flex>
        <Box my={"10px"}>
          <InputComponent
            inputKey="baseAddress"
            placeHolder="base address"
            value={addressData?.baseAddress}
          />
        </Box>
        <InputComponent
          inputKey="defaultAddress"
          placeHolder="Detailed Address"
          value={addressData?.defaultAddress}
        />
        <Flex flexDir={"column"} rowGap={"6px"} textAlign={"left"} mt={"21px"}>
          <Text fontSize={15} color={"#ddd"}>
            Recipient’s name
          </Text>
          <InputComponent inputKey="name" value={addressData?.name} />
        </Flex>
        <Flex flexDir={"column"} rowGap={"6px"} textAlign={"left"} mt={"21px"}>
          <Text fontSize={15} color={"#ddd"}>
            Phone number
          </Text>
          <InputComponent
            inputKey="phoneNumber"
            value={addressData?.phoneNumber}
          />
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
            // onClick={saveShippingAddress}
            _disabled={{ bgColor: "#1e1e24", color: "#5a5a5a" }}
            type="submit"
          >
            {addressData ? "Edit" : "Save"}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

const Shipping = () => {
  return (
    <Flex
      flexDir={"column"}
      textAlign={"center"}
      w={["340px", "400px", "400px"]}
      alignItems={"center"}
    >
      <Text fontSize={22} fontWeight={600} h={"34px"} mb={"3px"}>
        Batch shipping address
      </Text>
      <Text fontSize={15} color={"#aaa"} lineHeight={"1.53"} mb={"36px"}>
        A free merchandise package will be sent for each NFT to the person who
        owns it as of the end of the event. (But only if the shipping address
        has been entered)
      </Text>
      <InputAddress />
    </Flex>
  );
};

const PurcasedCards = (props: { round: Round_T }) => {
  const { myNFTs } = useGetNFT();

  return (
    <Wrap
      spacingX={"15px"}
      spacingY={"30px"}
      w={["100%", "100%", "750px"]}
      px={["38px", "38px", "0px"]}
      justify={"center"}
      mb={"25px"}
    >
      {myNFTs?.nfts.map((nft: { tokenID: string; timeHistory: number[] }) => {
        const soldTime = nft.timeHistory[1];
        const saleRound = checkSaleRound(soldTime);

        if (props.round !== saleRound) return null;

        return (
          <NFTcardForCart
            key={Number(nft.tokenID)}
            tokenId={Number(nft.tokenID)}
            isPurchased={true}
          />
        );
      })}
    </Wrap>
  );
};

const SaleRoundInfo = (props: { round: Round_T; isActive: boolean }) => {
  const { round, isActive } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const endTime =
    round === "1st"
      ? "Monday, August 7 2023, 1:00 PM (KST)"
      : round === "2nd"
      ? "Monday, August 14 2023, 1:00 PM (KST)"
      : "Monday, August 21 2023, 1:00 PM (KST)";

  return (
    <Flex flexDir={"column"} rowGap={"30px"} alignItems={"center"}>
      <Flex
        justifyContent={"space-between"}
        columnGap={"6px"}
        onClick={() => setIsOpen(!isOpen)}
        cursor={"pointer"}
        alignItems={"center"}
      >
        <Text fontSize={15} color={isActive ? "#ffff07" : "#aaa"}>
          {round} : {endTime}
        </Text>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }} // Rotate the element by 90 degrees
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Image
            src={isActive ? ARROW_YELLOW_ICON : ARROW_ICON}
            alt={"ARROW_ICON"}
          />
        </motion.div>
      </Flex>
      {isOpen && <PurcasedCards round={round} />}
    </Flex>
  );
};

const SaleRound = () => {
  const {
    isFirstTimestampPassed,
    isSecondTimestampPassed,
    isThirdTimestampPassed,
  } = useTimestampcomparator();

  return (
    <Flex rowGap={"6px"} flexDir={"column"} mb={"55px"}>
      <SaleRoundInfo round="1st" isActive={!isFirstTimestampPassed} />
      {isFirstTimestampPassed && (
        <SaleRoundInfo
          round="2nd"
          isActive={!isSecondTimestampPassed && isFirstTimestampPassed}
        />
      )}
      {isSecondTimestampPassed && isFirstTimestampPassed && (
        <SaleRoundInfo round="3rd" isActive={!isThirdTimestampPassed} />
      )}
    </Flex>
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
      <SaleRound />
      <Shipping />
    </Flex>
  );
}
