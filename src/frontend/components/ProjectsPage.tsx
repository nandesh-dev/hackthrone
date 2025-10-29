import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Coins } from 'lucide-react';

interface ProjectsPageProps {
  onCreateProject: () => void;
  onSelectProject: (projectId: string) => void;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    collaborators: Array<{ id: string; name: string; avatar: string }>;
    verificationStatus: 'verified' | 'in-review';
    credits: number;
  }>;
}

export function ProjectsPage({ onCreateProject, onSelectProject, projects }: ProjectsPageProps) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1>Projects</h1>
        <Button onClick={onCreateProject}>Create new project</Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-gray-600">Project</th>
              <th className="text-left px-6 py-4 text-gray-600">Collaborators</th>
              <th className="text-left px-6 py-4 text-gray-600">AI Verification</th>
              <th className="text-left px-6 py-4 text-gray-600">Credits</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectProject(project.id)}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="mb-1">{project.name}</div>
                    <div className="text-gray-500 text-sm">{project.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {project.collaborators.slice(0, 3).map((collaborator) => (
                      <Avatar key={collaborator.id} className="w-8 h-8 border-2 border-white">
                        <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={project.verificationStatus === 'verified' ? 'default' : 'secondary'}
                    className={
                      project.verificationStatus === 'verified'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    {project.verificationStatus === 'verified' ? '✓ Verified' : 'In review'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>{project.credits}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
