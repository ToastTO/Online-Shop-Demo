import { BsBag } from "react-icons/bs";
import { Box, HStack, Text } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  // define a list of links
  const links = ["Home", "About", "Shop"];

  return (
    <>
      <HStack
        as="nav"
        display="flex"
        justifyContent="space-between"
        px="5"
        py="2"
        h="15"
        borderBottomWidth="1px"
        borderBottomColor="gray.10"
      >
        <Text
          fontSize="2xl"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="3"
          cursor="menuitem"
        >
          <BsBag /> Online Shop DEMO
        </Text>
        <Box as="ul">
          {links.map((link, index) => (
            <NavbarLink key={index} name={link} />
          ))}
        </Box>
      </HStack>
    </>
  );
};

export default Navbar;
