import { Flex, Text, Box } from "@chakra-ui/layout";
import BG_IMAGE from "../assets/images/bg1.png";
import BG_TABLET_IMAGE from "../assets/images/bg1_tablet.png";
import BG_MOBILE_IMAGE from "../assets/images/bg1_mobile.png";

import NFT_CARDS_IMAGE from "../assets/images/visual_NFT-card_all.png";
import NFT_CARDS_TABLET_IMAGE from "../assets/images/visual_NFT-card_all@2x_tablet.png";
import NFT_CARDS_MOBILE_IMAGE from "../assets/images/mobile-visual_NFT-card_all@2x.png";

import CARD_IMAGE from "../assets/images/Card-all.png";
import CARD_MOBILE_IMAGE from "../assets/images/Card-all-mobile.png";

import MERCHANDISE_IMAGE from "../assets/images/merchandise.png";
import LINE_IMAGE from "../assets/images/line.png";

import Image from "next/image";
import useMediaView from "../hooks/useMediaView";

const SectionMerchandise = () => {
  const { mobileView } = useMediaView();

  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Text fontSize={22} fontWeight={600} mb={"60px"}>
        Free Merchandise for Each
      </Text>
      <Flex
        flexDir={"column"}
        justify={"center"}
        alignItems={"center"}
        w={"400px"}
        h={"390px"}
      >
        <Image
          src={MERCHANDISE_IMAGE}
          alt={"MERCHANDISE_IMAGE"}
          style={{
            width: mobileView ? "320px" : "400px",
            height: mobileView ? "235px" : "294px",
          }}
        />
        <Text color={"#aaaaaa"} mt={"12px"} w={"100%"}>
          12 oz. outdoor stainless steel bottle, NFT card (plastic), card
          storage (tin case), T-shirt (front), and T-shirt (back)
        </Text>
      </Flex>
      <Text
        color={"#dddddd"}
        w={mobileView ? "340px" : "400px"}
        mt={["16px", "16px", "44px"]}
      >
        After you purchase an NFT, we’ll ship you a package of merchandise,
        including t-shirts, mugs, keychains, etc., with your purchased NFT image
        imprinted on them.
      </Text>
    </Flex>
  );
};

const SectionNFT = () => {
  const { mobileView } = useMediaView();

  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Text fontSize={22} fontWeight={600} mb={"60px"}>
        100 limited NFTS
      </Text>
      <Box
        w={mobileView ? "320px" : "400px"}
        h={mobileView ? "312px" : "390px"}
      >
        <Image
          src={mobileView ? CARD_MOBILE_IMAGE : CARD_IMAGE}
          alt={"CARD_IMAGE"}
        />
      </Box>
      <Text color={"#dddddd"} w={mobileView ? "340px" : "400px"} mt={"44px"}>
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
      alignItems={pcView ? "flex-start" : "center"}
      px={"120px"}
      mt={["20%", "20%", "52px"]}
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
      <Flex flex={"column"} h={["659px", "579px", "927px"]}>
        <Flex w={"100%"} justifyContent={"center"} alignItems={"baseline"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            mt={["", "", ""]}
            w={["100%", "800px", "100%"]}
            h={["650px", "480px", "768px"]}
            overflow={"hidden"}
          >
            <Image
              src={
                // BG_IMAGE
                pcView
                  ? BG_IMAGE
                  : // : BG_TABLET_IMAGE
                  tableView
                  ? BG_TABLET_IMAGE
                  : BG_MOBILE_IMAGE
              }
              alt={"BG_IMAGE"}
              style={{ objectFit: "fill", width: "100%", height: "100%" }}
            />
          </Flex>
        </Flex>
        <Flex
          pos={"absolute"}
          mt={["160px", "178px", "217px"]}
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
            Only 100 {mobileView && <br />} Limited edition{" "}
            {mobileView && <br />} NFTs
          </Text>
          <Text fontSize={[15, 15, 20]} opacity={0.8}>
            to celebrate the opening of Titan L2{" "}
          </Text>
        </Flex>
        <Flex
          w={"100%"}
          justifyContent={"center"}
          pos={"absolute"}
          mt={["394px", "310px", "455px"]}
        >
          <Flex
            w={["100%", "100%", "1060px"]}
            // h={["265px", "265px", "442px"]}
            justifyContent={"center"}
          >
            <Image
              src={
                pcView
                  ? NFT_CARDS_IMAGE
                  : tableView
                  ? NFT_CARDS_TABLET_IMAGE
                  : NFT_CARDS_MOBILE_IMAGE
              }
              alt={"NFT_CARDS_IMAGE"}
            />
          </Flex>
        </Flex>
      </Flex>
      <MiddleSection />
    </Flex>
  );
}
