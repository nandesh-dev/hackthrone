import { delay } from "@/lib/utils";

export async function getUser() {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(100);
    return {
      name: "Nandesh",
      email: "nandesh.s2025@vitstudent.ac.in",
    };
  }
}

export async function getUserStatistics() {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(300);
    return {
      creditsEarned: 541,
      projects: 4,
      collaborators: 16,
      history: [
        { date: "2025-09-30", words: 2, credits: 2 },
        { date: "2025-10-01", words: 1, credits: 2 },
        { date: "2025-10-02", words: 2, credits: 1 },
        { date: "2025-10-03", words: 2, credits: 3 },
        { date: "2025-10-04", words: 4, credits: 3 },
        { date: "2025-10-05", words: 3, credits: 3 },
        { date: "2025-10-06", words: 2, credits: 2 },
        { date: "2025-10-07", words: 4, credits: 3 },
        { date: "2025-10-08", words: 1, credits: 1 },
        { date: "2025-10-09", words: 3, credits: 2 },
        { date: "2025-10-10", words: 3, credits: 4 },
        { date: "2025-10-11", words: 3, credits: 2 },
        { date: "2025-10-12", words: 3, credits: 4 },
        { date: "2025-10-13", words: 1, credits: 2 },
        { date: "2025-10-14", words: 1, credits: 2 },
        { date: "2025-10-15", words: 1, credits: 2 },
        { date: "2025-10-16", words: 4, credits: 4 },
        { date: "2025-10-17", words: 4, credits: 4 },
        { date: "2025-10-18", words: 2, credits: 2 },
        { date: "2025-10-19", words: 1, credits: 2 },
        { date: "2025-10-20", words: 1, credits: 2 },
        { date: "2025-10-21", words: 2, credits: 2 },
        { date: "2025-10-22", words: 1, credits: 2 },
        { date: "2025-10-23", words: 4, credits: 3 },
        { date: "2025-10-24", words: 2, credits: 3 },
        { date: "2025-10-25", words: 1, credits: 1 },
        { date: "2025-10-26", words: 4, credits: 4 },
        { date: "2025-10-27", words: 1, credits: 2 },
        { date: "2025-10-28", words: 3, credits: 2 },
        { date: "2025-10-29", words: 5, credits: 4 },
        { date: "2025-10-30", words: 2, credits: 2 },
      ],
    };
  }
}
