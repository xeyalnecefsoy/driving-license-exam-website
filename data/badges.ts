import { Badge } from "@/types";

export const badges: Badge[] = [
  {
    id: "first_exam",
    name: "İlk Addım",
    description: "İlk imtahanı tamamla",
    icon: "Flag",
    type: "exam_count",
    requirement: 1,
  },
  {
    id: "dedicated_learner",
    name: "Həvəskar",
    description: "10 imtahan tamamla",
    icon: "TrendingUp",
    type: "exam_count",
    requirement: 10,
  },
  {
    id: "master_driver",
    name: "Usta Sürücü",
    description: "50 imtahan tamamla",
    icon: "Trophy",
    type: "exam_count",
    requirement: 50,
  },
  {
    id: "perfect_score",
    name: "Mükəmməliyyətçi",
    description: "Heç bir səhv etmədən imtahanı keç",
    icon: "Star",
    type: "perfect_exam",
    requirement: 1,
  },
  {
    id: "knowledge_seeker",
    name: "Bilik Ovçusu",
    description: "Ümumilikdə 100 sual cavabla",
    icon: "BookOpen",
    type: "question_count",
    requirement: 100,
  },
  {
    id: "question_master",
    name: "Sual Ustası",
    description: "Ümumilikdə 500 sual cavabla",
    icon: "Target",
    type: "question_count",
    requirement: 500,
  },
];
