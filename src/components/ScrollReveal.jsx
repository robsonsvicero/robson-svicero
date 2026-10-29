import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export default function ScrollReveal({ as = "div", children, className, style, ...props }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "start 36%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.6 });
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [32, 0]);

  const MotionElement = motion[as] || motion.div;

  return (
    <MotionElement
      ref={ref}
      initial={false}
      className={className}
      style={{ ...style, opacity: reducedMotion ? 1 : opacity, y: reducedMotion ? 0 : y }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}
