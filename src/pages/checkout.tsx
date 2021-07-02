import { Button, Flex, FormLabel, Grid, Icon, Img, Input, InputGroup, InputLeftAddon, Stack, Text } from "@chakra-ui/react";
import { CgLock } from "react-icons/cg"
import { BsArrowRightShort } from "react-icons/bs"
import { IoIosPaperPlane } from "react-icons/io"
import { SectionTitle } from "../components/Checkout/SectionTitle";
import { IoMdPerson } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'
import { CheckoutSection } from "../components/Checkout/CheckoutSection";
import { useState } from "react";
import { CheckoutHeader } from "../components/Checkout/CheckoutHeader";
import InputMask from "react-input-mask";
import { PersonalData } from "../components/Checkout/Sections/PersonalData";
import { DeliveryData } from "../components/Checkout/Sections/DeliveryData";
import { PaymentData } from "../components/Checkout/Sections/PaymentData";

type sectionState = "active" | "inactive" | "checked"

export default function Checkout() {

  const [sectionOneStatus, setSectionOneStatus] = useState<sectionState>("active")
  const [sectionTwoStatus, setSectionTwoStatus] = useState<sectionState>("inactive")

  return (
    <Stack minH="100vh" minW="100vw" bg="gray.50" px={3} alignItems="center" fontFamily="Poppins, sans-serif">
      <CheckoutHeader />

      <Flex align="center" color="#02A800" pb={2}>
        <Flex border="1px solid #02A800" w="23px" h="23px" borderRadius="full" mr={1} alignItems="center" justifyContent="center">
          <Icon as={CgLock} fontSize={13}/>
        </Flex>
        <Text fontSize={14}>Ambiente 100% seguro e protegido</Text>
      </Flex>

      <Flex pb={5}>
        <Img src="./assets/logo/armilo_h.svg" alt={process.env.STORE_NAME} minW="180px"  />
      </Flex>

      <Stack spacing={2}>
        <PersonalData />
        <DeliveryData />
        <PaymentData />
      </Stack>

    </Stack>
  )
}