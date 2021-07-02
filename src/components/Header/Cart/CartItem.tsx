import { Grid, Flex, Img, Text, Stack, Button, Icon, useToast, HStack, Tooltip, Box} from "@chakra-ui/react"

import {useAddItem, useRemoveItem, useUpdateItem} from "nextjs-commerce-shopify"

import { TiMinus, TiPlus } from 'react-icons/ti'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useContext, useState } from "react"

import { CartContext } from "../../../contexts/cartContext"


interface CartItemProps {
  product: any
}

export function CartItem({product}: CartItemProps) {

  const [itemQuantity, setItemQuantity] = useState(product.quantity)
  const [removed, setRemoved] = useState(false)
  const { changeCartPriceLoad } = useContext(CartContext)

  const toast = useToast()

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const addItem = useAddItem()
  const removeItem = useRemoveItem()


    const updateItem = useUpdateItem(product);
  
    const updateQuantity = async (quantity) => {
      changeCartPriceLoad(true)

      // if (!toast.isActive(`cart-update-toast-${product.id}`)) {
      //   toast({
      //     id: `cart-update-toast-${product.id}`,
      //     title: `Produto Atualizado com sucesso`,
      //     description: `${String(truncateString(product.title, 40))}`,
      //     status: "info",
      //     duration: 4000,
      //     isClosable: true,
      //     position: 'top',
      //   })
      // }

      setItemQuantity(quantity)
      const val = quantity;
      await updateItem({ quantity: val });
    }

  const removeFromCart = async (id: string) => {

    setRemoved(true);
    
    if (!toast.isActive('cart-remove-toast')) {
      toast({
        id: 'cart-remove-toast',
        title: "Produto Removido do carrinho",
        description: `${String(truncateString(product.title, 40))}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    }

    await removeItem({ id }).catch(err => console.log(id, err))
  };

  return (
    <>
    {!removed && (
      <Grid
        borderRadius="full"
        key={product.id}
        templateColumns="0.6fr 1.5fr 1fr"
        gap={4}
        alignItems="center"
        bgGradient="linear( to-r, secondary.200, white)"
        p={2}
      >
        <Img src={product.variant.image.src} alt={product.title} borderRadius="full" border="3px solid" borderColor="primary.200"  />
      <Text color="gray.600">{String(truncateString(product.title, 30))}</Text>
      <Stack spacing={0}>
        <Flex justifyContent="space-between" alignItems="center" position="relative" h="33px">
          <Button
            onClick={() => {
              itemQuantity === 1 ?
              removeFromCart(product.id) :
              updateQuantity(itemQuantity - 1)
            }}
            cursor="pointer"
            border="1px"
            borderColor="gray.300"
            borderRight="none"
            bg="transparent"
            color="gray.700"
            borderRadius="30px 0 0 30px"
            h="100%"
            size="sm"
            w={5}
            _hover={{ color: "primary.500" }}
            _active={{}}
          >
            {itemQuantity === 1 ? <Icon as={FiTrash2} /> : <Icon as={TiMinus} />}
          </Button>
          <Flex bg="transparent" borderTop="1px" borderBottom="1px" color="gray.700" alignItems="center" justifyContent="center" py={1} borderColor="gray.300" flex="1" height="100%">
          {itemQuantity}
          </Flex>
          <Button
            onClick={() => updateQuantity(itemQuantity + 1)}
            border="1px"
            borderColor="gray.300"
            color="gray.700"
            bg="transparent"
            cursor="pointer"
            borderRadius="0 30px 30px 0"
            borderLeft="none"
            h="100%"
            size="sm"
            w={5}
            _hover={{ color: "primary.500"}}
            _active={{}}
          >
            <Icon as={TiPlus} />
          </Button>
        </Flex>
        <HStack alignItems="center" justifyContent="center" spacing={5}>
          {itemQuantity !== 1 &&
            <Tooltip
              label="Excluir produto"
              bg="black"
              hasArrow
              placement="left"
              p={2}
              borderRadius="5px"
              color="white"
              mt={3}
            >
              <Flex height="30px" alignItems="center" justifyContent="center">
                <Text
                  cursor="pointer"
                  transition="color 0.4s"
                  _hover={{
                  color:
                  "red.500",}}
                  onClick={() =>
                  removeFromCart(product.id)}
                  textAlign="center"
                  pt={1}
                  h="23px"
                  colorScheme="transparent"
                  color="gray.300"
                  fontWeight="normal"
                  fontSize={18}
                >
                  <Icon as={FiTrash2} />
                </Text>
              </Flex>
            </Tooltip>
          }


            <Tooltip
              label="Editar produto"
              bg="black"
              hasArrow
              placement="left"
              p={2}
              borderRadius="5px"
              color="white"
              mt={3}
            >
                <Flex height="30px" alignItems="center" justifyContent="center">

                  <Text
                    cursor="pointer"
                    transition="color 0.4s"
                    _hover={{
                    color:
                    "primary.500",}}
                    onClick={() =>
                    removeFromCart(product.id)}
                    textAlign="center"
                    pt={1}
                    h="23px"
                    colorScheme="transparent"
                    color="gray.300"
                    fontWeight="normal"
                    fontSize={18}
                  >
                
                  <Icon as={FiEdit} />
                </Text>
              </Flex>
            </Tooltip>
          </HStack>

        
        
      </Stack>
    </Grid>
    )}
    </>
  )
}