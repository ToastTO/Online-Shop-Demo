import { Button, Card, Image, Text, Badge, HStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import useProductStore from "../../store/product.ts";
import ProductUpdateDialog from "./ProductUpdateDialog.tsx";

export interface dataObject {
  name: string;
  price: number;
  _id: string;
  category?: string;
  description?: string;
  imageUrl?: string;
}

interface ShopItemCardProps {
  data: dataObject;
  editMode: boolean;
}

function ShopItemCard(props: ShopItemCardProps) {
  let { data, editMode } = props;
  let { name, price, _id, category, description, imageUrl } = data;

  const { deleteProduct } = useProductStore();

  //handle function
  async function deleteHandle(id: string) {
    console.log("deleteHandle, id: ", id);
    const { res, message } = (await deleteProduct(id)) || {
      res: false,
      msg: "know error",
    };
    // console.log("deleteHandle, res: ", res, ", msg: ", message);
    if (res) {
      toaster.create({
        title: message,
        type: "success",
        duration: 5000,
      });
    } else {
      toaster.create({
        title: message,
        type: "error",
        duration: 5000,
      });
    }
  }

  function footerShopButtons() {
    return (
      <Card.Footer gap="2">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button>
      </Card.Footer>
    );
  }

  function footerEditButtons() {
    return (
      <Card.Footer gap="2">
        <ProductUpdateDialog data={data} />
        <Button
          onClick={() => deleteHandle(_id)}
          colorPalette={"red"}
          variant="solid"
        >
          Delete
        </Button>
      </Card.Footer>
    );
  }

  return (
    <Card.Root
      // maxW="xs"
      overflow="hidden"
      _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
      transition="all 0.2s"
      key={_id}
    >
      <Image src={imageUrl} />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <HStack mt="4">
          <Badge>{category}</Badge>
        </HStack>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${price}
        </Text>
      </Card.Body>
      {editMode ? footerEditButtons() : footerShopButtons()}
    </Card.Root>
  );
}

export default ShopItemCard;
