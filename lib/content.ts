export type ResourceKind = "video" | "note" | "live";

export type DifficultyTag = "foundation" | "intermediate" | "advanced" | "exam-ready";

export type CompletionState = "not-started" | "in-progress" | "completed";

export type MentorProfile = {
  name: string;
  role: string;
  experience: string;
  avatar: string;
};

export type LearningResource = {
  id: string;
  kind: ResourceKind;
  title: string;
  chapter: string;
  subject: string;
  unit: string;
  week: string;
  duration: string;
  thumbnail: string;
  difficultyTags: DifficultyTag[];
  topicOutcomes: string[];
  dueDate: string;
  completionState: CompletionState;
  mentor: MentorProfile;
};

export type Flashcard = {
  question: string;
  answer: string;
};

export type ResourceGroupings = {
  bySubject: Record<string, LearningResource[]>;
  byUnit: Record<string, LearningResource[]>;
  byWeek: Record<string, LearningResource[]>;
  continueLearning: LearningResource[];
  todaysPlan: LearningResource[];
  upcomingLive: LearningResource[];
};

export type ClassContent = {
  grade: string;
  tagline: string;
  videos: LearningResource[];
  notes: LearningResource[];
  liveSessions: LearningResource[];
  flashcards: Flashcard[];
  groupings: ResourceGroupings;
};

const mentors = {
  neha: {
    name: "Neha Iyer",
    role: "Science Mentor",
    experience: "9 years classroom + olympiad prep",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60"
  },
  arjun: {
    name: "Arjun Rao",
    role: "Math Faculty",
    experience: "11 years in conceptual math coaching",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60"
  },
  sara: {
    name: "Sara Kapoor",
    role: "English Coach",
    experience: "8 years language and writing training",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=60"
  },
  amit: {
    name: "Amit Deshmukh",
    role: "Social Science Mentor",
    experience: "10 years board curriculum teaching",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=200&q=60"
  }
} satisfies Record<string, MentorProfile>;

function groupBy<T extends string>(items: LearningResource[], key: (resource: LearningResource) => T) {
  return items.reduce<Record<T, LearningResource[]>>((acc, resource) => {
    const groupKey = key(resource);
    acc[groupKey] = [...(acc[groupKey] ?? []), resource];
    return acc;
  }, {} as Record<T, LearningResource[]>);
}

function buildGroupings(resources: LearningResource[]): ResourceGroupings {
  const todaysDate = "2026-03-18";

  return {
    bySubject: groupBy(resources, (resource) => resource.subject),
    byUnit: groupBy(resources, (resource) => resource.unit),
    byWeek: groupBy(resources, (resource) => resource.week),
    continueLearning: resources.filter((resource) => resource.completionState === "in-progress"),
    todaysPlan: resources.filter((resource) => resource.dueDate === todaysDate),
    upcomingLive: resources.filter(
      (resource) => resource.kind === "live" && resource.completionState !== "completed"
    )
  };
}

const curatedContent: Omit<ClassContent, "groupings">[] = [
  {
    grade: "5th",
    tagline: "Build strong basics with joyful learning.",
    videos: [
      {
        id: "g5-v-ecosystems",
        kind: "video",
        title: "Food Chains Around Us",
        chapter: "Living World and Habitats",
        subject: "Science",
        unit: "Unit 1: Nature Explorers",
        week: "Week 1",
        duration: "14 min",
        thumbnail: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Explain producer-consumer relationship", "Build a simple food chain"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g5-v-fractions",
        kind: "video",
        title: "Fraction Pizza Challenge",
        chapter: "Fractions Made Easy",
        subject: "Math",
        unit: "Unit 2: Number Adventures",
        week: "Week 1",
        duration: "18 min",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Compare unlike fractions", "Use visual fraction models"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g5-v-story-elements",
        kind: "video",
        title: "Finding Theme in Short Stories",
        chapter: "Reading Comprehension Skills",
        subject: "English",
        unit: "Unit 3: Language Lab",
        week: "Week 2",
        duration: "12 min",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Identify story setting and theme", "Use evidence from text"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.sara
      }
    ],
    notes: [
      {
        id: "g5-n-watercycle",
        kind: "note",
        title: "Water Cycle Summary Sheet",
        chapter: "Water and Weather",
        subject: "Science",
        unit: "Unit 1: Nature Explorers",
        week: "Week 1",
        duration: "7 min read",
        thumbnail: "https://images.unsplash.com/photo-1502303756762-a9f4f7d7f3e6?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Label stages of water cycle", "Relate evaporation to daily life"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g5-n-grammar",
        kind: "note",
        title: "Nouns and Pronouns Revision",
        chapter: "Grammar Essentials",
        subject: "English",
        unit: "Unit 3: Language Lab",
        week: "Week 2",
        duration: "10 min read",
        thumbnail: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Differentiate common/proper nouns", "Choose suitable pronouns"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.sara
      }
    ],
    liveSessions: [
      {
        id: "g5-l-mental-math",
        kind: "live",
        title: "Live Drill: 20 Mental Math Hacks",
        chapter: "Quick Calculations",
        subject: "Math",
        unit: "Unit 2: Number Adventures",
        week: "Week 2",
        duration: "35 min",
        thumbnail: "https://images.unsplash.com/photo-1553484771-898ed465e931?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Apply decomposition strategies", "Improve multiplication speed"],
        dueDate: "2026-03-22",
        completionState: "not-started",
        mentor: mentors.arjun
      }
    ],
    flashcards: [
      { question: "What is a producer in a food chain?", answer: "An organism (like a plant) that makes its own food." },
      { question: "How do you compare fractions with different denominators?", answer: "Convert them to equivalent fractions with a common denominator first." },
      { question: "What does story theme mean?", answer: "The deeper message or lesson a story communicates." }
    ]
  },
  {
    grade: "6th",
    tagline: "Level up your concept clarity every day.",
    videos: [
      {
        id: "g6-v-motion",
        kind: "video",
        title: "Distance-Time Graph Basics",
        chapter: "Motion and Measurement",
        subject: "Science",
        unit: "Unit 1: Physics in Action",
        week: "Week 1",
        duration: "16 min",
        thumbnail: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Read simple line graphs", "Interpret uniform motion"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g6-v-ratios",
        kind: "video",
        title: "Ratios Through Real Recipes",
        chapter: "Ratio and Proportion",
        subject: "Math",
        unit: "Unit 2: Numbers and Patterns",
        week: "Week 1",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Simplify ratio forms", "Solve direct proportion questions"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g6-v-history",
        kind: "video",
        title: "From Harappa to Vedic Age",
        chapter: "Early Civilizations",
        subject: "Social Science",
        unit: "Unit 4: India Through Time",
        week: "Week 2",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Compare early settlements", "List key features of Vedic life"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.amit
      }
    ],
    notes: [
      {
        id: "g6-n-heat",
        kind: "note",
        title: "Heat Transfer One-Page Notes",
        chapter: "Heat",
        subject: "Science",
        unit: "Unit 1: Physics in Action",
        week: "Week 1",
        duration: "8 min read",
        thumbnail: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Differentiate conduction/convection", "Apply heat safety rules"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g6-n-writing",
        kind: "note",
        title: "Paragraph Writing Toolkit",
        chapter: "Creative Writing",
        subject: "English",
        unit: "Unit 3: Expression Studio",
        week: "Week 2",
        duration: "11 min read",
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Use topic sentence format", "Build supporting details"],
        dueDate: "2026-03-22",
        completionState: "not-started",
        mentor: mentors.sara
      }
    ],
    liveSessions: [
      {
        id: "g6-l-mapwork",
        kind: "live",
        title: "Live Session: India Physical Map Practice",
        chapter: "Our Environment",
        subject: "Social Science",
        unit: "Unit 4: India Through Time",
        week: "Week 2",
        duration: "40 min",
        thumbnail: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Mark major plateaus", "Read map legends accurately"],
        dueDate: "2026-03-23",
        completionState: "not-started",
        mentor: mentors.amit
      }
    ],
    flashcards: [
      { question: "What does a steeper distance-time graph show?", answer: "Higher speed over the same interval." },
      { question: "How can you simplify 12:18?", answer: "Divide both terms by 6 to get 2:3." },
      { question: "Why is topic sentence important?", answer: "It tells the main idea of the paragraph clearly." }
    ]
  },
  {
    grade: "7th",
    tagline: "Think deeper with story-based learning.",
    videos: [
      {
        id: "g7-v-acids",
        kind: "video",
        title: "Acids, Bases and Indicators Lab Tour",
        chapter: "Acids and Bases",
        subject: "Science",
        unit: "Unit 1: Matter Lab",
        week: "Week 1",
        duration: "17 min",
        thumbnail: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Identify litmus color changes", "Classify household solutions"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g7-v-integers",
        kind: "video",
        title: "Integer Elevator Model",
        chapter: "Integers",
        subject: "Math",
        unit: "Unit 2: Number Systems",
        week: "Week 1",
        duration: "19 min",
        thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Perform integer operations", "Use number-line reasoning"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g7-v-poetry",
        kind: "video",
        title: "Imagery in Nature Poems",
        chapter: "Poetry Analysis",
        subject: "English",
        unit: "Unit 3: Reading and Writing",
        week: "Week 2",
        duration: "13 min",
        thumbnail: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Spot poetic devices", "Interpret sensory imagery"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.sara
      }
    ],
    notes: [
      {
        id: "g7-n-forests",
        kind: "note",
        title: "Forests Conservation Mindmap",
        chapter: "Forest Ecosystem",
        subject: "Science",
        unit: "Unit 1: Matter Lab",
        week: "Week 1",
        duration: "9 min read",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation"],
        topicOutcomes: ["Explain food web balance", "Describe conservation methods"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g7-n-civics",
        kind: "note",
        title: "Understanding State Government",
        chapter: "State Government",
        subject: "Social Science",
        unit: "Unit 4: Civics and Society",
        week: "Week 2",
        duration: "12 min read",
        thumbnail: "https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Name branches of government", "Relate laws to civic life"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.amit
      }
    ],
    liveSessions: [
      {
        id: "g7-l-algebra",
        kind: "live",
        title: "Live Problem Jam: Intro to Algebra",
        chapter: "Simple Equations",
        subject: "Math",
        unit: "Unit 2: Number Systems",
        week: "Week 2",
        duration: "42 min",
        thumbnail: "https://images.unsplash.com/photo-1635070041418-0a954f9a5de7?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "advanced"],
        topicOutcomes: ["Frame equations from statements", "Solve one-step equations"],
        dueDate: "2026-03-23",
        completionState: "not-started",
        mentor: mentors.arjun
      }
    ],
    flashcards: [
      { question: "What color does red litmus turn in a base?", answer: "It turns blue." },
      { question: "How do you subtract a negative integer?", answer: "Add the corresponding positive integer." },
      { question: "What is imagery in poetry?", answer: "Language that appeals to the senses to form vivid mental pictures." }
    ]
  },
  {
    grade: "8th",
    tagline: "Master fundamentals before high school starts.",
    videos: [
      {
        id: "g8-v-cells",
        kind: "video",
        title: "Cell Organelles in 3D",
        chapter: "Cell Structure and Functions",
        subject: "Science",
        unit: "Unit 1: Life Science",
        week: "Week 1",
        duration: "21 min",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Identify organelle functions", "Differentiate plant/animal cells"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g8-v-linear",
        kind: "video",
        title: "Linear Equations with Real Cases",
        chapter: "Linear Equations in One Variable",
        subject: "Math",
        unit: "Unit 2: Algebra Lab",
        week: "Week 1",
        duration: "23 min",
        thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "advanced"],
        topicOutcomes: ["Translate word problems", "Check equation solutions"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g8-v-nationalism",
        kind: "video",
        title: "Rise of Modern India",
        chapter: "Colonial Rule and Resistance",
        subject: "Social Science",
        unit: "Unit 4: Modern History",
        week: "Week 2",
        duration: "18 min",
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Trace key reform movements", "Understand nationalist ideas"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.amit
      }
    ],
    notes: [
      {
        id: "g8-n-force",
        kind: "note",
        title: "Force and Pressure Formula Board",
        chapter: "Force and Pressure",
        subject: "Science",
        unit: "Unit 1: Life Science",
        week: "Week 1",
        duration: "9 min read",
        thumbnail: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Apply pressure equation", "Relate force-area relationship"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g8-n-letter",
        kind: "note",
        title: "Formal Letter Writing Blueprint",
        chapter: "Writing Skills",
        subject: "English",
        unit: "Unit 3: Communication",
        week: "Week 2",
        duration: "10 min read",
        thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["foundation", "intermediate"],
        topicOutcomes: ["Use correct letter format", "Adopt formal tone"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.sara
      }
    ],
    liveSessions: [
      {
        id: "g8-l-lab",
        kind: "live",
        title: "Live Lab: Friction Experiments",
        chapter: "Friction",
        subject: "Science",
        unit: "Unit 1: Life Science",
        week: "Week 2",
        duration: "38 min",
        thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "advanced"],
        topicOutcomes: ["Predict friction changes", "Design fair experiments"],
        dueDate: "2026-03-22",
        completionState: "not-started",
        mentor: mentors.neha
      }
    ],
    flashcards: [
      { question: "What is the powerhouse of the cell?", answer: "Mitochondria." },
      { question: "What is the first step in solving a linear equation?", answer: "Simplify both sides and isolate the variable systematically." },
      { question: "Why do historians divide the modern period into phases?", answer: "To study social and political changes with clearer context." }
    ]
  },
  {
    grade: "9th",
    tagline: "Step into advanced topics with confidence.",
    videos: [
      {
        id: "g9-v-atoms",
        kind: "video",
        title: "Atomic Structure and Isotopes",
        chapter: "Structure of Atom",
        subject: "Science",
        unit: "Unit 1: Foundation Chemistry",
        week: "Week 1",
        duration: "24 min",
        thumbnail: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "advanced"],
        topicOutcomes: ["Interpret atomic number", "Differentiate isotopes and isobars"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g9-v-polynomials",
        kind: "video",
        title: "Polynomials Graph Sense",
        chapter: "Polynomials",
        subject: "Math",
        unit: "Unit 2: Algebra and Graphs",
        week: "Week 1",
        duration: "27 min",
        thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced"],
        topicOutcomes: ["Classify polynomial degree", "Relate roots and graphs"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g9-v-democracy",
        kind: "video",
        title: "What Makes a Democracy Work",
        chapter: "Democratic Politics",
        subject: "Social Science",
        unit: "Unit 4: Politics and People",
        week: "Week 2",
        duration: "19 min",
        thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Recognize democratic features", "Evaluate institutional accountability"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.amit
      }
    ],
    notes: [
      {
        id: "g9-n-motion",
        kind: "note",
        title: "Motion Numericals Cheatbook",
        chapter: "Motion",
        subject: "Science",
        unit: "Unit 1: Foundation Chemistry",
        week: "Week 1",
        duration: "12 min read",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "exam-ready"],
        topicOutcomes: ["Use v=u+at", "Solve speed-distance numericals"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g9-n-essay",
        kind: "note",
        title: "Argumentative Essay Framework",
        chapter: "Writing for Persuasion",
        subject: "English",
        unit: "Unit 3: Academic Writing",
        week: "Week 2",
        duration: "13 min read",
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "advanced"],
        topicOutcomes: ["Frame thesis statements", "Use evidence-led arguments"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.sara
      }
    ],
    liveSessions: [
      {
        id: "g9-l-quadrilateral",
        kind: "live",
        title: "Live Geometry Clinic: Quadrilaterals",
        chapter: "Quadrilaterals",
        subject: "Math",
        unit: "Unit 2: Algebra and Graphs",
        week: "Week 2",
        duration: "45 min",
        thumbnail: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Apply angle properties", "Prove theorem-based questions"],
        dueDate: "2026-03-23",
        completionState: "not-started",
        mentor: mentors.arjun
      }
    ],
    flashcards: [
      { question: "What defines an isotope?", answer: "Atoms of the same element with different mass numbers." },
      { question: "How can you identify polynomial degree?", answer: "Find the highest exponent of the variable." },
      { question: "What is institutional accountability?", answer: "How institutions remain answerable for their decisions and actions." }
    ]
  },
  {
    grade: "10th",
    tagline: "Get board-ready with focused practice.",
    videos: [
      {
        id: "g10-v-electricity",
        kind: "video",
        title: "Electricity Numericals Masterclass",
        chapter: "Electricity",
        subject: "Science",
        unit: "Unit 1: Physics Board Prep",
        week: "Week 1",
        duration: "29 min",
        thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Use V=IR in circuits", "Solve power and energy questions"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g10-v-trigonometry",
        kind: "video",
        title: "Trigonometric Identities Crash Course",
        chapter: "Introduction to Trigonometry",
        subject: "Math",
        unit: "Unit 2: Board Math Toolkit",
        week: "Week 1",
        duration: "31 min",
        thumbnail: "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Derive basic identities", "Solve height-distance problems"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g10-v-nationalism",
        kind: "video",
        title: "Nationalism in India Timeline",
        chapter: "Nationalism in India",
        subject: "Social Science",
        unit: "Unit 4: History for Boards",
        week: "Week 2",
        duration: "22 min",
        thumbnail: "https://images.unsplash.com/photo-1455885666463-61e2dfd47696?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "exam-ready"],
        topicOutcomes: ["Sequence movement events", "Interpret historical cartoons"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.amit
      }
    ],
    notes: [
      {
        id: "g10-n-chem",
        kind: "note",
        title: "Chemical Reactions One-Shot Revision",
        chapter: "Chemical Reactions and Equations",
        subject: "Science",
        unit: "Unit 1: Physics Board Prep",
        week: "Week 1",
        duration: "15 min read",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["exam-ready"],
        topicOutcomes: ["Balance equations quickly", "Classify reaction types"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g10-n-letter",
        kind: "note",
        title: "Board Format: Analytical Paragraph",
        chapter: "Writing Skills",
        subject: "English",
        unit: "Unit 3: Language and Composition",
        week: "Week 2",
        duration: "14 min read",
        thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "exam-ready"],
        topicOutcomes: ["Interpret charts and trends", "Write concise analytical paragraphs"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.sara
      }
    ],
    liveSessions: [
      {
        id: "g10-l-samplepaper",
        kind: "live",
        title: "Live Board Sprint: Sample Paper Strategy",
        chapter: "Exam Readiness",
        subject: "Math",
        unit: "Unit 2: Board Math Toolkit",
        week: "Week 2",
        duration: "50 min",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["exam-ready"],
        topicOutcomes: ["Prioritize sections for scoring", "Manage exam-time checkpoints"],
        dueDate: "2026-03-23",
        completionState: "not-started",
        mentor: mentors.arjun
      }
    ],
    flashcards: [
      { question: "What does 1 kWh represent?", answer: "Energy used by a 1000 W appliance in one hour." },
      { question: "What is tan θ in a right triangle?", answer: "Perpendicular divided by base." },
      { question: "Why are sample papers important?", answer: "They improve speed, confidence, and pattern familiarity." }
    ]
  },
  {
    grade: "11th",
    tagline: "Specialize smartly and prep for future goals.",
    videos: [
      {
        id: "g11-v-thermo",
        kind: "video",
        title: "Thermodynamics: Laws with Visual Intuition",
        chapter: "Thermodynamics",
        subject: "Physics",
        unit: "Unit 1: Core PCM",
        week: "Week 1",
        duration: "34 min",
        thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced"],
        topicOutcomes: ["Interpret first law applications", "Solve heat-work sign convention"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g11-v-functions",
        kind: "video",
        title: "Functions and Graph Transformations",
        chapter: "Relations and Functions",
        subject: "Math",
        unit: "Unit 2: Advanced Algebra",
        week: "Week 1",
        duration: "37 min",
        thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Identify domain/range", "Apply graph shifting rules"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g11-v-business",
        kind: "video",
        title: "Business Studies Case Snapshot",
        chapter: "Nature and Purpose of Business",
        subject: "Commerce",
        unit: "Unit 4: Fundamentals of Business",
        week: "Week 2",
        duration: "24 min",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate"],
        topicOutcomes: ["Differentiate business activities", "Analyze real-world caselets"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.amit
      }
    ],
    notes: [
      {
        id: "g11-n-hydrocarbon",
        kind: "note",
        title: "Hydrocarbon Reaction Ladder",
        chapter: "Hydrocarbons",
        subject: "Chemistry",
        unit: "Unit 1: Core PCM",
        week: "Week 1",
        duration: "16 min read",
        thumbnail: "https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Track alkane/alkene conversions", "Compare reaction conditions"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g11-n-economics",
        kind: "note",
        title: "Demand-Supply Curve Notes",
        chapter: "Demand and Supply",
        subject: "Economics",
        unit: "Unit 4: Fundamentals of Business",
        week: "Week 2",
        duration: "14 min read",
        thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "advanced"],
        topicOutcomes: ["Explain law of demand", "Interpret equilibrium shifts"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.amit
      }
    ],
    liveSessions: [
      {
        id: "g11-l-derivative",
        kind: "live",
        title: "Live Doubt Room: Limits & Derivatives",
        chapter: "Intro to Calculus",
        subject: "Math",
        unit: "Unit 2: Advanced Algebra",
        week: "Week 2",
        duration: "55 min",
        thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Compute standard limits", "Build derivative intuition"],
        dueDate: "2026-03-23",
        completionState: "not-started",
        mentor: mentors.arjun
      }
    ],
    flashcards: [
      { question: "State the first law of thermodynamics.", answer: "Heat supplied equals change in internal energy plus work done by the system." },
      { question: "What is domain of a function?", answer: "The set of all allowed input values." },
      { question: "Why is demand curve usually downward sloping?", answer: "As price rises, quantity demanded tends to fall (other factors constant)." }
    ]
  },
  {
    grade: "12th",
    tagline: "Ace boards and entrance exams with precision.",
    videos: [
      {
        id: "g12-v-waveoptics",
        kind: "video",
        title: "Wave Optics for Boards + JEE",
        chapter: "Wave Optics",
        subject: "Physics",
        unit: "Unit 1: Entrance Excellence",
        week: "Week 1",
        duration: "41 min",
        thumbnail: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Solve YDSE fringe-width questions", "Apply diffraction formulae"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g12-v-integration",
        kind: "video",
        title: "Definite Integration Shortcuts",
        chapter: "Integrals",
        subject: "Math",
        unit: "Unit 2: Calculus Mastery",
        week: "Week 1",
        duration: "39 min",
        thumbnail: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Use properties of definite integrals", "Cut steps in board numericals"],
        dueDate: "2026-03-19",
        completionState: "not-started",
        mentor: mentors.arjun
      },
      {
        id: "g12-v-flamingo",
        kind: "video",
        title: "Flamingo Prose Deep Analysis",
        chapter: "English Core - Flamingo",
        subject: "English",
        unit: "Unit 3: Board Language Strategy",
        week: "Week 2",
        duration: "26 min",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "exam-ready"],
        topicOutcomes: ["Frame high-scoring long answers", "Use contextual references"],
        dueDate: "2026-03-20",
        completionState: "completed",
        mentor: mentors.sara
      }
    ],
    notes: [
      {
        id: "g12-n-electro",
        kind: "note",
        title: "Electrochemistry Rapid Revision",
        chapter: "Electrochemistry",
        subject: "Chemistry",
        unit: "Unit 1: Entrance Excellence",
        week: "Week 1",
        duration: "18 min read",
        thumbnail: "https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["advanced", "exam-ready"],
        topicOutcomes: ["Apply Nernst equation", "Predict galvanic cell direction"],
        dueDate: "2026-03-18",
        completionState: "in-progress",
        mentor: mentors.neha
      },
      {
        id: "g12-n-business",
        kind: "note",
        title: "Business Finance Formula Capsule",
        chapter: "Financial Management",
        subject: "Commerce",
        unit: "Unit 4: Commerce Board Boost",
        week: "Week 2",
        duration: "15 min read",
        thumbnail: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["intermediate", "exam-ready"],
        topicOutcomes: ["Calculate cost of capital", "Evaluate financing decisions"],
        dueDate: "2026-03-21",
        completionState: "not-started",
        mentor: mentors.amit
      }
    ],
    liveSessions: [
      {
        id: "g12-l-mock",
        kind: "live",
        title: "Live Full Mock + Performance Review",
        chapter: "Final Exam Simulation",
        subject: "Physics",
        unit: "Unit 1: Entrance Excellence",
        week: "Week 2",
        duration: "60 min",
        thumbnail: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=420&q=60",
        difficultyTags: ["exam-ready"],
        topicOutcomes: ["Attempt mixed-level paper", "Decode error patterns"],
        dueDate: "2026-03-23",
        completionState: "not-started",
        mentor: mentors.neha
      }
    ],
    flashcards: [
      { question: "What causes interference in wave optics?", answer: "Superposition of coherent light waves with phase difference." },
      { question: "Why are definite integral properties useful?", answer: "They simplify otherwise lengthy calculations in board and entrance questions." },
      { question: "What improves mock test scores fastest?", answer: "Error log review, timed practice, and targeted weak-topic revision." }
    ]
  }
];

export const classContent: ClassContent[] = curatedContent.map((item) => {
  const allResources = [...item.videos, ...item.notes, ...item.liveSessions];

  return {
    ...item,
    groupings: buildGroupings(allResources)
  };
});

export const classMap = Object.fromEntries(
  classContent.map((item) => [item.grade.toLowerCase(), item])
);
