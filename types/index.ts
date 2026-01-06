export type Category = 'Signs' | 'Rules' | 'Intersections' | 'General';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  image?: string;
  options: Option[];
  correctOptionId: string;
  category: Category;
  media?: {
    type: 'image' | 'video';
    src: string;
  };
  explanation: string;
  ruleSource?: string; // e.g., 'YHQ, Maddə 54.3'
}

export type QuizMode = 'learning' | 'exam' | 'mistakes' | 'marathon' | 'hard';

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Record<string, string>; // questionId -> selectedOptionId
  isFinished: boolean;
  mistakes: string[]; // List of question IDs answered incorrectly
  timeLeft: number; // in seconds
}

export interface QuestionStats {
  questionId: string;
  lastSeen: number; // timestamp
  correctCount: number; // number of times answered correctly
  incorrectCount: number; // number of times answered incorrectly
}

export interface ExamHistory {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  passed: boolean;
  mistakeCount: number;
}

export type BadgeType = 'exam_count' | 'perfect_exam' | 'question_count' | 'streak';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  type: BadgeType;
  requirement: number;
}

export interface UserStats {
  totalExams: number;
  perfectExams: number;
  totalQuestionsAnswered: number;
  earnedBadges: { id: string; earnedAt: number }[];
}
