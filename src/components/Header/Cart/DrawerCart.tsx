import { Flex, Box, Spinner, DrawerFooter, Button, Heading, Stack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text } from "@chakra-ui/react";
import { useCartDrawer } from "../../../contexts/cartDrawerContext";
import { useCommerce, Cart } from 'nextjs-commerce-shopify'


import { CartItem } from "./CartItem";
import { ProductsContext } from "../../../contexts/productsContext";
import { useContext, useEffect } from "react";
import { formatPrice } from "nextjs-commerce-shopify/dist/use-price";
import { CartContext } from "../../../contexts/cartContext";



export function DrawerCart() {

  const {changeCartPriceLoad, cartPriceLoad} = useContext(CartContext)

  const {isOpen, onClose} = useCartDrawer();
  const { checkout } = useCommerce()


  useEffect(() => {
    if (checkout?.lineItems.length < 1 && isOpen ) {
      
      onClose()

    }

    changeCartPriceLoad(false)
  }, [checkout])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="sm" >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader alignItems="center"><Heading fontSize={25}>Carrinho</Heading></DrawerHeader>
          <DrawerBody  px={3}>
            <Stack alignItems="center" spacing={4} justifyContent="flex-start" minH="100%">
                {checkout?.lineItems.map((product: any) => {
                  return <CartItem key={product.id} product={product} />
                })}
            </Stack>            
          </DrawerBody>
          <DrawerFooter flexDir="column">

            <Flex textAlign="center" alignItems="flex-end" cursor="pointer" color="gray.400" _hover={{ color: "gray.700" }}>
              Subtotal: 
              {!cartPriceLoad ? (
                <Text ml={2} as="span" fontWeight="semibold" fontSize={18} cursor="pointer" color="primary.500" >
                  {formatPrice({amount: Number(checkout?.subtotalPrice ?? 0), currencyCode: "BRL", locale: "pt-BR"})}
                </ Text>
              ) : (
                <Box position="relative" display="inline" ml={2} as="span" fontWeight="semibold" fontSize={18} cursor="pointer" color="primary.500" >
                  <Text opacity={0.2}>
                    {formatPrice({amount: Number(checkout?.subtotalPrice ?? 0), currencyCode: "BRL", locale: "pt-BR"})}
                  </Text>                  
                  <Flex alignItems="center" justifyContent="center" position="absolute" width="100%" height="100%" top="0" left="0">
                    <Spinner ml={2} color="primary.500" size="sm"/>
                  </Flex>
                </ Box>
              )}
            </Flex>
            <Button size="lg" my={4} w="100%" colorScheme="green" borderRadius="full">
              Checkout
            </Button>
            <Text onClick={onClose} cursor="pointer" color="gray.400" _hover={{ color: "gray.700" }}>continuar comprando</Text>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}