// assets/js/quiz.js

/**
 * @fileoverview quiz.js - Berisi logika fungsionalitas untuk berbagai jenis kuis
 * di seluruh situs English Pro-Builder.
 * Fungsi-fungsi di sini dapat dipanggil oleh halaman-halaman modul yang membutuhkan kuis.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Pesan konfirmasi bahwa quiz.js telah dimuat
    console.log('quiz.js: Logika kuis berhasil dimuat.');

    // --- LOGIKA KUIS UNTUK MODUL 1: ALPHABET & NUMBERS ---

    // Dapatkan referensi ke elemen-elemen HTML di halaman
    const questionElement = document.getElementById('number-quiz-question');
    const optionsContainer = document.getElementById('number-quiz-options');
    const feedbackElement = document.getElementById('number-quiz-feedback');
    const nextButton = document.getElementById('next-question-btn');

    // Data kuis untuk modul Alphabet & Numbers
    // Setiap objek dalam array adalah satu pertanyaan kuis
    const quizQuestions = [
        { 
            question: "Manakah angka 'tiga'?", 
            options: ["1", "3", "5", "8"], 
            correctAnswer: "3" 
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
        // Tambahkan lebih banyak pertanyaan di sini untuk variasi
    ];

    let currentQuestionIndex = 0; // Melacak indeks pertanyaan saat ini
    let userScore = 0; // Melacak skor pengguna (bisa ditampilkan nanti)

    /**
     * @function loadQuestion
     * Memuat dan menampilkan pertanyaan kuis saat ini ke halaman.
     * Mengatur ulang tampilan opsi dan feedback.
     */
    function loadQuestion() {
        // Cek apakah masih ada pertanyaan tersisa
        if (currentQuestionIndex < quizQuestions.length) {
            const q = quizQuestions[currentQuestionIndex]; // Dapatkan objek pertanyaan saat ini

            questionElement.textContent = q.question; // Tampilkan teks pertanyaan
            optionsContainer.innerHTML = ''; // Bersihkan opsi jawaban sebelumnya
            
            feedbackElement.textContent = ''; // Bersihkan teks feedback
            feedbackElement.className = 'quiz-feedback'; // Reset kelas CSS feedback (untuk menyembunyikan/menghilangkan warna sebelumnya)
            nextButton.style.display = 'none'; // Sembunyikan tombol 'Pertanyaan Selanjutnya'

            // Buat tombol untuk setiap opsi jawaban
            q.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.dataset.answer = option; // Simpan nilai jawaban di custom data attribute
                button.addEventListener('click', checkAnswer); // Tambahkan event listener untuk mengecek jawaban saat diklik
                optionsContainer.appendChild(button); // Masukkan tombol ke dalam container opsi
            });
        } else {
            // Jika semua pertanyaan sudah dijawab
            questionElement.textContent = "Kuis selesai! Selamat! Anda berhasil menyelesaikan semua pertanyaan.";
            optionsContainer.innerHTML = ''; // Hapus semua tombol opsi
            feedbackElement.textContent = `Skor Anda: ${userScore} dari ${quizQuestions.length} pertanyaan.`;
            feedbackElement.classList.add('show'); // Pastikan feedback terlihat
            nextButton.style.display = 'none'; // Pastikan tombol selanjutnya tersembunyi
        }
    }

    /**
     * @function checkAnswer
     * Memeriksa jawaban yang dipilih pengguna dan memberikan feedback.
     * @param {Event} event - Objek event dari klik tombol.
     */
    function checkAnswer(event) {
        const selectedButton = event.target; // Dapatkan tombol yang diklik
        const selectedAnswer = selectedButton.dataset.answer; // Dapatkan jawaban dari data attribute
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer; // Dapatkan jawaban benar dari data kuis
        
        // Nonaktifkan semua tombol opsi setelah pengguna memilih jawaban
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true; // Nonaktifkan tombol
            // Berikan highlight visual untuk jawaban benar dan salah
            if (button.dataset.answer === correctAnswer) {
                button.style.backgroundColor = '#4CAF50'; // Hijau untuk jawaban benar
                button.style.color = 'white';
            } else if (button.dataset.answer === selectedAnswer) {
                button.style.backgroundColor = '#f44336'; // Merah untuk jawaban yang dipilih (jika salah)
                button.style.color = 'white';
            }
        });

        // Berikan feedback teks (benar/salah)
        if (selectedAnswer === correctAnswer) {
            feedbackElement.textContent = "Benar! Bagus sekali.";
            feedbackElement.classList.remove('incorrect'); // Hapus kelas incorrect jika ada
            feedbackElement.classList.add('correct', 'show'); // Tambahkan kelas correct dan show
            userScore++; // Tambah skor jika benar
        } else {
            feedbackElement.textContent = `Salah. Jawaban yang benar adalah "${correctAnswer}".`;
            feedbackElement.classList.remove('correct'); // Hapus kelas correct jika ada
            feedbackElement.classList.add('incorrect', 'show'); // Tambahkan kelas incorrect dan show
        }
        
        // Tampilkan tombol 'Pertanyaan Selanjutnya'
        nextButton.style.display = 'block'; 
        nextButton.style.backgroundColor = '#007bff'; // Pastikan warnanya benar (dari style.css)
        nextButton.style.color = 'white';
    }

    /**
     * @function goToNextQuestion
     * Pindah ke pertanyaan kuis berikutnya atau menyelesaikan kuis.
     */
    function goToNextQuestion() {
        currentQuestionIndex++; // Tingkatkan indeks pertanyaan
        loadQuestion(); // Muat pertanyaan berikutnya
    }

    // Tambahkan event listener ke tombol 'Pertanyaan Selanjutnya'
    if (nextButton) { // Pastikan tombol ada di halaman
        nextButton.addEventListener('click', goToNextQuestion);
    }
    
    // Panggil fungsi loadQuestion untuk memulai kuis saat halaman dimuat
    // Pastikan elemen kuis ada di halaman sebelum mencoba memuatnya
    if (questionElement && optionsContainer && feedbackElement && nextButton) {
        loadQuestion();
    } else {
        // console.warn('Elemen kuis tidak ditemukan di halaman ini. Quiz.js mungkin tidak diperlukan di sini.');
        // Ini adalah pesan opsional jika quiz.js dimuat di halaman yang tidak memiliki elemen kuis
    }
});