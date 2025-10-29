import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupUser } from "@/actions/auth";
import { validateEmailId } from "@/lib/validate";
import { useNavigate } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SURVEY_QUESTIONS } from "@/constants/survey";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signupCompleted, setSignupCompleted] = useState(false);

  const [surveyRenponses, setSurveyAnswers] = useState(
    Array.from(new Array(SURVEY_QUESTIONS.length)).map(() => ""),
  );

  const signupIsValid =
    name && validateEmailId(email) && password && password == confirmPassword;

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      setSignupCompleted(true);
    },
  });

  const handleSignupSubmit = (e: any) => {
    e.preventDefault();
    setSignupCompleted(true);
  };

  const handleSurveySubmit = () => {
    const surveys = surveyRenponses.map((response, index) => {
      return {
        question: SURVEY_QUESTIONS[index],
        response,
      };
    });

    console.log({ name, email, password, surveys });
    signupMutation.mutate({ name, email, password, surveys });
  };

  if (signupCompleted) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            ResearchHive
          </a>
          <div className="flex flex-col gap-6">
            <Carousel>
              <CarouselContent>
                {SURVEY_QUESTIONS.map((question, index) => {
                  const updateValue = (value: string) => {
                    surveyRenponses[index] = value;
                    setSurveyAnswers([...surveyRenponses]);
                  };

                  return (
                    <CarouselItem key={question} className="">
                      <Card>
                        <CardHeader>
                          <CardTitle>Just a few questions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col h-64 items-center gap-8">
                          <Field>
                            <FieldLabel htmlFor={`question-${index}`}>
                              {question}
                            </FieldLabel>
                            <Textarea
                              id={`question-${index}`}
                              value={surveyRenponses[index]}
                              onChange={(e) => updateValue(e.target.value)}
                              className="h-40"
                              required
                            />
                          </Field>
                          <Progress
                            value={
                              ((index + 1) / SURVEY_QUESTIONS.length) * 100
                            }
                            className="w-[60%]"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fantastic!</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-64 items-center gap-8 justify-between">
                      Welcome to ResearchHive, where ideas spark innovation.
                      Explore discoveries, connect with thinkers, and shape the
                      future of research.
                      <Field>
                        <Button onClick={handleSurveySubmit}>Sign up</Button>
                      </Field>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          ResearchHive
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignupSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Kevin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <Input
                      id="password"
                      type="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="confirm-password">
                        Comfirm Password
                      </FieldLabel>
                    </div>
                    <Input
                      id="confirm-password"
                      type="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      disabled={signupMutation.isPending || !signupIsValid}
                    >
                      Signup
                    </Button>
                    {signupMutation.isError && (
                      <p className="text-red-500 text-sm mt-2">
                        {signupMutation.error.message}
                      </p>
                    )}
                    {confirmPassword && confirmPassword !== password && (
                      <p className="text-red-500 text-sm mt-2">
                        Please enter the same password twice.
                      </p>
                    )}
                    {!email || validateEmailId(email) || (
                      <p className="text-red-500 text-sm mt-2">
                        Please enter a valid email id.
                      </p>
                    )}
                    <FieldDescription className="text-center">
                      Already have an account?{" "}
                      <a onClick={() => navigate("/login")}>Log in</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
