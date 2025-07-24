// assets/js/quiz.js

/**
 * @fileoverview quiz.js - Berisi logika fungsionalitas untuk berbagai jenis kuis
 * di seluruh situs English Pro-Builder.
 * Fungsi-fungsi di sini dapat dipanggil oleh halaman-halaman modul yang membutuhkan kuis.
 *
 * Konsep:
 * - Menggunakan satu fungsi `initQuiz` yang generik untuk menangani kuis pilihan ganda.
 * - Data pertanyaan kuis disimpan terpisah untuk setiap modul.
 * - `initQuiz` dipanggil secara kondisional hanya jika elemen kuis yang relevan ada di halaman.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('quiz.js: Logika kuis berhasil dimuat.');

    // --- Data Kuis untuk Modul 1: Alphabet & Numbers ---
    // Pastikan ID elemen di HTML modul ini cocok:
    // - questionElement: 'number-quiz-question'
    // - optionsContainer: 'number-quiz-options'
    // - feedbackElement: 'number-quiz-feedback'
    // - nextButton: 'next-question-btn'
    const numberQuizData = [
        { 
            question: "Manakah angka 'dua'?", 
            options: ["1", "2", "3", "4"], 
            correctAnswer: "2" 
        },
        { 
            question: "Manakah angka 'sepuluh'?", 
            options: ["5", "10", "15", "20"], 
            correctAnswer: "10" 
        },
        { 
            question: "Manakah angka 'satu'?", 
            options: ["0", "1", "10", "100"], 
            correctAnswer: "1" 
        },
        { 
            question: "Manakah angka 'dua puluh'?", 
            options: ["12", "20", "22", "30"], 
            correctAnswer: "20" 
        },
        { 
            question: "Manakah angka 'empat belas'?", 
            options: ["4", "10", "14", "40"], 
            correctAnswer: "14" 
        },
        {
            question: "Manakah yang merupakan huruf 'K'?",
            options: ["L", "M", "K", "N"],
            correctAnswer: "K"
        },
        {
            question: "Manakah yang merupakan huruf 'P'?",
            options: ["B", "D", "P", "R"],
            correctAnswer: "P"
        },
        {
            question: "Manakah yang merupakan huruf 'S'?",
            options: ["F", "S", "X", "Z"],
            correctAnswer: "S"
        }
        // Tambahkan lebih banyak pertanyaan di sini untuk variasi Modul 1
    ];

    // --- Data Kuis untuk Modul 2: Greetings & Introductions ---
    // Pastikan ID elemen di HTML modul ini cocok:
    // - questionElement: 'greetings-quiz-question'
    // - optionsContainer: 'greetings-quiz-options'
    // - feedbackElement: 'greetings-quiz-feedback'
    // - nextButton: 'next-greetings-btn'
    const greetingsQuizData = [
        {
            question: "Lengkapi: 'Hello, ___ are you?'",
            options: ["who", "what", "how", "when"],
            correctAnswer: "how"
        },
        {
            question: "Jika Anda ingin memperkenalkan nama Anda, apa yang akan Anda katakan?",
            options: ["My name is...", "What's your name?", "How are you?", "Good morning."],
            correctAnswer: "My name is..."
        },
        {
            question: "Saat Anda berpisah di malam hari, Anda bisa mengatakan:",
            options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
            correctAnswer: "Good night"
        },
        {
            question: "Respons yang tepat untuk 'Nice to meet you' adalah:",
            options: ["Hello", "Thank you", "Nice to meet you too", "I'm fine"],
            correctAnswer: "Nice to meet you too"
        }
    ];

    // --- Data Kuis untuk Modul 3: Pronouns & 'To Be' ---
    // Pastikan ID elemen di HTML modul ini cocok:
    // - questionElement: 'tobe-quiz-question'
    // - optionsContainer: 'tobe-quiz-options'
    // - feedbackElement: 'tobe-quiz-feedback'
    // - nextButton: 'next-tobe-btn'
    const tobeQuizData = [
        {
            question: "Lengkapi: 'I ___ a student.'",
            options: ["is", "are", "am", "be"],
            correctAnswer: "am"
        },
        {
            question: "Lengkapi: 'She ___ happy.'",
            options: ["am", "are", "is", "be"],
            correctAnswer: "is"
        },
        {
            question: "Lengkapi: 'They ___ in the park.'",
            options: ["is", "am", "are", "be"],
            correctAnswer: "are"
        },
        {
            question: "Manakah bentuk 'to be' yang benar untuk 'It'?",
            options: ["am", "is", "are", "be"],
            correctAnswer: "is"
        },
        {
            question: "Ubah 'Kamu pintar.' ke bahasa Inggris:",
            options: ["You is smart.", "You are smart.", "You am smart.", "You be smart."],
            correctAnswer: "You are smart."
        }
    ];

    /**
     * @function initQuiz
     * Fungsi utama yang dapat dipakai ulang untuk menginisialisasi dan menjalankan
     * sebuah kuis pilihan ganda di halaman.
     *
     * @param {string} questionId  - ID dari elemen HTML (misalnya <p>) yang akan menampilkan pertanyaan kuis.
     * @param {string} optionsId   - ID dari elemen HTML (misalnya <div>) yang akan menampung tombol-tombol opsi jawaban.
     * @param {string} feedbackId  - ID dari elemen HTML (misalnya <div>) yang akan menampilkan feedback (benar/salah).
     * @param {string} nextBtnId   - ID dari elemen HTML (misalnya <button>) untuk tombol "Pertanyaan Selanjutnya".
     * @param {Array<Object>} quizQuestionsData - Array berisi objek-objek pertanyaan kuis untuk modul ini.
     * Setiap objek harus memiliki properti 'question', 'options', dan 'correctAnswer'.
     */
    function initQuiz(questionId, optionsId, feedbackId, nextBtnId, quizQuestionsData) {
        // Dapatkan referensi ke elemen-elemen HTML berdasarkan ID yang diberikan
        const questionElement = document.getElementById(questionId);
        const optionsContainer = document.getElementById(optionsId);
        const feedbackElement = document.getElementById(feedbackId);
        const nextButton = document.getElementById(nextBtnId);

        // Lakukan pengecekan awal: Pastikan semua elemen HTML yang diperlukan ada di halaman.
        // Jika ada yang tidak ditemukan, log peringatan dan hentikan eksekusi fungsi ini
        // untuk mencegah error. Ini penting karena quiz.js dimuat di beberapa halaman.
        if (!questionElement || !optionsContainer || !feedbackElement || !nextButton) {
            console.warn(`initQuiz: Elemen kuis dengan ID '${questionId}' atau lainnya tidak ditemukan. Kuis tidak diinisialisasi.`);
            return; // Keluar dari fungsi jika elemen tidak lengkap
        }

        let currentQuestionIndex = 0; // Melacak indeks pertanyaan yang sedang ditampilkan
        let userScore = 0;            // Melacak skor pengguna untuk kuis ini

        /**
         * @function loadQuestion
         * Memuat data pertanyaan saat ini ke elemen HTML dan mengatur ulang tampilan kuis.
         */
        function loadQuestion() {
            // Cek apakah masih ada pertanyaan yang belum dijawab
            if (currentQuestionIndex < quizQuestionsData.length) {
                const q = quizQuestionsData[currentQuestionIndex]; // Dapatkan objek pertanyaan saat ini

                questionElement.textContent = q.question; // Perbarui teks pertanyaan
                optionsContainer.innerHTML = ''; // Hapus semua tombol opsi dari pertanyaan sebelumnya
                
                feedbackElement.textContent = ''; // Kosongkan teks feedback
                // Reset kelas CSS feedback untuk menyembunyikan atau menghilangkan styling sebelumnya
                feedbackElement.className = 'quiz-feedback'; 
                nextButton.style.display = 'none'; // Sembunyikan tombol "Pertanyaan Selanjutnya"

                // Buat tombol untuk setiap opsi jawaban dari data kuis
                q.options.forEach(option => {
                    const button = document.createElement('button');
                    button.textContent = option; // Teks tombol adalah opsi jawaban
                    button.dataset.answer = option; // Simpan jawaban di atribut data-answer tombol
                    button.addEventListener('click', checkAnswer); // Tambahkan event listener untuk memanggil checkAnswer saat tombol diklik
                    optionsContainer.appendChild(button); // Masukkan tombol ke dalam container opsi
                });
            } else {
                // Jika semua pertanyaan sudah dijawab
                questionElement.textContent = "Kuis selesai! Selamat! Anda berhasil menyelesaikan semua pertanyaan.";
                optionsContainer.innerHTML = ''; // Hapus semua tombol opsi
                feedbackElement.textContent = `Skor Anda: ${userScore} dari ${quizQuestionsData.length} pertanyaan.`;
                feedbackElement.classList.add('show'); // Pastikan feedback terlihat
                nextButton.style.display = 'none'; // Pastikan tombol selanjutnya tersembunyi
            }
        }

        /**
         * @function checkAnswer
         * Memeriksa jawaban yang dipilih pengguna dan memberikan feedback visual.
         * @param {Event} event - Objek event yang dipicu oleh klik tombol.
         */
        function checkAnswer(event) {
            const selectedButton = event.target; // Tombol yang baru saja diklik
            const selectedAnswer = selectedButton.dataset.answer; // Jawaban yang dipilih pengguna
            const correctAnswer = quizQuestionsData[currentQuestionIndex].correctAnswer; // Jawaban yang benar

            // Nonaktifkan semua tombol opsi untuk mencegah perubahan jawaban setelah dipilih
            Array.from(optionsContainer.children).forEach(button => {
                button.disabled = true; // Nonaktifkan tombol
                // Berikan highlight visual pada tombol berdasarkan benar/salah
                if (button.dataset.answer === correctAnswer) {
                    button.style.backgroundColor = '#4CAF50'; // Hijau untuk jawaban yang benar
                    button.style.color = 'white';
                } else if (button.dataset.answer === selectedAnswer) {
                    button.style.backgroundColor = '#f44336'; // Merah untuk jawaban yang dipilih jika salah
                    button.style.color = 'white';
                }
            });

            // Berikan feedback teks dan styling (benar/salah)
            if (selectedAnswer === correctAnswer) {
                feedbackElement.textContent = "Benar! Bagus sekali.";
                feedbackElement.classList.remove('incorrect'); // Hapus kelas 'incorrect' jika ada
                feedbackElement.classList.add('correct', 'show'); // Tambahkan kelas 'correct' dan 'show'
                userScore++; // Tingkatkan skor
            } else {
                feedbackElement.textContent = `Salah. Jawaban yang benar adalah "${correctAnswer}".`;
                feedbackElement.classList.remove('correct'); // Hapus kelas 'correct' jika ada
                feedbackElement.classList.add('incorrect', 'show'); // Tambahkan kelas 'incorrect' dan 'show'
            }
            
            // Tampilkan tombol "Pertanyaan Selanjutnya" setelah jawaban diberikan
            nextButton.style.display = 'block'; 
            // Atur warna tombol next agar konsisten dengan desain
            nextButton.style.backgroundColor = '#007bff'; 
            nextButton.style.color = 'white';
        }

        /**
         * @function goToNextQuestion
         * Pindah ke pertanyaan kuis berikutnya.
         */
        function goToNextQuestion() {
            currentQuestionIndex++; // Tingkatkan indeks pertanyaan
            loadQuestion(); // Muat pertanyaan baru
        }

        // Tambahkan event listener ke tombol "Pertanyaan Selanjutnya"
        nextButton.addEventListener('click', goToNextQuestion);
        
        // Panggil loadQuestion untuk memuat pertanyaan pertama saat kuis diinisialisasi
        loadQuestion();
    }

    // --- Pemanggilan Fungsi initQuiz untuk Setiap Kuis di Halaman ---
    // Di sini kita memanggil fungsi initQuiz untuk setiap kuis yang mungkin ada
    // di halaman yang sedang dimuat. Pemanggilan ini bersifat kondisional,
    // artinya kuis hanya akan diinisialisasi jika elemen HTML untuknya ditemukan.

    // Inisialisasi Kuis Modul 1: Alphabet & Numbers
    // ID elemen: 'number-quiz-question', 'number-quiz-options', 'number-quiz-feedback', 'next-question-btn'
    if (document.getElementById('number-quiz-question')) {
        initQuiz('number-quiz-question', 'number-quiz-options', 'number-quiz-feedback', 'next-question-btn', numberQuizData);
    }

    // Inisialisasi Kuis Modul 2: Greetings & Introductions
    // ID elemen: 'greetings-quiz-question', 'greetings-quiz-options', 'greetings-quiz-feedback', 'next-greetings-btn'
    if (document.getElementById('greetings-quiz-question')) {
        initQuiz('greetings-quiz-question', 'greetings-quiz-options', 'greetings-quiz-feedback', 'next-greetings-btn', greetingsQuizData);
    }

    // Inisialisasi Kuis Modul 3: Pronouns & 'To Be'
    // ID elemen: 'tobe-quiz-question', 'tobe-quiz-options', 'tobe-quiz-feedback', 'next-tobe-btn'
    if (document.getElementById('tobe-quiz-question')) {
        initQuiz('tobe-quiz-question', 'tobe-quiz-options', 'tobe-quiz-feedback', 'next-tobe-btn', tobeQuizData);
    }
});