import { questions as baseQuestions } from "./questions_base";
import { newQuestions } from "./questions_new";

// Combine base and new questions into a single export
export const questions = [
  ...baseQuestions,
  ...newQuestions,
];
