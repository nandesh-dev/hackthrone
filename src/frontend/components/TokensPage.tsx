import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, TrendingUp, Award } from 'lucide-react';

interface TokenTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  project: string;
  description: string;
  timestamp: Date;
}

interface TokensPageProps {
  totalTokens: number;
  transactions: TokenTransaction[];
}

export function TokensPage({ totalTokens, transactions }: TokensPageProps) {
  const earnedThisMonth = transactions
    .filter((t) => t.type === 'earned' && t.timestamp.getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-8">
      <h1 className="mb-8">Tokens</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-yellow-500" />
              <span className="text-4xl">{totalTokens}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earned This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-4xl">{earnedThisMonth}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reputation Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-500" />
              <span className="text-2xl">
                {totalTokens < 100 ? 'Contributor' : totalTokens < 500 ? 'Researcher' : 'Expert'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{transaction.project}</span>
                    <Badge
                      variant={transaction.type === 'earned' ? 'default' : 'secondary'}
                      className={
                        transaction.type === 'earned'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-red-100 text-red-700 hover:bg-red-100'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {transaction.timestamp.toLocaleDateString()} at{' '}
                    {transaction.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span
                    className={`text-xl ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'earned' ? '+' : '-'}
                    {transaction.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
