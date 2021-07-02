import { Box, Collapse, Slide, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CheackoutSectionProps {
  children: ReactNode
  status: boolean
  isChecked?: boolean
  isEditable: boolean
}

export function CheckoutSection({ children, status, isEditable, isChecked }: CheackoutSectionProps) {

  const borderColor = isChecked ? "green.500" : "transparent"

  return (
    <Stack
      border="1px solid"
      borderColor={status === true ? "gray.200" : "transparent"}
      // borderColor={status === true ? "gray.200" : borderColor}
      opacity={isEditable === false ? 0.6 : 1}
      p={status === false ? 5 : 3}
      bg="white"
      boxShadow="lg"
      borderRadius="10px"
      width="90vw"

      minH="20px"
      h="auto"
      spacing={5}
    >
      <Collapse startingHeight={30} animateOpacity in={status}>
          {children}
      </Collapse>
    </Stack>
  )
}