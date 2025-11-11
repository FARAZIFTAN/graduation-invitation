import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import GeneratorPage from './components/GeneratorPage';
import InvitePage from './components/InvitePage';
import { showToast } from './utils/helpers';

type Page = 'landing' | 'login' | 'generator' | 'invite';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [guestName, setGuestName] = useState('');
  const [wisudawanName, setWisudawanName] = useState('');
  const [loggedInWisudawanId, setLoggedInWisudawanId] = useState<number | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    
    // Check for new format: /i/:id/:name
    const inviteMatch = path.match(/^\/i\/(\d+)\/([^/]+)$/);
    if (inviteMatch) {
      const wisudawanId = inviteMatch[1];
      const tamu = decodeURIComponent(inviteMatch[2]);
      
      setWisudawanName(wisudawanId); // Pass ID instead of name
      setGuestName(tamu);
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

    // Check if user has active session
    const sessionData = localStorage.getItem('wisuda_session');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        setLoggedInWisudawanId(session.wisudawanId);
      } catch (error) {
        localStorage.removeItem('wisuda_session');
      }
    }
  }, []);

  const handleNavigate = (page: 'generator' | 'info') => {
    if (page === 'generator') {
      // Check if user is logged in
      if (loggedInWisudawanId) {
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

  const handleLogin = (wisudawanId: number) => {
    setLoggedInWisudawanId(wisudawanId);
    setCurrentPage('generator');
    showToast('Login berhasil! Selamat datang 🎓', 'success');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    window.history.pushState({}, '', '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('wisuda_session');
    setLoggedInWisudawanId(null);
    setCurrentPage('landing');
    showToast('Anda telah keluar', 'success');
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
          loggedInWisudawanId={loggedInWisudawanId}
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
