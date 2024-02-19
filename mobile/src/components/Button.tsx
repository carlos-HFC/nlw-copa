import { Button as ButtonWrapper, Text, IButtonProps } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type?: "primary" | "secondary";
}

export function Button(props: Readonly<ButtonProps>) {
  return (
    <ButtonWrapper
      w={"full"}
      h={14}
      rounded={"sm"}
      fontSize={"md"}
      textTransform={"uppercase"}
      bg={props.type === 'secondary' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: props.type === 'secondary' ? 'red.400' : 'yellow.600'
      }}
      _loading={{
        _spinner: { color: "black" }
      }}
      {...props}
    >
      <Text
        fontSize={"sm"}
        fontFamily={"heading"}
        color={props.type === 'secondary' ? "white" : "black"}
      >
        {props.title}
      </Text>
    </ButtonWrapper>
  );
}