/*
file name: ProductUpdateDialog.tsx
create date: 2025-04-21
devloper: Anson Chui

description: 
This component is for update product info in DB. Is a Chakra Dialog component.
for the form mangement used react-hook-form. 

YT for react-hook-form: https://youtu.be/rvQ95VjkJtE?si=zh3lQiuMhw2mloge

update log:
2025-04-21: first created.
*/

import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
// import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ProductInfo } from "../../store/product.ts";
import useProductStore from "../../store/product.ts";
import { toaster } from "./ui/toaster.tsx";
import { useState } from "react";
import { dataObject } from "./ShopItemCard.tsx";

interface ProductUpdateDialogProps {
  data?: dataObject;
}

function ProductUpdateDialog(props: ProductUpdateDialogProps) {
  const { data } = props;
  const b_createProduct = data === undefined ? true : false;

  const _id = data?._id || "fake_id";

  //   if (b_createProduct) {
  //     console.log(
  //       "Componet ProductUpdateDialog, data is undefined. Which is create product button"
  //     );
  //   }

  const [dialogOpen, setdialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductInfo>();

  const { createProduct, updateProduct } = useProductStore();

  function handleUpdateButton() {
    setdialogOpen(true);
    if (!b_createProduct) {
      setValue("name", data?.name || "Name");
      setValue("price", data?.price || 0);
      setValue("category", data?.category || "category");
      setValue("description", data?.description || "description");
    }
  }

  async function saveButtonHandle(inputData: ProductInfo) {
    console.log("saveButtonHandle, FormValues: ", inputData);

    const { res, message, data } = (await (b_createProduct
      ? createProduct(inputData)
      : updateProduct(_id, inputData))) || {
      res: false,
      message: "unknow error",
      data: null,
    };
    console.log("saveButtonHandle, res: ", res, ", message: ", message, data);
    if (res) {
      toaster.create({
        title: message,
        type: "success",
        duration: 5000,
        description: `Product ${data.name} has been ${
          b_createProduct ? "created" : "updated"
        }.`,
      });
      setdialogOpen(false);
      reset();
    } else {
      toaster.create({
        title: "Something went wrong!",
        type: "error",
        duration: 5000,
        description: message,
      });
    }
  }
  // improvement: input field can use .map to loop.
  return (
    <Dialog.Root
      size={"lg"}
      placement={"center"}
      closeOnInteractOutside={false}
      open={dialogOpen}
    >
      <Dialog.Trigger asChild>
        <Button
          colorPalette={b_createProduct ? "green" : "blue"}
          variant={b_createProduct ? "solid" : "subtle"}
          onClick={handleUpdateButton}
        >
          {b_createProduct ? "Add Product" : "Update"}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(saveButtonHandle)} noValidate>
              <Dialog.Header>
                <Dialog.Title>
                  {b_createProduct ? "Create New Product" : "Update Product"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Product Name</Field.Label>
                    <Input
                      placeholder="Name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.price}>
                    <Field.Label>Price</Field.Label>
                    <Input
                      placeholder="Price in HKD"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "Price is required",
                        },
                        min: {
                          value: 0,
                          message: "Price must be greater than 0",
                        },
                        pattern: {
                          // need to convert to number
                          value: /^[0-9]+$/,
                          message: "Price must be a number",
                        },
                      })}
                    />
                    <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.category}>
                    <Field.Label>Category</Field.Label>
                    <Input
                      placeholder="Category"
                      {...register("category", {
                        required: {
                          value: true,
                          message: "Category is required",
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.category?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Input
                      placeholder="Description"
                      {...register("description")}
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    onClick={() => setdialogOpen(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button type="submit">
                  {b_createProduct ? "Create" : "Save"}
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ProductUpdateDialog;
