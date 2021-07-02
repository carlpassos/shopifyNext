import { Heading, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Icon, Input, Flex, HStack, Box, Image, Badge, Text, IconButton } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { ProductsContext } from '../../contexts/productsContext';

import { formatPrice } from '../../utils/format'

const products = [
  {
    image: "https://cdn.shopify.com/s/files/1/0553/1919/9953/products/Universe_590x.png?v=1617927299",
    title: "PeloClean Portátil®",
    price: "R$ 80,00",
    discountPrice: "R$ 67,80"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0553/1919/9953/products/H6dc08472616c4fa6add1e6426defa902O_590x.jpg?v=1617049308",
    title: "Luva Removedora de Pelos",
    price: "R$ 80,00",
    discountPrice: "R$ 67,80"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0553/1919/9953/products/H53f5797b7b5a476897d2e44daa82ffce8_590x.jpg?v=1617045551",
    title: "Titulo do Produto",
    price: "R$ 80,00",
  },
]

export function SearchComponent() {

  const { products } = useContext(ProductsContext);
  

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [serchProducts, setSearchProducts] = useState(null)
  const [inputValue, setInputValue] = useState(null)

  const handleInputChange = (value: any) => {
    const filteredProducts = products.filter(obj => {
      
      if (
        obj.title &&
        obj.title?.toUpperCase().indexOf(value?.toUpperCase()) >= 0
      ) {
        return true;
      }
      return false
    })

    setSearchProducts(filteredProducts);

    
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  return (
    <>
      <Icon
        as={RiSearchLine}
        onClick={()=> {onOpen();  setInputValue(null)}}
        fontSize="22"
        color="primary.500"
        cursor="pointer"
      />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="4xl"
        
      >
        <ModalOverlay />
        <ModalContent mx={["20", "20", "0"]} py="0.5">
          <ModalCloseButton />
          <ModalBody>
            <HStack maxW="95%" mx="auto" alignItems="center" spacing="3">
            <Icon as={RiSearchLine} />
            <Input onChange={e => {handleInputChange(e.currentTarget.value); setInputValue(e.currentTarget.value)}} placeholder="buscar por um produto..." size="lg" variant="unstyled"/>
            </HStack>
            {inputValue &&
              <Stack
                maxW="95%"
                w="100%"
                mx="auto"
                pt="3"
                mt="3"
                position="absolute"
                maxH="60vh"
                overflow="scroll"
              >
                {serchProducts.map(product => {
                  return (
                    <Flex
                      key={product.id}
                      cursor="pointer"
                      bg="gray.50"
                      borderRadius="5px"
                      p="3"
                      transform="scale(0.97)"
                      justifyContent="space-between"
                      alignItems="center"
                      transition="transform 0.3s, background 0.3s"
                      _hover={{
                        bg: "white",
                        transform: "scale(1)",
                        opacity: "1"
                      }}
                    >
                      <Flex alignItems="center">
                        <Box w="70px" h= "70px" borderRadius="5px" overflow="hidden" position="relative">
                          <Image src={product.images[0].src} w="100%" h="auto" position="absolute"/>
                        </Box>
                        <Box pl="4">
                          <Heading fontSize="lg">
                            {String(truncateString(product.title, 42))}
                            {product.variants[0].compareAtPrice && <Badge bg="primary.500" color="white" ml="2">Economize R$ 00,00</Badge>}
                          </Heading>
                          <HStack spacing="3" color="primary.500" fontWeight="semibold">
                            {product.variants[0].compareAtPrice ? (
                              <>
                                <Text color="gray.300" fontWeight="normal" fontSize="smaller"><del>{product.price}</del></Text>
                                <Text display="flex" alignItems="center"><Text color="gray.300" fontWeight="regular" fontSize="15" marginRight="10px"><del>{formatPrice(product.variants[0].price)}</del></Text> {formatPrice(product.variants[0].compareAtPrice)}</Text>
                              </>
                            ) : <Text>{formatPrice(product.variants[0].price)}</Text> }
                            
                          </HStack>
                        </Box>
                      </Flex>
                      <Button colorScheme="green">Ver Produto</Button>
                    </Flex>
                  )
                    
                })}

              </Stack>
            }
                        
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}