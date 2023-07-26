import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useGetNFT } from "../hooks/useSubgraph";
import { NFTcardForCart } from "./NFTcard";
import { openPostCode, shippingAddress } from "../recoil/atomState";
import { ShippingAddress } from "../recoil/type";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useMemo } from "react";
import { checkAllKeysHaveValues } from "../utils/checkAllKeysHavevalues";
import { useAccount } from "wagmi";
import { createNewShippingAddress } from "../firebase/controller";
import { useShippingAddress } from "../hooks/useShippingAddress";
import { PostCode } from "./PostCode";

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
            Save
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

  return (
    <Wrap
      spacingX={"15px"}
      spacingY={"30px"}
      w={"750px"}
      justify={"center"}
      mb={"55px"}
    >
      {myNFTs?.nfts.map((nft: { tokenID: string }) => {
        return (
          <NFTcardForCart
            key={nft.tokenID}
            tokenId={Number(nft.tokenID)}
            isPurchased={true}
          />
        );
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
