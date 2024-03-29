import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...props }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.800"
      w={"full"}
      h={14}
      px={4}
      borderColor="gray.600"
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        bg: "gray.800",
        borderColor: "gray.600"
      }}
      {...props}
    />
  );
}