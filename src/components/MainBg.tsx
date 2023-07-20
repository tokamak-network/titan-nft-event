import { Flex, Text } from "@chakra-ui/layout";
import BG_IMAGE from "../assets/images/bg1.png";
import CARD_IMAGE from "../assets/images/Card-all.svg";
import MERCHANDISE_IMAGE from "../assets/images/merchandise.png";
import LINE_IMAGE from "../assets/images/line.png";

import Image from "next/image";

const SectionMerchandise = () => {
  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Text fontSize={22} fontWeight={600} mb={"106px"}>
        Free Merchandise for Each
      </Text>
      <Image src={MERCHANDISE_IMAGE} alt={"MERCHANDISE_IMAGE"} />
      <Text color={"#aaaaaa"} mt={"12px"}>
        The MD images above are for illustrative purposes only.
      </Text>
      <Text color={"#dddddd"} w={"400px"} mt={"62px"}>
        100 NFTs will be issued, each featuring a unique design <br />
        and serial number. <br /> You can apply this NFT as your profile picture
        on the Tokamak webpage (coming soon).
      </Text>
    </Flex>
  );
};

const SectionNFT = () => {
  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Text fontSize={22} fontWeight={600} mb={"60px"}>
        100 limited NFTS
      </Text>
      <Image src={CARD_IMAGE} alt={"CARD_IMAGE"} />
      <Text color={"#dddddd"} w={"400px"} mt={"45px"}>
        100 NFTs will be issued, each featuring a unique design <br />
        and serial number. <br /> You can apply this NFT as your profile picture
        on the Tokamak webpage (coming soon).
      </Text>
    </Flex>
  );
};

const MiddleSection = () => {
  return (
    <Flex w={"100%"} justifyContent={"space-between"} px={"120px"}>
      <SectionNFT />
      <Image src={LINE_IMAGE} alt={"LINE_IMAGE"} />
      <SectionMerchandise />
    </Flex>
  );
};

export function MainBg() {
  return (
    <Flex w={"100%"} flexDir={"column"}>
      <Image src={BG_IMAGE} alt={"BG_IMAGE"} />
      <MiddleSection />
    </Flex>
  );
}
