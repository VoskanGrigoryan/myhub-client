import { Button, ButtonProps } from "@mantine/core";

interface MyButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  onClick?: () => void;
  props?: any;
}
const MyButton = ({
  children,
  variant = "filled",
  color = "indigo",
  onClick,
  ...props
}: MyButtonProps) => {
  return (
    <Button variant={variant} color={color} {...props} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MyButton;
