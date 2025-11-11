import { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { validateAccessCode } from '../data/wisudawan';
import LoadingButton from './LoadingButton';

interface LoginPageProps {
  onLogin: (wisudawanId: number) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      setError('Masukkan kode akses Anda');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const wisudawanId = validateAccessCode(accessCode);
    
    if (wisudawanId) {
      // Save to localStorage
      localStorage.setItem('wisuda_session', JSON.stringify({
        wisudawanId,
        timestamp: new Date().toISOString(),
      }));
      onLogin(wisudawanId);
    } else {
      setError('Kode akses tidak valid. Periksa kembali kode Anda.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ffb-black via-ffb-gray-900 to-ffb-black relative overflow-hidden flex items-center justify-center">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute w-96 h-96 bg-ffb-gold rounded-full opacity-10 blur-3xl -top-48 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-ffb-gold rounded-full opacity-10 blur-3xl -bottom-48 -right-48 animate-pulse-slow"></div>
        <div className="absolute w-64 h-64 bg-ffb-brown rounded-full opacity-5 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-md w-full px-4 relative z-10">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border-2 border-ffb-gold/30 p-8 relative overflow-hidden shadow-gold-lg">
          <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"></div>
          
          {/* Icon */}
          <div className="flex justify-center mb-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-ffb-gold via-ffb-gold-shine to-ffb-gold rounded-full flex items-center justify-center shadow-gold-lg">
              <Lock className="w-10 h-10 text-ffb-black" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-lg">
              Masuk ke Sistem
            </h1>
            <p className="text-gray-200 text-sm md:text-base font-medium">
              Buat Undangan Wisuda ULBI 2025
            </p>
          </div>

          {/* Info Banner */}
          <div className="mb-6 bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 rounded-lg p-3 relative z-10">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-200 leading-relaxed">
                <strong className="text-blue-300">Kode akses</strong> telah diberikan oleh panitia. Jika belum menerima, silakan hubungi panitia wisuda.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="access-code" className="block text-white font-bold mb-2 text-sm tracking-wide">
                Kode Akses
              </label>
              <input
                id="access-code"
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Masukkan kode akses..."
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-ffb-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-ffb-gold/50 focus:border-ffb-gold transition-all text-white font-semibold placeholder-gray-300 uppercase"
                maxLength={10}
                autoComplete="off"
              />
              {error && (
                <p className="text-red-300 text-xs mt-2 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>

            <LoadingButton
              type="submit"
              isLoading={isLoading}
              loadingText="Memverifikasi..."
              disabled={!accessCode.trim()}
              className="w-full bg-gradient-to-r from-ffb-gold via-ffb-gold-shine to-ffb-gold text-ffb-black min-h-[48px] text-sm font-extrabold shadow-gold-lg hover:shadow-gold-xl transition-all duration-300 rounded-xl tracking-wide group"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Masuk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </LoadingButton>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-300">
            Sistem ini untuk mencegah penyalahgunaan identitas wisudawan
          </p>
        </div>
      </div>
    </div>
  );
}
