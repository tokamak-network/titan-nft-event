import { Flex } from "@chakra-ui/layout";
import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { BlockNumber } from "../components/BlockNumber";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { ReadContract } from "../components/ReadContract";
import { ReadContracts } from "../components/ReadContracts";
import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
import { SendTransaction } from "../components/SendTransaction";
import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
import { SignMessage } from "../components/SignMessage";
import { SignTypedData } from "../components/SignTypedData";
import { Token } from "../components/Token";
import { WatchContractEvents } from "../components/WatchContractEvents";
import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
import { WriteContract } from "../components/WriteContract";
import { WriteContractPrepared } from "../components/WriteContractPrepared";
import { Header } from "../components/Header";
import { MainBg } from "../components/MainBg";
import { BuyNFT } from "../components/BuyNFT";

export default function Page() {
  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Flex
        flexDir={"column"}
        w={"1280px"}
        alignItems={"center"}
        rowGap={"183px"}
      >
        <Header />
        <MainBg />
        <BuyNFT />
      </Flex>
    </Flex>
  );
}
