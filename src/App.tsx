import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import GeneratorPage from './components/GeneratorPage';
import InvitePage from './components/InvitePage';
import { showToast } from './utils/helpers';
import { authAPI, getToken } from '@/services/api';

type Page = 'landing' | 'login' | 'generator' | 'invite';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [guestName, setGuestName] = useState('');
  const [wisudawanName, setWisudawanName] = useState('');
  const [loggedInWisudawan, setLoggedInWisudawan] = useState<any>(null);

  useEffect(() => {
    const path = window.location.pathname;
    
    // Check for new format: /i/:id/:slug
    const inviteMatch = path.match(/^\/i\/([^/]+)\/([^/]+)$/);
    if (inviteMatch) {
      const wisudawanId = inviteMatch[1];
      const tamuSlug = inviteMatch[2]; // Keep as slug (with dashes)
      
      setWisudawanName(wisudawanId); // Pass ID
      setGuestName(tamuSlug); // Pass slug for validation
      setCurrentPage('invite');
      return;
    }
    
    // Fallback: Check old format query params
    const params = new URLSearchParams(window.location.search);
    const w = params.get('w');
    const t = params.get('t');

    if (w && t) {
      setWisudawanName(decodeURIComponent(w));
      setGuestName(decodeURIComponent(t));
      setCurrentPage('invite');
      return;
    }

    // Check if user has active session with backend verification
    checkSession();
  }, []);

  const checkSession = async () => {
    const token = getToken();
    const sessionData = localStorage.getItem('wisuda_session');
    
    if (!token || !sessionData) return;
    
    try {
      // Verify session with backend
      const session = await authAPI.verifySession();
      setLoggedInWisudawan(session);
      setCurrentPage('generator');
    } catch (error) {
      // Token expired or invalid, clear session
      authAPI.logout();
      localStorage.removeItem('wisuda_session');
    }
  };

  const handleNavigate = (page: 'generator' | 'info') => {
    if (page === 'generator') {
      // Check if user is logged in
      if (loggedInWisudawan) {
        setCurrentPage('generator');
      } else {
        setCurrentPage('login');
      }
    } else {
      const infoSection = document.getElementById('info-section');
      if (infoSection) {
        infoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogin = (session: any) => {
    setLoggedInWisudawan(session);
    setCurrentPage('generator');
    showToast('Login berhasil! Selamat datang 🎓', 'success');
  };

  const handleBackToLanding = () => {
    // Just go back to landing, keep session for refresh
    setCurrentPage('landing');
    window.history.pushState({}, '', '/');
  };

  const handleLogout = () => {
    // Clear session and token
    authAPI.logout();
    localStorage.removeItem('wisuda_session');
    setLoggedInWisudawan(null);
    setCurrentPage('landing');
    window.history.pushState({}, '', '/');
    showToast('Anda telah logout', 'success');
  };

  const handleInvalidLink = () => {
    showToast('Link undangan tidak valid', 'error');
    setTimeout(() => {
      handleBackToLanding();
    }, 2000);
  };

  return (
    <>
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'generator' && (
        <GeneratorPage 
          onBack={handleBackToLanding} 
          loggedInWisudawan={loggedInWisudawan}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'invite' && (
        <InvitePage
          guestName={guestName}
          wisudawanName={wisudawanName}
          onInvalidLink={handleInvalidLink}
        />
      )}
    </>
  );
}

export default App;
