import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GeneratorPage from './components/GeneratorPage';
import InvitePage from './components/InvitePage';
import { showToast } from './utils/helpers';

type Page = 'landing' | 'generator' | 'invite';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [guestName, setGuestName] = useState('');
  const [wisudawanName, setWisudawanName] = useState('');

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
    }
  }, []);

  const handleNavigate = (page: 'generator' | 'info') => {
    if (page === 'generator') {
      setCurrentPage('generator');
    } else {
      const infoSection = document.getElementById('info-section');
      if (infoSection) {
        infoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    window.history.pushState({}, '', '/');
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
      {currentPage === 'generator' && <GeneratorPage onBack={handleBackToLanding} />}
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
