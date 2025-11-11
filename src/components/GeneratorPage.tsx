import { useState, useEffect } from 'react';
import { ArrowLeft, User, Copy, Trash2, CheckCircle, AlertCircle, Calendar, Info, Loader2 } from 'lucide-react';
import { Invitation } from '../types';
import { invitationsAPI } from '@/services/api';
import { showToast, copyToClipboard } from '../utils/helpers';
import LoadingButton from './LoadingButton';
import EmptyState from './EmptyState';

interface GeneratorPageProps {
  onBack: () => void;
  loggedInWisudawan: any;
  onLogout: () => void;
}

export default function GeneratorPage({ loggedInWisudawan, onLogout }: GeneratorPageProps) {
  const [guestName, setGuestName] = useState('');
  const [nameError, setNameError] = useState('');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [quota, setQuota] = useState({ used: 0, total: 10, remaining: 10 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (loggedInWisudawan) {
      loadInvitations();
    }
  }, [loggedInWisudawan]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('wisudawan-search') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape to clear focus
      if (e.key === 'Escape') {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        setGuestName('');
        setNameError('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadInvitations = async () => {
    if (!loggedInWisudawan) return;
    
    try {
      setIsLoading(true);
      const data = await invitationsAPI.getAll(loggedInWisudawan.wisudawanId);
      setInvitations(data.invitations);
      setQuota(data.quota);
    } catch (error: any) {
      console.error('Failed to load invitations:', error);
      showToast('Gagal memuat undangan', 'error');
    } finally {
      setIsLoading(false);
    }
  };



  // Validation function
  const validateGuestName = (name: string): string => {
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      return '';
    }

    if (trimmedName.length < 3) {
      return 'Nama tamu minimal 3 karakter';
    }

    if (trimmedName.length > 50) {
      return 'Nama tamu maksimal 50 karakter';
    }

    // Check for special characters (allow letters, spaces, dots, apostrophes, and hyphens)
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      return 'Nama hanya boleh berisi huruf, spasi, titik, tanda kutip, dan tanda hubung';
    }

    // Check duplicate
    const isDuplicate = invitations.some(
      (inv) => inv.guestName.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      return 'Undangan untuk tamu ini sudah dibuat';
    }

    return '';
  };

  // Handle name change with auto-capitalize
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Auto-capitalize first letter of each word
    const capitalizedValue = value
      .split(' ')
      .map((word) => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');

    setGuestName(capitalizedValue);

    // Real-time validation
    const error = validateGuestName(capitalizedValue);
    setNameError(error);
  };

  const handleGenerateLink = async () => {
    if (!loggedInWisudawan) return;

    const error = validateGuestName(guestName);

    if (error) {
      setNameError(error);
      showToast(error, 'error');
      return;
    }

    if (quota.remaining === 0) {
      showToast(`Maksimal ${quota.total} undangan per wisudawan`, 'error');
      return;
    }

    setIsGenerating(true);

    try {
      // Create invitation via API
      const invitation = await invitationsAPI.create(
        loggedInWisudawan.wisudawanId,
        guestName.trim()
      );
        
      // Auto-copy link to clipboard
      await copyToClipboard(invitation.link);
      
      // Reload invitations
      await loadInvitations();
      
      setGuestName('');
      setNameError('');
      showToast(`Link untuk ${guestName.trim()} berhasil disalin! Kirim ke tamu Anda 📋`, 'success');
    } catch (error: any) {
      const errorMessage = error.message || 'Gagal membuat link undangan';
      showToast(errorMessage, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (invitationId: string) => {
    if (!loggedInWisudawan) return;
    if (!window.confirm('Yakin ingin menghapus undangan ini?')) return;

    setDeletingId(invitationId);

    try {
      await invitationsAPI.delete(invitationId);
      await loadInvitations();
      showToast('Undangan berhasil dihapus', 'success');
    } catch (error: any) {
      showToast('Gagal menghapus undangan', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state while fetching data
  if (!loggedInWisudawan || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ffb-black via-ffb-gray-900 to-ffb-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ffb-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold">Memuat...</p>
        </div>
      </div>
    );
  }

  const progressPercent = (quota.used / quota.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ffb-black via-ffb-gray-900 to-ffb-black relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute w-96 h-96 bg-ffb-gold rounded-full opacity-10 blur-3xl -top-48 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-ffb-gold rounded-full opacity-10 blur-3xl -bottom-48 -right-48 animate-pulse-slow"></div>
        <div className="absolute w-64 h-64 bg-ffb-brown rounded-full opacity-5 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Header */}
      <div className="relative py-6 px-4 overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <button
            onClick={onLogout}
            className="group flex items-center gap-2 text-white/90 hover:text-ffb-gold transition-all duration-300 mb-4 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm glossy"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Buat Undangan
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-6 relative z-10">
        {/* Form Section - Mobile First */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border-2 border-ffb-gold/30 p-4 md:p-6 mb-4 relative overflow-hidden">
          {/* Shine overlay */}
          <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"></div>
          
          {/* Header dengan Avatar - Compact for Mobile */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-ffb-gold/20 relative z-10">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-ffb-gold rounded-xl blur-lg opacity-40 animate-pulse"></div>
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-ffb-gold via-ffb-gold-shine to-ffb-gold-light flex items-center justify-center text-ffb-black font-bold text-lg md:text-xl border-2 border-ffb-gold-light/50 shadow-gold">
                {loggedInWisudawan.inisial}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="inline-block px-2 py-0.5 bg-ffb-gold/30 text-ffb-gold rounded text-xs font-bold mb-1.5 tracking-wide shadow-lg shadow-ffb-gold/20">
                WISUDAWAN
              </div>
              <h2 className="text-base md:text-lg font-extrabold leading-tight text-white tracking-tight drop-shadow-lg">
                {loggedInWisudawan.nama}, <span className="text-ffb-gold drop-shadow-[0_2px_8px_rgba(201,169,97,0.6)]">{loggedInWisudawan.gelar}</span>
              </h2>
            </div>
          </div>

          {/* Quota Section - Compact */}
          <div className="mb-4 relative z-10">
            <div className="bg-ffb-black/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-ffb-gold/30 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-200 mb-0.5 font-semibold">Kuota Undangan</p>
                    <p className="text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">
                      {quota.used}<span className="text-base md:text-lg text-ffb-gold font-bold drop-shadow-[0_2px_8px_rgba(201,169,97,0.6)]">/{quota.total}</span>
                    </p>
                  </div>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold border-2 border-white/50 shadow-lg ${
                    quota.remaining > 5 ? 'bg-green-500' : quota.remaining >= 3 ? 'bg-ffb-gold' : 'bg-red-500'
                  }`}>
                    {quota.remaining}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-ffb-gold/20">
                    <div
                      className={`h-full transition-all duration-500 relative overflow-hidden ${
                        quota.remaining > 5 
                          ? 'bg-gradient-to-r from-green-400 to-green-300' 
                          : quota.remaining >= 3 
                          ? 'gold-shine' 
                          : 'bg-gradient-to-r from-red-400 to-red-300'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    >
                      {quota.remaining >= 3 && <div className="absolute inset-0 shimmer"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-200 mt-1.5 flex items-center gap-1.5 font-medium">
                    <span className="w-1 h-1 bg-ffb-gold rounded-full animate-pulse shadow-lg shadow-ffb-gold/50"></span>
                    {quota.remaining > 0 ? `${quota.remaining} slot tersedia` : 'Penuh'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            <div>
              <label
                htmlFor="guest-name-input"
                className="block text-white font-bold mb-2 text-sm tracking-wide drop-shadow-md"
              >
                Nama Tamu
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-4 h-4 pointer-events-none transition-colors group-focus-within:text-ffb-gold" />
                <input
                  id="guest-name-input"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={guestName}
                  onChange={handleNameChange}
                  className={`w-full pl-10 pr-14 py-3 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 text-sm bg-white/10 backdrop-blur-sm font-semibold ${
                    nameError
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30 text-red-300 placeholder:text-red-300/60'
                      : guestName.length >= 3 && !nameError
                      ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/30 text-green-300 placeholder:text-green-300/60'
                      : 'border-ffb-gold/30 focus:border-ffb-gold focus:ring-ffb-gold/30 text-white placeholder:text-gray-300'
                  }`}
                  disabled={quota.remaining === 0}
                  maxLength={50}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? 'name-error' : 'name-helper'}
                />
                {/* Character counter */}
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs pointer-events-none font-medium transition-colors ${
                  guestName.length >= 45 ? 'text-ffb-gold' : 'text-ffb-gray-300'
                }`}>
                  {guestName.length}/50
                </div>
              </div>

              {/* Error message */}
              {nameError && (
                <div
                  id="name-error"
                  className="flex items-start gap-2 text-red-400 text-xs mt-2 animate-fade-in bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 backdrop-blur-sm"
                  role="alert"
                >
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{nameError}</span>
                </div>
              )}

              {/* Success indicator */}
              {guestName.length >= 3 && !nameError && (
                <div
                  id="name-helper"
                  className="flex items-center gap-2 text-green-400 text-xs mt-2 animate-fade-in bg-green-500/10 border border-green-500/30 rounded-lg p-2.5 backdrop-blur-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-medium">Nama valid ✓</span>
                </div>
              )}

              {/* Helper text */}
              {!nameError && guestName.length === 0 && (
                <p id="name-helper" className="text-xs text-gray-200 mt-2 flex items-center gap-1.5 font-medium">
                  <Info className="w-3.5 h-3.5" />
                  Min 3, maks 50 karakter
                </p>
              )}
            </div>

            <LoadingButton
              onClick={handleGenerateLink}
              disabled={
                !guestName.trim() || guestName.trim().length < 3 || quota.remaining === 0 || !!nameError
              }
              isLoading={isGenerating}
              loadingText="Membuat..."
              variant="primary"
              className="w-full bg-gradient-to-r from-ffb-gold via-ffb-gold-shine to-ffb-gold text-ffb-black min-h-[48px] text-sm font-extrabold shadow-gold-lg hover:shadow-gold-xl transition-all duration-300 rounded-xl tracking-wide"
              aria-label="Generate link undangan"
            >
              Buat Link Undangan
            </LoadingButton>
          </div>


        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border-2 border-ffb-gold/30 p-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="text-base md:text-lg font-extrabold text-white flex items-center gap-2 tracking-tight drop-shadow-lg">
              <div className="w-8 h-8 bg-ffb-gold rounded-lg flex items-center justify-center shadow-lg shadow-ffb-gold/30">
                <Calendar className="w-4 h-4 text-ffb-black" />
              </div>
              Daftar Undangan
            </h2>
            <span className="px-3 py-1 bg-ffb-gold text-ffb-black text-xs font-extrabold rounded-full shadow-lg shadow-ffb-gold/30">
              {invitations.length}
            </span>
          </div>

          {invitations.length === 0 ? (
            <EmptyState
              type="no-invitations"
              title="Belum Ada Undangan"
              description="Belum ada undangan yang dibuat. Masukkan nama tamu di formulir di atas untuk membuat undangan pertama Anda."
              actionLabel="Isi Formulir"
              onAction={() => {
                const input = document.getElementById('guest-name-input') as HTMLInputElement;
                input?.focus();
              }}
            />
          ) : (
            <>
              {/* DESKTOP: Table View */}
              <div className="hidden md:block overflow-x-auto rounded-lg border border-ffb-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-ffb-black to-ffb-gray-900 gold-shine">
                    <tr>
                      <th className="px-3 lg:px-4 py-2 text-left text-xs lg:text-sm font-bold text-white">
                        No
                      </th>
                      <th className="px-3 lg:px-4 py-2 text-left text-xs lg:text-sm font-bold text-white">
                        Nama Tamu
                      </th>
                      <th className="px-3 lg:px-4 py-2 text-left text-xs lg:text-sm font-bold text-white">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitations.map((inv, index) => (
                      <tr key={inv.id} className="border-b border-ffb-gray-100 hover:bg-ffb-gold/5 transition-all group">
                        <td className="px-3 lg:px-4 py-2 text-xs lg:text-sm text-ffb-gray-600 font-semibold">{index + 1}</td>
                        <td className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold text-ffb-black">
                          {inv.guestName}
                        </td>
                        <td className="px-3 lg:px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(inv.link);
                                showToast('Link berhasil disalin! 📋', 'success');
                              }}
                              className="p-2 text-ffb-gold hover:bg-ffb-gold/10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ffb-gold glossy group min-w-[44px] min-h-[44px]"
                              title="Salin Link"
                              aria-label={`Salin link untuk ${inv.guestName}`}
                            >
                              <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleDelete(inv.id)}
                              disabled={deletingId === inv.id}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 glossy group min-w-[44px] min-h-[44px]"
                              title="Hapus"
                              aria-label={`Hapus undangan untuk ${inv.guestName}`}
                            >
                              {deletingId === inv.id ? (
                                <Loader2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:scale-110 transition-transform" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE: Card View - Compact */}
              <div className="block md:hidden space-y-2">
                {invitations.map((inv, index) => (
                  <div
                    key={inv.id}
                    className="luxury-card bg-gradient-to-br from-white via-ffb-gold/5 to-white rounded-lg p-3 shadow-gold border-2 border-ffb-gray-200 hover:border-ffb-gold transition-all relative overflow-hidden"
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 shimmer opacity-50 pointer-events-none"></div>
                    
                    {/* Compact Layout */}
                    <div className="flex items-center justify-between gap-3 relative z-10">
                      {/* Number & Name */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-ffb-gold to-ffb-gold-dark px-2 py-1 rounded-full gold-shine flex-shrink-0">
                          #{index + 1}
                        </span>
                        <p className="font-bold text-ffb-black text-sm truncate">
                          {inv.guestName}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0">
                        {/* Copy Button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(inv.link);
                            showToast('Link berhasil disalin! 📋', 'success');
                          }}
                          className="flex items-center justify-center p-2 bg-gradient-to-r from-ffb-gold to-ffb-gold-dark text-white rounded-lg hover:shadow-lg hover:shadow-ffb-gold/50 transition-all font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-ffb-gold glossy group"
                          aria-label={`Salin link untuk ${inv.guestName}`}
                        >
                          <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(inv.id)}
                          disabled={deletingId === inv.id}
                          className="flex items-center justify-center p-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 glossy group"
                          aria-label={`Hapus undangan untuk ${inv.guestName}`}
                        >
                          {deletingId === inv.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
