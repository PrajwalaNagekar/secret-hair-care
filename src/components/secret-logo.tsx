import logo from "@/assets/secret-logo.png";

type Props = {
  className?: string;
  /** rendered pixel height; width auto */
  height?: number;
  inverted?: boolean;
};

/**
 * Brand logo used across mobile, web, admin and expert experiences.
 * Image is wordmark on a cream background — when placed on a dark surface,
 * pass `inverted` to invert it for proper contrast.
 */
export function SecretLogo({ className = "", height = 28, inverted = false }: Props) {
  return (
    <img
      src={logo}
      alt="Secret Hair Care"
      style={{ height, width: "auto", filter: inverted ? "invert(1) brightness(2)" : undefined }}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}
