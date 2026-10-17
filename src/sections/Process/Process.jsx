import { motion, useReducedMotion } from "motion/react";
import Section from "../../components/ui/Section/Section.jsx";
import { processContent } from "../../content/siteContent.js";

import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";

const processListVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.24,
      staggerChildren: 0.34,
    },
  },
};

const processItemVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Process({ className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      data-od-id="processo"
      aria-labelledby="sec-processo"
      containerClassName="container grid-1-2"
      className={`surface-band ${className}`.trim()}
    >
      <SectionHeader
        label={processContent.eyebrow || "Como Trabalho"}
        title={processContent.title}
        subtitle={processContent.lead}
        id="sec-processo"
        align="left"
        style={{ marginBottom: 0 }}
      />
      <motion.ol
        className="process-list"
        aria-label="Processo de trabalho de Robson Svicero"
        variants={processListVariants}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {processContent.steps.map((step) => (
          <motion.li className="process-item" key={step.number} variants={processItemVariants}>
            <span className="num" aria-hidden="true">
              {step.number}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
