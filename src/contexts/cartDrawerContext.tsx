import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface CartDrawerProviderProps {
  children: ReactNode;
}

type CartDrawerContextData = UseDisclosureReturn

const CartDrawerContext = createContext({} as CartDrawerContextData);

export function CartDrawerProvider({ children }: CartDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <CartDrawerContext.Provider value={disclosure}>
      {children}
    </CartDrawerContext.Provider>
  )
}

export const useCartDrawer = () => useContext(CartDrawerContext);