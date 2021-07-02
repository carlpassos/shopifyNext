import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

export function StoreDescription() {
  return (
    <Flex as="section" bg="white" justifyContent="center" py="10">
      <Stack justifyContent="center" alignItems="center" maxW="600px" textAlign="center">
        <Heading fontSize="25" textTransform="uppercase">{process.env.STORE_NAME}</Heading>
        <Text color="gray.400">
          Nós construímos nossa reputação fazendo nosso trabalho com excelência.
          Tornamos sua experiência de compra online fácil e agradável!
        </Text>
      </Stack>
    </Flex>
  )
}