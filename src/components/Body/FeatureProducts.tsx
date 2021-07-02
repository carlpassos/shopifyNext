import { Badge, Box, Button, Flex, Grid, Heading, HStack, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/productsContext";
import { formatPrice } from '../../utils/format'
import { usePrice, useAddItem } from 'nextjs-commerce-shopify';


export function FeatureProducts() {
  const { products } = useContext(ProductsContext);

  const truncate = (text: string, length: number) => {
    if (text.length > length) {
      return text.substr(0, length)+"..."
    }

    return text
  }


  return (
    <Stack alignItems="center" py="10" spacing="20" px={["5", "5", "10"]} maxW="1200px" alignSelf="center">
      <Heading fontSize="25">PRODUTOS EM DESTAQUE</Heading>
      <Grid
          maxW="100%" gap="5" rowGap="8" templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
      >
        {products?.slice(0, 8).map(product => {

            const AddToCartButton = ({ variantId, quantity }) => {
              const addItem = useAddItem();

              const addToCart = async () => {
                await addItem({
                  variantId,
                  quantity
                });
              };

              return <Button onClick={addToCart} bg="gray.50" color="gray.300" transform="background 0.4s, color 0.4s">Compra Rápida</Button>;
            };

          const productPrice = usePrice({
            amount: product.variants[0].price
          });

          const comparePrice = usePrice({
            amount: product.variants[0].compareAtPrice
          });

          const finalPrice = usePrice({
            amount: product.variants[0].compareAtPrice - product.variants[0].price
          })

          return (
           <Flex
              key={product.id}
              minH="420px"
              bg="white"
              borderRadius="5px"
              boxShadow="md"
              border="1px solid"
              borderColor="transparent"
              p="5"
              flexDir="column"
              justifyContent="space-between"
              transition="transform 0.4s, border-color 0.5s"
              _hover={{
                borderColor: "primary.500",
                transform:
                "scale(1.08)",
                Button: {
                    bg: "primary.500",
                    color: "white"
                }
              }}
            >
              <Box textAlign="center" position="relative">
                {!!product.variants[0].compareAtPrice && <Badge  position="absolute" left="3" top="4" bg="primary.500" color="white" fontSize="0.85em" p="1" opacity="0.9">Economize {finalPrice.price}</Badge> } 
                <Image
                  fit="cover"
                  h="220px"
                  w="100%"
                  src={product.images[0].src}
                  alt={product.title}
                  borderRadius="5px"
                />
                <Heading as="h2" fontSize="16" fontWeight="500" mt="5" >{truncate(product.title, 40)}</Heading>
              </Box>

              <Stack >
                <HStack textAlign="center" justifyContent="center">

                  {!!product.variants[0].compareAtPrice ? 
                    <><Text color="gray.200" fontSize="0.8rem"><del>{comparePrice.price}</del></Text> <Text color="primary.500" fontWeight="semibold" fontSize="21">{productPrice.price}</Text></> :
                    <Text color="gray.400" fontWeight="semibold" fontSize="21">{productPrice.price}</Text>
                  }
                  {/* <Text><del>R$ 200,00</del></Text> <Text color="primary.500" fontWeight="semibold" fontSize="23">R$ 170,00</Text> */}
                </HStack>
                {/* <Button onClick={() => console.log(product.variants[0].id)} bg="gray.50" color="gray.300" transform="background 0.4s, color 0.4s">Ver Produto</Button> */}
                <AddToCartButton variantId={product.variants[0].id} quantity={1} />
              </Stack>
            </Flex>
          )
        })}
        
        {/* <Flex h="350px" bg="white">
            teste
        </Flex>
        <Flex h="350px" bg="white">
            teste
        </Flex>
        <Flex h="350px" bg="white">
            teste
        </Flex> */}
      </Grid>
    </Stack>
  )
}

