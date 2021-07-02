import { Alert, AlertIcon, Button, FormLabel, Input, InputGroup, InputLeftAddon, Icon, InputRightElement, Box, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react";
import { CheckoutSection } from "../CheckoutSection";
import { SectionTitle } from "../SectionTitle";
import InputMask from 'react-input-mask'
import { IoMdPerson } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import * as yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { BsArrowRightShort } from "react-icons/bs"
import { useCallback, useContext, useState, useRef } from "react";
import { CheckoutContext } from "../../../contexts/checkoutContext";
import { CheckoutInput } from "../Form/CheckoutInput";
import { cpf } from "cpf-cnpj-validator";
import getValidationErrors from "../../../utils/getValidationErrors";

interface formProps {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export function PersonalData() {

  const [isLoading, setIsLoading] = useState(false)
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState<null | string>(null)

  const formRef = useRef<FormHandles>(null);

  const { sectionOneStatus,
          isSectionOneEditable,
          isSectionOneChecked,
          sectionOneValidation,
        } = useContext(CheckoutContext)

  const handleSubmit = useCallback( 
    async (data: formProps) => {
    setIsLoading(true);
    setCheckoutErrorMessage(null);

    try {

      const cpfNumber = data.cpf.split("").filter(n => (Number(n) || Number(n) == 0)).join("");
      const phoneNumber = data.phone.split("").filter(n => (Number(n) && n !== " " || Number(n) == 0 && n !== " ")).join("")

      let schema = yup.object().shape({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().required("O Email é obrigatório").email("Informe um e-mail valido"),
        cpf: yup.string().required("O CPF é obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Informe um CPF Válido"),
        phone: yup.string().required("O número é obrigatório"),
      });

        await schema.validate({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: phoneNumber,
        }, {
          abortEarly: false,
        });

        const wordArray = data.name.split(' ');
        if (wordArray.length <= 1 || wordArray[1] === "") {
          throw new Error("Você deve informar um sobrenome")
        }

        if (!cpf.isValid(cpfNumber)) {
          throw new Error("Informe um CPF Válido")
        }

        if (phoneNumber.length < 10) {
          throw new Error("Informe um número de celular Válido")
        }



        await sectionOneValidation()
      } catch (err) { 
        if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        }

        if (err.name !== "ValidationError") {
          setCheckoutErrorMessage(err.message)
          return
        }


        setCheckoutErrorMessage("Preencha todos os campos corretamente")
      }
  
    }, [] )

  return (
    <CheckoutSection status={sectionOneStatus} isEditable={isSectionOneEditable} isChecked={isSectionOneChecked}>
        <SectionTitle sectionNumber={1} isEditable status={sectionOneStatus} icon={IoMdPerson} title="Dados pessoais" isChecked={isSectionOneChecked}>
          Solicitamos apenas as informações essenciais para você fazer sua compra.
        </SectionTitle>
        <Form ref={formRef} onSubmit={handleSubmit}>
            <CheckoutInput hoverInput name="name" placeholder="ex.: Carlos Passos" label="Nome Completo" />
            <CheckoutInput hoverInput name="email" placeholder="ex.: carlos@exemplo.com" label="Email" />
            <CheckoutInput as={InputMask} maskChar="" mask="999.999.999-99" hoverInput name="cpf" placeholder="ex.: carlos@exemplo.com" label="CPF" />
            <CheckoutInput as={InputMask} maskChar="" mask="(99) 99999-9999" hoverInput name="phone" placeholder="ex.: (99) 99999-9999" label="Celular" />
            
            {checkoutErrorMessage !== null &&
              <Alert status="error" variant="left-accent" borderRadius="05px" maxW="100%">
                <AlertIcon />
                <Box flex="1" pr={7}>
                  {/* <AlertTitle>Preencha todos os campos</AlertTitle> */}
                  <AlertDescription display="block">
                    {checkoutErrorMessage}
                  </AlertDescription>
                </Box>
                <CloseButton onClick={() => setCheckoutErrorMessage(null)} position="absolute" right="8px" top="8px" />
              </Alert>
            }
            


            <Button type="submit" colorScheme="green" bg="green.400" w="100%" mt={5}>
              Continuar <Icon as={BsArrowRightShort} fontSize={30} />
            </Button>
          </Form>
      </CheckoutSection>
  )
}