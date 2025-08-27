import type { MotionProps } from "motion/react"

export const opacityVariant = (delay = 0): MotionProps => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: {
    delay,
    ease: "easeInOut",
    duration: 0.25
  }
})
