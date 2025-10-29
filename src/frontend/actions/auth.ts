import { delay } from "@/lib/utils";
import axios from "axios";

export async function signupUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
  surveys: { question: string; response: string }[];
}) {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(500);
    document.cookie = "session=true";
    return;
  }

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signup`,
    {
      name,
      email,
      password,
      survey_data: [],
    },
    { withCredentials: true },
  );

  if (res.status !== 201) {
    throw Error("Failed to signup");
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (import.meta.env.VITE_MOCK_MODE) {
    await delay(500);

    if (email !== "nandesh.s2025@vitstudent.ac.in" || password !== "1234") {
      throw Error("Invalid login");
    }
    document.cookie = "session=true";
    return;
  }

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true },
  );

  if (res.status !== 201) {
    throw Error("Failed to login");
  }
}

export function checkLogin() {
  if (import.meta.env.VITE_MOCK_MODE) {
    return document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("session" + "="));
  }

  return false;
}

export function logoutUser() {
  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.location.reload();
}
