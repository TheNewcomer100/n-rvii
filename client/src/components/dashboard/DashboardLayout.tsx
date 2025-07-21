import { ReactNode } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Glassmorphism container */}
      <div className="min-h-screen backdrop-blur-sm">
        {/* Header */}
        <div className="sticky top-0 z-50">
          <DashboardHeader 
            userName="User"
            streak={0}
            goalCount={0}
            goalLimit={5}
            onSickDay={() => {}}
            onShowSettings={() => {}}
          />
        </div>
        
        {/* Main content area */}
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Content takes full width on mobile, responsive grid on desktop */}
              <div className="lg:col-span-12">
                {children}
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <DashboardFooter onNavigate={(page) => console.log('Navigate to:', page)} />
      </div>
    </div>
  );
};

export default DashboardLayout;