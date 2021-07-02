import { Stack } from "@chakra-ui/core";
import { Badge, Box, Link } from "@chakra-ui/layout";

export function MainMenuList() {
  return(
    <>
      <Link>Início</Link>
      <Link>Produtos</Link>
      <Link>Rastreie sua Encomenda<Badge bgGradient="linear(to-l, secondary.500, primary.500)" color="white" ml="1">Novo</Badge></Link>
      <Link>Perguntas Frequentes</Link>
      <Link>Prazos e Entregas</Link>
      <Link>Trocas e Devoluções</Link>
    </>
  )
}