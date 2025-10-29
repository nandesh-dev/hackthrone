import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProjectsPage } from './components/ProjectsPage';
import { ContributionsPage } from './components/ContributionsPage';
import { ProfilePage } from './components/ProfilePage';
import { TokensPage } from './components/TokensPage';
import { DashboardPage } from './components/DashboardPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { SocialPage } from './components/SocialPage';
import { LoginSurveyPage } from './components/LoginSurveyPage';
import { AddContributionDialog } from './components/AddContributionDialog';
import { VerificationModal } from './components/VerificationModal';
import { CreateProjectDialog } from './components/CreateProjectDialog';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';


interface Project {
  id: string;
  name: string;
  description: string;
  collaborators: Array<{ id: string; name: string; avatar: string }>;
  verificationStatus: 'verified' | 'in-review';
  credits: number;
}

interface Contribution {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  tokens: number;
  category: string;
  timestamp: Date;
  effort: string;
  userName: string;
  userAvatar: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSurveyData, setUserSurveyData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAddContribution, setShowAddContribution] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [pendingContribution, setPendingContribution] = useState<any>(null);

  // Mock user data
  const currentUser = {
    id: 'user1',
    name: 'Jane Doe',
    email: 'jane.doe@research.com',
    avatar: 'https://images.unsplash.com/photo-1758685734503-58a8accc24e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXNlYXJjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNjQ3MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    joinDate: new Date('2024-06-15'),
    totalTokens: 5820,
    totalContributions: 48,
    rank: 'Senior Researcher',
    bio: 'Research scientist specializing in decentralized systems and AI-driven collaboration platforms. Passionate about creating transparent and fair research ecosystems.',
    interests: ['Blockchain', 'AI', 'Decentralized Systems', 'Research Collaboration', 'Data Science'],
  };

  // Mock similar researchers
  const similarResearchers = [
    {
      id: 'sr1',
      name: 'Dr. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1758685848602-09e52ef9c7d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY2llbnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE3MTQzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      interests: ['Blockchain', 'Cryptography', 'Distributed Systems'],
      requestedDaysAgo: 1,
    },
    {
      id: 'sr2',
      name: 'Prof. Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1688588162416-f7a7e726e0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaGVyJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYxNzE0Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      interests: ['AI', 'Machine Learning', 'Research Collaboration'],
      requestedDaysAgo: 2,
    },
    {
      id: 'sr3',
      name: 'Dr. Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1758685845906-6f705cde4fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTcxNDM3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      interests: ['Data Science', 'Analytics', 'AI'],
      requestedDaysAgo: 3,
    },
    {
      id: 'sr4',
      name: 'Dr. Emily Zhang',
      avatar: 'https://images.unsplash.com/photo-1752952952773-80378cefc23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNjQ3NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      interests: ['Decentralized Systems', 'Blockchain', 'Smart Contracts'],
      requestedDaysAgo: 4,
    },
  ];

  // Mock past projects
  const pastProjects = [
    {
      id: 'pp1',
      name: 'Quantum Computing Research',
      description: 'Advanced research on quantum algorithms for cryptographic applications',
      role: 'Lead Researcher',
      period: 'Jan 2024 - Aug 2024',
      tokensEarned: 450,
    },
    {
      id: 'pp2',
      name: 'Neural Network Optimization',
      description: 'Development of efficient neural network architectures for medical imaging',
      role: 'Data Scientist',
      period: 'Mar 2023 - Dec 2023',
      tokensEarned: 380,
    },
    {
      id: 'pp3',
      name: 'Blockchain Consensus Mechanisms',
      description: 'Analysis and improvement of proof-of-stake consensus protocols',
      role: 'Core Contributor',
      period: 'Jun 2023 - Nov 2023',
      tokensEarned: 320,
    },
    {
      id: 'pp4',
      name: 'Decentralized Identity Systems',
      description: 'Building privacy-preserving identity verification systems',
      role: 'Researcher',
      period: 'Sep 2022 - May 2023',
      tokensEarned: 280,
    },
  ];

  // Mock projects data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'p1',
      name: 'Decentralized Research Hub',
      description: 'A platform for transparent and fair research collaboration',
      collaborators: [
        {
          id: 'u1',
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=100',
        },
        {
          id: 'u2',
          name: 'Sarah Kim',
          avatar: 'https://images.unsplash.com/photo-1758573466927-87ba2f725c7e?w=100',
        },
      ],
      verificationStatus: 'verified',
      credits: 125.5,
    },
    {
      id: 'p2',
      name: 'AI for Healthcare',
      description: 'A system to improve medical diagnosis',
      collaborators: [
        {
          id: 'u3',
          name: 'Michael Park',
          avatar: 'https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=120',
        },
        {
          id: 'u4',
          name: 'Emily Zhang',
          avatar: 'https://images.unsplash.com/photo-1758573466927-87ba2f725c7e?w=120',
        },
        {
          id: 'u5',
          name: 'David Lee',
          avatar: 'https://images.unsplash.com/photo-1758685734503-58a8accc24e8?w=120',
        },
      ],
      verificationStatus: 'in-review',
      credits: 95.0,
    },
    {
      id: 'p3',
      name: 'Sustainable Energy',
      description: 'Innovative approaches to renewable energy',
      collaborators: [
        {
          id: 'u6',
          name: 'Lisa Wang',
          avatar: 'https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=140',
        },
        {
          id: 'u7',
          name: 'James Miller',
          avatar: 'https://images.unsplash.com/photo-1758573466927-87ba2f725c7e?w=140',
        },
      ],
      verificationStatus: 'verified',
      credits: 60.0,
    },
    {
      id: 'p4',
      name: 'Blockchain in Supply Chain',
      description: 'Enhancing transparency and efficiency',
      collaborators: [
        {
          id: 'u8',
          name: 'Rachel Green',
          avatar: 'https://images.unsplash.com/photo-1758685734503-58a8accc24e8?w=140',
        },
        {
          id: 'u9',
          name: 'Tom Brown',
          avatar: 'https://images.unsplash.com/photo-1759844197486-5b3612c7d534?w=160',
        },
        {
          id: 'u10',
          name: 'Anna Davis',
          avatar: 'https://images.unsplash.com/photo-1758573466927-87ba2f725c7e?w=160',
        },
      ],
      verificationStatus: 'in-review',
      credits: 30.0,
    },
  ]);

  // Mock contributions data
  const [contributions, setContributions] = useState<Contribution[]>([
    {
      id: 'c1',
      projectId: 'p1',
      projectName: 'kh1',
      description: 'Quantum',
      tokens: 10,
      category: 'research',
      timestamp: new Date('2024-10-20'),
      effort: '3 hours',
      userName: 'Jane Doe',
      userAvatar: currentUser.avatar,
    },
    {
      id: 'c2',
      projectId: 'p2',
      projectName: 'cm2',
      description: 'Neural Network',
      tokens: 15,
      category: 'writing',
      timestamp: new Date('2024-10-22'),
      effort: '4 hours',
      userName: 'Jane Doe',
      userAvatar: currentUser.avatar,
    },
    {
      id: 'c3',
      projectId: 'p3',
      projectName: 'kh3',
      description: 'Data Analysis',
      tokens: 15,
      category: 'data-analysis',
      timestamp: new Date('2024-10-25'),
      effort: '5 hours',
      userName: 'Jane Doe',
      userAvatar: currentUser.avatar,
    },
    {
      id: 'c4',
      projectId: 'p4',
      projectName: 'kh4',
      description: 'Hypothesis Testing',
      tokens: 10,
      category: 'review',
      timestamp: new Date('2024-10-27'),
      effort: '2 hours',
      userName: 'Jane Doe',
      userAvatar: currentUser.avatar,
    },
  ]);

  // Token transactions
  const tokenTransactions = contributions.map((c) => ({
    id: c.id,
    type: 'earned' as const,
    amount: c.tokens,
    project: c.projectName,
    description: c.description,
    timestamp: c.timestamp,
  }));

  // Calculate contribution stats
  const stats = {
    writing: contributions.filter((c) => c.category === 'writing').reduce((sum, c) => sum + c.tokens, 0),
    research: contributions.filter((c) => c.category === 'research').reduce((sum, c) => sum + c.tokens, 0),
    dataAnalysis: contributions.filter((c) => c.category === 'data-analysis').reduce((sum, c) => sum + c.tokens, 0),
    code: contributions.filter((c) => c.category === 'code').reduce((sum, c) => sum + c.tokens, 0),
    review: contributions.filter((c) => c.category === 'review').reduce((sum, c) => sum + c.tokens, 0),
    ideation: contributions.filter((c) => c.category === 'ideation').reduce((sum, c) => sum + c.tokens, 0),
  };

  // AI verification simulation
  const verifyContribution = (contribution: { task: string; category: string; effort: string }) => {
    // Simple AI simulation: assign tokens based on effort
    const effortValue = parseInt(contribution.effort) || 2;
    const baseTokens = effortValue * 5;
    const confidenceScore = Math.random() * 0.3 + 0.7; // 70-100%
    const tokens = Math.round(baseTokens * confidenceScore);

    return {
      ...contribution,
      tokens,
    };
  };

  const handleAddContribution = (contribution: { task: string; category: string; effort: string }) => {
    const verified = verifyContribution(contribution);
    setPendingContribution(verified);
    setShowAddContribution(false);
    setShowVerification(true);
  };

  const handleVerificationClose = () => {
    if (pendingContribution) {
      const selectedProject = selectedProjectId
        ? projects.find((p) => p.id === selectedProjectId)
        : projects[0];

      const newContribution: Contribution = {
        id: `c${contributions.length + 1}`,
        projectId: selectedProject?.id || 'p1',
        projectName: selectedProject?.name.slice(0, 3).toLowerCase() || 'kh1',
        description: pendingContribution.task,
        tokens: pendingContribution.tokens,
        category: pendingContribution.category,
        timestamp: new Date(),
        effort: pendingContribution.effort,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      };

      setContributions([newContribution, ...contributions]);
      
      // Update project credits
      if (selectedProject) {
        setProjects(
          projects.map((p) =>
            p.id === selectedProject.id ? { ...p, credits: p.credits + pendingContribution.tokens } : p
          )
        );
      }

      setPendingContribution(null);
    }
    setShowVerification(false);
  };

  const handleCreateProject = (projectData: { name: string; description: string }) => {
    const newProject: Project = {
      id: `p${projects.length + 1}`,
      name: projectData.name,
      description: projectData.description,
      collaborators: [
        {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
      ],
      verificationStatus: 'in-review',
      credits: 0,
    };
    setProjects([newProject, ...projects]);
    setShowCreateProject(false);
  };

  const selectedProject = selectedProjectId ? projects.find((p) => p.id === selectedProjectId) : null;
  const projectContributions = selectedProjectId
    ? contributions.filter((c) => c.projectId === selectedProjectId)
    : [];

  const handleSurveySubmit = (data: any) => {
    setUserSurveyData(data);
    setIsLoggedIn(true);
  };

  // Show login survey if user is not logged in
  if (!isLoggedIn) {
    return <LoginSurveyPage onSubmit={handleSurveySubmit} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-end p-4 bg-white border-b border-gray-200">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {selectedProject ? (
          <ProjectDetailPage
            project={selectedProject}
            contributions={projectContributions}
            onBack={() => setSelectedProjectId(null)}
            onAddContribution={() => setShowAddContribution(true)}
          />
        ) : (
          <>
            {activeTab === 'projects' && (
              <ProjectsPage
                projects={projects}
                onCreateProject={() => setShowCreateProject(true)}
                onSelectProject={setSelectedProjectId}
              />
            )}
            {activeTab === 'contributions' && (
              <ContributionsPage
                contributions={contributions}
                onAddContribution={() => setShowAddContribution(true)}
              />
            )}
            {activeTab === 'social' && <SocialPage similarResearchers={similarResearchers} />}
            {activeTab === 'profile' && (
              <ProfilePage
                user={currentUser}
                stats={stats}
                pastProjects={pastProjects}
              />
            )}
            {activeTab === 'tokens' && (
              <TokensPage totalTokens={currentUser.totalTokens} transactions={tokenTransactions} />
            )}
          </>
        )}
      </div>

      <AddContributionDialog
        open={showAddContribution}
        onClose={() => setShowAddContribution(false)}
        onSubmit={handleAddContribution}
      />

      <VerificationModal
        open={showVerification}
        onClose={handleVerificationClose}
        contribution={pendingContribution}
      />

      <CreateProjectDialog
        open={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
