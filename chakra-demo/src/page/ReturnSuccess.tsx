import { Container, Text, VStack } from "@chakra-ui/react";

function ReturnSuccess() {
  return (
    <Container maxW="container.xl" py="12">
      <VStack>
        <Text textStyle="6xl" color="gray.400">
          Thank You!
        </Text>
        <Text textStyle="md" color="gray.400">
          We appreciate your business!
        </Text>
      </VStack>
    </Container>
  );
}

export default ReturnSuccess;
