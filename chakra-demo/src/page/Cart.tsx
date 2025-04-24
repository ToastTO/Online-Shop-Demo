import { Box, Text, Button, Container, VStack, HStack } from "@chakra-ui/react";
import useShoppingCartStore from "../../store/cart.ts";
import CartItem from "@/components/CartItem.tsx";
import { toaster } from "@/components/ui/toaster.tsx";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, emptyCart } = useShoppingCartStore();

  let total = 0;

  for (let product of cart) {
    total += product.price;
  }

  function handleEmptyCart() {
    emptyCart();
    toaster.create({
      title: "Cart is empty now~",
      type: "info",
      duration: 2000,
    });
  }

  function pageTitle() {
    return (
      <Box w={"100%"} display="flex" justifyContent="space-between">
        <HStack alignItems="center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {"< "}Back
          </Button>
          <Text ml="10" fontSize="5xl">
            Cart
          </Text>
        </HStack>
        <HStack>
          <Button
            variant="solid"
            onClick={handleEmptyCart}
            disabled={cart.length === 0 ? true : false}
          >
            Empty Cart
          </Button>
          <Button
            ml="11"
            variant="solid"
            colorPalette="blue"
            disabled={cart.length === 0 ? true : false}
          >
            Check out!
          </Button>
        </HStack>
      </Box>
    );
  }
  return (
    <Container maxW="container.xl" py="12">
      {pageTitle()}
      {cart.length === 0 ? (
        <Text color="gray.500" textAlign={"center"} fontSize="lg">
          O... you have nothing in Cart!
        </Text>
      ) : (
        <VStack>
          {cart.map((item) => (
            <CartItem key={item._id} product={item}></CartItem>
          ))}
          <HStack
            m="1"
            px="10"
            h="16"
            w="45%"
            justifyContent={"flex-end"}
            alignItems="center"
          >
            <Text textStyle="4xl">Total</Text>
            <Text ml="10" textStyle="4xl">
              {total}
            </Text>
          </HStack>
        </VStack>
      )}
    </Container>
  );
};

export default Cart;
