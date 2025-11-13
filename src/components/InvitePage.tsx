import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Shirt, Navigation, AlertCircle } from 'lucide-react';
import { invitationsAPI } from '@/services/api';
import LoadingSpinner from './LoadingSpinner';

interface InvitePageProps {
  guestName: string;
  wisudawanName: string;
  onInvalidLink: () => void;
}

export default function InvitePage({ guestName, wisudawanName }: InvitePageProps) {
  const [wisudawan, setWisudawan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    validateInvitation();
  }, [guestName, wisudawanName]);

  const validateInvitation = async () => {
    if (!guestName || !wisudawanName) {
      setIsInvalid(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await invitationsAPI.validate(wisudawanName, guestName);
      
      if (data.valid && data.wisudawan) {
        setWisudawan(data.wisudawan);
        setIsInvalid(false);
      } else {
        setIsInvalid(true);
      }
    } catch (error) {
      console.error('Validation error:', error);
      setIsInvalid(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLocation = () => {
    window.open('https://maps.google.com/?q=Universitas+Logistik+dan+Bisnis+Internasional+ULBI+Bandung', '_blank');
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Memuat undangan..." />;
  }

  if (isInvalid || !wisudawan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Undangan Tidak Valid
          </h2>
          <p className="text-gray-600 mb-6">
            Link undangan tidak ditemukan atau sudah dihapus oleh wisudawan. 
            <br /><br />
            <strong>Silakan hubungi wisudawan</strong> untuk mendapatkan link undangan yang baru.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const guestDisplayName = guestName.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Floral Decorations - Top Left */}
      <div className="fixed top-0 left-0 w-64 h-64 opacity-40 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#fce7f3" opacity="0.6"/>
          <circle cx="80" cy="40" r="25" fill="#fbcfe8" opacity="0.5"/>
          <circle cx="60" cy="80" r="20" fill="#f9a8d4" opacity="0.4"/>
          <circle cx="90" cy="75" r="22" fill="#fce7f3" opacity="0.5"/>
        </svg>
      </div>

      {/* Floral Decorations - Top Right */}
      <div className="fixed top-0 right-0 w-64 h-64 opacity-40 pointer-events-none transform scale-x-[-1]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#fed7aa" opacity="0.6"/>
          <circle cx="80" cy="40" r="25" fill="#fdba74" opacity="0.5"/>
          <circle cx="60" cy="80" r="20" fill="#fb923c" opacity="0.4"/>
          <circle cx="90" cy="75" r="22" fill="#fed7aa" opacity="0.5"/>
        </svg>
      </div>

      {/* Floral Decorations - Bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-48 opacity-30 pointer-events-none">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <circle cx="100" cy="150" r="35" fill="#fce7f3" opacity="0.6"/>
          <circle cx="150" cy="140" r="30" fill="#fbcfe8" opacity="0.5"/>
          <circle cx="200" cy="145" r="32" fill="#fed7aa" opacity="0.5"/>
          <circle cx="250" cy="140" r="30" fill="#fdba74" opacity="0.5"/>
          <circle cx="300" cy="150" r="35" fill="#fce7f3" opacity="0.6"/>
        </svg>
      </div>

      {/* Main Content - Optimized for Mobile */}
      <div className="max-w-lg mx-auto px-3 py-6 relative z-10">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-pink-100">
          
          {/* Header Text */}
          <div className="text-center pt-6 pb-4 px-4">
            <p className="text-gray-600 text-sm mb-2 font-light tracking-wide">
              SYUKURAN WISUDA
            </p>
            <p className="text-gray-500 text-xs font-light italic leading-relaxed px-2">
              Dengan penuh suka cita kami mengundang<br/>
              untuk turut, untuk hadir, dan turut serta
            </p>
          </div>

          {/* Wisudawan Photo/Initial with Floral Frame */}
          <div className="flex flex-col items-center px-4 pb-4">
            <div className="relative mb-3">
              {/* Floral decoration around photo */}
              <div className="absolute -inset-5 opacity-60">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Top left flower */}
                  <circle cx="30" cy="30" r="12" fill="#fce7f3"/>
                  <circle cx="25" cy="25" r="8" fill="#fbcfe8"/>
                  {/* Top right flower */}
                  <circle cx="170" cy="30" r="12" fill="#fed7aa"/>
                  <circle cx="175" cy="25" r="8" fill="#fdba74"/>
                  {/* Bottom left flower */}
                  <circle cx="30" cy="170" r="12" fill="#fed7aa"/>
                  <circle cx="25" cy="175" r="8" fill="#fdba74"/>
                  {/* Bottom right flower */}
                  <circle cx="170" cy="170" r="12" fill="#fce7f3"/>
                  <circle cx="175" cy="175" r="8" fill="#fbcfe8"/>
                </svg>
              </div>
              
              {/* Photo/Initial Circle - Mobile Optimized */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200 flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-4xl font-bold text-gray-700">
                  {wisudawan.inisial}
                </span>
              </div>
            </div>

            {/* Name - Mobile Optimized */}
            <h1 className="text-xl font-serif font-bold text-gray-800 text-center mb-1 leading-tight px-2">
              {wisudawan.nama}
            </h1>
            <p className="text-base text-rose-600 font-medium text-center">
              {wisudawan.gelar}
            </p>
          </div>

          {/* Guest Name Section */}
          <div className="text-center py-5 px-4 border-t-2 border-b-2 border-pink-100">
            <p className="text-gray-500 text-xs font-light mb-1">Kepada Yth.</p>
            <h2 className="text-xl font-serif font-bold text-gray-800">
              {guestDisplayName}
            </h2>
            <p className="text-gray-500 text-xs font-light mt-1">Di Tempat</p>
          </div>

          {/* Event Details in Boxes - Mobile Optimized */}
          <div className="px-4 py-6 space-y-3">
            {/* Date Box */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-50 to-orange-50 px-5 py-3 rounded-2xl border border-pink-200 shadow-sm">
                <div className="flex flex-col items-center min-w-[70px]">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Rabu</p>
                  <p className="text-3xl font-bold text-rose-600">26</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">November</p>
                </div>
                <div className="w-px h-14 bg-pink-300"></div>
                <div className="text-left">
                  <p className="text-xl font-bold text-gray-800">2025</p>
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center justify-center gap-2 py-2">
              <Clock className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <p className="text-gray-700 font-medium text-sm">Pukul 08.00 - 12.00 WIB</p>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-4 border border-pink-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800 text-base mb-1">Universitas Logistik dan Bisnis Internasional (ULBI)</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Jl. Sariasih No.54, Sarijadi, Kec. Sukasari, Kota Bandung, Jawa Barat 40151</p>
                </div>
              </div>
            </div>

            {/* Dress Code */}
            <div className="flex items-center justify-center gap-2 py-2">
              <Shirt className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <p className="text-gray-700 font-medium text-center text-sm">
                Dress Code: Formal / Kebaya & Batik
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center py-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            <div className="mx-2 text-pink-400 text-sm">❀</div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>

          {/* Footer Message - Mobile Optimized */}
          <div className="text-center px-4 pb-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Merupakan suatu kehormatan bagi kami apabila<br/>
              Bapak/Ibu/Saudara/i berkenan hadir.
            </p>
            <p className="text-lg font-serif font-bold text-gray-800 mb-2">
              Kami tunggu kehadiran Anda! 🎓
            </p>
            <div className="text-xs text-gray-500 italic space-y-0.5">
              <p>Hormat kami,</p>
              <p className="font-semibold text-rose-600">Panitia Wisuda & PMB 2025</p>
            </div>
          </div>

        </div>

        {/* Location Button - Mobile Optimized */}
        <div className="px-2 mt-8 mb-8">
          <button
            onClick={handleViewLocation}
            className="w-full py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <Navigation className="w-5 h-5" />
            Lihat Lokasi Acara
          </button>
        </div>
      </div>

      {/* Footer - Mobile Optimized */}
      <footer className="relative bg-gradient-to-r from-pink-100 via-rose-100 to-orange-100 border-t border-pink-200 py-5">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">© 2025 ULBI Bandung</p>
          <p className="text-gray-500 text-xs mt-0.5">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
