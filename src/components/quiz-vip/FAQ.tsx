import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    question: "What is an AI girl and how does it work?",
    answer:
      "AI girl is a virtual character created using artificial intelligence. You can customize her appearance and personality, after which she will communicate with you via text messages, adapting to your preferences.",
  },
  {
    question: "Can I customize the appearance and character of the AI girl?",
    answer:
      "Yes, you can customize her appearance (facial features, clothes, etc.), as well as choose her personality and behavior to perfectly match your preferences.",
  },
  {
    question: "How realistic is the AI girl?",
    answer:
      "The AI girl is created using advanced natural language processing technologies, which makes communication smooth and realistic. However, she remains a virtual character.",
  },
  {
    question: "Can I chat with an AI girl 24/7?",
    answer:
      "Yes, the AI girl is available around the clock, without time or place restrictions. She is always ready to carry on a conversation whenever it is convenient for you.",
  },
  {
    question: "Can I create multiple AI girls?",
    answer:
      "Yes, you can create multiple characters and customize each one differently. This allows you to experiment with different images and characters.",
  },
  {
    question: "Is it safe to chat with an AI girl?",
    answer:
      "Yes, your privacy is important to us. All conversations with the AI girl are protected and are not transferred to third parties. We do not store personal data without your consent.",
  },
];

const CustomAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <ul className="_list_ylm59_11">
      {faqData.map((item, index) => {
        const panelId = `panel${index}`;
        const isOpen = expanded === panelId;

        return (
          <Accordion
            key={panelId}
            expanded={isOpen}
            onChange={handleChange(panelId)}
            className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded Mui-expanded MuiAccordion-gutters _accordion_ylm59_71 css-1aj41gs`}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`payment-faq${index}-content`}
              id={`payment-faq${index}-header`}
              className={`MuiButtonBase-root MuiAccordionSummary-root Mui-expanded MuiAccordionSummary-gutters _summary_ylm59_11 css-1oqimao ${
                isOpen ? "Mui-expanded" : ""
              }`}
            >
              <Typography
                className={`MuiAccordionSummary-content MuiAccordionSummary-contentGutters css-l0jafl ${
                  isOpen ? "Mui-expanded" : ""
                }`}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              className="MuiAccordionDetails-root _description_ylm59_95 css-u7qq7e"
              id={`payment-faq${index}-content`}
              role="region"
              aria-labelledby={`payment-faq${index}-header`}
            >
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </ul>
  );
};

export default CustomAccordion;
