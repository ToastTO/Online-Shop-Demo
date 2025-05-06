import { Box, Center, Spinner } from "@chakra-ui/react";

function SpinnerFloat() {
  return (
    <Box pos="absolute" inset="0">
      <Center h="full">
        <Spinner />
      </Center>
    </Box>
  );
}

export default SpinnerFloat;
