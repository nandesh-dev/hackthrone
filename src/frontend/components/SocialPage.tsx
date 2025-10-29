import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SimilarResearcher {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  requestedDaysAgo: number;
}

interface SocialPageProps {
  similarResearchers: SimilarResearcher[];
}

export function SocialPage({ similarResearchers }: SocialPageProps) {
  return (
    <div className="p-8">
      <h1 className="mb-8">Social</h1>

      <div className="max-w-7xl">
        {/* Similar Researchers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                Premium
              </Badge>
              <CardTitle>People interested in research like yours</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarResearchers.map((researcher) => (
                <div key={researcher.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={researcher.avatar} alt={researcher.name} />
                      <AvatarFallback>{researcher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="mb-1">{researcher.name}</h3>
                      <p className="text-gray-500 text-sm">
                        Requested {researcher.requestedDaysAgo}d ago
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {researcher.interests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    View request
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
