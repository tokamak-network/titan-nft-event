import DaumPostcode from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { openPostCode, shippingAddress } from "../recoil/atomState";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Center,
} from "@chakra-ui/react";

export function PostCode() {
  const [isOpen, setIsOpen] = useRecoilState(openPostCode);

  const [shippingAddressData, setShippingAddress] =
    useRecoilState(shippingAddress);

  const onClose = () => {
    setIsOpen(false);
  };

  //address -> baseAddress
  //zonecode -> zipCode
  const onCompletePost = (data: any) => {
    const { address, zonecode } = data;
    setShippingAddress({
      ...shippingAddressData,
      baseAddress: address,
      zipCode: zonecode,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt={"auto"} mb={"auto"}>
        <ModalBody>
          <DaumPostcode onComplete={onCompletePost} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
