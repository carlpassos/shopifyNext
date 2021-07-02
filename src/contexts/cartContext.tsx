import { createContext, ReactNode, useState } from "react";


interface CartProviderProps {
  children: ReactNode
}

interface CartContextData {
  cartPriceLoad: boolean;
  changeCartPriceLoad: (status: boolean) => void;
}



export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children, ...rest }: CartProviderProps) {

  const [cartPriceLoad, setCartPriceLoad] = useState(false)

  const changeCartPriceLoad = (status: boolean) => {
    setCartPriceLoad(status)
  }

  return (
    <CartContext.Provider value={{
      cartPriceLoad,
      changeCartPriceLoad
    }}>
      {children}
    </CartContext.Provider>
  )  
}