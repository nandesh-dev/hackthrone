import { getProjects } from "@/actions/projects";
import { Layout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export function ProjectsPage() {
  const projectQuery = useQuery({
    queryFn: getProjects,
    queryKey: ["getProjects"],
  });

  return (
    <Layout>
      <div className="flex flex-col gap-8 px-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Keywords</TableHead>
              <TableHead>Colaborators</TableHead>
              <TableHead className="text-right">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectQuery.data?.map((project) => (
              <TableRow key={project.title}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  {project.keywords.map((keyword) => {
                    return (
                      <Badge key={keyword} variant="outline">
                        {keyword}
                      </Badge>
                    );
                  })}
                </TableCell>
                <TableCell className="flex flex-row gap-2">
                  {project.collaborators.map((colaborator) => {
                    return (
                      <Avatar key={colaborator.name}>
                        <AvatarImage src={colaborator.profile_photo} />
                        <AvatarFallback>
                          {(colaborator.name || "NA").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </TableCell>
                <TableCell className="text-right">{project.credits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {projectQuery.data?.reduce((last, { credits }) => {
                  return last + credits;
                }, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Layout>
  );
}
