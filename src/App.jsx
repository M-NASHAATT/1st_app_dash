
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import GeneralApp from './pages/GeneralApp'; // Your General App!
import Reports from './pages/ReportsPage';
import Rewards from './pages/Rewards';
import AddReward from './pages/AddReward';
import ActivityLogs from './pages/ActivityLogs';
import Settings from './pages/Settings';
import Profile from './pages/Profile';



export default function App() {
  // States for interactive UI
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dark Mode Toggle
    const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
   // 3. THE TRIGGER (useEffect)
  // This runs immediately when the app opens, AND whenever isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]); // The array means: "Only run this if isDarkMode changes"

  // 4. THE TOGGLE FUNCTION
  const toggleDark = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
    <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#1e293b', // Dark slate background
            color: '#fff',         // White text
            borderRadius: '10px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' }, // Emerald green checkmark
          },
        }} 
      />
      
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
        
        {/* SIDEBAR */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* HEADER */}
          <TopHeader 
            toggleDark={toggleDark} 
            isProfileOpen={isProfileOpen} 
            setIsProfileOpen={setIsProfileOpen} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* MAIN PAGE CONTENT */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
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
              <Route path="/profile" element={<Profile />} />

            </Routes>
          </div>

        </main>
      </div>
    </BrowserRouter>
  );
}