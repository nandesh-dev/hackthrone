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
