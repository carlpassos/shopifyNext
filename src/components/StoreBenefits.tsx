import Icon from "@chakra-ui/icon";
import { useBreakpointValue, Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FaTruck } from "react-icons/fa";
import { HiCreditCard } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function StoreBenefits() {

  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  })

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const benefits = [
    {
      id: 'benefitsId-1',
      icon: (FaTruck),
      titulo: "FRETE GRÁTIS",
      descricao: "Frete Grátis por tempo limitado, aproveite agora mesmo!"
    },
    {
      id: 'benefitsId-2',
      icon: (HiCreditCard),
      titulo: "PAGAMENTO SEGURO",
      descricao: "Métodos de pagamentos verificados e 100% seguros."
    },
    {
      id: 'benefitsId-3',
      icon: (FaUserCheck),
      titulo: "GARANTIA DE 7 DIAS",
      descricao: "Respeitamos o direito do consumidor."
    },
  ]

  return (
    <>
    {
      !!isWideVersion ?
   
      <Stack
        justifyContent="space-around"
        flex="1"
        // px="4"
        flexDir={["column",
        "column",
        "row"]}
        alignItems="center"
      >
        {benefits.map(benefit => {
        return(
          <HStack key={benefit.id} cursor="default" color="gray.700" opacity="0.8" transition="opacity 0.4s, transform 0.4s" _hover={{ opacity: "1", transform: "scale(1.07)"}} maxW="30%">
            <Icon as={benefit.icon} fontSize="50" color="primary.500" />
            <Box pl="4" display="flex" flexDir="column" alignItems="flex-start" >
            <Heading fontSize="20" bgGradient="linear(to-l, secondary.500, primary.500)" bgClip="text">{benefit.titulo}</Heading>
              <Text color="gray.400">{benefit.descricao}</Text>
            </Box>
          </HStack>
        )
      })}
      </Stack>

      :

      <Slider {...settings}>
      
      {benefits.map(benefit => {
        return (
          <Flex key={benefit.id} alignContent="center" alignItems="center">    
            <Stack alignItems="center" cursor="default" color="gray.700" opacity="1" transition="opacity 0.4s">
              <Icon as={benefit.icon} fontSize="50"/>
              <Stack alignItems="center" >
                <Heading fontSize="20" bgGradient="linear(to-l, secondary.500, primary.500)" bgClip="text">{benefit.titulo}</Heading>
                <Text color="gray.400">{benefit.descricao}</Text>
              </Stack>
            </Stack>
          </Flex>
        )
      })}

      </Slider>
      }
    </>

  )
}