import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

// 1. ALL IMAGES IMPORTED HERE
import myLogo from '../assets/sidebar-logo.svg'; 
import myRobot from '../assets/robot-icon.png'; 
import trash1 from '../assets/trash1.png'; 
import trash2 from '../assets/trash2.png'; 
import trash3 from '../assets/trash3.png'; 
import GlassCard from '../components/ui/GlassCard';

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const totalChars = email.length + password.length;
  const progressPercentage = Math.min((totalChars / 30) * 100, 100);

  // 2. TRASH ARRAY UPDATED WITH PNGs
  const trashItems = [
    { id: 1, pos: 15, img: trash1 },
    { id: 2, pos: 35, img: trash2 },
    { id: 3, pos: 55, img: trash3 },
    { id: 4, pos: 75, img: trash1 },
    { id: 5, pos: 95, img: trash2 },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email && password) {
      try {
        // 1. Show a loading toast
        const toastId = toast.loading("Connecting to server...");

        // 2. Make the API Call
        const response = await api.post('/admin/login', {
          email: email,
          password: password
        });

        // 3. X-RAY: Log exactly what the server sends back
        console.log("FULL SERVER RESPONSE:", response);

        // 4. Try to find the token. (Laravel sometimes wraps data in a 'data' object!)
        const token = 
          response.data?.token || 
          response.data?.access_token || 
          response.data?.admin_token || 
          response.data?.data?.token;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("isAuthenticated", "true");
          setIsAuthenticated(true);
          toast.success("Login Successful!", { id: toastId });
          navigate("/"); 
        } else {
          // If the password was right, but we can't find the token text:
          toast.error("Login worked, but couldn't find the token in the response!", { id: toastId });
          console.error("Looking for token, but got this instead:", response.data);
        }

      } catch (error) {
        // X-RAY ERROR HANDLING:
        console.error("FULL ERROR:", error);
        
        if (!error.response) {
          // ERROR TYPE A: The browser blocked the request before it reached the server!
          toast.error("NETWORK ERROR: Server is unreachable or CORS is blocking us.");
          alert("Tell your backend dev: 'The browser is throwing a Network Error. Please check if CORS is enabled for localhost in Laravel!'");
        } 
        else if (error.response.status === 422) {
          // ERROR TYPE B: Laravel Validation Error
          toast.error("Laravel Validation Error: Check your console.");
          console.error("Laravel Errors:", error.response.data.errors);
        }
        else {
          // ERROR TYPE C: Standard 401 Unauthorized
          toast.error(`Server said: ${error.response.data.message || "Invalid credentials"}`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f18] to-black flex items-center justify-center relative overflow-hidden p-6">
      
      {/* 3. CSS FOR WATER AND BOBBING ANIMATION */}
      <style>{`
        @keyframes spin-water {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        
        /* NEW: The Bobbing Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3.5s ease-in-out infinite 1s;
        }
        
        .water-layer {
          position: absolute;
          left: 50%;
          width: 800px;
          height: 800px;
          border-radius: 40%;
          animation: spin-water infinite linear;
        }
        .water-1 { animation-duration: 6s; top: 15px; opacity: 0.3; }
        .water-2 { animation-duration: 9s; top: 20px; opacity: 0.5; border-radius: 43%; }
        .water-3 { animation-duration: 12s; top: 25px; opacity: 0.8; border-radius: 45%; }
      `}</style>

      {/* Decorative Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Outer Card (The 3D Camera) */}
      <div className="group w-full max-w-md h-[500px] [perspective:1000px] z-10">
        
        {/* Inner Card (The Rotating Box) */}
        <div className="relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-3xl">
          
          {/* --- FRONT SIDE --- */}
          <div className="absolute inset-0 w-full h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 [backface-visibility:hidden]">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20 shadow-[0_0_30px_rgba(19,91,236,0.3)] p-4">
              <img src={myLogo} alt="Blue Sentinel" className="w-full h-full object-contain" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">Blue Sentinel</h1>
              <p className="text-sm text-slate-400 max-w-[250px] mx-auto leading-relaxed">
                Sign in to access the Admin Console and monitor global operations.
              </p>
            </div>
            <div className="absolute bottom-8 text-primary animate-bounce flex flex-col items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-widest">Hover to Login</span>
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>

          {/* --- BACK SIDE --- */}
          <div className="absolute inset-0 w-full h-full backdrop-blur-xl bg-[#0a0f18]/80 border border-primary/20 rounded-3xl p-8 flex flex-col justify-center gap-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            
            {/* THE NEW RIVER COMPONENT */}
            <div className="relative w-full h-24 bg-[#06101c] rounded-2xl border border-slate-700 overflow-hidden flex items-center shadow-inner">
              
              {/* THE WATER ILLUSION */}
              <div className="water-layer water-1 bg-blue-600"></div>
              <div className="water-layer water-2 bg-cyan-700"></div>
              <div className="water-layer water-3 bg-blue-900"></div>

              {/* 4. THE TRASH PNGs (With bobbing animation) */}
              {trashItems.map((item, index) => {
                const isCleaned = progressPercentage >= item.pos;
                return (
                  <div 
                    key={item.id} 
                    className={`absolute transition-opacity duration-300 ease-in-out z-10 ${index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`} 
                    style={{ left: `${item.pos}%`, opacity: isCleaned ? 0 : 1 }}
                  >
                    <img 
                      src={item.img} 
                      alt="waste" 
                      className="w-8 h-8 object-contain drop-shadow-lg" 
                    />
                  </div>
                );
              })}

              {/* 5. THE CUSTOM ROBOT (Made bigger and bobbing) */}
              <div 
                className="absolute flex items-center justify-center transition-all duration-150 ease-out z-20 animate-float"
                style={{ left: `max(2%, calc(${progressPercentage}% - 30px))` }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center relative">
                  <img 
                    src={myRobot} 
                    alt="Robot" 
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(19,91,236,0.8)]" 
                  />
                  {/* Engine trail */}
                  {progressPercentage > 0 && progressPercentage < 100 && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-1 bg-cyan-400/80 rounded-full animate-pulse blur-[1px]"></div>
                  )}
                </div>
              </div>
            </div>

            {/* The Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">mail</span>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="admin@bluesentinel.ai" />
                </div>
              </div>
              <div className="space-y-2">
            <div className="flex items-center justify-between pl-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
              {/* <a href="#" className="text-[10px] font-bold text-primary hover:text-white transition-colors">Forgot?</a> */}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm z-10">lock</span>
              
              <input 
                type={showPassword ? "text" : "password"} // <--- MAGIC HAPPENS HERE
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />

              {/* THE PEEK BUTTON */}
              <button 
                type="button" // Prevents the form from submitting when you click the eye!
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>

            </div>
          </div>
              <button type="submit" className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4">
                Sign In <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}