
const DashboardFooter = () => {
  return (
    <footer className="mt-16 py-8 text-center space-y-4">
      <div className="flex justify-center space-x-6 text-sm text-gray-500">
        <a href="#" className="hover:text-gray-700 transition-colors">Help Center</a>
        <a href="#" className="hover:text-gray-700 transition-colors">Community</a>
        <a href="#" className="hover:text-gray-700 transition-colors font-medium">Crisis Support</a>
        <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
        <a href="#" className="hover:text-gray-700 transition-colors">Press Kit</a>
      </div>
      <p className="text-xs text-gray-400 italic">
        "Your journey matters. Every small step counts."
      </p>
    </footer>
  );
};

export default DashboardFooter;
