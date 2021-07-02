import { Stack } from "@chakra-ui/react";
import { FeatureProducts } from "./Body/FeatureProducts";
import { StoreDescription } from "./Body/StoreDescription";

export function Body() {
  return (
    <Stack width="100%" flexDir="column" justifyContent="center" spacing="10" mt="10" >
      <StoreDescription />
      <FeatureProducts />
    </Stack>
  )
}