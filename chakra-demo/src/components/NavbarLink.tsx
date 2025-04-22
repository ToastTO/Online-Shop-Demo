import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router";

const NavbarLink = (props: { name: String }) => {
  const name = props.name;

  // console.log("/" + name);
  return (
    <>
      <NavLink to={name === "Home" ? "/" : "/" + name}>
        <Button as="li" variant="ghost" mr="5">
          {name}
        </Button>
      </NavLink>
    </>
  );
};

export default NavbarLink;
