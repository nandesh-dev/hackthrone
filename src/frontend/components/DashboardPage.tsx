import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Coins } from 'lucide-react';

interface Contribution {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  tokens: number;
  category: string;
  timestamp: Date;
}

interface DashboardPageProps {
  userName: string;
  totalTokens: number;
  contributions: Contribution[];
  onViewAllContributions: () => void;
}

export function DashboardPage({
  userName,
  totalTokens,
  contributions,
  onViewAllContributions,
}: DashboardPageProps) {
  return (
    <div className="p-8">
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <h2>{userName}</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{totalTokens}</span>
                <Coins className="w-6 h-6 text-blue-500" />
              </div>
            </div>

            <div>
              <h3 className="mb-4">Contributions</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-gray-600">Project</th>
                      <th className="text-left px-4 py-3 text-gray-600">Description</th>
                      <th className="text-right px-4 py-3 text-gray-600">Tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributions.slice(0, 4).map((contribution) => (
                      <tr key={contribution.id} className="border-b border-gray-100">
                        <td className="px-4 py-3">{contribution.projectName}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {contribution.description.length > 20
                            ? contribution.description.slice(0, 20) + '...'
                            : contribution.description}
                        </td>
                        <td className="px-4 py-3 text-right">{contribution.tokens}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button onClick={onViewAllContributions} className="w-full mt-4">
                See all contributions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
