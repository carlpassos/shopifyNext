import { client } from '../utils/shopify';
import { Flex } from "@chakra-ui/layout";
import { Body } from "../components/Body";
import { Header } from "../components/Header";

import {useCommerce, getAllProducts, getAllCollections} from 'nextjs-commerce-shopify';

import { ProductsProvider } from '../contexts/productsContext';
// import Cookies from "cookies";

export default function Home({ retreiveCheckout, products }: any) {

  // const [cookies, setCookie] = useCookies(['cart']);

  const { checkout, shop } = useCommerce()


  return (
    <ProductsProvider products={products}>
      <Flex w='100vw' h='100vh' alignItems="center" flexDirection="column">
        
        <Header />
        <Body />

      </Flex>
    </ProductsProvider>
  )
}

export async function getServerSideProps({req, res}) {

  try {
    const products = await getAllProducts({
      domain: process.env.SHOPIFY_DOMAIN,
      token: process.env.SHOPIFY_TOKEN,
    })

    const collections = await getAllCollections({
      domain: process.env.SHOPIFY_DOMAIN,
      token: process.env.SHOPIFY_TOKEN,
    })
  

  // const cookies = new Cookies(req, res)

  // const products = await client.product.fetchAll()
  // // const retreiveCheckout = await client.checkout.fetch(JSON.stringify(cookies.get('cart')))
  // const productsData = JSON.parse(JSON.stringify(products))



  return { props: { products, collections } }

} catch {
  err => { console.log(err)}
  return { props: { } }
}
}
