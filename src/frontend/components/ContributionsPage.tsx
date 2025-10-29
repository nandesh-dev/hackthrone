import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Coins } from 'lucide-react';

interface Contribution {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  tokens: number;
  category: string;
  timestamp: Date;
  effort: string;
}

interface ContributionsPageProps {
  contributions: Contribution[];
  onAddContribution: () => void;
}

export function ContributionsPage({ contributions, onAddContribution }: ContributionsPageProps) {
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
      <div className="flex items-center justify-between mb-8">
        <h1>Contributions</h1>
        <Button onClick={onAddContribution}>Add Contribution</Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-gray-600">Project</th>
              <th className="text-left px-6 py-4 text-gray-600">Description</th>
              <th className="text-left px-6 py-4 text-gray-600">Category</th>
              <th className="text-left px-6 py-4 text-gray-600">Effort</th>
              <th className="text-left px-6 py-4 text-gray-600">Tokens</th>
              <th className="text-left px-6 py-4 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">{contribution.projectName}</td>
                <td className="px-6 py-4 text-gray-600">{contribution.description}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant="secondary"
                    className={`${categoryColors[contribution.category] || 'bg-gray-100 text-gray-700'} hover:${categoryColors[contribution.category] || 'bg-gray-100'}`}
                  >
                    {contribution.category.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-600">{contribution.effort}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>{contribution.tokens}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {contribution.timestamp.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
