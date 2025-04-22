import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import useProductStore from "../../store/product";
import { useState } from "react";

function DeleteAllWarning() {
  const { deleteAllProducts } = useProductStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  async function handleDeleteAll() {
    const { res, message } = (await deleteAllProducts()) || {
      res: false,
      message: "unknow error",
    };
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

    // close the dialog
    setDialogOpen(false);
  }

  return (
    <Dialog.Root role="alertdialog" open={dialogOpen}>
      <Dialog.Trigger asChild>
        <Button
          colorPalette="red"
          size="sm"
          ml="4"
          onClick={() => setDialogOpen(true)}
        >
          Delete All
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete all
                product from our systems.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleDeleteAll}>
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={() => setDialogOpen(false)} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default DeleteAllWarning;
