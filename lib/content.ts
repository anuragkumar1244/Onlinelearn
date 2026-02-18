export type Resource = {
  id: string;
  title: string;
  duration?: string;
  topic: string;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

export type Quiz = {
  id: string;
  title: string;
  topic: string;
  questionCount: number;
};

export type ClassContent = {
  grade: string;
  tagline: string;
  videos: Resource[];
  notes: Resource[];
  quizzes: Quiz[];
  flashcards: Flashcard[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const classContent: ClassContent[] = [
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th"
].map((grade, index) => {
  const videos = [
    {
      title: `${grade} Science: Concept Booster`,
      duration: `${12 + index} min`,
      topic: "Science"
    },
    {
      title: `${grade} Mathematics: Problem Solving`,
      duration: `${15 + index} min`,
      topic: "Math"
    },
    {
      title: `${grade} English: Quick Revision`,
      duration: `${10 + index} min`,
      topic: "English"
    }
  ].map((lesson) => ({ ...lesson, id: slugify(lesson.title) }));

  const notes = [
    { title: "Chapter Summary Sheet", topic: "Quick notes" },
    { title: "Formula + Key Facts Booklet", topic: "Revision" },
    { title: "Exam Smart Checklist", topic: "Preparation" }
  ].map((note) => ({ ...note, id: slugify(note.title) }));

  const quizzes = [
    { title: `${grade} Science Mastery Check`, topic: "Science", questionCount: 10 },
    { title: `${grade} Math Speed Drill`, topic: "Math", questionCount: 12 }
  ].map((quiz) => ({ ...quiz, id: slugify(quiz.title) }));

  const flashcards = [
    {
      question: "What is the best way to retain a new concept?",
      answer: "Use active recall + spaced revision for 5-10 minutes daily."
    },
    {
      question: "How should you prepare one week before an exam?",
      answer: "Revise summaries, solve past papers, and review weak topics first."
    },
    {
      question: "How can you improve in problem-solving subjects?",
      answer: "Practice mixed questions daily and analyze mistakes immediately."
    }
  ].map((card) => ({ ...card, id: slugify(card.question) }));

  return {
    grade,
    tagline: [
      "Build strong basics with joyful learning.",
      "Level up your concept clarity every day.",
      "Think deeper with story-based learning.",
      "Master fundamentals before high school starts.",
      "Step into advanced topics with confidence.",
      "Get board-ready with focused practice.",
      "Specialize smartly and prep for future goals.",
      "Ace boards and entrance exams with precision."
    ][index],
    videos,
    notes,
    quizzes,
    flashcards
  };
});

export const classMap = Object.fromEntries(
  classContent.map((item) => [item.grade.toLowerCase(), item])
);
