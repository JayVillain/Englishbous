// assets/js/vocabulary.js

/**
 * @fileoverview vocabulary.js - Berisi logika fungsionalitas untuk fitur-fitur
 * terkait kosakata, seperti kuis mencocokkan, flashcards, dll.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('vocabulary.js: Logika kosakata berhasil dimuat.');

    // --- Data Kuis Mencocokkan untuk Modul 4: Essential Vocabulary ---
    const matchingQuizData = [
        { en: "Mother", id: "Ibu" },
        { en: "Father", id: "Ayah" },
        { en: "Brother", id: "Kakak/Adik laki-laki" },
        { en: "Sister", id: "Kakak/Adik perempuan" },
        { en: "Apple", id: "Apel" },
        { en: "Water", id: "Air" },
        { en: "Bread", id: "Roti" }
        // Tambahkan lebih banyak pasangan kata di sini
    ];

    /**
     * @function initMatchingQuiz
     * Menginisialisasi kuis mencocokkan.
     * @param {string} containerId - ID container utama kuis mencocokkan.
     * @param {string} enOptionsId - ID container untuk opsi Bahasa Inggris.
     * @param {string} idOptionsId - ID container untuk opsi Bahasa Indonesia.
     * @param {string} feedbackId - ID elemen feedback.
     * @param {string} nextBtnId - ID tombol selanjutnya.
     * @param {Array<Object>} data - Array objek {en: "...", id: "..."}.
     */
    function initMatchingQuiz(containerId, enOptionsId, idOptionsId, feedbackId, nextBtnId, data) {
        const matchingContainer = document.getElementById(containerId);
        const enOptionsContainer = document.getElementById(enOptionsId);
        const idOptionsContainer = document.getElementById(idOptionsId);
        const feedbackElement = document.getElementById(feedbackId);
        const nextButton = document.getElementById(nextBtnId);

        if (!matchingContainer || !enOptionsContainer || !idOptionsContainer || !feedbackElement || !nextButton) {
            // console.log('Matching quiz elements not found. Skipping initialization.');
            return;
        }

        let currentPairs = []; // Pasangan kata untuk satu sesi kuis mencocokkan
        let selectedEn = null; // Menyimpan tombol Bahasa Inggris yang dipilih
        let selectedId = null; // Menyimpan tombol Bahasa Indonesia yang dipilih
        let matchedPairsCount = 0; // Menghitung pasangan yang sudah dicocokkan
        const pairsPerRound = 3; // Jumlah pasangan yang ditampilkan per ronde kuis

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            return array;
        }

        function loadMatchingRound() {
            enOptionsContainer.innerHTML = '';
            idOptionsContainer.innerHTML = '';
            feedbackElement.textContent = '';
            feedbackElement.className = 'quiz-feedback';
            nextButton.style.display = 'none';
            selectedEn = null;
            selectedId = null;
            matchedPairsCount = 0;

            // Pilih sejumlah pasangan acak untuk ronde ini
            const shuffledData = shuffleArray([...data]); // Duplikasi dan acak data
            currentPairs = shuffledData.slice(0, pairsPerRound);

            // Buat opsi Bahasa Inggris
            let enWords = shuffleArray(currentPairs.map(p => p.en));
            enWords.forEach(word => {
                const button = document.createElement('button');
                button.textContent = word;
                button.classList.add('matching-item');
                button.dataset.value = word; // Simpan nilai kata
                button.addEventListener('click', selectItem);
                enOptionsContainer.appendChild(button);
            });

            // Buat opsi Bahasa Indonesia
            let idWords = shuffleArray(currentPairs.map(p => p.id));
            idWords.forEach(word => {
                const button = document.createElement('button');
                button.textContent = word;
                button.classList.add('matching-item');
                button.dataset.value = word; // Simpan nilai terjemahan
                button.addEventListener('click', selectItem);
                idOptionsContainer.appendChild(button);
            });
        }

        function selectItem(event) {
            const clickedButton = event.target;
            clickedButton.classList.add('selected'); // Tandai sebagai terpilih

            if (enOptionsContainer.contains(clickedButton)) {
                // Jika yang dipilih adalah Bahasa Inggris
                if (selectedEn) selectedEn.classList.remove('selected'); // Hapus pilihan sebelumnya
                selectedEn = clickedButton;
            } else {
                // Jika yang dipilih adalah Bahasa Indonesia
                if (selectedId) selectedId.classList.remove('selected'); // Hapus pilihan sebelumnya
                selectedId = clickedButton;
            }

            // Jika keduanya sudah dipilih, cek kecocokan
            if (selectedEn && selectedId) {
                checkMatch();
            }
        }

        function checkMatch() {
            const enValue = selectedEn.dataset.value;
            const idValue = selectedId.dataset.value;

            const isCorrectMatch = currentPairs.some(pair => 
                pair.en === enValue && pair.id === idValue
            );

            if (isCorrectMatch) {
                feedbackElement.textContent = "Benar! Pasangan cocok.";
                feedbackElement.classList.remove('incorrect');
                feedbackElement.classList.add('correct', 'show');

                // Tandai kedua tombol sebagai dicocokkan dan nonaktifkan
                selectedEn.classList.add('matched');
                selectedId.classList.add('matched');
                selectedEn.disabled = true;
                selectedId.disabled = true;
                selectedEn.classList.remove('selected');
                selectedId.classList.remove('selected');

                matchedPairsCount++;
                if (matchedPairsCount === pairsPerRound) {
                    feedbackElement.textContent = "Semua pasangan cocok! Selamat!";
                    nextButton.style.display = 'block';
                    nextButton.style.backgroundColor = '#28a745'; // Warna hijau untuk tombol next setelah selesai
                }
            } else {
                feedbackElement.textContent = "Salah. Coba lagi.";
                feedbackElement.classList.remove('correct');
                feedbackElement.classList.add('incorrect', 'show');

                // Kembalikan pilihan setelah beberapa saat untuk mencoba lagi
                setTimeout(() => {
                    if (selectedEn) selectedEn.classList.remove('selected');
                    if (selectedId) selectedId.classList.remove('selected');
                    selectedEn = null;
                    selectedId = null;
                    feedbackElement.classList.remove('show');
                }, 1000); // Reset setelah 1 detik
            }
        }

        nextButton.addEventListener('click', loadMatchingRound); // Lanjut ke ronde berikutnya
        loadMatchingRound(); // Muat ronde pertama saat inisialisasi
    }

    // --- Panggil initMatchingQuiz jika elemennya ada di halaman ---
    if (document.getElementById('matching-quiz-container')) {
        initMatchingQuiz(
            'matching-quiz-container', 
            'matching-en-options', 
            'matching-id-options', 
            'matching-quiz-feedback', 
            'next-matching-btn', 
            matchingQuizData
        );
    }
});