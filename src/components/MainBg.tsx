import { Flex, Text, Box } from "@chakra-ui/layout";
import BG_IMAGE from "../assets/images/bg1.png";

import NFT_CARDS_IMAGE from "../assets/images/visual_NFT-card_all.png";
import NFT_CARDS_MOBILE_IMAGE from "../assets/images/visual_NFT-card_all@2x_tablet.png";

import CARD_IMAGE from "../assets/images/Card-all.png";
import CARD_MOBILE_IMAGE from "../assets/images/Card-all-mobile.png";

import MERCHANDISE_IMAGE from "../assets/images/merchandise.png";
import LINE_IMAGE from "../assets/images/line.png";

import Image from "next/image";
import useMediaView from "../hooks/useMediaView";

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
  const { pcView, tableView, mobileView } = useMediaView();

  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Text fontSize={22} fontWeight={600} mb={"60px"}>
        100 limited NFTS
      </Text>
      <Image src={pcView ? CARD_IMAGE : CARD_MOBILE_IMAGE} alt={"CARD_IMAGE"} />
      <Text color={"#dddddd"} w={"400px"} mt={"45px"}>
        100 NFTs will be issued, each featuring a unique design <br />
        and serial number. <br /> You can apply this NFT as your profile picture
        on the Tokamak webpage (coming soon).
      </Text>
    </Flex>
  );
};

const MiddleSection = () => {
  const { pcView, tableView, mobileView } = useMediaView();

  return (
    <Flex
      flexDir={pcView ? "row" : "column"}
      w={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"120px"}
      mt={"212px"}
      rowGap={pcView ? undefined : "120px"}
    >
      <SectionNFT />
      {pcView && <Image src={LINE_IMAGE} alt={"LINE_IMAGE"} />}
      <SectionMerchandise />
    </Flex>
  );
};

export function MainBg() {
  const { pcView, tableView, mobileView } = useMediaView();
  return (
    <Flex w={"100%"} flexDir={"column"} pos={"relative"}>
      <Image src={BG_IMAGE} alt={"BG_IMAGE"} />
      <Flex
        pos={"absolute"}
        mt={"217px"}
        justifyContent={"center"}
        textAlign={"center"}
        w={"100%"}
        flexDir={"column"}
      >
        <Text
          fontSize={[39, 39, 65]}
          fontWeight={"bold"}
          h={["", "59px", "99px"]}
        >
          Only 100 Limited edition NFTs
        </Text>
        <Text fontSize={[15, 15, 20]} opacity={0.8}>
          to celebrate the opening of Titan L2{" "}
        </Text>
      </Flex>
      <Flex
        pos={"absolute"}
        mt={["", "356px", "455px"]}
        w={"100%"}
        justifyContent={"center"}
      >
        <Image
          src={pcView ? NFT_CARDS_IMAGE : NFT_CARDS_MOBILE_IMAGE}
          alt={"NFT_CARDS_IMAGE"}
        />
      </Flex>
      <MiddleSection />
    </Flex>
  );
}
