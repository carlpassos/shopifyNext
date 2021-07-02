import { createContext, ReactNode, useState } from "react";


interface ProductsProviderProps {
  children: ReactNode
  products: any[];
}

interface ProductsContextData {
  products: any[];
}



export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children, ...rest }: ProductsProviderProps) {

  const [products, setProducts] = useState([...rest.products])

  return (
    <ProductsContext.Provider value={{
      products
    }}>
      {children}
    </ProductsContext.Provider>
  )  
}