"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@repo/shared/components/ui/accordion"
import { motion } from "motion/react"
import { sectionVariant } from "@/components/animations/section"
import { Heading } from "@/components/layout/heading"
import { faqs } from "@/lib/plans/faq"

export function FAQSection() {
  return (
    <motion.section {...sectionVariant()}>
      <Heading
        text="Frequently Asked Questions"
        description="Everything you need to know about our plans and pricing."
      />
      <div>
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  )
}
