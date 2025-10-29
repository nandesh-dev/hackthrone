import { getCollaborationRecommendation } from "@/actions/socials";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";

export function SocialsPage() {
  const collaborationRecommendationQuery = useQuery({
    queryFn: getCollaborationRecommendation,
    queryKey: ["getCollaborationRecommendation"],
  });

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-8 px-8">
        {collaborationRecommendationQuery.data?.map(
          ({ name, profile_photo, bio, keywords }) => {
            return (
              <Card className="h-[32rem]">
                <CardContent className="flex flex-col gap-4 relative h-full">
                  <div className="flex flex-col items-center">
                    <Avatar
                      key={name}
                      className="rounded-full overflow-hidden size-32 flex items-center justify-center bg-gray-50"
                    >
                      <AvatarImage
                        src={profile_photo}
                        height={256}
                        width={256}
                      />
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
                  <Button className="w-full bottom-0">Connect</Button>
                </CardContent>
              </Card>
            );
          },
        )}
      </div>
    </Layout>
  );
}
