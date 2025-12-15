// admincomponents/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  Home,
  LayoutDashboard, 
  Newspaper, 
  Palette, 
  Mic, 
  Share2, 
  MoreHorizontal,
  LogOut,
  Users,
  FileText,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/kalpaadmin');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/kalpaadmin/dashboard' },
    { name: 'Home', icon: Home, path: '/kalpaadmin/dashboard/home' },
    { name: 'Main Management', icon: LayoutDashboard, path: '/kalpaadmin/dashboard/main' },
    { name: 'News', icon: Newspaper, path: '/kalpaadmin/dashboard/news' },
    { name: 'Arts and Culture', icon: Palette, path: '/kalpaadmin/dashboard/arts-culture' },
    { name: 'Interviews', icon: Mic, path: '/kalpaadmin/dashboard/interviews' },
    { name: 'Social Media', icon: Share2, path: '/kalpaadmin/dashboard/social-media' },
    { name: 'More', icon: MoreHorizontal, path: '/kalpaadmin/dashboard/more' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Dashboard Overview Component
  const DashboardOverview = () => {
    const dashboardCards = [
      { 
        name: 'Home', 
        icon: Home, 
        path: '/kalpaadmin/dashboard/home',
        description: 'Manage home page content',
        color: 'from-blue-500 to-blue-600'
      },
      { 
        name: 'Main Management', 
        icon: LayoutDashboard, 
        path: '/kalpaadmin/dashboard/main',
        description: 'Main site configuration',
        color: 'from-green-500 to-green-600'
      },
      { 
        name: 'News', 
        icon: Newspaper, 
        path: '/kalpaadmin/dashboard/news',
        description: 'Create and manage news articles',
        color: 'from-purple-500 to-purple-600'
      },
      { 
        name: 'Arts and Culture', 
        icon: Palette, 
        path: '/kalpaadmin/dashboard/arts-culture',
        description: 'Manage arts and culture content',
        color: 'from-pink-500 to-pink-600'
      },
      { 
        name: 'Interviews', 
        icon: Mic, 
        path: '/kalpaadmin/dashboard/interviews',
        description: 'Add and edit interviews',
        color: 'from-orange-500 to-orange-600'
      },
      { 
        name: 'Social Media', 
        icon: Share2, 
        path: '/kalpaadmin/dashboard/social-media',
        description: 'Manage social media posts',
        color: 'from-cyan-500 to-cyan-600'
      },
      { 
        name: 'More', 
        icon: MoreHorizontal, 
        path: '/kalpaadmin/dashboard/more',
        description: 'Additional settings and options',
        color: 'from-gray-500 to-gray-600'
      },
    ];

    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Kalpa Admin</h2>
          <p className="text-gray-400">Select a module to manage your content</p>
        </div>

        {/* Management Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.name}
                onClick={() => navigate(card.path)}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 text-left group"
              >
                <div className={`p-4 rounded-lg bg-gradient-to-br ${card.color} inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Vertical Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-gray-950 border-r border-gray-800 flex flex-col`}>
        <div className="p-6 border-b border-gray-800">
          <h1 className={`text-2xl font-bold text-white ${!sidebarOpen && 'text-center'}`}>
            {sidebarOpen ? 'Kalpa Admin' : 'KA'}
          </h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition duration-200 group
                      ${active 
                        ? 'bg-gray-800 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    <Icon className="h-6 w-6 flex-shrink-0" />
                    <span className={`${!sidebarOpen && 'hidden'} transition-opacity`}>
                      {item.name}
                    </span>
                    {!sidebarOpen && (
                      <span className="absolute left-20 bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-sm pointer-events-none">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/30 transition duration-200 group"
          >
            <LogOut className="h-6 w-6 flex-shrink-0" />
            <span className={`${!sidebarOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white lg:hidden"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white">
              {menuItems.find(item => isActive(item.path))?.name || 'Admin Dashboard'}
            </h2>

            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="text-lg font-medium text-white">{user?.username || 'Admin'}</p>
            </div>
          </div>
        </header>

        {/* Main content - Show Dashboard Overview or child routes */}
        <main className="flex-1 p-8 overflow-y-auto">
          {location.pathname === '/kalpaadmin/dashboard' ? (
            <DashboardOverview />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}