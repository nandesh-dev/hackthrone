import { getProject } from "@/actions/projects";
import { Layout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { useEffect, useState } from "react";

export function ProjectPage() {
  const getProjectQuery = useQuery({
    queryFn: getProject,
    queryKey: ["getProject"],
  });

  const [newVersionCredit, setNewVersionCredit] = useState<number | null>(null);
  const [fileProgress, setFileProgress] = useState(0);

  const handleFileUpload = () => {
    //const file = e.target.files[0];
    //const sizeInKB = file.size / 1024;
    setFileProgress(1);
    setNewVersionCredit(11);
  };

  useEffect(() => {
    if (fileProgress == 0) return;

    const interval = setInterval(() => {
      setFileProgress((p) => {
        const newProgress = p + Math.floor(Math.random() * 5);
        if (newProgress > 100) {
          return 0;
        }
        return newProgress;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [fileProgress > 0]);

  let fileProgressText = "";
  if (fileProgress > 0) {
    fileProgressText = "Uploading file to server";
  }
  if (fileProgress > 30) {
    fileProgressText = "Parsing file";
  }
  if (fileProgress > 50) {
    fileProgressText = "Diffing file with last version";
  }
  if (fileProgress > 70) {
    fileProgressText = "Analyzing contribution";
  }
  if (fileProgress > 90) {
    fileProgressText = "Assigning credits";
  }

  return (
    <Layout>
      <div className="grid grid-cols-[3fr_2fr] px-8 gap-16">
        <div>
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight mb-4">
            Title
          </h3>
          <p className="mb-8"> {getProjectQuery.data?.title || "- - -"}</p>
          <h3 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Description
          </h3>
          <p className="mb-4">{getProjectQuery.data?.description || "- - -"}</p>
          <h3 className="scroll-m-20 text-xl font-medium tracking-tight mb-4">
            Collaborators
          </h3>
          <div className="flex flex-row flex-wrap gap-4">
            {getProjectQuery.data?.collaborators.map(
              ({ name, profile_photo }) => {
                return (
                  <Colaborator
                    key={name}
                    name={name}
                    profile_photo={profile_photo}
                  />
                );
              },
            )}
          </div>
        </div>
        <div className="row-span-2">
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight mb-4">
            Credit History
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Version</TableHead>
                <TableHead className="text-right">Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getProjectQuery.data?.versions.map((version, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="text-right">
                    {version.credits}
                  </TableCell>
                </TableRow>
              ))}
              {newVersionCredit !== null && fileProgress === 0 && (
                <TableRow>
                  <TableCell className="font-medium">
                    {(getProjectQuery.data?.versions.length || 0) + 1}
                  </TableCell>
                  <TableCell className="text-right">
                    {newVersionCredit}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {getProjectQuery.data?.versions.reduce(
                    (last, { credits }) => {
                      return last + credits;
                    },
                    0,
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div>
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight mb-4">
            Upload New Version
          </h3>
          <div className="p-8 border rounded-md mb-2">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </div>
          <Progress value={fileProgress} className="mb-2" />
          <p>{fileProgressText}</p>
        </div>
      </div>
    </Layout>
  );
}

function Colaborator({
  profile_photo,
  name,
}: {
  profile_photo: string;
  name: string;
}) {
  return (
    <Card className="py-0">
      <CardContent className="flex flex-row gap-4 items-center p-4 my-0">
        <div className="flex flex-col items-center">
          <Avatar
            key={name}
            className="rounded-full overflow-hidden size-12 flex items-center justify-center bg-gray-50"
          >
            <AvatarImage src={profile_photo} height={256} width={256} />
            <AvatarFallback className="text-2xl">
              {(name || "Na").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-center">
          {name}
        </h4>
      </CardContent>
    </Card>
  );
}
