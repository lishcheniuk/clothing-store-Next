import Link from "next/link";
import { useRouter } from "next/router";
import { Children } from "react";

export const ActiveLink = ({ children, activeClass, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.toArray(children)[0];
  const childClassName = child.props?.className || "";

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClass}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
