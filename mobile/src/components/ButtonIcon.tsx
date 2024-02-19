import { Fontisto } from '@expo/vector-icons';
import { useTheme } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonIconProps extends TouchableOpacityProps, Pick<React.ComponentProps<typeof Fontisto>, 'name'> {}

export function ButtonIcon(props: ButtonIconProps) {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...props}>
      <Fontisto
        name={props.name}
        color={colors.gray[300]}
        sizes={sizes[6]}
      />
    </TouchableOpacity>
  );
}