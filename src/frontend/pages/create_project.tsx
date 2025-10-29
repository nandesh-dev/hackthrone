import { createProject } from "@/actions/projects";
import { getCollaborationRecommendation } from "@/actions/socials";
import { Layout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

export function CreateProjectPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectInfoSubmitted, setProjectInfoSubmitted] = useState(false);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      navigate("/projects");
    },
  });

  const collaborationRecommendationQuery = useQuery({
    queryFn: getCollaborationRecommendation,
    queryKey: ["getCollaborationRecommendation"],
    enabled: projectInfoSubmitted,
  });

  const handleSignupSubmit = (e: any) => {
    setProjectInfoSubmitted(true);
    e.preventDefault();
  };

  const handleCreateProject = () => {
    createProjectMutation.mutate();
  };

  const detailsAreValid = title && description;

  return (
    <Layout>
      <div className="max-w-[52rem] px-8">
        <form onSubmit={handleSignupSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                placeholder="Crop Enchancement"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="title">Description</FieldLabel>
              <Textarea
                id="title"
                placeholder="Researching on improving the yield of crops by changing the schedule of irrigation systems...
                "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="h-64"
              />
            </Field>
            <Button type="submit" className="w-fit" disabled={!detailsAreValid}>
              Continue
            </Button>
          </FieldGroup>
        </form>
      </div>
      {projectInfoSubmitted && (
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight ml-8">
          Invite Colaborators
        </h4>
      )}
      <div className="grid grid-cols-4 gap-8 px-8">
        {collaborationRecommendationQuery.data
          ?.slice(0, 4)
          .map(({ name, profile_photo, bio, keywords }) => {
            return (
              <Colaborator
                key={name}
                name={name}
                profile_photo={profile_photo}
                bio={bio}
                keywords={keywords}
              />
            );
          })}
      </div>
      {projectInfoSubmitted && (
        <Button
          className="w-fit ml-8"
          onClick={handleCreateProject}
          disabled={createProjectMutation.isPending}
        >
          Create Project
        </Button>
      )}
    </Layout>
  );
}

function Colaborator({
  profile_photo,
  name,
  bio,
  keywords,
}: {
  profile_photo: string;
  name: string;
  bio: string;
  keywords: string[];
}) {
  const [invited, setInvited] = useState(false);

  return (
    <Card className="h-[32rem]">
      <CardContent className="flex flex-col gap-4 relative h-full">
        <div className="flex flex-col items-center">
          <Avatar
            key={name}
            className="rounded-full overflow-hidden size-32 flex items-center justify-center bg-gray-50"
          >
            <AvatarImage src={profile_photo} height={256} width={256} />
            <AvatarFallback className="text-2xl">
              {(name || "Na").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          {name}
        </h4>
        <span>{bio}</span>
        <div className="flex flex-row flex-wrap gap-2 mb-auto">
          {keywords.map((keyword) => {
            return (
              <Badge key={keyword} variant="outline">
                {keyword}
              </Badge>
            );
          })}
        </div>
        <Button
          variant={invited ? "outline" : "default"}
          className="w-full bottom-0"
          onClick={() => setInvited(!invited)}
        >
          {invited ? "Remove" : "Invite"}
        </Button>
      </CardContent>
    </Card>
  );
}
