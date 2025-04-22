import { useEffect } from "react";
import ShopItemCard from "./ShopItemCard";
import { Box, Text, Container, SimpleGrid, VStack } from "@chakra-ui/react";
import useProductStore from "../../store/product.ts";
import ProductUpdateDialog from "./ProductUpdateDialog.tsx";
import DeleteAllWarning from "./DeleteAllWarning.tsx";

// const test_data = [
//   {
//     _id: "6805db3fc9797fd5752fa268",
//     name: "Test Item 1",
//     price: 450,
//     category: "guitar tap",
//     description: "for testing purpose",
//     createdAt: "2025-04-21T05:44:31.343Z",
//     updatedAt: "2025-04-21T05:44:31.343Z",
//     __v: 0,
//   },
//   {
//     _id: "6805db68c9797fd5752fa26a",
//     name: "Test Item 2",
//     price: 30,
//     category: "guitar tap",
//     description: "for testing purpose",
//     createdAt: "2025-04-21T05:45:12.785Z",
//     updatedAt: "2025-04-21T05:45:12.785Z",
//     __v: 0,
//   },
//   {
//     _id: "6805db74c9797fd5752fa26c",
//     name: "Test Item 3",
//     price: 300,
//     category: "guitar tap",
//     description: "for testing purpose",
//     createdAt: "2025-04-21T05:45:24.082Z",
//     updatedAt: "2025-04-21T05:45:24.082Z",
//     __v: 0,
//   },
//   {
//     _id: "6805db74c9797fd5752fa26c",
//     name: "Test Item 4",
//     price: 300,
//     category: "guitar tap",
//     description: "for testing purpose",
//     createdAt: "2025-04-21T05:45:24.082Z",
//     updatedAt: "2025-04-21T05:45:24.082Z",
//     __v: 0,
//   },
// ];

const test_data_1 = {
  _id: "6805db3fc9797fd5752fa268",
  name: "Test Item 1",
  price: 450,
  category: "guitar tap",
  description: "for testing purpose",
  createdAt: "2025-04-21T05:44:31.343Z",
  updatedAt: "2025-04-21T05:44:31.343Z",
  __v: 0,
};

interface ShopProps {
  editMode: boolean;
}

const Shop = (props: ShopProps) => {
  const { editMode } = props;
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products, products.length);

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
        ) : null}
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
