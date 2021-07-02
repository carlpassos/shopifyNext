import { Stack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../../contexts/navDrawerContext";
import { MainMenuList } from "./MainMenuList";

export function DrawerMenu() {

  const {isOpen, onClose} = useSidebarDrawer();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader alignItems="center">Menu</DrawerHeader> */}
          <DrawerBody >
            <Stack alignItems="center" spacing="5" justifyContent="center" minH="100%">
              <Heading fontSize="25" my="5">Menu</Heading>
              <MainMenuList/>
            </Stack>            
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}