import { Link } from "react-router-dom";

export function TrajectoryArrow({ className = "button-icon" }) {
  return (
    <svg className={className} viewBox="0 0 15 16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="m8.289 8.664-6.25 6.25A.94.94 0 0 1 .71 13.586L6.297 8 .712 2.414A.94.94 0 0 1 2.04 1.086l6.25 6.25a.937.937 0 0 1-.001 1.328Zm6.25-1.328-6.25-6.25A.94.94 0 0 0 6.96 2.414L12.547 8 6.96 13.587a.94.94 0 0 0 1.328 1.328l6.25-6.25a.938.938 0 0 0 0-1.328v-.001Z"
      />
    </svg>
  );
}

const variantClassMap = {
  primary: "button button--primary btn-primary",
  secondary: "button button--secondary btn-secondary",
  outline: "button button--outline btn-outline",
  "outline-light": "button button--outline-light",
  white: "button button--white cta_button",
  dark: "button button--dark",
  ghost: "button button--ghost btn-ghost",
  whatsapp: "button button--whatsapp btn-whatsapp",
  telegram: "button button--telegram btn-telegram",
  shiny: "button button--primary shiny-cta",
};

const sizeClassMap = {
  sm: "button--sm",
  md: "button--md",
  lg: "button--lg",
};

export default function Button({
  as,
  children,
  className = "",
  variant = "primary",
  size = "md",
  pill = false,
  fullWidth = false,
  showArrow,
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  to,
  href,
  target,
  rel,
  type,
  ...props
}) {
  // Determine rendered component
  let Component = as;
  if (!Component) {
    if (to) {
      Component = Link;
    } else if (href) {
      Component = "a";
    } else {
      Component = "button";
    }
  }

  // Determine button type when rendering a native button
  const computedType = Component === "button" ? type || "button" : undefined;

  // Safe external links
  const computedRel = target === "_blank" ? rel || "noreferrer noopener" : rel;

  // Compute CSS classes
  const variantClass = variantClassMap[variant] || variantClassMap.primary;
  const sizeClass = sizeClassMap[size] || sizeClassMap.md;
  const pillClass = pill ? "button--pill" : "";
  const fullWidthClass = fullWidth ? "button--full-width" : "";
  const loadingClass = loading ? "is-loading" : "";

  const combinedClassName = [
    variantClass,
    sizeClass,
    pillClass,
    fullWidthClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  // Show arrow: default true if no custom icon passed, or if explicitly showArrow === true
  const shouldShowArrow = showArrow !== undefined ? showArrow : !icon && !loading && variant !== "ghost";
  const isShiny = variant === "shiny";

  return (
    <Component
      className={combinedClassName}
      to={to}
      href={href}
      target={target}
      rel={computedRel}
      type={computedType}
      disabled={Component === "button" ? disabled || loading : undefined}
      aria-disabled={disabled || loading ? true : undefined}
      {...props}
    >
      {loading && <span className="button__spinner" aria-hidden="true" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="button-icon button-icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      {isShiny ? <span>{children}</span> : children}
      {!loading && icon && iconPosition === "right" && (
        <span className="button-icon button-icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
      {shouldShowArrow && <TrajectoryArrow />}
    </Component>
  );
}
