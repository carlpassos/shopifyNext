import { Flex, Grid, Icon, Stack, Text } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io"

export function CheckoutHeader() {
  return (
    <Stack
        bg="white"
        w="100%"
        color="white"
        borderRadius="0 0 25px 25px"
        boxShadow="lg"
        px={7}
        py={5}
      >
        <Grid templateColumns="6fr 1fr">
          <Stack spacing={0}>
            <Text color="black" fontWeight="bold" fontSize={21} >6x DE R$ 36,76*</Text>
            <Text color="gray.400" fontSize={10}>OU EM 12X DE R$ 19,46 NO CARTÃO</Text>
          </Stack>
          <Flex
            alignSelf="center"
            justifySelf="center"
            w="40px"
            h="40px"
            borderRadius="full"
            bg="#F5F5F5"
            align="center"
            justify="center"
          >
            <Icon as={IoIosArrowDown} fontSize={28} color="gray.700"/>  
          </Flex>    
        </Grid>

      </Stack>
  )
}