# 🎓 Sistem Undangan Wisuda & PMB 2025 UNP Kediri

Aplikasi web modern untuk mengelola undangan wisuda secara digital. Setiap wisudawan dapat membuat hingga 10 link undangan personal untuk tamu mereka.

## ✨ Fitur Utama

### Untuk Wisudawan:
- 🔗 Generate link undangan personal untuk setiap tamu
- 📱 Generate QR Code untuk setiap undangan
- 💬 Kirim undangan langsung via WhatsApp
- 📋 Kelola riwayat undangan (lihat, copy, hapus)
- 📊 Tracking kuota (maksimal 10 undangan per wisudawan)
- 🔍 Pencarian wisudawan yang mudah

### Untuk Tamu:
- 📧 Link undangan personal dengan nama tamu
- ⏰ Countdown timer real-time sampai hari acara
- 📅 Download kalender (.ics) untuk reminder
- 🗺️ Akses langsung ke Google Maps lokasi acara
- ✅ Konfirmasi kehadiran via Google Form

## 🚀 Cara Menggunakan

### Untuk Wisudawan:

1. **Buka Aplikasi**
   - Akses aplikasi melalui browser
   - Klik tombol "🎓 Saya Wisudawan"

2. **Pilih Nama Anda**
   - Gunakan search bar untuk mencari nama Anda
   - Klik card nama Anda

3. **Generate Undangan**
   - Ketik nama tamu yang ingin diundang
   - Klik "Generate Link"
   - Link akan muncul beserta 3 opsi:
     - 📋 Copy Link (salin ke clipboard)
     - 📱 Generate QR Code (buat QR code yang bisa didownload)
     - 💬 Kirim via WhatsApp (langsung share ke WA)

4. **Kelola Riwayat**
   - Lihat semua undangan yang sudah dibuat
   - Copy, kirim ulang, atau hapus undangan
   - Setiap undangan yang dihapus akan menambah kuota kembali

### Untuk Tamu:

1. **Buka Link Undangan**
   - Klik link yang diterima dari wisudawan
   - Lihat detail acara wisuda

2. **Interaksi**
   - Klik "Konfirmasi Kehadiran" untuk RSVP
   - Klik "Simpan ke Kalender" untuk download file .ics
   - Klik "Lihat Lokasi" untuk buka Google Maps

## 📋 Data Wisudawan

Aplikasi ini sudah berisi data 10 wisudawan:

1. Elisabeth Diana Yuvita, S.Tr.Log - Logistik
2. Geovitra Veronika Nona, S.Tra - Administrasi
3. Maria Rosari Stefania Ere Pati, S.Tra - Administrasi
4. Maria Carmelia Romina, S.Tra - Administrasi
5. Fernandito Juniantoro Dias De Jesus, S.M - Manajemen
6. Ana Yulita Da Silva, S.Log - Logistik
7. Maria Sabatini Nuro Nona Yelly, S.Log - Logistik
8. Diodatus Son Seran, S.Tra - Administrasi
9. Oktaviani Manek, S.Tr.Ak - Akuntansi
10. Theresia Avnesia Saja, S.Tr.Log - Logistik

## 🔧 Teknologi

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **QR Code**: QRCode.js
- **Storage**: Browser localStorage
- **Build Tool**: Vite

## 💾 Penyimpanan Data

Semua data disimpan di **localStorage browser** Anda:

- `wisuda_quotas` - Tracking kuota per wisudawan
- `wisuda_invitations_[nama_wisudawan]` - Riwayat undangan per wisudawan

**PENTING**:
- Data hanya tersimpan di browser Anda
- Jangan gunakan mode incognito/private browsing
- Clear cache akan menghapus semua data

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎨 Desain

- **Color Palette**:
  - Primary Navy: #1A237E
  - Secondary Gold: #FFD700
  - Accent Colors: Green, Blue, Purple

- **Typography**:
  - Headings: Playfair Display (serif)
  - Body: Poppins (sans-serif)

- **Features**:
  - Fully responsive (mobile, tablet, desktop)
  - Glass-morphism design elements
  - Smooth animations & transitions
  - Gradient backgrounds

## 🔒 Keamanan & Validasi

- ✅ Validasi nama tamu (minimal 3 karakter, hanya huruf)
- ✅ Cek duplikat nama tamu per wisudawan
- ✅ Validasi kuota (maksimal 10 undangan)
- ✅ Konfirmasi sebelum hapus undangan
- ✅ Error handling untuk link invalid

## 📞 Informasi Acara

- **Tanggal**: Sabtu, 21 Desember 2025
- **Waktu**: 08.00 - 12.00 WIB
- **Tempat**: Aula Utama UNP Kediri
- **Dress Code**: Formal / Kebaya & Batik

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Troubleshooting

**Q: Data hilang saat refresh?**
A: Pastikan browser support localStorage dan tidak dalam mode incognito.

**Q: Link tidak bisa dibuka?**
A: Pastikan URL memiliki parameter `w` (wisudawan) dan `t` (tamu).

**Q: QR Code tidak muncul?**
A: Periksa koneksi internet, QRCode.js membutuhkan CDN.

**Q: Kuota tidak bertambah setelah hapus?**
A: Refresh halaman atau pilih ulang wisudawan dari grid.

## 📄 License

© 2025 UNP Kediri. All rights reserved.

---

**Selamat Wisuda! 🎓✨**
