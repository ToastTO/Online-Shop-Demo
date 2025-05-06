import { Button, Card, Image, Text, Badge, HStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";
import useProductStore from "../../store/product.ts";
import ProductUpdateDialog from "./ProductUpdateDialog.tsx";
import useShoppingCartStore from "../../store/cart.ts";
import { useState } from "react";
import SpinnerFloat from "./SpinnerFloat.tsx";

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
  const { emptyCart, addToCart, cart } = useShoppingCartStore();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //handle function
  async function deleteHandle(id: string) {
    setLoading(true);
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
    setLoading(false);
  }

  function handleAddToCart() {
    // check product in cart already ?
    let inCart = false;
    cart.map((product) => {
      console.log(product._id, _id);
      if (product._id === _id) inCart = true;
    });

    if (inCart) {
      toaster.create({
        title: data.name + " already in Cart!",
        type: "error",
        duration: 2000,
      });
    } else {
      addToCart(data);
      toaster.create({
        title: data.name + " has added to Cart!",
        type: "info",
        duration: 2000,
      });
    }
  }

  function handleBuyNow() {
    emptyCart();
    addToCart(data);
    navigate("../checkout");
  }

  function footerShopButtons() {
    return (
      <Card.Footer gap="2">
        <Button variant="solid" onClick={handleBuyNow}>
          Buy now
        </Button>
        <Button variant="ghost" onClick={handleAddToCart}>
          Add to cart
        </Button>
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
          disabled={loading}
        >
          {loading ? <SpinnerFloat /> : null}
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
