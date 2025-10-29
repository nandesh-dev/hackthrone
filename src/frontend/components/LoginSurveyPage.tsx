import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';

interface SurveyData {
  name: string;
  email: string;
  institution: string;
  researchField: string;
  experienceLevel: string;
  interests: string;
  motivation: string;
}

interface LoginSurveyPageProps {
  onSubmit: (data: SurveyData) => void;
}

export function LoginSurveyPage({ onSubmit }: LoginSurveyPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SurveyData>({
    name: '',
    email: '',
    institution: '',
    researchField: '',
    experienceLevel: '',
    interests: '',
    motivation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving to DB (replace with real API)
    try {
      await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.log('Survey data:', form);
    }
    onSubmit(form);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Researcher Onboarding ({step}/3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                <Input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                <Input name="institution" placeholder="Institution / Organization" value={form.institution} onChange={handleChange} />
              </>
            )}

            {step === 2 && (
              <>
                <Input name="researchField" placeholder="Primary Research Field" value={form.researchField} onChange={handleChange} required />
                <Input name="experienceLevel" placeholder="Experience Level (PhD, Postdoc, etc.)" value={form.experienceLevel} onChange={handleChange} />
                <Input name="interests" placeholder="Research Interests (comma-separated)" value={form.interests} onChange={handleChange} />
              </>
            )}

            {step === 3 && (
              <>
                <Textarea
                  name="motivation"
                  placeholder="What motivates your research?"
                  value={form.motivation}
                  onChange={handleChange}
                  required
                />
                <p className="text-gray-500 text-sm">
                  Your responses help us recommend relevant projects and collaborators.
                </p>
              </>
            )}

            <div className="flex justify-between pt-2">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Finish</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
