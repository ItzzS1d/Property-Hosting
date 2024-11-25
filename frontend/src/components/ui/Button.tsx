import { type ReactNode, type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

type LinkProps = {
  element: "anchor";
  to: string;
} & ComponentPropsWithoutRef<"a">;

type ButtonProps = {
  element: "button";
} & ComponentPropsWithoutRef<"button">;

type ComponentProps =
  | LinkProps
  | (ButtonProps & {
      children: ReactNode;
    });

const Button = ({ children, ...props }: ComponentProps) => {
  if (props.element === "anchor") {
    return <Link to={props.to}>{children}</Link>;
  }
  return <button {...props}>{children}</button>;
};
export default Button;
