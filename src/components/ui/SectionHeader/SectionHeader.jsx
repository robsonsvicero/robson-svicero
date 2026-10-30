import React from "react";
import ScrollReveal from "../../ScrollReveal.jsx";

/**
 * Standard Trajectory Section Header component.
 * Reproduces exactly the layout in the Trajectory Design System ("Content" specimen):
 * - Eyebrow / Section Label (uppercase, letter-spacing, blue accent)
 * - Heading (H2 with Tosh A / Tosh Bold, balanced text)
 * - Subtitle / Lede (lead text, muted, balanced reading width)
 *
 * @param {Object} props
 * @param {string} [props.label] - Eyebrow / Section label (e.g. "WHAT WE DO")
 * @param {string|React.ReactNode} props.title - Main H2 title (e.g. "From first idea to long after launch")
 * @param {string|React.ReactNode} [props.subtitle] - Lead paragraph / lede
 * @param {"center"|"left"} [props.align="center"] - Alignment
 * @param {string} [props.id] - Optional ID for the H2
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.cleanLabel=false] - If true, hide decorative bar on label (default in center alignment)
 * @param {boolean} [props.isDark=false] - Theme variant for dark/navy sections
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  id,
  className = "",
  cleanLabel = false,
  isDark = false,
  style = {},
  ...props
}) {
  const alignClass = align === "left" ? "section-header--left" : "section-header--center";
  const darkClass = isDark ? "section-header--dark" : "";
  const cleanLabelClass = cleanLabel ? "section-label--clean" : "";

  return (
    <ScrollReveal
      className={`section-header ${alignClass} ${darkClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {label && (
        <span className={`section-label ${cleanLabelClass}`.trim()}>
          {label}
        </span>
      )}
      {title && (
        <h2 id={id} className="section_heading">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="section_lede">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
