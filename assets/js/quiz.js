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

    // --- Data Kuis untuk Modul 6: Prepositions of Place & Time ---
    const prepositionQuizData = [
        {
            question: "The book is ___ the table.",
            options: ["in", "on", "at", "under"],
            correctAnswer: "on"
        },
        {
            question: "I live ___ Jakarta.",
            options: ["on", "at", "in", "by"],
            correctAnswer: "in"
        },
        {
            question: "We meet ___ the cafe ___ 7 PM.",
            options: ["in / on", "on / at", "at / at", "in / in"],
            correctAnswer: "at / at"
        },
        {
            question: "My birthday is ___ August 15th.",
            options: ["in", "on", "at", "from"],
            correctAnswer: "on"
        },
        {
            question: "The cat is sleeping ___ the chair.",
            options: ["over", "in", "under", "next to"],
            correctAnswer: "under"
        },
        {
            question: "She works ___ an office.",
            options: ["on", "at", "in", "to"],
            correctAnswer: "in"
        },
        {
            question: "The meeting is ___ Monday morning.",
            options: ["at", "in", "on", "for"],
            correctAnswer: "on"
        }
    ];

    // --- Data Kuis untuk Modul 7: Articles & Quantifiers ---
    const articleQuantifierQuizData = [
        {
            question: "She has ___ interesting idea.",
            options: ["a", "an", "the", "some"],
            correctAnswer: "an"
        },
        {
            question: "I need ___ water. (Saya butuh sedikit air.)",
            options: ["many", "much", "some", "any"],
            correctAnswer: "some"
        },
        {
            question: "Do you have ___ money?",
            options: ["much", "many", "some", "any"],
            correctAnswer: "any"
        },
        {
            question: "Pass me ___ book on the table.",
            options: ["a", "an", "the", "no article"],
            correctAnswer: "the"
        },
        {
            question: "There are ___ students in the class.",
            options: ["much", "many", "some", "any"],
            correctAnswer: "many"
        },
        {
            question: "I like ___ music. (in general)",
            options: ["a", "an", "the", "no article"],
            correctAnswer: "no article"
        },
        {
            question: "They have ___ lot of friends.",
            options: ["a", "an", "the", "no article"],
            correctAnswer: "a"
        }
    ];

    // --- Data Kuis untuk Modul 8: Adverbs & Modals ---
    const adverbModalQuizData = [
        {
            question: "She ___ (always / go) to work by bus.",
            options: ["always go", "always goes", "is always going", "go always"],
            correctAnswer: "always goes"
        },
        {
            question: "I ___ (can / swim) when I was 5 years old.",
            options: ["can swim", "could swim", "will swim", "am swimming"],
            correctAnswer: "could swim"
        },
        {
            question: "It ___ (will / rain) tomorrow, according to the forecast.",
            options: ["will rain", "rains", "is raining", "could rain"],
            correctAnswer: "will rain"
        },
        {
            question: "They ___ (never / eat) fast food.",
            options: ["never eat", "eat never", "never eats", "are never eating"],
            correctAnswer: "never eat"
        },
        {
            question: "___ you please help me with this box?",
            options: ["Can", "Will", "Could", "Are"],
            correctAnswer: "Could"
        },
        {
            question: "We ___ (usually / study) in the library.",
            options: ["study usually", "are usually studying", "usually study", "usually studies"],
            correctAnswer: "usually study"
        }
    ];

    // --- Data Kuis untuk Modul 9: Simple Past & Present Perfect ---
    const pastPerfectQuizData = [
        {
            question: "I ___ (visit) Paris last year.",
            options: ["visited", "have visited", "visit", "was visiting"],
            correctAnswer: "visited"
        },
        {
            question: "She ___ (live) here for five years. (She still lives here.)",
            options: ["lived", "has lived", "lives", "is living"],
            correctAnswer: "has lived"
        },
        {
            question: "They ___ (not see) her since Monday.",
            options: ["did not see", "have not seen", "do not see", "are not seeing"],
            correctAnswer: "have not seen"
        },
        {
            question: "___ you ever ___ (be) to London?",
            options: ["Did you ever be", "Have you ever been", "Are you ever been", "Do you ever be"],
            correctAnswer: "Have you ever been"
        },
        {
            question: "He ___ (finish) his homework an hour ago.",
            options: ["has finished", "finished", "finishes", "is finishing"],
            correctAnswer: "finished"
        },
        {
            question: "My keys ___ (be / find). (They are found now).",
            options: ["were found", "have been found", "are found", "had been found"],
            correctAnswer: "have been found"
        }
    ];

    // --- Data Kuis untuk Modul 10: Comparative & Superlative ---
    const comparativeSuperlativeQuizData = [
        {
            question: "My car is ___ (fast) than yours.",
            options: ["faster", "fastest", "more fast", "most fast"],
            correctAnswer: "faster"
        },
        {
            question: "She is ___ (tall) student in the class.",
            options: ["tallest", "the tallest", "taller", "the taller"],
            correctAnswer: "the tallest"
        },
        {
            question: "This painting is ___ (beautiful) than that one.",
            options: ["beautifuler", "more beautiful", "most beautiful", "beautifullest"],
            correctAnswer: "more beautiful"
        },
        {
            question: "It was ___ (easy) exam of my life.",
            options: ["easier", "easiest", "the easiest", "more easy"],
            correctAnswer: "the easiest"
        },
        {
            question: "He speaks ___ (fluently) in the group.",
            options: ["more fluently", "most fluently", "the most fluently", "fluentlyer"],
            correctAnswer: "the most fluently"
        },
        {
            question: "That's ___ (bad) movie I've ever seen.",
            options: ["worse", "worst", "the worst", "badder"],
            correctAnswer: "the worst"
        }
    ];

    // --- Data Kuis untuk Modul 11: Passive Voice ---
    const passiveVoiceQuizData = [
        {
            question: "The car ___ (wash) every week. (Simple Present Passive)",
            options: ["is washing", "is washed", "washes", "are washed"],
            correctAnswer: "is washed"
        },
        {
            question: "The letter ___ (send) yesterday. (Simple Past Passive)",
            options: ["is sent", "was sent", "sent", "has sent"],
            correctAnswer: "was sent"
        },
        {
            question: "My keys ___ (find) by someone. (Present Perfect Passive)",
            options: ["have found", "have been found", "had found", "are found"],
            correctAnswer: "have been found"
        },
        {
            question: "The house ___ (build) now. (Present Continuous Passive)",
            options: ["is built", "is being built", "is building", "has been built"],
            correctAnswer: "is being built"
        },
        {
            question: "English ___ (can / learn) easily. (Modal Passive)",
            options: ["can learn", "can be learned", "could learn", "is learned"],
            correctAnswer: "can be learned"
        },
        {
            question: "Dinner ___ (prepare) by my mother every evening. (Simple Present Passive)",
            options: ["is preparing", "is prepared", "prepares", "was prepared"],
            correctAnswer: "is prepared"
        }
    ];

    // --- Data Kuis untuk Modul 12: Connectors & Transitions ---
    const connectorQuizData = [
        {
            question: "He likes apples ___ bananas.",
            options: ["but", "so", "and", "however"],
            correctAnswer: "and"
        },
        {
            question: "It was raining. ___, we went for a walk.",
            options: ["Because", "So", "However", "Although"],
            correctAnswer: "However"
        },
        {
            question: "She is smart; ___, she is very kind.",
            options: ["but", "in addition", "therefore", "so"],
            correctAnswer: "in addition"
        },
        {
            question: "He studied hard, ___ he passed the exam.",
            options: ["because", "although", "so", "however"],
            correctAnswer: "so"
        },
        {
            question: "___ it was cold, she went outside.",
            options: ["However", "Because", "Although", "Therefore"],
            correctAnswer: "Although"
        },
        {
            question: "First, prepare the ingredients. ___, mix them together.",
            options: ["Finally", "Then", "As a result", "Because"],
            correctAnswer: "Then"
        }
    ];

    // --- DATA KUIS BARU UNTUK MODUL 13: Conditional Sentences ---
    // ID elemen: 'conditional-quiz-question', 'conditional-quiz-options', 'conditional-quiz-feedback', 'next-conditional-btn'
    const conditionalQuizData = [
        {
            question: "If you ___ (heat) ice, it ___ (melt). (Type 0)",
            options: ["heat / melts", "heats / melts", "heat / melt", "heated / melted"],
            correctAnswer: "heat / melts"
        },
        {
            question: "If it ___ (rain) tomorrow, I ___ (stay) at home. (Type 1)",
            options: ["rains / will stay", "rain / will stay", "rained / would stay", "is raining / stay"],
            correctAnswer: "rains / will stay"
        },
        {
            question: "If I ___ (be) rich, I ___ (buy) a big house. (Type 2 - unreal present)",
            options: ["was / buy", "were / bought", "were / would buy", "am / will buy"],
            correctAnswer: "were / would buy"
        },
        {
            question: "If I ___ (study) harder, I ___ (pass) the exam. (Type 3 - unreal past)",
            options: ["studied / would pass", "had studied / would have passed", "had studied / would pass", "study / will pass"],
            correctAnswer: "had studied / would have passed"
        },
        {
            question: "If she ___ (know) about the party, she ___ (come). (Type 3)",
            options: ["knew / would come", "had known / would have come", "knows / will come", "had known / would come"],
            correctAnswer: "had known / would have come"
        },
        {
            question: "If I ___ (be) you, I ___ (apologize). (Type 2 - advice)",
            options: ["was / will apologize", "am / would apologize", "were / would apologize", "am / will apologize"],
            correctAnswer: "were / would apologize"
        }
    ];

    // --- DATA KUIS BARU UNTUK MODUL 14: Reported Speech ---
    // ID elemen: 'reported-speech-quiz-question', 'reported-speech-quiz-options', 'reported-speech-quiz-feedback', 'next-reported-speech-btn'
    const reportedSpeechQuizData = [
        {
            question: "Direct: He said, 'I am tired.' Reported:",
            options: ["He said he is tired.", "He said that he was tired.", "He said he was tired.", "He says he is tired."],
            correctAnswer: "He said that he was tired."
        },
        {
            question: "Direct: She said, 'I finished my homework yesterday.' Reported:",
            options: ["She said she finished her homework yesterday.", "She said she had finished her homework the day before.", "She said she finishes her homework.", "She says she finished her homework."],
            correctAnswer: "She said she had finished her homework the day before."
        },
        {
            question: "Direct: They said, 'We will come tomorrow.' Reported:",
            options: ["They said they will come tomorrow.", "They said they would come the next day.", "They said they came tomorrow.", "They say they would come tomorrow."],
            correctAnswer: "They said they would come the next day."
        },
        {
            question: "Direct: John said, 'I can swim.' Reported:",
            options: ["John said he can swim.", "John said he could swim.", "John said he would swim.", "John says he can swim."],
            correctAnswer: "John said he could swim."
        },
        {
            question: "Direct: She asked, 'Where is the book?' Reported:",
            options: ["She asked where is the book.", "She asked where the book was.", "She asked where was the book.", "She asked where the book is."],
            correctAnswer: "She asked where the book was."
        }
    ];

    // --- DATA KUIS BARU UNTUK MODUL 15: Phrasal Verbs & Idioms ---
    // ID elemen: 'phrasal-idiom-quiz-question', 'phrasal-idiom-quiz-options', 'phrasal-idiom-quiz-feedback', 'next-phrasal-idiom-btn'
    const phrasalIdiomQuizData = [
        {
            question: "What does 'look up' mean in 'I need to look up this word'?",
            options: ["Mencari ke atas", "Melihat ke atas", "Mencari informasi (di kamus/internet)", "Menemukan barang yang hilang"],
            correctAnswer: "Mencari informasi (di kamus/internet)"
        },
        {
            question: "What does 'break a leg!' mean?",
            options: ["Mematahkan kaki", "Semoga berhasil!", "Pergi terburu-buru", "Beristirahat"],
            correctAnswer: "Semoga berhasil!"
        },
        {
            question: "What does 'give up' mean?",
            options: ["Memberi sesuatu", "Menaikkan", "Menyerah", "Mulai melakukan sesuatu"],
            correctAnswer: "Menyerah"
        },
        {
            question: "If something is 'a piece of cake', it means it is...",
            options: ["Sulit", "Enak", "Mudah", "Mahal"],
            correctAnswer: "Mudah"
        },
        {
            question: "What does 'turn on' mean?",
            options: ["Memutar", "Menyalakan", "Mematikan", "Meninggalkan"],
            correctAnswer: "Menyalakan"
        },
        {
            question: "When it's 'raining cats and dogs', it means...",
            options: ["Hujan hewan peliharaan", "Ada banyak kucing dan anjing", "Hujan sangat deras", "Hujan dengan suara keras"],
            correctAnswer: "Hujan sangat deras"
        }
    ];

    // --- DATA KUIS BARU UNTUK MODUL 16: Reading Comprehension ---
    // ID elemen: 'reading-quiz-question', 'reading-quiz-options', 'reading-quiz-feedback', 'next-reading-btn'
    const readingQuizData = [
        {
            question: "Menurut teks, apa salah satu manfaat utama membaca?",
            options: ["Membuat kita menguasai bahasa baru", "Membuka dunia pengetahuan baru", "Meningkatkan kecepatan mengetik", "Membantu kita tidur"],
            correctAnswer: "Membuka dunia pengetahuan baru"
        },
        {
            question: "Bagaimana membaca dapat membantu otak kita?",
            options: ["Membuatnya lelah", "Menjaganya tetap tajam dan aktif", "Membuatnya rileks secara pasif", "Membuat kita lebih cepat lupa"],
            correctAnswer: "Menjaganya tetap tajam dan aktif"
        },
        {
            question: "Mengapa pemahaman membaca (reading comprehension) penting bagi siswa?",
            options: ["Agar mereka bisa menulis cerita fiksi", "Untuk memahami buku pelajaran dan soal ujian secara efektif", "Supaya bisa membaca koran", "Agar bisa berbicara dengan lancar"],
            correctAnswer: "Untuk memahami buku pelajaran dan soal ujian secara efektif"
        },
        {
            question: "Selain manfaat akademik, apa manfaat lain dari membaca yang disebutkan dalam teks?",
            options: ["Meningkatkan kemampuan olahraga", "Sumber hiburan dan relaksasi", "Meningkatkan kemampuan memasak", "Membantu membuat teman baru"],
            correctAnswer: "Sumber hiburan dan relaksasi"
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
                nextButton.style.display = 'none';

                q.options.forEach(option => {
                    const button = document.createElement('button');
                    button.textContent = option;
                    button.dataset.answer = option;
                    button.addEventListener('click', checkAnswer);
                    optionsContainer.appendChild(button);
                });
            } else {
                questionElement.textContent = `Kuis selesai! Selamat! Anda berhasil menyelesaikan semua pertanyaan.`;
                optionsContainer.innerHTML = '';
                feedbackElement.textContent = `Skor Anda: ${userScore} dari ${quizQuestionsData.length} pertanyaan.`;
                feedbackElement.classList.add('show', 'correct');
                
                nextButton.style.display = 'block';
                
                // Cek apakah ini modul terakhir (Modul 16)
                if (nextModuleUrl === '../../index.html') { // Jika diarahkan ke homepage
                    nextButton.textContent = 'Kembali ke Beranda';
                    nextButton.classList.add('btn-primary');
                    nextButton.classList.remove('btn-secondary');
                    nextButton.onclick = () => {
                        alert('Selamat! Anda telah menyelesaikan seluruh kursus English Pro-Builder! Mari terus berlatih.');
                        window.location.href = nextModuleUrl;
                    };
                } else {
                    nextButton.textContent = 'Lanjut ke Modul Berikutnya';
                    nextButton.classList.add('btn-primary');
                    nextButton.classList.remove('btn-secondary');
                    nextButton.onclick = () => {
                        if (nextModuleUrl) {
                            window.location.href = nextModuleUrl;
                        } else {
                            alert('Selamat! Anda telah menyelesaikan modul ini. Tidak ada modul berikutnya yang ditentukan.');
                        }
                    };
                }
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
            
            if (currentQuestionIndex < quizQuestionsData.length) {
                 nextButton.style.display = 'block'; 
                 nextButton.textContent = 'Pertanyaan Selanjutnya';
                 nextButton.classList.remove('btn-primary');
                 nextButton.classList.add('btn-secondary');
                 nextButton.onclick = goToNextQuestion;
            } else {
                // Sudah di akhir kuis, tombol nextButton akan diatur di loadQuestion
            }
        }

        function goToNextQuestion() {
            currentQuestionIndex++;
            loadQuestion();
        }

        nextButton.addEventListener('click', goToNextQuestion);
        
        loadQuestion();
    }

    // --- Pemanggilan Fungsi initQuiz untuk Setiap Kuis di Halaman ---
    
    // Kuis Modul 1: Alphabet & Numbers (Level 1)
    if (document.getElementById('number-quiz-question')) {
        initQuiz('number-quiz-question', 'number-quiz-options', 'number-quiz-feedback', 'next-question-btn', numberQuizData, '../02-greetings-introductions/index.html');
    }

    // Kuis Modul 2: Greetings & Introductions (Level 1)
    if (document.getElementById('greetings-quiz-question')) {
        initQuiz('greetings-quiz-question', 'greetings-quiz-options', 'greetings-quiz-feedback', 'next-greetings-btn', greetingsQuizData, '../03-pronouns-to-be/index.html');
    }

    // Kuis Modul 3: Pronouns & 'To Be' (Level 1)
    if (document.getElementById('tobe-quiz-question')) {
        initQuiz('tobe-quiz-question', 'tobe-quiz-options', 'tobe-quiz-feedback', 'next-tobe-btn', tobeQuizData, '../04-essential-vocabulary/index.html');
    }

    // Kuis Modul 5: Simple Present & Present Continuous (Level 2)
    if (document.getElementById('tense-quiz-question')) {
        initQuiz('tense-quiz-question', 'tense-quiz-options', 'tense-quiz-feedback', 'next-tense-btn', tenseQuizData, '../06-prepositions-place-time/index.html');
    }

    // Kuis Modul 6: Prepositions of Place & Time (Level 2)
    if (document.getElementById('preposition-quiz-question')) {
        initQuiz('preposition-quiz-question', 'preposition-quiz-options', 'preposition-quiz-feedback', 'next-preposition-btn', prepositionQuizData, '../07-articles-quantifiers/index.html');
    }

    // Kuis Modul 7: Articles & Quantifiers (Level 2)
    if (document.getElementById('article-quantifier-quiz-question')) {
        initQuiz('article-quantifier-quiz-question', 'article-quantifier-quiz-options', 'article-quantifier-quiz-feedback', 'next-article-quantifier-btn', articleQuantifierQuizData, '../08-adverbs-modals/index.html');
    }

    // Kuis Modul 8: Adverbs & Modals (Level 2)
    if (document.getElementById('adverb-modal-quiz-question')) {
        initQuiz('adverb-modal-quiz-question', 'adverb-modal-quiz-options', 'adverb-modal-quiz-feedback', 'next-adverb-modal-btn', adverbModalQuizData, '../../level3/09-simple-past-present-perfect/index.html');
    }

    // Kuis Modul 9: Simple Past & Present Perfect (Level 3)
    if (document.getElementById('past-perfect-quiz-question')) {
        initQuiz('past-perfect-quiz-question', 'past-perfect-quiz-options', 'past-perfect-quiz-feedback', 'next-past-perfect-btn', pastPerfectQuizData, '../10-comparative-superlative/index.html');
    }

    // Kuis Modul 10: Comparative & Superlative (Level 3)
    if (document.getElementById('comparative-superlative-quiz-question')) {
        initQuiz('comparative-superlative-quiz-question', 'comparative-superlative-quiz-options', 'comparative-superlative-quiz-feedback', 'next-comparative-superlative-btn', comparativeSuperlativeQuizData, '../11-passive-voice/index.html');
    }

    // Kuis Modul 11: Passive Voice (Level 3)
    if (document.getElementById('passive-voice-quiz-question')) {
        initQuiz('passive-voice-quiz-question', 'passive-voice-quiz-options', 'passive-voice-quiz-feedback', 'next-passive-voice-btn', passiveVoiceQuizData, '../12-connectors-transitions/index.html');
    }

    // Kuis Modul 12: Connectors & Transitions (Level 3)
    if (document.getElementById('connector-quiz-question')) {
        initQuiz('connector-quiz-question', 'connector-quiz-options', 'connector-quiz-feedback', 'next-connector-btn', connectorQuizData, '../../level4/13-conditional-sentences/index.html');
    }

    // BARU: Inisialisasi Kuis Modul 13: Conditional Sentences (Level 4)
    if (document.getElementById('conditional-quiz-question')) {
        initQuiz('conditional-quiz-question', 'conditional-quiz-options', 'conditional-quiz-feedback', 'next-conditional-btn', conditionalQuizData, '../14-reported-speech/index.html');
    }

    // BARU: Inisialisasi Kuis Modul 14: Reported Speech (Level 4)
    if (document.getElementById('reported-speech-quiz-question')) {
        initQuiz('reported-speech-quiz-question', 'reported-speech-quiz-options', 'reported-speech-quiz-feedback', 'next-reported-speech-btn', reportedSpeechQuizData, '../15-phrasal-verbs-idioms/index.html');
    }

    // BARU: Inisialisasi Kuis Modul 15: Phrasal Verbs & Idioms (Level 4)
    if (document.getElementById('phrasal-idiom-quiz-question')) {
        initQuiz('phrasal-idiom-quiz-question', 'phrasal-idiom-quiz-options', 'phrasal-idiom-quiz-feedback', 'next-phrasal-idiom-btn', phrasalIdiomQuizData, '../16-reading-comprehension/index.html');
    }

    // BARU: Inisialisasi Kuis Modul 16: Reading Comprehension (Level 4 - Modul Terakhir)
    // Setelah modul ini, kursus selesai. Kita arahkan ke homepage.
    if (document.getElementById('reading-quiz-question')) {
        initQuiz('reading-quiz-question', 'reading-quiz-options', 'reading-quiz-feedback', 'next-reading-btn', readingQuizData, '../../../index.html');
    }
});