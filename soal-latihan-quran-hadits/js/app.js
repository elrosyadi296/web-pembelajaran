// GANTI DENGAN URL WEB APP GOOGLE APPS SCRIPT ANDA
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFNEdcguKPEbJNdUEfQaWeyHdX3_yAQxPAgERWGJ8r5dahlGshhDWB633PhKGW1Av-zQ/exec";

let processedQuestions = [];
let currentIndex = 0;
let userAnswers = {};
let studentData = { name: "", class: "" };
let timerInterval;
let secondsElapsed = 0;

document.getElementById("identity-form").addEventListener("submit", function (e) {
    e.preventDefault();
    studentData.name = document.getElementById("student-name").value.trim();
    studentData.class = document.getElementById("student-class").value.trim();
    
    if (studentData.name && studentData.class) {
        initQuiz();
    }
});

// Algoritma Pengacakan Soal Tanpa Merusak Kunci Jawaban
function initQuiz() {
    processedQuestions = rawQuestionsData.map(q => {
        // Ambil teks opsi kunci jawaban yang benar terlebih dahulu
        const correctAnswerText = q.options[q.answerIndex];
        
        // Acak opsi jawaban (A, B, C, D)
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        
        // Cari index kunci jawaban yang baru di dalam array opsi acak
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

        return {
            id: q.id,
            question: q.question,
            options: shuffledOptions,
            correctAnswerIndex: newCorrectIndex
        };
    });

    // Acak urutan nomor soal
    processedQuestions.sort(() => Math.random() - 0.5);

    // Tampilkan Layar Kuis
    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("quiz-screen").classList.add("active");

    startTimer();
    renderQuestion();
}

function renderQuestion() {
    const q = processedQuestions[currentIndex];
    const total = processedQuestions.length;

    document.getElementById("question-number").innerText = `Soal ${currentIndex + 1} dari ${total}`;
    document.getElementById("question-text").innerText = q.question;
    document.getElementById("progress-bar").style.width = `${((currentIndex + 1) / total) * 100}%`;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    const prefixes = ["A", "B", "C", "D"];
    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        if (userAnswers[currentIndex] === idx) {
            btn.classList.add("selected");
        }
        btn.innerHTML = `<strong>${prefixes[idx]}.</strong> ${opt}`;
        btn.onclick = () => selectOption(idx);
        optionsContainer.appendChild(btn);
    });

    // Navigasi Tombol
    document.getElementById("prev-btn").disabled = currentIndex === 0;
    if (currentIndex === total - 1) {
        document.getElementById("next-btn").classList.add("hidden");
        document.getElementById("submit-btn").classList.remove("hidden");
    } else {
        document.getElementById("next-btn").classList.remove("hidden");
        document.getElementById("submit-btn").classList.add("hidden");
    }
}

function selectOption(index) {
    userAnswers[currentIndex] = index;
    renderQuestion();
}

document.getElementById("prev-btn").onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
};

document.getElementById("next-btn").onclick = () => {
    if (currentIndex < processedQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
    }
};

document.getElementById("submit-btn").onclick = calculateAndSubmit;

function startTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        document.getElementById("timer").innerText = `⏱️ ${mins}:${secs}`;
    }, 1000);
}

function calculateAndSubmit() {
    clearInterval(timerInterval);
    
    let correctCount = 0;
    processedQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswerIndex) {
            correctCount++;
        }
    });

    const totalQuestions = processedQuestions.length;
    const wrongCount = totalQuestions - correctCount;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    // Tampilkan Hasil
    document.getElementById("quiz-screen").classList.remove("active");
    document.getElementById("result-screen").classList.add("active");
    document.getElementById("score-text").innerText = finalScore;
    document.getElementById("correct-count").innerText = correctCount;
    document.getElementById("wrong-count").innerText = wrongCount;

    // Kirim Data ke API Spreadsheet
    sendToSpreadsheet({
        name: studentData.name,
        class: studentData.class,
        score: finalScore,
        correct: correctCount,
        wrong: wrongCount,
        duration: document.getElementById("timer").innerText
    });
}

function sendToSpreadsheet(payload) {
    if (GOOGLE_SCRIPT_URL.includes("URL_WEB_APP")) {
        document.getElementById("result-message").innerText = "Selesai! (URL Google Script belum dikonfigurasi)";
        return;
    }

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(() => {
        document.getElementById("result-message").innerText = "Data hasil latihan berhasil disimpan ke Spreadsheet!";
    })
    .catch(err => {
        console.error(err);
        document.getElementById("result-message").innerText = "Gagal mengirim data ke server.";
    });
}