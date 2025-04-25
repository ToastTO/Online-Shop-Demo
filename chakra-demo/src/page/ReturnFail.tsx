import { Text, Button, Container, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const ReturnFail = () => {
  const navigate = useNavigate();

  function handleTryAgain() {
    navigate("/checkout");
  }
  return (
    <Container maxW="container.xl" py="12">
      <VStack>
        <Text textStyle="6xl" color="gray.400">
          Opss...
        </Text>
        <Text textStyle="md" color="gray.400">
          somethings went wrong, please try again via this link:
        </Text>
        <Button as={"a"} onClick={handleTryAgain}>
          Try again
        </Button>
      </VStack>
    </Container>
  );
};

export default ReturnFail;
