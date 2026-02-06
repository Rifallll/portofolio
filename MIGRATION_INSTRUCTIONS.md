# Manual SQL Migration Instructions

Karena browser automation tidak tersedia, silakan jalankan SQL script ini secara manual:

## Langkah-langkah:

1. **Buka Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Login jika belum
   - Pilih project portfolio Anda

2. **Buka SQL Editor**
   - Di sidebar kiri, klik **"SQL Editor"**
   - Atau langsung ke: `https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/sql`

3. **Jalankan Query Ini**
   
   Copy-paste SQL berikut ke editor:

   ```sql
   UPDATE certificates
   SET category = 'Course'
   WHERE category LIKE '%Tech%';
   ```

4. **Klik "Run"**
   - Tunggu sampai selesai
   - Akan muncul pesan berapa banyak rows yang di-update

5. **Verifikasi**
   
   Jalankan query ini untuk cek hasilnya:

   ```sql
   SELECT category, COUNT(*) as total
   FROM certificates
   GROUP BY category
   ORDER BY category;
   ```

## Expected Result:
- Semua sertifikat yang tadinya kategori "Tech" sekarang jadi "Course"
- Filter "TECH" di website akan otomatis hilang
- Semua sertifikat Tech sekarang muncul di filter "Course"

---

**Setelah selesai, refresh halaman certificates** di website untuk melihat perubahan!
