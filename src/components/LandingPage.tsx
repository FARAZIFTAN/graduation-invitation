interface LandingPageProps {
  onNavigate: (page: 'generator' | 'info') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ffb-black via-ffb-gray-900 to-ffb-black relative overflow-hidden">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-to-main"
      >
        Langsung ke konten utama
      </a>

      {/* Decorative background with Flobamora colors */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute w-96 h-96 bg-ffb-gold rounded-full opacity-10 blur-3xl -top-48 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-ffb-gold rounded-full opacity-10 blur-3xl -bottom-48 -right-48 animate-pulse-slow"></div>
        <div className="absolute w-64 h-64 bg-ffb-brown rounded-full opacity-5 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Sparkle dots */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-ffb-gold rounded-full opacity-30 animate-twinkle"></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-ffb-gold-light rounded-full opacity-40 animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-ffb-gold-shine rounded-full opacity-20 animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-ffb-gold rounded-full opacity-50 animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-1.5 h-1.5 bg-ffb-gold-light rounded-full opacity-30 animate-twinkle" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-ffb-gold-shine rounded-full opacity-40 animate-twinkle" style={{ animationDelay: '1.2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
          <div className="text-center max-w-4xl animate-fade-in">
            {/* Logo/Badge with outer glow */}
            <div className="relative inline-block mb-6">
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-2 w-20 h-20 md:w-24 md:h-24 bg-ffb-gold rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
              
              {/* Main badge */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-ffb-gold via-ffb-gold-shine to-ffb-gold-light rounded-full shadow-gold-xl animate-scale-in border-2 border-ffb-gold-light/30">
                <span className="text-3xl md:text-4xl filter drop-shadow-lg" aria-label="Graduation cap">🎓</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Undangan Wisuda & Penerimaan Mahasiswa Baru 2025
            </h1>

            {/* Subtitle */}
            <p className="text-ffb-gray-300 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Buat undangan digital personal untuk keluarga dan teman Anda dengan mudah
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('generator')}
                className="group w-full sm:w-auto min-w-[220px] md:min-w-[240px] px-6 md:px-8 lg:px-10 py-3.5 md:py-4 bg-gradient-to-r from-ffb-gold via-ffb-gold-shine to-ffb-gold text-ffb-black rounded-full font-bold text-base md:text-lg shadow-gold-xl hover:shadow-gold-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-ffb-gold/50 min-h-[52px] md:min-h-[56px] relative overflow-hidden"
                aria-label="Buat undangan untuk wisudawan"
              >
                <span className="flex items-center justify-center gap-2 md:gap-3 relative z-10">
                  <span aria-hidden="true" className="text-xl md:text-2xl">🎓</span>
                  <span>Buat Undangan</span>
                </span>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
