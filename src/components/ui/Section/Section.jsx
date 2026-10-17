export default function Section({
  as: Component = "section",
  children,
  className = "",
  containerClassName = "container",
  containerStyle,
  sectionRef,
  ...props
}) {
  return (
    <Component ref={sectionRef} className={`section ${className}`.trim()} {...props}>
      <div className={containerClassName} style={containerStyle}>
        {children}
      </div>
    </Component>
  );
}
