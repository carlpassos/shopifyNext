import { Icon, useToast, Flex } from '@chakra-ui/react'
import { useCommerce } from 'nextjs-commerce-shopify';
import { useEffect, useState } from 'react';
import {RiShoppingCartLine} from 'react-icons/ri'
import { useCartDrawer } from '../../contexts/cartDrawerContext';
import { DrawerCart } from './Cart/DrawerCart';


export function Cart() {

  const [checkoutItensQtd, setCheckoutItensQtd] = useState(0)

  const toast = useToast();

  const { checkout } = useCommerce()

  const { onOpen } = useCartDrawer();

  useEffect(() => {
    if (checkout) {
      const lineItemQuantity = checkout.lineItems.reduce(function(acumulador, lineItem) {
        const qtd = lineItem.quantity
        return acumulador + qtd;
      }, 0)

      setCheckoutItensQtd(lineItemQuantity)
    }
    
  }, [checkout])

  

  return (
    <>
    <Flex
      position="relative"
      cursor="pointer"
      onClick={checkout?.lineItems.length > 0 ? onOpen : () => {
        if (!toast.isActive('cart-toast')) {
          toast({
            id: 'cart-toast',
            title: "Nenhum produto no Carrinho",
            description: "Adicione um produto agora mesmo!",
            status: "warning",
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          })
        }
      } }
    >
      {checkout?.lineItems.length > 0 && (
        <Flex
        position="absolute"
        top="-8px"
        right="-10px"
        borderRadius="full"
        bg="red.500"
        color="white"
        w="20px"
        h="20px"
        fontSize={13}
        fontWeight="bold"
        alignItems="center"
        justifyContent="center"
      >
        {checkoutItensQtd}
      </Flex>
      )}
      
      <Icon
                      // onClick={() => {
                      //   if (!toast.isActive('cart-toast')) {
                      //     toast({
                      //       id: 'cart-toast',
                      //       title: "Nenhum produto no Carrinho",
                      //       description: "Adicione um produto agora mesmo!",
                      //       status: "warning",
                      //       duration: 4000,
                      //       isClosable: true,
                      //       position: 'top-right',
                      //     })
                      //   }
                      // }
                      // }
                      
                      as={RiShoppingCartLine}
                      fontSize="22"
                      color="primary.500"
                      cursor="pointer"
                    />
      </Flex>
      <DrawerCart />
    </>
  )
}