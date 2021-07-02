import { Button, FormLabel, Input, InputGroup, InputLeftAddon, Icon, Text, Grid } from "@chakra-ui/react";
import { CheckoutSection } from "../CheckoutSection";
import { SectionTitle } from "../SectionTitle";
import InputMask from 'react-input-mask'
import { AiFillHome } from 'react-icons/ai'


import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import axios from "axios";

import { BsArrowRightShort } from "react-icons/bs"
import React, { useCallback, useContext, useRef, useState } from "react";
import { CheckoutContext } from "../../../contexts/checkoutContext";
import { CheckoutInput } from "../Form/CheckoutInput";
import { CheckoutCepInput } from "../Form/CheckoutCepInput";

export function DeliveryData() {

  const { cepName, sectionTwoStatus, sectionTwoValidation, isSectionTwoEditable, isSectionTwoChecked, cepArray } = useContext(CheckoutContext)
  const [allowButton ,setAllowButton] = useState(false)
  const [cepLoad ,setCepLoad] = useState(false)
  const [cepInfo ,setCepInfo] = useState<null | string>(null)

  const formRef = useRef<FormHandles>(null);

  return (
    <CheckoutSection status={sectionTwoStatus} isEditable={isSectionTwoEditable}>
        <SectionTitle sectionNumber={2} status={sectionTwoStatus} icon={AiFillHome} title="Entrega" isEditable={isSectionTwoEditable} isChecked={isSectionTwoChecked}>
          Cadastre ou selecione um endereço
        </SectionTitle>

        <Form ref={formRef} onSubmit={() => {}} >
            <FormLabel marginBottom="0px !important"><Text ml={2} fontSize={12} color="gray.400">Cep</Text></FormLabel>
            <Grid templateColumns="2fr 1fr" alignItems="center">
            <CheckoutCepInput as={InputMask} mask="99999-999" maskChar="" name="cep" placeholder="ex.: 99999-999" />
            {cepArray != null &&
               <Text mb={5} ml={2}>{`${cepArray.cidade}/${cepArray.uf}`}</Text>
            }
            </Grid>
            {cepArray !== null &&
            <>
            <CheckoutInput hoverInput name="endereco" defaultValue={cepArray.endereco} label="Endereço" />
            <Grid templateColumns="1.3fr 3fr">
            <CheckoutInput hoverInput name="numero" label="Número" />
            <CheckoutInput hoverInput name="bairro" defaultValue={cepArray.bairro}  label="Bairro" />
            </Grid>
            <CheckoutInput hoverInput name="complemento" label="Complemento (não obrigatório)" />
            <CheckoutInput hoverInput name="destinatario" defaultValue={cepName} label="Destinatário" />
            </>
            }
            <Button disabled={!allowButton} onClick={sectionTwoValidation} colorScheme="green" bg="green.400" w="100%" mt={5}>
              Continuar <Icon as={BsArrowRightShort} fontSize={30} />
            </Button>
        </Form>
        {console.log(cepArray)}
      </CheckoutSection>
  )
}