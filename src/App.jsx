import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // IMPORT Navigate
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';

import Login from './pages/Login'; // IMPORT THE LOGIN PAGE
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import GeneralApp from './pages/GeneralApp';
import Reports from './pages/ReportsPage';
import ReportDetails from './pages/ReportDetails';
import Rewards from './pages/Rewards';
import AddReward from './pages/AddReward';
import ActivityLogs from './pages/ActivityLogs';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import EditReward from './pages/EditReward';


import RecyclingInventory from './pages/RecyclingInventory';
  import AddBatch from './pages/AddBatch';

import RecyclingOrders from './pages/RecyclingOrders';
  import RecyclingOrderDetails from './pages/RecyclingOrderDetails';


export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 1. AUTHENTICATION STATE (Checks if they logged in previously)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

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

  // 2. THE BOUNCER COMPONENT
  // If they aren't authenticated, redirect them instantly to /login
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      
      <Routes>
        {/* ===================================== */}
        {/* PUBLIC ROUTE (No Sidebar, No Header) */}
        {/* ===================================== */}
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />

        {/* ===================================== */}
        {/* PROTECTED ROUTES (The Main Dashboard) */}
        {/* ===================================== */}
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
              
              <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

              <main className="flex-1 flex flex-col overflow-hidden">
                <TopHeader 
                  toggleDark={toggleDark} 
                  isProfileOpen={isProfileOpen} 
                  setIsProfileOpen={setIsProfileOpen} 
                  toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                  setIsAuthenticated={setIsAuthenticated} // Pass this so we can logout!
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/user-details/:id" element={<UserDetails />} />
                    <Route path="/general" element={<GeneralApp />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/reports/:id" element={<ReportDetails />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/add-reward" element={<AddReward />} />
                    <Route path="/logs" element={<ActivityLogs />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit-reward/:id" element={<EditReward />} />

                     {/* NEW RECYCLING APP ROUTE */}
                    <Route path="/recycling/inventory" element={<RecyclingInventory />} />
                      <Route path="/recycling/add-batch" element={<AddBatch />} />
                      
                    <Route path="/recycling/orders" element={<RecyclingOrders />} />
                      <Route path="/recycling/orders/:id" element={<RecyclingOrderDetails />} />
                      
                  </Routes>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}