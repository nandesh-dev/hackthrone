import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, Coins } from 'lucide-react';

interface Contribution {
  id: string;
  userName: string;
  userAvatar: string;
  description: string;
  tokens: number;
  category: string;
  timestamp: Date;
}

interface ProjectDetailPageProps {
  project: {
    id: string;
    name: string;
    description: string;
    collaborators: Array<{ id: string; name: string; avatar: string }>;
    verificationStatus: 'verified' | 'in-review';
    credits: number;
  };
  contributions: Contribution[];
  onBack: () => void;
  onAddContribution: () => void;
}

export function ProjectDetailPage({
  project,
  contributions,
  onBack,
  onAddContribution,
}: ProjectDetailPageProps) {
  const categoryColors: Record<string, string> = {
    writing: 'bg-blue-100 text-blue-700',
    research: 'bg-purple-100 text-purple-700',
    'data-analysis': 'bg-green-100 text-green-700',
    code: 'bg-orange-100 text-orange-700',
    review: 'bg-pink-100 text-pink-700',
    ideation: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="p-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Button>

      <div className="max-w-5xl">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="mb-2">{project.name}</h1>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <Button onClick={onAddContribution}>Add Contribution</Button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Status:</span>
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
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Total Credits:</span>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span>{project.credits}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={contribution.userAvatar} alt={contribution.userName} />
                      <AvatarFallback>{contribution.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{contribution.userName}</span>
                        <Badge
                          variant="secondary"
                          className={`${categoryColors[contribution.category] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {contribution.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{contribution.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {contribution.timestamp.toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1">
                          <Coins className="w-3 h-3 text-yellow-500" />
                          <span>{contribution.tokens} tokens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaborators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{collaborator.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
