import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Shirt, CheckCircle, Download, Navigation, AlertCircle } from 'lucide-react';
import { wisudawanData } from '../data/wisudawan';
import { Wisudawan } from '../types';
import { downloadCalendar, getCountdown } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';
import LoadingButton from './LoadingButton';

interface InvitePageProps {
  guestName: string;
  wisudawanName: string;
  onInvalidLink: () => void;
}

export default function InvitePage({ guestName, wisudawanName, onInvalidLink }: InvitePageProps) {
  const [wisudawan, setWisudawan] = useState<Wisudawan | null>(null);
  const [countdown, setCountdown] = useState(getCountdown());
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!guestName || !wisudawanName) {
      onInvalidLink();
      return;
    }

    // Simulate loading for better UX
    const loadTimer = setTimeout(() => {
      // Check if wisudawanName is an ID (new format) or name (old format)
      const found = /^\d+$/.test(wisudawanName)
        ? wisudawanData.find((w) => w.id === parseInt(wisudawanName))
        : wisudawanData.find((w) => w.nama === wisudawanName);
      
      if (!found) {
        onInvalidLink();
        return;
      }
      setWisudawan(found);
      setIsLoading(false);
    }, 800);

    const countdownTimer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(countdownTimer);
    };
  }, [guestName, wisudawanName, onInvalidLink]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Memuat undangan..." />;
  }

  if (!wisudawan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ffb-black via-ffb-gray-900 to-ffb-black flex items-center justify-center p-4">
        <div className="luxury-card bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center animate-fade-in shadow-gold-xl border-2 border-red-500">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 md:mb-6 border-4 border-red-200">
            <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-ffb-black mb-3">
            Undangan Tidak Ditemukan
          </h2>

          <p className="text-sm md:text-base text-ffb-gray-600 mb-6 font-medium">
            Link undangan tidak valid atau sudah kadaluarsa. Silakan hubungi wisudawan untuk
            mendapatkan link undangan yang baru.
          </p>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-ffb-gold to-ffb-gold-light text-white rounded-xl font-bold hover:shadow-gold-lg transition-all focus:outline-none focus:ring-4 focus:ring-ffb-gold/50 gold-shine min-h-[52px] text-sm md:text-base"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmation = () => {
    setIsConfirming(true);
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSdDummyFormId/viewform',
      '_blank'
    );
    // Reset after a delay
    setTimeout(() => setIsConfirming(false), 2000);
  };

  const handleViewLocation = () => {
    window.open('https://maps.google.com/?q=UNP+Kediri', '_blank');
  };

  const handleDownloadCalendar = async () => {
    setIsDownloading(true);
    try {
      await downloadCalendar(guestName, wisudawan.nama);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-ffb-gray-50">
      <div className="bg-gradient-to-br from-ffb-black via-ffb-gray-900 to-ffb-black py-12 md:py-16 px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#D4AF37" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute w-72 h-72 bg-ffb-gold rounded-full opacity-10 blur-3xl -top-36 -left-36 animate-pulse-slow"></div>
          <div className="absolute w-72 h-72 bg-ffb-brown rounded-full opacity-10 blur-3xl -bottom-36 -right-36 animate-pulse-slow"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-in">
          {/* Logo badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-6 bg-gradient-to-br from-ffb-gold to-ffb-gold-dark rounded-full glow-gold animate-scale-in">
            <span className="text-2xl md:text-3xl" aria-label="Envelope">✉️</span>
          </div>
          
          <div className="mb-6 md:mb-8">
            <p className="text-ffb-gold text-base md:text-lg font-semibold mb-2">Kepada Yth.</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-gold-metallic px-4">
              {guestName}
            </h1>
            <p className="text-ffb-gold-light font-medium">Di Tempat</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="luxury-card bg-white rounded-2xl shadow-gold-xl border-2 border-ffb-gold p-6 md:p-10 lg:p-12 mb-6 md:mb-8 animate-fade-in relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10">
            <p className="text-center text-ffb-gray-700 mb-4 md:mb-6 text-base md:text-lg font-medium">
              Anda diundang oleh
            </p>

            <div className="flex flex-col items-center mb-6 md:mb-8">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-ffb-gold via-ffb-gold-shine to-ffb-gold-dark flex items-center justify-center text-white font-bold text-2xl md:text-3xl border-4 border-ffb-gold-light mb-4 glow-gold animate-scale-in shadow-gold-lg">
                {wisudawan.inisial}
              </div>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-center leading-snug px-4">
                <span className="text-ffb-black">{wisudawan.nama}</span>, <span className="text-ffb-gold">{wisudawan.gelar}</span>
              </h2>
            </div>

            <div className="text-center mb-6 md:mb-8">
              <p className="text-ffb-gray-700 mb-2 font-medium">untuk hadir di acara:</p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-ffb-black text-gold-metallic">
                Wisuda & Penerimaan Mahasiswa Baru 2025
              </h3>
            </div>

            <div className="bg-gradient-to-br from-ffb-gold/10 via-white to-ffb-brown/5 rounded-xl p-5 md:p-6 space-y-3 md:space-y-4 border border-ffb-gold/30 glossy">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-ffb-gold to-ffb-gold-dark rounded-lg flex items-center justify-center flex-shrink-0 glow-gold">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-ffb-black text-sm md:text-base">Sabtu, 21 Desember 2025</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-ffb-gold to-ffb-gold-dark rounded-lg flex items-center justify-center flex-shrink-0 glow-gold">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-ffb-black text-sm md:text-base">08.00 - 12.00 WIB</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-ffb-gold to-ffb-gold-dark rounded-lg flex items-center justify-center flex-shrink-0 glow-gold">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-ffb-black text-sm md:text-base">Aula Utama UNP Kediri</p>
                  <p className="text-xs md:text-sm text-ffb-gray-600">Jl. Mayor Bismo No.27, Kediri</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-ffb-gold to-ffb-gold-dark rounded-lg flex items-center justify-center flex-shrink-0 glow-gold">
                  <Shirt className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-ffb-black text-sm md:text-base">
                    Dress Code: Formal / Kebaya & Batik
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!countdown.isPast && (
          <div className="bg-gradient-to-r from-ffb-gold via-ffb-gold-shine to-ffb-gold-light rounded-2xl shadow-gold-xl p-5 md:p-6 mb-6 md:mb-8 animate-fade-in gold-shine relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-50 pointer-events-none"></div>
            <p className="text-center text-ffb-black font-bold mb-3 md:mb-4 text-base md:text-lg relative z-10">
              Acara dimulai dalam:
            </p>
            <div className="grid grid-cols-4 gap-2 md:gap-3 relative z-10">
              <div className="luxury-card bg-white rounded-xl p-2.5 md:p-3 text-center glossy border border-ffb-gold/30">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-ffb-black">
                  {countdown.days}
                </p>
                <p className="text-xs md:text-sm text-ffb-gray-600 font-medium">Hari</p>
              </div>
              <div className="luxury-card bg-white rounded-xl p-2.5 md:p-3 text-center glossy border border-ffb-gold/30">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-ffb-black">
                  {countdown.hours}
                </p>
                <p className="text-xs md:text-sm text-ffb-gray-600 font-medium">Jam</p>
              </div>
              <div className="luxury-card bg-white rounded-xl p-2.5 md:p-3 text-center glossy border border-ffb-gold/30">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-ffb-black">
                  {countdown.minutes}
                </p>
                <p className="text-xs md:text-sm text-ffb-gray-600 font-medium">Menit</p>
              </div>
              <div className="luxury-card bg-white rounded-xl p-2.5 md:p-3 text-center glossy border border-ffb-gold/30">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-ffb-black">
                  {countdown.seconds}
                </p>
                <p className="text-xs md:text-sm text-ffb-gray-600 font-medium">Detik</p>
              </div>
            </div>
          </div>
        )}

        {countdown.isPast && (
          <div className="bg-gradient-to-br from-ffb-gray-200 to-ffb-gray-300 rounded-2xl shadow-lg p-5 md:p-6 mb-6 md:mb-8 text-center border-2 border-ffb-gray-400">
            <p className="text-ffb-gray-700 font-bold text-base md:text-lg">
              Acara sudah berlangsung
            </p>
          </div>
        )}

        <div className="space-y-3 mb-6 md:mb-8">
          <LoadingButton
            onClick={handleConfirmation}
            isLoading={isConfirming}
            loadingText="Membuka formulir..."
            variant="primary"
            className="w-full py-3.5 md:py-4 text-base md:text-lg hover:scale-105 min-h-[52px] md:min-h-[56px] gold-shine shadow-gold-lg hover:shadow-gold-xl font-bold"
            aria-label="Konfirmasi kehadiran ke acara wisuda"
          >
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
            Konfirmasi Kehadiran
          </LoadingButton>

          <LoadingButton
            onClick={handleDownloadCalendar}
            isLoading={isDownloading}
            loadingText="Mengunduh..."
            variant="secondary"
            className="w-full py-3.5 md:py-4 text-base md:text-lg hover:scale-105 min-h-[52px] md:min-h-[56px] glossy font-bold"
            aria-label="Simpan tanggal acara ke kalender"
          >
            <Download className="w-5 h-5 md:w-6 md:h-6" />
            Simpan ke Kalender
          </LoadingButton>

          <LoadingButton
            onClick={handleViewLocation}
            variant="secondary"
            className="w-full py-3.5 md:py-4 text-base md:text-lg hover:scale-105 min-h-[52px] md:min-h-[56px] glossy font-bold"
            aria-label="Lihat lokasi acara di Google Maps"
          >
            <Navigation className="w-5 h-5 md:w-6 md:h-6" />
            Lihat Lokasi
          </LoadingButton>
        </div>

        <div className="text-center text-ffb-black space-y-3 md:space-y-4 bg-gradient-to-br from-ffb-gold/10 via-white to-ffb-brown/5 p-6 md:p-8 rounded-2xl shadow-gold border-2 border-ffb-gold/30 luxury-card relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-20 pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-base md:text-lg leading-relaxed font-medium text-ffb-gray-700">
              Merupakan suatu kehormatan bagi kami apabila
              <br />
              Bapak/Ibu/Saudara/i berkenan hadir.
            </p>
            <p className="text-lg md:text-xl font-bold text-ffb-black text-gold-metallic">
              Kami tunggu kehadiran Anda! 🎓✨
            </p>
            <p className="text-sm md:text-base text-ffb-gray-600 italic font-medium">
              Hormat kami,
              <br />
              Panitia Wisuda & PMB 2025
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-ffb-black via-ffb-gray-900 to-ffb-black border-t border-ffb-gold/20 py-6 text-center text-ffb-gray-300">
        <p className="text-sm md:text-base font-medium">© 2025 UNP Kediri. All rights reserved.</p>
      </footer>
    </div>
  );
}
