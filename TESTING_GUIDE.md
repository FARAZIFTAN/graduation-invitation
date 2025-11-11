# Quick Start - Testing Integrated Frontend & Backend

## ✅ Integrasi Selesai!

File-file yang sudah diupdate:
- ✅ `src/config/api.ts` - Konfigurasi API URL
- ✅ `src/services/api.ts` - Service layer untuk API calls
- ✅ `src/components/LoginPage.tsx` - Menggunakan `authAPI.login()`
- ✅ `src/components/GeneratorPage.tsx` - Menggunakan `invitationsAPI`
- ✅ `src/components/InvitePage.tsx` - Menggunakan `invitationsAPI.validate()`
- ✅ `src/App.tsx` - Token-based session management
- ✅ Path alias `@/*` sudah dikonfigurasi

## 🚀 Cara Testing End-to-End

### Step 1: Jalankan Backend
```powershell
# Terminal 1
cd c:\FLOBAMORA\backend-undangan
npm run dev
```
Backend berjalan di: **http://localhost:3000**

### Step 2: Initialize Database (Sekali saja - PENTING!)
```powershell
# Terminal 2
Invoke-WebRequest -Uri "http://localhost:3000/api/init" -Method POST
```

Atau buka di browser:
```
http://localhost:3000/api/init
```

### Step 3: Jalankan Frontend
```powershell
# Terminal 2 atau terminal baru
cd c:\FLOBAMORA\graduation-invitation
npm run dev
```
Frontend berjalan di: **http://localhost:5173**

## 🧪 Testing Flow

### 1. Test Login
1. Buka **http://localhost:5173**
2. Click **"Buat Undangan"**
3. Masukkan kode akses: **AYD2025** (atau kode lain: DSS2025, DHT2025, FIF2025, dll)
4. Click **"Masuk"**
5. ✅ Harus berhasil login dan masuk ke halaman generator

### 2. Test Create Invitation
1. Setelah login, masukkan nama tamu: **John Doe**
2. Click **"Buat Link Undangan"**
3. ✅ Link otomatis disalin ke clipboard
4. ✅ Nama tamu muncul di daftar undangan
5. ✅ Kuota berkurang dari 10 menjadi 9

### 3. Test Copy Link
1. Di daftar undangan, click icon **Copy** di samping nama tamu
2. ✅ Link disalin ke clipboard
3. Paste link di notepad untuk lihat formatnya: `http://localhost:5173/i/AYD/John-Doe`

### 4. Test Delete Invitation
1. Click icon **Trash** di samping nama tamu
2. Confirm delete
3. ✅ Undangan terhapus dari list
4. ✅ Kuota kembali bertambah

### 5. Test Invitation Page (Public Link)
1. Copy salah satu link undangan
2. Buka di **incognito/private browser** atau browser lain
3. ✅ Halaman undangan muncul dengan nama wisudawan dan tamu
4. ✅ Countdown timer berjalan
5. ✅ Tombol download calendar berfungsi

### 6. Test Invalid Link
1. Edit URL manual jadi tidak valid: `http://localhost:5173/i/XXX/Invalid-Name`
2. ✅ Harus muncul error page "Undangan Tidak Ditemukan"

### 7. Test Session Persistence
1. Setelah login, refresh page (F5)
2. ✅ Harus tetap di halaman generator (tidak logout)
3. Click **"Logout"**
4. ✅ Kembali ke landing page

### 8. Test Quota Limit
1. Buat undangan sampai 10 kali (quota penuh)
2. ✅ Setelah quota habis, button "Buat Link Undangan" disabled
3. ✅ Muncul pesan error saat coba buat lagi
4. Delete 1 undangan
5. ✅ Bisa buat undangan lagi

## 📋 Status Integrasi

| Component | Status | Integration |
|-----------|--------|-------------|
| Backend API | ✅ Ready | All endpoints working |
| Frontend UI | ✅ Updated | Using backend API |
| Authentication | ✅ Integrated | Token-based auth |
| Invitation CRUD | ✅ Integrated | API calls working |
| Validation | ✅ Integrated | Backend validation |
| Session Management | ✅ Integrated | Auto-verify on refresh |

## 🎯 Feature Checklist

- ✅ Login with access code (backend API)
- ✅ Auto-verify session on page refresh
- ✅ Create invitation with API
- ✅ Auto-copy link to clipboard
- ✅ List all invitations from database
- ✅ Delete invitation via API
- ✅ Real-time quota updates
- ✅ Quota limit enforcement
- ✅ Duplicate name prevention
- ✅ Public invitation page validation
- ✅ Logout and clear session
- ✅ Invalid link handling
