import { Flex, Heading, HStack, Icon, Stack, Text, Collapse } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { ReactNode, useContext } from 'react'

import { BiCheckCircle } from 'react-icons/bi'

import { IconType } from 'react-icons'
import { CheckoutContext } from '../../contexts/checkoutContext'

interface SectionTitleProps {
  children: ReactNode;
  isEditable: boolean;
  title: string;
  icon: IconType
  status: boolean;
  isChecked: boolean;
  sectionNumber: 1 | 2 | 3;
}

export function SectionTitle({ children, title, icon, status, isChecked, isEditable, sectionNumber }: SectionTitleProps) {
  
  const { handleSection } = useContext(CheckoutContext)

  return (
    <Flex alignItems="center" w="100%" mb={8}>
      {status || !isChecked  ?
      <Flex mr={2} alignSelf="flex-start" mt={0}  p={1.5} bg="gray.500" color="white" borderRadius="full" >
          <Icon as={icon} fontSize={17} />
      </Flex> :
      <Icon as={BiCheckCircle} fontSize={31} color="green.300" mr={2} />
      }

      <Stack spacing={0} color="gray.300">
        <Heading as="h3" fontSize={18} color="gray.500" fontWeight={!status ? "normal" : "medium"}>
          {title}
        </Heading>
        <Collapse startingHeight={0} in={status} animateOpacity>
          <Text fontSize={11} maxW="230px" >
              {children}
          </Text>
        </Collapse>
        
      </Stack>

      {(!status && isEditable) &&
        <Icon
          cursor="pointer"
          onClick={() => handleSection(sectionNumber)}
          as={FiEdit}
          fontSize={20}
          color="gray.300"
          mr={2}
          ml="auto"
          justifySelf="flex-end"
        />
      }
    </Flex>
  )
}