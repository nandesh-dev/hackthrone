import { FolderKanban, FileText, User, Coins, Users } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contributions', label: 'Contributions', icon: FileText },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'tokens', label: 'Tokens', icon: Coins },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-white">R</span>
        </div>
        <span>Research Hub</span>
      </div>
      
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
