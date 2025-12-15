import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import MiniNav from './components/MiniNav.jsx'
import Footer from './components/Footer';
import Mukhya from './pages/Mukhya.jsx';
import News from './pages/News.jsx';
import ArtsCulture from './pages/ArtsCulture.jsx';
import Interview from './pages/Interview.jsx';
import More from './pages/More.jsx';
import Home from './pages/Home.jsx';
import Social from './pages/Social.jsx';
import Login from './admincomponents/components/Login.jsx';
import Dashboard from './admincomponents/pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import MainManagement from './admincomponents/pages/MainManagement.jsx';
import NewsManagement from './admincomponents/pages/NewsManagement.jsx';
import  ArtsCultureManagement from './admincomponents/pages/ArtscultureManagement.jsx';
import InterviewManagement from './admincomponents/pages/InterviewManagement.jsx';
import MoreManagement from './admincomponents/pages/MoreManagement.jsx';
import SocialManagement from './admincomponents/pages/SocialManagement.jsx';
import HomeManagement from './admincomponents/pages/HomeManagement.jsx';
import { Navigate } from 'react-router-dom';
// Optional: Create this component if you want content on the base /kalpaadmin/dashboard
// import DashboardHome from './admincomponents/pages/DashboardHome.jsx';

// Layout wrappers remain the same
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav/>
      <MiniNav/>
      <main className="flex-1">
        {children}
      </main>
      <Footer/>
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login */}
        <Route path="/kalpaadmin" element={
          <AdminLayout>
            <Login/>
          </AdminLayout>
        } />

        {/* Protected Admin Dashboard with Nested Routes */}
        <Route path="/kalpaadmin/dashboard" element={
          <AdminLayout>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </AdminLayout>
        }>
          {/* Default child route for base /kalpaadmin/dashboard */}
          {/* Option 1: Redirect to main */}
          <Route index element={<Navigate to="main" replace />} />
          {/* Or Option 2: Custom welcome page */}
          {/* <Route index element={<DashboardHome />} /> */}

          <Route path="main" element={<MainManagement />} />
          {/* Add other admin management pages here */}
          <Route path="news" element={<NewsManagement />} />
          <Route path="arts-culture" element={<ArtsCultureManagement />} />
          <Route path="interviews" element={<InterviewManagement />} />
          <Route path="social-media" element={<SocialManagement />} />
          <Route path="more" element={<MoreManagement />} />
          <Route path="home" element={<HomeManagement />} />
          {/* Catch-all for unknown sub-paths */}
          <Route path="*" element={<div>Admin Page Not Found</div>} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <Home/>
          </PublicLayout>
        } />

        <Route path="/main" element={
          <PublicLayout>
            <Mukhya/>
          </PublicLayout>
        } />

        <Route path="/news" element={
          <PublicLayout>
            <News/>
          </PublicLayout>
        } />

        <Route path="/artsandculture" element={
          <PublicLayout>
            <ArtsCulture/>
          </PublicLayout>
        } />

        <Route path="/interview" element={
          <PublicLayout>
            <Interview/>
          </PublicLayout>
        } />

        <Route path="/more" element={
          <PublicLayout>
            <More />
          </PublicLayout>
        } />

        <Route path="/social" element={
          <PublicLayout>
            <Social/>
          </PublicLayout>
        } />
      </Routes>
    </Router>
  )
}

export default App