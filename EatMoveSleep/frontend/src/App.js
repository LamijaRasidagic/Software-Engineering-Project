import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Naslovna from './pages/Naslovna';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import Workouts from './pages/Workouts';
import Sleep from './pages/Sleep';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import EditProfile from './pages/EditProfile';
import Logout from './pages/Logout';
import CurrentStatus from './pages/CurrentStatus';
import Privacy from './pages/Privacy';
import Milestones from './pages/Milestones';
import ProgressSummary from './pages/ProgressSummary';

import TopNavbar from './components/TopNavbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('ems_logged_in') === 'true';
  const hideNavbarPaths = ['/', '/login', '/signup'];
  const shouldShowNavbar = isLoggedIn && !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <TopNavbar />}

      <Routes>
        {/* Javne rute */}
        <Route path="/" element={<Naslovna />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        {/* Zaštićene rute */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/meals" element={<ProtectedRoute><Meals /></ProtectedRoute>} />
        <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
        <Route path="/sleep" element={<ProtectedRoute><Sleep /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/status" element={<ProtectedRoute><CurrentStatus /></ProtectedRoute>} />
        <Route path="/privacy" element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
        <Route path="/milestones" element={<ProtectedRoute><Milestones /></ProtectedRoute>} />
        <Route path="/progressSummary" element={<ProtectedRoute><ProgressSummary /></ProtectedRoute>} />

        {/* Fallback za nepostojeće rute */}
        <Route path="*" element={<Naslovna />} />
      </Routes>
    </>
  );
}

export default App;
