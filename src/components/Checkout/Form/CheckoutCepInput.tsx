import { InputLeftAddon, FormControl, Icon, FormLabel, Input, InputProps as ChakraInputProps, InputGroup, InputRightElement, Box, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { IconType } from "react-icons/lib";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

import { cpf } from 'cpf-cnpj-validator';

import { useField } from '@unform/core'
import axios from "axios";
import { CheckoutContext } from "../../../contexts/checkoutContext";


interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  targetValue?: string;
  leftText?: string;
  hoverInput?: boolean;
  maskChar?: string;
  mask?: string;
}

export function CheckoutCepInput({name, label, targetValue, placeholder, leftText, hoverInput, maskChar, mask, ...rest}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);
  const [isInputValid, setIsInputValid] = useState<boolean | string>(false);
  const [inputValue, setInputValue] = useState('');
  const [cepLoad ,setCepLoad] = useState(false)
  const [cepInfo ,setCepInfo] = useState<null | boolean | string>(null)


  const { setCepArray } = useContext(CheckoutContext)

  const [filteredError, setFilteredError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleCEP = useCallback(async (cepData: string): Promise<void> => {
    setInputValue(cepData)
    setCepInfo(null)
    setCepArray(null);
    console.log('changed')
    const cepNumber = cepData.replace(/[^\d]+/g, '');
    if (cepNumber.length === 8) {
      try {
        setCepLoad(true);
        const appKey = 'EJybPnLEOekct4fcpjys47ONsNrqPkCs';
        const appSecret = 'dluhaghugfjJ1RnOJ1Ctf82OmKIvaox5C8NffKmjcXqkvq3v';
        const cepApiResponse = await Promise.race([
          axios
            .create({ baseURL: 'https://webmaniabr.com/api/1/cep' })
            .get(`/${cepData}/?app_key=${appKey}&app_secret=${appSecret}`),
        ]);
        

        if (cepApiResponse.data.error) {
          setCepInfo(false)
          setCepArray(null);
          return
        }

        setCepArray(cepApiResponse.data);
        setCepInfo(true);
      } catch {
        setCepInfo(false)
        setCepArray(null);
      } finally {
        setCepLoad(false);
      }
    }
  }, []);

  useEffect(() => {
    setFilteredError(error)
  }, [error])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const onInputFocus = () => {
    setIsFocus(true)
    setInputStatus(false)
  }

  const onInputBlur = (value) => {
    setIsFocus(false)
    if (value.length === 0) {
      setInputStatus(false)
      return
    }
    setInputStatus(true)
  }

  return (
    <Box mb={6} >
    <FormControl display={hoverInput ? "flex" : "initial"} position="relative" mt={3}>
      {(label && !hoverInput) && <FormLabel> {label} </FormLabel> }
      {(label && hoverInput) &&
      <FormLabel
        position="absolute"
        top={isFocus || inputValue.length > 0 ? "-0.6rem" : "0.6rem" }
        bg="transparent"
        px={2}
        zIndex={2}
        ml={2}
        fontSize={isFocus || inputValue.length > 0 ? 11 : 13}
        color={isFocus || inputValue.length > 0 ? "gray.400" : "gray.200"}
      >
        {label}
      </FormLabel> }
    
        <InputGroup mt={isFocus || inputValue.length > 0 ? 2 : 0}>
          {leftText && <InputLeftAddon children={leftText} bg="#f9f9f9f9"/> }
          <Input
            {...rest}
            ref={inputRef}
            mx={1}
            // isInvalid={inputStatus !== false && typeof isInputValid === 'string'}
            mask={mask ? mask : ""}
            maskChar={maskChar ? maskChar : ""}
            value={inputValue}
            onChange={e => handleCEP(e.currentTarget.value)}
            onBlur={e => onInputBlur(e.currentTarget.value)}
            onFocus={() => onInputFocus()}
            py={hoverInput ? 5 : 0}
            borderColor={cepInfo === true  ? "green.500" : "gray.100"}
            mb={0}
            name={name}
            placeholder={placeholder && !hoverInput ? placeholder : ""}
            _placeholder={{color: "gray.200"}}
            fontSize={14}
          />
          <InputRightElement children={
            <>
            {cepInfo === true && <Icon as={FaCheck} fontSize={13} color="green.500" />}
            {cepInfo === false && <Box><Icon as={FiAlertTriangle} color="red.500" /></Box>}
            {cepLoad && <Box><Spinner size="sm" color="green.500" /></Box>}
            </>
          } />
          
        </InputGroup>
        
        
    </FormControl>
    {cepInfo === false &&
          <Text mt={1} ml={4} color="red.500" fontSize={13}>
            cep inválido
          </Text>
    }
    </Box>
  );
}