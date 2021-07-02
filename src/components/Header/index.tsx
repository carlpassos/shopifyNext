import { useToast, Flex, Stack, HStack, Icon, Image, Link, Box, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine, RiSearchLine, RiShoppingCartLine } from "react-icons/ri"
import { useSidebarDrawer } from '../../contexts/navDrawerContext'
import { DrawerMenu } from './Menu/DrawerMenu';
import { MainMenuList } from './Menu/MainMenuList';

import { LoremIpsum } from 'react-lorem-ipsum';
import { SearchComponent } from './SearchComponent';
import { StoreBenefits } from '../StoreBenefits';
import { Cart } from './Cart';

export function Header() {
  const toast = useToast();

  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  })

  return (
    <>
      <DrawerMenu />
      <Flex
        alignItems="center"
        justifyContent="center"
        // bgGradient="linear(to-l, secondary.500, primary.500 65%)"
        h="40px"
        w="100%"
        py="2"
        bg="primary.500"
        color="white"
        fontWeight="medium"
        zIndex="2"
      >
        Frete Grátis em Compras Acima de R$150
        </Flex>
        <Flex
          as="header"
          maxW="100%"
          w='100vw'
          mt="5"
          position="relative"
          zIndex="2"
          paddingX={["0",
          "0px",
          "0px"]}
        >
          <Stack w="100%" spacing="10">
            <Flex
              alignSelf="center"
              w="100%"
              maxW="1200px"
              alignItems="center"
              justifyContent={["flex-start",
              "flex-start",
              "center"]}
              position="relative"
            >
              <Image
                src="./assets/logo/armilo.svg"
                maxW={["180px",
                "180px",
                "180px"]}
              />
              <Flex
                position="absolute"
                right="0"
                h="100%"
                alignItems="center"
              >
                <HStack spacing="5" >
                  {!isWideVersion &&
                    <Icon
                      as={RiMenuLine}
                      fontSize="22"
                      color="primary.500"
                      cursor="pointer"
                      onClick={onOpen}
                    />
                  }
                  
                  <SearchComponent />
                  <Cart />
                </HStack>
              </Flex>
            </Flex>
            {isWideVersion && 
              <Flex alignItems="center" justifyContent="center"  w="100%" maxW="1200px" alignSelf="center">
                <HStack spacing="10">
                  <MainMenuList />
                </HStack>
              </Flex>
            }
            
            <Flex
              h={["200px", "200px", "300px", "400px" ]}
              w="100%"
              // borderRadius="10px"
              boxShadow="md"
              position="relative"
              overflow="hidden"
              alignItems="center"
            >
              <Image src="./assets/header.jpeg" w="100%" h="auto" position="absolute"/>
            </Flex> 
            <Flex w="1200px" alignSelf="center">
              <StoreBenefits />
            </Flex>
          </Stack>
          
        </Flex>
        <Box
          w="100%"
          bg="white"
          h={["250px", "250px", "450px"]}
          position="absolute"
        />
      </>
  )
}