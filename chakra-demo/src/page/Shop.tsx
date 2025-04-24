import { useEffect } from "react";
import ShopItemCard from "../components/ShopItemCard.tsx";
import {
  Box,
  Text,
  Container,
  SimpleGrid,
  VStack,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import useProductStore from "../../store/product.ts";
import ProductUpdateDialog from "../components/ProductUpdateDialog.tsx";
import DeleteAllWarning from "../components/DeleteAllWarning.tsx";

interface ShopProps {
  editMode: boolean;
}

const Shop = (props: ShopProps) => {
  const { editMode } = props;
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // console.log(products, products.length);

  function pageTitle() {
    return (
      <Box w={"100%"} display="flex" justifyContent="space-between">
        <Text fontSize="2xl" mb="8" alignSelf={"flex-start"}>
          {editMode ? "Edit Product Mode" : "Product Available"}
        </Text>

        {editMode ? (
          <Box>
            <ProductUpdateDialog />
            <DeleteAllWarning />
          </Box>
        ) : (
          <NavLink to="Cart">
            <Button mr="5">Shopping Cart</Button>
          </NavLink>
        )}
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py="12">
      <VStack>
        {pageTitle()}
        {products.length === 0 ? (
          <Text color="gray.500" textAlign={"center"} fontSize="lg">
            O... you have no Product! <br />
            Click the "Add Product" button to create one!
          </Text>
        ) : null}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w="100%">
          {products.map((item) => (
            <ShopItemCard key={item._id} data={item} editMode={editMode} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Shop;
