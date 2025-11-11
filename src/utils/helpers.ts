import { getInvitations, getQuotas } from './storage';

export function showToast(
  message: string,
  type: 'success' | 'error' = 'success'
): void {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium animate-slide-in ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showToast('✓ Link berhasil disalin!', 'success');
  } catch (err) {
    showToast('Gagal menyalin link', 'error');
  }
}

export function generateInvitationLink(
  wisudawan: string,
  tamu: string,
  wisudawanId?: number
): string | null {
  if (!tamu || tamu.trim().length < 3) {
    showToast('Nama tamu minimal 3 karakter', 'error');
    return null;
  }

  if (!/^[a-zA-Z\s.]+$/.test(tamu)) {
    showToast('Nama hanya boleh huruf dan spasi', 'error');
    return null;
  }

  const quotas = getQuotas();
  if (quotas[wisudawan].used >= 10) {
    showToast('Kuota undangan Anda sudah habis (10/10)', 'error');
    return null;
  }

  const history = getInvitations(wisudawan);
  if (
    history.some(
      (inv) => inv.guestName.toLowerCase() === tamu.toLowerCase().trim()
    )
  ) {
    showToast(`Anda sudah mengundang ${tamu} sebelumnya`, 'error');
    return null;
  }

  const baseUrl = window.location.origin;
  // New short format: /i/:id/:name
  const link = `${baseUrl}/i/${wisudawanId}/${encodeURIComponent(tamu.trim())}`;

  return link;
}

export function shareViaWhatsApp(
  wisudawan: string,
  tamu: string,
  link: string
): void {
  const message = `Halo ${tamu},

Dengan hormat, saya ${wisudawan} mengundang Anda untuk hadir di acara Wisuda & Penerimaan Mahasiswa Baru 2025 UNP Kediri.

📅 Sabtu, 21 Desember 2025
🕐 08.00 - 12.00 WIB
📍 Aula Utama UNP Kediri

Berikut link undangan Anda:
${link}

Ditunggu kehadirannya ya! 🎓

Salam hangat,
${wisudawan}`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

export function downloadCalendar(tamu: string, wisudawan: string): void {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0] + 'Z';

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wisuda UNP Kediri//ID
BEGIN:VEVENT
UID:wisuda2025@unpkediri.ac.id
DTSTAMP:${timestamp}
DTSTART:20251221T010000Z
DTEND:20251221T050000Z
SUMMARY:Wisuda & PMB 2025 UNP Kediri
DESCRIPTION:Undangan dari ${wisudawan} untuk ${tamu}
LOCATION:Aula Utama UNP Kediri
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Wisuda_UNP_Kediri_2025.ics';
  a.click();
  URL.revokeObjectURL(url);
}

export function getCountdown(): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const eventDate = new Date('2025-12-21T08:00:00');
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();

  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}
