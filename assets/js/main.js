// assets/js/main.js

/**
 * @fileoverview main.js - Berisi fungsionalitas JavaScript global
 * yang berlaku di seluruh situs English Pro-Builder.
 * Fungsi-fungsi di sini akan dimuat di setiap halaman.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Event listener ini memastikan bahwa kode di dalamnya hanya akan berjalan
    // setelah seluruh konten HTML dan CSS di halaman selesai dimuat.
    // Ini adalah praktik yang baik untuk mencegah error karena mencoba
    // memanipulasi elemen HTML yang belum ada di DOM.

    console.log('main.js: English Pro-Builder - Script global berhasil dimuat.');

    // --- Contoh fungsionalitas global yang mungkin ditambahkan di masa depan ---
    // 1. Logika untuk menu navigasi responsif (hamburger menu) jika diterapkan
    // 2. Fungsi untuk menyimpan dan melacak progress pengguna menggunakan localStorage
    // 3. Logika untuk notifikasi atau pop-up umum di seluruh situs
    // 4. Implementasi tema terang/gelap (dark/light mode)
    // 5. Fungsi utilitas umum yang bisa digunakan di banyak modul
});

// Anda bisa menambahkan fungsi-fungsi global lain di luar DOMContentLoaded
// jika fungsi tersebut tidak perlu menunggu DOM sepenuhnya siap.
// Namun, untuk sebagian besar interaksi UI, DOMContentLoaded adalah pilihan terbaik.