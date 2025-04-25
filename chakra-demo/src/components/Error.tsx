import { EmptyState, VStack } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";

EmptyState;

const Error = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <MdErrorOutline />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Something Went wrong...</EmptyState.Title>
          <EmptyState.Description>
            Please reload to try again
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default Error;
