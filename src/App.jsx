import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';

import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import GeneralApp from './pages/GeneralApp';
import Reports from './pages/ReportsPage';
import Rewards from './pages/Rewards';
import AddReward from './pages/AddReward';
import ActivityLogs from './pages/ActivityLogs';
import Settings from './pages/Settings';
import Profile from './pages/Profile';


export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to OPEN

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDark = () => setIsDarkMode(!isDarkMode);

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
        
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <TopHeader 
            toggleDark={toggleDark} 
            isProfileOpen={isProfileOpen} 
            setIsProfileOpen={setIsProfileOpen} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* ADDED GLOBAL PADDING HERE (p-6 lg:p-8) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user-details" element={<UserDetails />} />
              <Route path="/general" element={<GeneralApp />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/add-reward" element={<AddReward />} />
              <Route path="/logs" element={<ActivityLogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/Profile" element={<Profile />} />

            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}