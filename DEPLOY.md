# 📦 Panduan Deploy ke Netlify

Website undangan wisuda ini siap untuk di-deploy ke Netlify (gratis dan mudah).

## ✅ Persiapan

Semua file sudah siap! Yang perlu Anda lakukan:

1. **Push code ke GitHub** (jika belum)
2. **Deploy ke Netlify** (gratis)

---

## 🚀 Cara Deploy

### **Opsi 1: Deploy via Netlify Dashboard (Termudah)** ⭐

1. **Buka** https://app.netlify.com
2. **Sign up/Login** dengan GitHub
3. Klik **"Add new site"** → **"Import an existing project"**
4. **Connect to GitHub** → pilih repository `graduation-invitation`
5. **Build settings** (otomatis terdeteksi):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Klik **"Deploy site"**
7. **Selesai!** Anda akan dapat link seperti: `https://random-name-123.netlify.app`

### **Opsi 2: Deploy via CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Follow the prompts
```

### **Opsi 3: Deploy via Drag & Drop**

```bash
# Build dulu
npm run build

# Buka https://app.netlify.com/drop
# Drag & drop folder 'dist' ke halaman tersebut
```

---

## 🔗 Link Format Setelah Deploy

Setelah deploy, link undangan akan jadi:
```
https://your-site-name.netlify.app/i/1/Budi-Santoso
```

**Contoh real:**
- `https://wisuda-ulbi.netlify.app/i/1/Ana-Silva`
- `https://wisuda-ulbi.netlify.app/i/2/Diodatus-Seran`

**Keuntungan:**
✅ Tanpa %20 (pakai dash `-`)
✅ Link pendek dan rapi
✅ Mudah dibaca dan dibagikan

---

## 🎯 Custom Domain (Opsional)

Jika punya domain sendiri (contoh: `wisuda.ulbi.ac.id`):

1. Di Netlify Dashboard → **Site settings** → **Domain management**
2. Klik **"Add custom domain"**
3. Masukkan domain Anda
4. Ikuti instruksi DNS setting (tambah CNAME record)
5. Selesai! Link jadi: `https://wisuda.ulbi.ac.id/i/1/Budi-Santoso`

---

## 🔄 Ganti Nama Site (Opsional)

Secara default Netlify kasih nama random. Untuk ganti:

1. Di Netlify Dashboard → **Site settings** → **General**
2. **Site details** → klik **"Change site name"**
3. Ganti jadi nama yang Anda mau (contoh: `wisuda-ulbi`)
4. Link jadi: `https://wisuda-ulbi.netlify.app`

---

## ✅ Yang Sudah Dipersiapkan

✅ **netlify.toml** - Konfigurasi routing untuk SPA
✅ **vite.config.ts** - Build configuration
✅ **package.json** - Dependencies dan scripts
✅ **URL Format** - Dash instead of %20
✅ **Responsive Design** - Mobile-friendly
✅ **Login System** - Access code protection

---

## 🔐 Setelah Deploy

**Yang perlu dibagikan ke wisudawan:**
1. Link website: `https://your-site-name.netlify.app`
2. Access code masing-masing (lihat `KODE_AKSES.md`)

**Wisudawan flow:**
1. Buka website
2. Klik "Buat Undangan"
3. Input access code (contoh: `AYD2025`)
4. Buat undangan dengan nama tamu
5. Copy link → kirim ke tamu
6. Tamu klik link → lihat undangan

---

## 📝 Catatan Penting

- ✅ **Gratis selamanya** (100GB bandwidth/bulan)
- ✅ **HTTPS otomatis** (secure dengan SSL)
- ✅ **Global CDN** (cepat di seluruh dunia)
- ✅ **No server needed** (static hosting)
- ✅ **Auto deploy** dari GitHub (setiap push)
- ✅ **Instant rollback** jika ada masalah

---

## 🔄 Auto Deploy dari GitHub

Setelah setup, setiap kali Anda push ke GitHub:
1. Netlify otomatis detect perubahan
2. Build otomatis
3. Deploy otomatis
4. Website langsung update!

**Tidak perlu deploy manual lagi!** 🎉

---

## 🆘 Troubleshooting

**Jika link tidak berfungsi setelah deploy:**
1. Pastikan `netlify.toml` ter-commit
2. Cek **Deploy log** di Netlify dashboard
3. Clear cache browser (Ctrl + Shift + R)
4. Atau trigger **"Trigger deploy"** → **"Clear cache and deploy site"**

**Jika ada error saat build:**
1. Cek `npm run build` lokal dulu
2. Fix error yang muncul
3. Push lagi ke GitHub
4. Netlify auto-redeploy

**Jika 404 saat akses link undangan:**
1. Pastikan file `netlify.toml` ada
2. Check redirect rules sudah benar
3. Redeploy dengan clear cache

---

## 📞 Support

Jika ada masalah saat deploy, hubungi developer atau cek:
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/
- Netlify Community: https://answers.netlify.com

---

## 🎁 Bonus Tips

**Preview Deploy:**
- Setiap branch baru otomatis dapat preview URL
- Test fitur baru tanpa ganggu production

**Environment Variables:**
- Bisa tambah ENV vars di Netlify dashboard
- Useful untuk API keys atau config

**Forms & Functions:**
- Netlify punya fitur forms dan serverless functions
- Bisa extend website dengan backend logic (future upgrade)

---

**Happy Deploying! 🎓✨**
