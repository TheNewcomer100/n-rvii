
interface DashboardFooterProps {
  onNavigate: (page: string) => void;
}

const DashboardFooter = ({ onNavigate }: DashboardFooterProps) => {
  return (
    <footer className="mt-16 py-8 text-center space-y-4">
      <div className="flex justify-center space-x-6 text-sm text-gray-500">
        <button onClick={() => onNavigate('help')} className="hover:text-gray-700 transition-colors">Help Center</button>
        <button onClick={() => onNavigate('community')} className="hover:text-gray-700 transition-colors">Community</button>
        <button onClick={() => onNavigate('crisis')} className="hover:text-gray-700 transition-colors font-medium text-red-600 hover:text-red-700">Crisis Support</button>
        <button onClick={() => onNavigate('privacy')} className="hover:text-gray-700 transition-colors">Privacy</button>
        <button onClick={() => onNavigate('terms')} className="hover:text-gray-700 transition-colors">Terms</button>
      </div>
      <p className="text-xs text-gray-400 italic">
        "Your journey matters. Every small step counts."
      </p>
    </footer>
  );
};

export default DashboardFooter;
