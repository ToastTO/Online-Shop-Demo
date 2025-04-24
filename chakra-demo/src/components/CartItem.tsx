import { HStack, Text, CloseButton, Box, Center } from "@chakra-ui/react";
import { ProductInfo } from "../../store/product";
import useShoppingCartStore from "../../store/cart";

const TEXT_SIZE = "xl";

interface CartItemPropsInterface {
  product: ProductInfo;
}

const CartItem = (props: CartItemPropsInterface) => {
  const { product } = props;
  const { name, price, _id } = product;
  console.log(product);

  const { removeFromCartById } = useShoppingCartStore();

  function handleCloseButton() {
    removeFromCartById(_id);
  }

  return (
    <HStack
      m="1"
      px="10"
      h="16"
      w="50%"
      justifyContent={"space-between"}
      alignItems="center"
      borderRadius="3xl"
      transition="all 0.3s"
      _hover={{
        backgroundColor: "gray.800",
      }}
    >
      <Text textStyle={TEXT_SIZE}>{name}</Text>
      <HStack alignItems="center">
        <Text textStyle="2xl">{price}</Text>
        <CloseButton ml="5" onClick={handleCloseButton} />
      </HStack>
    </HStack>
  );
};

export default CartItem;
