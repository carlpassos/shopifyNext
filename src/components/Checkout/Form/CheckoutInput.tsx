import { InputLeftAddon, FormControl, Icon, FormLabel, Input, InputProps as ChakraInputProps, InputGroup, InputRightElement, Box, Text } from "@chakra-ui/react";
import { useEffect, useState, useRef, useContext } from "react";
import { IconType } from "react-icons/lib";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

import { cpf } from 'cpf-cnpj-validator';

import { useField } from '@unform/core'
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
  defaultValue?: string;
}

export function CheckoutInput({name, label, targetValue, placeholder, leftText, hoverInput, maskChar, mask, defaultValue, ...rest}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);
  const [isInputValid, setIsInputValid] = useState<boolean | string>(false);
  const [inputValue, setInputValue] = useState(defaultValue ?? '');

  const [filteredError, setFilteredError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, error, registerField } = useField(name);

  const { setCepName } = useContext(CheckoutContext)

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

  const onInputChange = (value) => {
    setInputValue(value)
    setFilteredError(null)

    if (name === "cpf") {
      const numberFilter = value.split("").filter(n => (Number(n) || n == 0)).join("");
      if (numberFilter.length !== 11) {
        setIsInputValid("Complete o CPF")
        return
      }
      if (!cpf.isValid(numberFilter)) {
        setIsInputValid("CPF Inválido")
        return
      }

      setIsInputValid(true)
      setInputStatus(true)
      return
    }

    if (name === "email") {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        setIsInputValid("Informe um e-mail valido")
        return
      }

      setIsInputValid(true)
      setInputStatus(true)
      return
    }

    if (name === "phone") {
      const numberFilter = value.split("").filter(n => (Number(n) || n == 0)).join("");
      if (numberFilter.length <= 10) {
        setIsInputValid("Informe um número valido")
        return
      }

      setIsInputValid(true)
      setInputStatus(true)

    }


    if (name === "name") {
      // const isWordsOnly = value.match(regex);
      const wordArray = value.split(' ');
      if (/[^a-zA-Z *]/.test(value)) {
        setIsInputValid("Informe um nome valido")
        return
      }
      if (wordArray.length <= 1 || wordArray[1] === "") {
        setIsInputValid("Informe o nome e sobrenome")
        return
      }

      setIsInputValid(true)
      setInputStatus(true)
      setCepName(value)
      return
    }


  }

  return (
    <Box mb={7} >
    <FormControl display={hoverInput ? "flex" : "initial"} position="relative" mt={3}>
      {(label && !hoverInput) && <FormLabel> {label} </FormLabel> }
      {(label && hoverInput) &&
      <FormLabel
        position="absolute"
        top={isFocus || inputValue.length > 0 || defaultValue?.length > 0 ? "-1.3rem" : "0.7rem" }
        bg="transparent"
        px={isFocus || inputValue.length > 0 || defaultValue?.length > 0 ? 0 : 2 }
        zIndex={2}
        ml={2}
        fontSize={isFocus || inputValue.length > 0 || defaultValue?.length > 0 ? 11 : 13}
        color={isFocus || inputValue.length > 0 || defaultValue?.length > 0 ? "gray.400" : "gray.200"}
      >
        {label}
      </FormLabel> }
        {console.log(defaultValue)}
        <InputGroup
          mt={isFocus || inputValue?.length > 0 || defaultValue?.length > 0 ? 0 : 0}
        >
          {leftText && <InputLeftAddon children={leftText} bg="#f9f9f9f9"/> }
          <Input
            {...rest}
            ref={inputRef}
            mx={1}
            defaultValue="ok"
            // isInvalid={inputStatus !== false && typeof isInputValid === 'string'}
            mask={mask ? mask : ""}
            maskChar={maskChar ? maskChar : ""}
            value={inputValue}
            onChange={e => onInputChange(e.currentTarget.value)}
            onBlur={e => onInputBlur(e.currentTarget.value)}
            onFocus={() => onInputFocus()}
            py={hoverInput ? 5 : 0}
            borderColor={inputStatus && typeof isInputValid !== "string"  ? "green.500" : "gray.100"}
            name={name}
            placeholder={placeholder && !hoverInput ? placeholder : ""}
            _placeholder={{color: "gray.200"}}
            fontSize={14}
          />
          <InputRightElement hidden={!(inputStatus && isInputValid)} opacity={(inputValue.length > 0 || defaultValue?.length > 0) && inputStatus ? 1 : 0} children={
            (isInputValid === true) ||((typeof inputStatus === 'string') && isInputValid !== false) ?
            <Icon as={FaCheck} fontSize={13} color="green.500" /> :
            <Box><Icon as={FiAlertTriangle} color="red.500" /></Box>
          } />
          
        </InputGroup>
        
        
    </FormControl>
    {(inputStatus !== false && typeof isInputValid === 'string' || filteredError) &&
          <Text mt={1} ml={4} color="red.500" fontSize={13}>
            {filteredError || isInputValid}
          </Text>
    }
    </Box>
  );
}