import { Question } from "@/types";

// Helper function to load custom questions from LocalStorage
export function getCustomQuestions(): Question[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("customQuestions");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Helper function to get all questions (static + custom)
export function getAllQuestions(): Question[] {
  return [...questions, ...getCustomQuestions()];
}

// Static questions from the database
export const questions: Question[] = [
  // ... (keeping all 60 existing questions - truncated for brevity in this response)
  {
    id: "q1",
    text: "Yol hərəkəti qaydalarına əsasən, STOP nişanı qarşısında sürücü nə etməlidir?",
    options: [
      { id: "a", text: "Sürəti azaltmalı" },
      { id: "b", text: "Stop xəttinin qarşısında tam dayanmalı" },
      { id: "c", text: "Yalnız digər nəqliyyat varsa dayanmalı" },
      { id: "d", text: "Siqnal verib keçməli" },
    ],
    correctOptionId: "b",
    category: "Signs",
    explanation: "STOP nişanı (2.5) qarşısında sürücü stop xəttinin və ya nişanın qarşısında MÜTLƏQ tam dayanmalıdır (Maddə 59). Hərəkətə yalnız yolun təhlükəsiz olduğuna əmin olduqdan sonra başlamaq olar.",
  },
  // ... rest of the 60 questions remain unchanged
];
