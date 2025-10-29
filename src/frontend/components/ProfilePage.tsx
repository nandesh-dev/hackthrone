import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Coins, Award, Briefcase, Calendar } from 'lucide-react';

interface PastProject {
  id: string;
  name: string;
  description: string;
  role: string;
  period: string;
  tokensEarned: number;
}

interface ProfilePageProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    joinDate: Date;
    totalTokens: number;
    totalContributions: number;
    rank: string;
    bio?: string;
    interests: string[];
  };
  stats: {
    writing: number;
    research: number;
    dataAnalysis: number;
    code: number;
    review: number;
    ideation: number;
  };
  pastProjects: PastProject[];
}

export function ProfilePage({ user, stats, pastProjects }: ProfilePageProps) {
  const categoryLabels: Record<string, string> = {
    writing: 'Writing',
    research: 'Research',
    dataAnalysis: 'Data Analysis',
    code: 'Code',
    review: 'Review',
    ideation: 'Ideation',
  };

  return (
    <div className="p-8">
      <h1 className="mb-8">Profile</h1>

      <div className="max-w-7xl space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2>{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {user.bio && (
              <div>
                <h3 className="mb-2">About</h3>
                <p className="text-gray-600 text-sm">{user.bio}</p>
              </div>
            )}

            <div>
              <h3 className="mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since</span>
                <span>{user.joinDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Contributions</span>
                <span>{user.totalContributions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reputation Rank</span>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  <Award className="w-3 h-3 mr-1" />
                  {user.rank}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Coins className="w-10 h-10 text-yellow-500" />
                  <span className="text-5xl">{user.totalTokens}</span>
                </div>
                <p className="text-gray-600">Research Tokens</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Tokens represent verified contributions to research projects. Each token is earned
                through AI-verified work including writing, data analysis, code, and reviews.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contribution Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl mb-1">{value}</div>
                  <div className="text-gray-600 text-sm">{categoryLabels[key]}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Projects & Works */}
      <Card>
        <CardHeader>
          <CardTitle>Past Projects & Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastProjects.map((project) => (
              <div key={project.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3>{project.name}</h3>
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{project.tokensEarned}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                      {project.role}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      </div>
    </div>
  );
}
