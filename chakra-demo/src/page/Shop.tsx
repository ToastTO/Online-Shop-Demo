import { useEffect, useState } from "react";
import ShopItemCard from "../components/ShopItemCard.tsx";
import {
  Box,
  Text,
  Container,
  SimpleGrid,
  VStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import useProductStore from "../../store/product.ts";
import ProductUpdateDialog from "../components/ProductUpdateDialog.tsx";
import DeleteAllWarning from "../components/DeleteAllWarning.tsx";
import Error from "@/components/Error.tsx";

interface ShopProps {
  editMode: boolean;
}

const Shop = (props: ShopProps) => {
  const { editMode } = props;
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.log(error);
      } finally {
        console.log("set loading to false");
        setLoading(false);
      }
    };
    // you need it call it ...
    fetch();
  }, []);

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
        {/* in or NOT in edit mode */}
        {loading ? (
          <Spinner m="10" size="xl" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w="100%">
            {products.map((item) => (
              <ShopItemCard key={item._id} data={item} editMode={editMode} />
            ))}
          </SimpleGrid>
        )}
        {/* NOT in edit mode */}
        {products.length === 0 && !editMode && !loading ? <Error /> : null}
        {/* in edit mode */}
        {products.length === 0 && editMode && !loading ? (
          <Text color="gray.500" textAlign={"center"} fontSize="lg">
            O... you have no Product! <br />
            Click the "Add Product" button to create one!
          </Text>
        ) : null}
      </VStack>
    </Container>
  );
};

export default Shop;
