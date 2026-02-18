export type QuizAttempt = {
  score: number;
  total: number;
  attemptedAt: string;
};

export type FlashcardSession = {
  knownCards: number;
  totalCards: number;
  completedAt: string;
};

export type ProgressState = {
  watchedLessons: string[];
  completedQuizzes: Record<string, QuizAttempt>;
  flashcardProgress: Record<string, FlashcardSession>;
  streak: number;
  lastActiveDate: string | null;
};

const STORAGE_KEY = "onlinelearn-progress-v1";

const defaultState = (): ProgressState => ({
  watchedLessons: [],
  completedQuizzes: {},
  flashcardProgress: {},
  streak: 0,
  lastActiveDate: null
});

const canUseStorage = () => typeof window !== "undefined";

const today = () => new Date().toISOString().slice(0, 10);

function applyStreak(state: ProgressState): ProgressState {
  const currentDay = today();

  if (state.lastActiveDate === currentDay) {
    return state;
  }

  const previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const wasYesterday = state.lastActiveDate === previousDay.toISOString().slice(0, 10);

  return {
    ...state,
    streak: wasYesterday ? state.streak + 1 : 1,
    lastActiveDate: currentDay
  };
}

export function getProgressState(): ProgressState {
  if (!canUseStorage()) {
    return defaultState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState();
  }

  try {
    return { ...defaultState(), ...JSON.parse(raw) } as ProgressState;
  } catch {
    return defaultState();
  }
}

export function saveProgressState(state: ProgressState) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function withUpdatedState(updater: (state: ProgressState) => ProgressState) {
  const current = getProgressState();
  const next = updater(current);
  saveProgressState(next);
  return next;
}

export function trackDailyStreak() {
  return withUpdatedState((state) => applyStreak(state));
}

export function markLessonWatched(lessonKey: string) {
  return withUpdatedState((state) => {
    const watched = new Set(state.watchedLessons);
    watched.add(lessonKey);

    return {
      ...applyStreak(state),
      watchedLessons: Array.from(watched)
    };
  });
}

export function saveQuizAttempt(quizKey: string, score: number, total: number) {
  return withUpdatedState((state) => ({
    ...applyStreak(state),
    completedQuizzes: {
      ...state.completedQuizzes,
      [quizKey]: {
        score,
        total,
        attemptedAt: new Date().toISOString()
      }
    }
  }));
}

export function saveFlashcardProgress(
  sessionKey: string,
  knownCards: number,
  totalCards: number
) {
  return withUpdatedState((state) => ({
    ...applyStreak(state),
    flashcardProgress: {
      ...state.flashcardProgress,
      [sessionKey]: {
        knownCards,
        totalCards,
        completedAt: new Date().toISOString()
      }
    }
  }));
}
