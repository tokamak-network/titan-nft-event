import { gql, useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";

const GET_NFTS = gql`
  query nfts($address: String!) {
    nfts(where: {owner: $address}) {
      id
    }
  }
`;

const Title = () => {
  return (
    <Flex flexDir={"column"} rowGap={"6px"} mb={"30px"}>
      <Text fontSize={40} fontWeight={"bold"}>
        Purchased Order
      </Text>
    </Flex>
  );
};

export function Order() {
  const { data, error, networkStatus } = useQuery(GET_NFTS, {
    variables: {
      address: "0x4389666cA00936Df4E48FB3F5B60cC263A66e8E0",
    },
  });

  console.log("data");
  console.log(data);
  console.log(error);
  console.log(networkStatus);

  return (
    <Flex flexDir={"column"}>
      <Title />
    </Flex>
  );
}
