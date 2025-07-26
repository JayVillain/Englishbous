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
 * - Menambahkan navigasi otomatis ke modul berikutnya setelah kuis selesai.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('quiz.js: Logika kuis berhasil dimuat.');

    // --- Data Kuis untuk Modul 1: Alphabet & Numbers ---
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
    ];

    // --- Data Kuis untuk Modul 2: Greetings & Introductions ---
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

    // --- Data Kuis untuk Modul 5: Simple Present & Present Continuous ---
    const tenseQuizData = [
        {
            question: "I often ___ (go) to the library.",
            options: ["go", "am going", "goes", "is going"],
            correctAnswer: "go"
        },
        {
            question: "She ___ (study) English right now.",
            options: ["study", "studies", "is studying", "are studying"],
            correctAnswer: "is studying"
        },
        {
            question: "The sun ___ (rise) in the East.",
            options: ["rise", "is rising", "rises", "are rising"],
            correctAnswer: "rises"
        },
        {
            question: "They ___ (not play) soccer at the moment.",
            options: ["do not play", "are not playing", "does not play", "is not playing"],
            correctAnswer: "are not playing"
        },
        {
            question: "___ you ___ (listen) to music now?",
            options: ["Are you listen", "Do you listen", "Are you listening", "Do you listening"],
            correctAnswer: "Are you listening"
        },
        {
            question: "He ___ (work) every day from 9 to 5.",
            options: ["work", "is working", "works", "are working"],
            correctAnswer: "works"
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
     * @param {string|null} nextModuleUrl - URL relatif ke modul berikutnya setelah kuis ini selesai. Jika null, tidak ada navigasi.
     */
    function initQuiz(questionId, optionsId, feedbackId, nextBtnId, quizQuestionsData, nextModuleUrl = null) {
        const questionElement = document.getElementById(questionId);
        const optionsContainer = document.getElementById(optionsId);
        const feedbackElement = document.getElementById(feedbackId);
        const nextButton = document.getElementById(nextBtnId);

        if (!questionElement || !optionsContainer || !feedbackElement || !nextButton) {
            console.warn(`initQuiz: Elemen kuis dengan ID '${questionId}' atau lainnya tidak ditemukan. Kuis tidak diinisialisasi.`);
            return;
        }

        let currentQuestionIndex = 0;
        let userScore = 0;

        function loadQuestion() {
            if (currentQuestionIndex < quizQuestionsData.length) {
                const q = quizQuestionsData[currentQuestionIndex];

                questionElement.textContent = q.question;
                optionsContainer.innerHTML = '';
                
                feedbackElement.textContent = '';
                feedbackElement.className = 'quiz-feedback';
                nextButton.style.display = 'none'; // Sembunyikan tombol 'Next' secara default

                q.options.forEach(option => {
                    const button = document.createElement('button');
                    button.textContent = option;
                    button.dataset.answer = option;
                    button.addEventListener('click', checkAnswer);
                    optionsContainer.appendChild(button);
                });
            } else {
                // Kuis Selesai: Tampilkan pesan dan tombol 'Lanjut ke Modul Berikutnya'
                questionElement.textContent = `Kuis selesai! Selamat! Anda berhasil menyelesaikan semua pertanyaan.`;
                optionsContainer.innerHTML = '';
                feedbackElement.textContent = `Skor Anda: ${userScore} dari ${quizQuestionsData.length} pertanyaan.`;
                feedbackElement.classList.add('show', 'correct'); // Beri warna hijau untuk skor akhir
                
                nextButton.style.display = 'block'; // Tampilkan tombol
                nextButton.textContent = 'Lanjut ke Modul Berikutnya'; // Ubah teks tombol
                nextButton.classList.add('btn-primary'); // Jadikan tombol utama
                nextButton.classList.remove('btn-secondary'); // Hapus kelas sekunder jika ada
                
                // Tambahkan event listener untuk navigasi ke modul berikutnya
                nextButton.onclick = () => { // Gunakan onclick untuk mengganti event listener sebelumnya
                    if (nextModuleUrl) {
                        window.location.href = nextModuleUrl;
                    } else {
                        // Jika nextModuleUrl tidak dispesifikasikan, mungkin kembali ke home atau tampilkan pesan lain
                        alert('Selamat! Anda telah menyelesaikan modul ini.');
                        // Atau bisa redirect ke index.html utama:
                        // window.location.href = '../../../index.html';
                    }
                };
            }
        }

        function checkAnswer(event) {
            const selectedButton = event.target;
            const selectedAnswer = selectedButton.dataset.answer;
            const correctAnswer = quizQuestionsData[currentQuestionIndex].correctAnswer;
            
            Array.from(optionsContainer.children).forEach(button => {
                button.disabled = true;
                if (button.dataset.answer === correctAnswer) {
                    button.style.backgroundColor = '#4CAF50';
                    button.style.color = 'white';
                } else if (button.dataset.answer === selectedAnswer) {
                    button.style.backgroundColor = '#f44336';
                    button.style.color = 'white';
                }
            });

            if (selectedAnswer === correctAnswer) {
                feedbackElement.textContent = "Benar! Bagus sekali.";
                feedbackElement.classList.remove('incorrect');
                feedbackElement.classList.add('correct', 'show');
                userScore++;
            } else {
                feedbackElement.textContent = `Salah. Jawaban yang benar adalah "${correctAnswer}".`;
                feedbackElement.classList.remove('correct');
                feedbackElement.classList.add('incorrect', 'show');
            }
            
            // Atur tombol 'Next' kembali ke fungsi goToNextQuestion untuk pertanyaan berikutnya
            // atau biarkan onclick yang sudah diatur untuk akhir kuis
            if (currentQuestionIndex < quizQuestionsData.length) { // Jika belum selesai kuis
                 nextButton.style.display = 'block'; 
                 nextButton.textContent = 'Pertanyaan Selanjutnya';
                 nextButton.classList.remove('btn-primary');
                 nextButton.classList.add('btn-secondary');
                 nextButton.onclick = goToNextQuestion; // Kembali ke fungsi normal
            } else {
                 // Sudah di akhir kuis, tombol nextButton akan diatur di loadQuestion
            }
        }

        function goToNextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
        }

        // Event listener awal untuk tombol 'Pertanyaan Selanjutnya'
        // Ini akan ditimpa di loadQuestion jika kuis selesai
        nextButton.addEventListener('click', goToNextQuestion);
        
        loadQuestion();
    }

    // --- Pemanggilan Fungsi initQuiz untuk Setiap Kuis di Halaman ---

    // Kuis Modul 1: Alphabet & Numbers
    // URL modul berikutnya: '../02-greetings-introductions/index.html'
    if (document.getElementById('number-quiz-question')) {
        initQuiz('number-quiz-question', 'number-quiz-options', 'number-quiz-feedback', 'next-question-btn', numberQuizData, '../02-greetings-introductions/index.html');
    }

    // Kuis Modul 2: Greetings & Introductions
    // URL modul berikutnya: '../03-pronouns-to-be/index.html'
    if (document.getElementById('greetings-quiz-question')) {
        initQuiz('greetings-quiz-question', 'greetings-quiz-options', 'greetings-quiz-feedback', 'next-greetings-btn', greetingsQuizData, '../03-pronouns-to-be/index.html');
    }

    // Kuis Modul 3: Pronouns & 'To Be'
    // URL modul berikutnya: '../04-essential-vocabulary/index.html'
    if (document.getElementById('tobe-quiz-question')) {
        initQuiz('tobe-quiz-question', 'tobe-quiz-options', 'tobe-quiz-feedback', 'next-tobe-btn', tobeQuizData, '../04-essential-vocabulary/index.html');
    }

    // Kuis Modul 5: Simple Present & Present Continuous
    // URL modul berikutnya: '../06-prepositions-place-time/index.html'
    if (document.getElementById('tense-quiz-question')) {
        initQuiz('tense-quiz-question', 'tense-quiz-options', 'tense-quiz-feedback', 'next-tense-btn', tenseQuizData, '../06-prepositions-place-time/index.html');
    }
});