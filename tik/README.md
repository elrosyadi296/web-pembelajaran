# E-Learning TIK Kelas IX - BAB 3: Perangkat Akses Internet

Aplikasi Web Pembelajaran Single Page Application (SPA) interaktif untuk mata pelajaran TIK Kelas IX SMP/MTs.

---

## 🔒 Alur Baru Validasi Koneksi Spreadsheet & Notifikasi

1. **Gagal Masuk Jika Belum Terhubung**:
   - Jika `GOOGLE_SCRIPT_URL` belum diatur/diisi di file `script.js`, formulir data siswa **TIDAK AKAN BISA DIKIRIM** dan menampilkan pesan error merah.
   - Sistem melakukan tes koneksi (*ping*) langsung ke Google Apps Script saat tombol "Verifikasi & Mulai Kuis" diklik.
2. **Notifikasi Status**:
   - Pesan status otomatis muncul di dalam modal (memeriksa koneksi, koneksi gagal, atau koneksi berhasil).
   - Saat kuis selesai, muncul notifikasi hijau berikon centang `Data Nilai Berhasil Terkirim ke Spreadsheet Guru!`.
3. **Tombol Tutup (X)**:
   - Disediakan tombol **"X"** di pojok kanan atas modal jika siswa batal/tidak jadi mengerjakan kuis.

---

## 🚀 Cara Menghubungkan ke Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com) dan buat dokumen baru.
2. Buat judul kolom di baris pertama:
   - **Kolom A**: Waktu
   - **Kolom B**: Nama Siswa
   - **Kolom C**: Kelas
   - **Kolom D**: Nilai Kuis
3. Klik menu **Ekstensi** > **Apps Script**.
4. Buka file `google_apps_script.js` dalam proyek ini, salin seluruh kodenya, dan tempelkan ke editor Apps Script.
5. Klik **Deploy** > **New deployment**.
   - **Select type**: *Web App*
   - **Execute as**: *Me*
   - **Who has access**: *Anyone* (Siapa saja)
6. Klik **Deploy**, lalu salin **Web App URL** yang dihasilkan.
7. Buka file `script.js` di proyek ini, cari variabel di baris 7:
   ```javascript
   const GOOGLE_SCRIPT_URL = "GANTI_DENGAN_URL_WEB_APP_GOOGLE_APPS_SCRIPT_ANDA";
   ```
   Ganti teks placeholder tersebut dengan Web App URL yang Anda dapatkan.
