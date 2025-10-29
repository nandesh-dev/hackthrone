export const SURVEY_QUESTIONS = import.meta.env.VITE_MOCK_MODE
  ? [
      "How many years of research experience do you have?",
      "Please indicate your primary research field and any subfields or specializations you work in",
    ]
  : ([
      "How many years of research experience do you have?",
      "Please indicate your primary research field and any subfields or specializations you work in",
      "What research methods do you typically use in your work",
      "What are your top research interests?",
      "How would you describe your publication experience?",
      "What motivates you to engage in research?",
    ] as const);
