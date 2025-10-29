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
