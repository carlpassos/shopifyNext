import { Button, FormLabel, Input, InputGroup, InputLeftAddon, Icon } from "@chakra-ui/react";
import { CheckoutSection } from "../CheckoutSection";
import { SectionTitle } from "../SectionTitle";
import InputMask from 'react-input-mask'
import { HiCreditCard } from 'react-icons/hi'

import { BsArrowRightShort } from "react-icons/bs"
import { useContext } from "react";
import { CheckoutContext } from "../../../contexts/checkoutContext";

export function PaymentData() {

  const { sectionThreeStatus, sectionOneValidation, isSectionThreeEditable, isSectionThreeChecked } = useContext(CheckoutContext)

  return (
    <CheckoutSection status={sectionThreeStatus} isEditable={isSectionThreeEditable}>
        <SectionTitle sectionNumber={3} status={sectionThreeStatus} icon={HiCreditCard} title="Pagamento" isEditable={isSectionThreeEditable} isChecked={isSectionThreeChecked}>
          Cadastre ou selecione um endereço
        </SectionTitle>

          <form>
            <FormLabel>Cep</FormLabel>
            <Input as={InputMask} mask="99999-999" maskChar="" borderColor="gray.100" mb={3} name="name" placeholder="ex.: 99999-999" _placeholder={{color: "gray.200"}} fontSize={14} />
              <Button disabled onClick={sectionOneValidation} colorScheme="green" bg="green.400" w="100%" mt={5}>
                Continuar <Icon as={BsArrowRightShort} fontSize={30} />
              </Button>
          </form>
      </CheckoutSection>
  )
}