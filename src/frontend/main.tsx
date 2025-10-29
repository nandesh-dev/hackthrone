import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login.tsx";
import SignupPage from "./pages/signup.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/home.tsx";
import { SocialsPage } from "./pages/socials.tsx";
import { ProjectsPage } from "./pages/projects.tsx";
import { CreateProjectPage } from "./pages/create_project.tsx";
import { ProjectPage } from "./pages/project.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/socials" element={<SocialsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/create" element={<CreateProjectPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
