// Local Data & App State
let studentData = {
    name: "",
    className: ""
};

// URL Google Apps Script Web App (Diisi oleh guru/pengembang)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRe1PW4GcFq7SdLfBYWcYXFvjV_KcnoI8cHlmsvAc_C35uxSVdAVS3fg5eo1JzajID/exec";

document.addEventListener('DOMContentLoaded', () => {
    // Navigation setup
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            navigateTo(target);
        });
    });

    renderHardware('all');
});

// Student Modal & Data Logic
function openStudentModal() {
    const modal = document.getElementById('student-modal');
    const statusMsg = document.getElementById('connection-status-msg');
    
    // Reset Notifikasi Modal
    statusMsg.style.display = 'none';
    statusMsg.className = 'status-alert';
    statusMsg.innerHTML = '';
    
    modal.style.display = 'flex';
    if (studentData.name) {
        document.getElementById('student-name').value = studentData.name;
        document.getElementById('student-class').value = studentData.className;
    }
}

function closeStudentModal() {
    document.getElementById('student-modal').style.display = 'none';
}

// Verifikasi Koneksi Spreadsheet & Simpan Data Siswa
async function saveStudentData(e) {
    e.preventDefault();
    const name = document.getElementById('student-name').value.trim();
    const className = document.getElementById('student-class').value.trim();
    const statusMsg = document.getElementById('connection-status-msg');
    const submitBtn = document.getElementById('submit-student-btn');

    if (!name || !className) return;

    // 1. Cek Apakah URL Google Apps Script Sudah Diisi / Valid
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("GANTI_DENGAN_URL")) {
        statusMsg.style.display = 'block';
        statusMsg.className = 'status-alert error';
        statusMsg.innerHTML = '<strong><i class="fa-solid fa-circle-xmark"></i> Gagal Masuk:</strong> Aplikasi belum terhubung ke Google Spreadsheet (URL Web App belum diatur di `script.js`). Hubungi Guru TIK!';
        return; // MENGHENTIKAN PROSES JIKA BELUM TERHUBUNG
    }

    // 2. Menguji Koneksi (Ping) ke Google Apps Script
    statusMsg.style.display = 'block';
    statusMsg.className = 'status-alert info';
    statusMsg.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memeriksa koneksi ke Google Spreadsheet...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL + "?ping=true", { method: 'GET' });
        
        if (response.ok) {
            // Jika Koneksi Berhasil
            statusMsg.className = 'status-alert success';
            statusMsg.innerHTML = '<strong><i class="fa-solid fa-circle-check"></i> Koneksi Berhasil!</strong> Menyiapkan lembar kuis...';
            
            studentData.name = name;
            studentData.className = className;
            updateUserDisplay();

            setTimeout(() => {
                closeStudentModal();
                submitBtn.disabled = false;
                startQuizProcess();
            }, 1000);
        } else {
            throw new Error("Respon server spreadsheet tidak ok");
        }
    } catch (error) {
        console.error("Connection Check Failed:", error);
        statusMsg.className = 'status-alert error';
        statusMsg.innerHTML = '<strong><i class="fa-solid fa-triangle-exclamation"></i> Gagal Terhubung:</strong> Tidak dapat menghubungkan ke Google Spreadsheet. Pastikan koneksi internet aktif dan URL Web App benar.';
        submitBtn.disabled = false;
    }
}

function updateUserDisplay() {
    document.getElementById('display-user-name').innerText = studentData.name || "Siswa TIK";
    document.getElementById('display-user-class').innerText = "Kelas " + (studentData.className || "IX");
}

// Sidebar Minimizing Logic
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const toggleIcon = document.getElementById('toggle-icon');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');

    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.className = 'fa-solid fa-chevron-right';
    } else {
        toggleIcon.className = 'fa-solid fa-chevron-left';
    }
}

// Navigation SPA Logic
function navigateTo(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    const activeSection = document.getElementById(targetId);

    if (activeLink) activeLink.classList.add('active');
    if (activeSection) activeSection.classList.add('active');

    const titles = {
        'dashboard': 'Dashboard Pembelajaran',
        'roadmap': 'Roadmap & Modul Belajar',
        'hardware': 'Lab Perangkat Keras',
        'quiz': 'Kuis Interaktif'
    };

    if (pageTitle && titles[targetId]) {
        pageTitle.innerText = titles[targetId];
    }
}

// Module Roadmap Data & Modal
const moduleData = {
    1: {
        title: "Pekan 1: Perangkat Input & Akses Internet",
        content: `
            <p><strong>1. Keyboard & Mouse:</strong> Keyboard digunakan untuk mengetik data/perintah. Mouse digunakan melalui aksi klik, double-klik, drag, dan klik kanan dengan penunjuk berupa pointer.</p>
            <br>
            <p><strong>2. Modem (Modulasi Demodulasi):</strong> Perangkat wajib penghubung internet. Tugasnya mengubah sinyal digital komputer menjadi sinyal analog saluran telepon, dan sebaliknya.</p>
            <ul>
                <li><em>Modem Internal:</em> Dipasang di dalam sistem unit komputer berupa card.</li>
                <li><em>Modem Eksternal:</em> Dipasang di luar sistem unit komputer.</li>
            </ul>
        `
    },
    2: {
        title: "Pekan 2: Perangkat Proses (CPU) & Memori",
        content: `
            <p><strong>1. CPU (Central Processing Unit):</strong> Otak komputer yang terdiri dari jutaan IC pada sebuah chip.</p>
            <ul>
                <li><em>Unit Kendali (Control Unit):</em> Mengatur & mengendalikan aliran data serta perintah komputer.</li>
                <li><em>Unit Aritmatika-Logika (ALU):</em> Melakukan operasi perhitungan matematika dan logika.</li>
            </ul>
            <br>
            <p><strong>2. Memori Komputer:</strong></p>
            <ul>
                <li><em>ROM (Read Only Memory):</em> Memori permanen yang hanya bisa dibaca (contoh: perintah booting/hidup mati PC).</li>
                <li><em>RAM (Random Access Memory):</em> Memori penyimpanan sementara saat komputer hidup (volatile). Data hilang saat mati.</li>
            </ul>
        `
    },
    3: {
        title: "Pekan 3: Perangkat Penyimpanan (Storage)",
        content: `
            <p><strong>1. Harddisk:</strong> Media penyimpanan permanen berkapasitas besar (40 GB ke atas) di dalam casing. Digunakan untuk menyimpan Sistem Operasi (OS).</p>
            <p><strong>2. Compact Disk (CD):</strong> Media berbentuk piringan berkapasitas ~650 MB. Dibutuhkan hardware CD-RW & software Nero untuk menulis data.</p>
            <p><strong>3. Flash Disk:</strong> Media penyimpanan portable praktis dengan USB Port untuk transfer data antar komputer.</p>
        `
    },
    4: {
        title: "Pekan 4: Perangkat Keluaran (Output) & K3",
        content: `
            <p><strong>1. Monitor (CRT vs LCD):</strong></p>
            <ul>
                <li>CRT: Konsumsi listrik lebih boros, bentuk cembung/tabung.</li>
                <li>LCD: Hemat listrik, desain ramping, lebih aman untuk mata (radiasi rendah).</li>
            </ul>
            <br>
            <p><strong>2. Jenis Printer:</strong></p>
            <ul>
                <li>Dot Matrix: Menggunakan pita, cara kerja seperti mesin ketik.</li>
                <li>InkJet: Menggunakan tinta cair (cartridge/refill).</li>
                <li>LaserJet: Menggunakan tinta serbuk (toner), hasil cetak paling tajam.</li>
            </ul>
            <br>
            <p><strong>3. Speaker:</strong> Perangkat keluaran yang menghasilkan suara (audio) dari hasil pengolahan komputer.</p>
            <br>
            <p><strong>4. K3 TIK:</strong> Bebaskan perangkat dari air/debu, bungkus kabel terkelupas dengan isolasi, dan jaga jarak mata dari radiasi.</p>
        `
    }
};

function showModule(step) {
    const modal = document.getElementById('module-modal');
    const title = document.getElementById('module-title');
    const body = document.getElementById('module-body');

    if (moduleData[step]) {
        title.innerText = moduleData[step].title;
        body.innerHTML = moduleData[step].content;
        modal.style.display = 'flex';
    }
}

function closeModule() {
    document.getElementById('module-modal').style.display = 'none';
}

// Hardware Lab Data (Lengkap dengan Speaker)
const hardwareList = [
    { name: "Keyboard", cat: "input", icon: "fa-keyboard", image: "img/keyboard.svg", desc: "Memasukkan data/perintah dengan cara diketikkan (tombol alfabet, angka, Ctrl, Alt, Enter)." },
    { name: "Mouse", cat: "input", icon: "fa-mouse", image: "img/mouse.svg", desc: "Menggerakkan pointer pada layar. Penggunaan dengan klik, double klik, drag, atau klik kanan." },
    { name: "Modem Internal", cat: "input", icon: "fa-wifi", image: "img/modem-internal.svg", desc: "Dipasang di dalam sistem unit komputer berupa card untuk konversi sinyal digital-analog." },
    { name: "Modem Eksternal", cat: "input", icon: "fa-network-wired", image: "img/modem-eksternal.svg", desc: "Dipasang di luar sistem unit komputer dan dihubungkan ke saluran telepon/port." },
    { name: "CPU (Prosessor)", cat: "process", icon: "fa-microchip", image: "img/cpu.svg", desc: "Otak komputer. Terdiri dari Unit Kendali (Control Unit) dan Unit Aritmatika-Logika (ALU)." },
    { name: "ROM", cat: "process", icon: "fa-memory", image: "img/rom.svg", desc: "Read Only Memory. Menyimpan perintah permanen komputer (contoh: proses booting)." },
    { name: "RAM", cat: "process", icon: "fa-memory", image: "img/ram.svg", desc: "Random Access Memory. Menyimpan data sementara saat komputer hidup (128MB, 256MB, dst)." },
    { name: "Harddisk", cat: "storage", icon: "fa-hard-drive", image: "img/harddisk.svg", desc: "Penyimpanan permanen kapasitas besar di dalam casing untuk menyimpan sistem operasi." },
    { name: "Compact Disk (CD)", cat: "storage", icon: "fa-compact-disc", image: "img/cd.svg", desc: "Media piringan tipis berkapasitas ~650 MB. Membutuhkan CD-RW untuk penulisan data." },
    { name: "Flash Disk", cat: "storage", icon: "fa-usb", image: "img/flashdisk.svg", desc: "Media penyimpanan praktis portable berfasilitas USB Port untuk transfer data antar komputer." },
    { name: "Monitor CRT", cat: "output", icon: "fa-tv", image: "img/monitor-crt.svg", desc: "Layar cembung/tabung, konsumsi listrik lebih boros dibanding LCD." },
    { name: "Monitor LCD", cat: "output", icon: "fa-desktop", image: "img/monitor-lcd.svg", desc: "Layar hemat listrik, desain ramping, dan radiasi lebih rendah/aman bagi mata." },
    { name: "Printer InkJet", cat: "output", icon: "fa-print", image: "img/printer-inkjet.svg", desc: "Printer yang menggunakan tinta cair dengan cartridge/refill ekonomis." },
    { name: "Printer LaserJet", cat: "output", icon: "fa-print", image: "img/printer-laserjet.svg", desc: "Printer berteknologi tinta serbuk (toner) dengan hasil cetakan paling tajam dan cepat." },
    { name: "Speaker", cat: "output", icon: "fa-volume-high", image: "img/speaker.svg", desc: "Perangkat keluaran yang berfungsi untuk menghasilkan suara atau sinyal audio." }
];

function filterHardware(category, event) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
    renderHardware(category);
}

function renderHardware(category) {
    const grid = document.getElementById('hardware-grid');
    grid.innerHTML = '';

    const filtered = category === 'all' ? hardwareList : hardwareList.filter(h => h.cat === category);

    filtered.forEach(hw => {
        const card = document.createElement('div');
        card.className = 'hw-card';
        card.innerHTML = `
            <div class="hw-image-slot">
                <!-- SLOT GAMBAR: Menggunakan fallback jika gambar belum ada -->
                <img src="${hw.image}" alt="${hw.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; flex-direction:column; align-items:center; justify-content:center;">
                    <i class="fa-solid ${hw.icon}"></i>
                    <span>Slot Gambar: ${hw.image}</span>
                </div>
            </div>
            <div class="hw-card-body">
                <h3>${hw.name}</h3>
                <p>${hw.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Quiz Data (10 Soal Berdasarkan PDF Bahan Ajar)
const quizQuestions = [
    {
        question: "1. Perangkat keras komputer yang berfungsi mengubah sinyal digital menjadi analog dan sebaliknya adalah...",
        options: ["Harddisk", "Modem", "CPU", "RAM"],
        answer: 1
    },
    {
        question: "2. Memori komputer yang menyimpan data atau perintah secara sementara selama komputer hidup adalah...",
        options: ["ROM", "RAM", "CD-ROM", "Flash Disk"],
        answer: 1
    },
    {
        question: "3. Jenis monitor yang menggunakan listrik lebih hemat, bentuk ramping, dan radiasi rendah adalah...",
        options: ["Monitor CRT", "Monitor Tabung", "Monitor LCD", "Monitor Cembung"],
        answer: 2
    },
    {
        question: "4. Bagian dari CPU yang bertugas mengendalikan dan mengatur semua peralatan pada sistem komputer adalah...",
        options: ["ALU (Arithmetic Logic Unit)", "Control Unit (Unit Kendali)", "RAM", "ROM"],
        answer: 1
    },
    {
        question: "5. Perangkat input yang digunakan untuk memasukkan data dengan cara mengetikkan tombol adalah...",
        options: ["Mouse", "Printer", "Keyboard", "Scanner"],
        answer: 2
    },
    {
        question: "6. Perangkat keluaran (output) yang berfungsi untuk menghasilkan sinyal suara/audio pada komputer adalah...",
        options: ["Printer", "Monitor", "Speaker", "Modem"],
        answer: 2
    },
    {
        question: "7. Media penyimpanan permanen di dalam casing yang digunakan untuk menyimpan Sistem Operasi (OS) adalah...",
        options: ["RAM", "Harddisk", "Flash Disk", "CD"],
        answer: 1
    },
    {
        question: "8. Aksi menekan tombol sebelah kiri mouse dua kali dengan cepat dinamakan...",
        options: ["Klik", "Drag", "Double Klik", "Klik Kanan"],
        answer: 2
    },
    {
        question: "9. Jenis printer yang hasil cetakannya menggunakan tinta serbuk dan berprinsip kerja seperti mesin fotokopi adalah...",
        options: ["Printer Dot Matrix", "Printer InkJet", "Printer LaserJet", "Printer Sablon"],
        answer: 2
    },
    {
        question: "10. Memori yang berisi perintah yang hanya bisa dibaca oleh komputer dan bersifat permanen adalah...",
        options: ["RAM", "ROM", "Flash Disk", "Harddisk"],
        answer: 1
    }
];

let currentQuizIndex = 0;
let quizScore = 0;

function startQuizProcess() {
    document.getElementById('quiz-start-screen').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-body').style.display = 'block';
    
    currentQuizIndex = 0;
    quizScore = 0;
    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-counter').innerText = `Soal ${currentQuizIndex + 1} dari ${quizQuestions.length}`;
    document.getElementById('progress-fill').style.width = `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%`;
    document.getElementById('quiz-question').innerText = q.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    document.getElementById('next-quiz-btn').style.display = 'none';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIdx) {
    const q = quizQuestions[currentQuizIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
            btn.classList.add('correct');
        }
        if (idx === selectedIdx && selectedIdx !== q.answer) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIdx === q.answer) {
        quizScore++;
    }

    document.getElementById('next-quiz-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-body').style.display = 'none';
    const resultBox = document.getElementById('quiz-result');
    resultBox.style.display = 'block';
    
    const finalScore = (quizScore / quizQuestions.length) * 100;
    document.getElementById('quiz-student-info').innerText = `${studentData.name || "Siswa"} (${studentData.className || "Kelas IX"})`;
    document.getElementById('quiz-score-badge').innerText = `${finalScore}`;
    document.getElementById('quiz-score-text').innerText = `Jawaban Benar: ${quizScore} dari ${quizQuestions.length} soal`;

    // Kirim data nilai ke Google Spreadsheet via Apps Script
    sendDataToGoogleSheet(studentData.name, studentData.className, finalScore);
}

function sendDataToGoogleSheet(name, className, score) {
    const statusElem = document.getElementById('google-sheet-status');
    statusElem.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim nilai ke Google Spreadsheet...';

    const payload = {
        nama: name,
        kelas: className,
        nilai: score,
        waktu: new Date().toLocaleString("id-ID")
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        statusElem.innerHTML = '<span style="color: #10b981; font-weight: 600;"><i class="fa-solid fa-circle-check"></i> Data Nilai Berhasil Terkirim ke Spreadsheet Guru!</span>';
    })
    .catch(err => {
        console.error(err);
        statusElem.innerHTML = '<span style="color: #ef4444; font-weight: 600;"><i class="fa-solid fa-circle-xmark"></i> Gagal Mengirim Nilai: Pastikan Perangkat Terhubung ke Internet.</span>';
    });
}

function resetQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    openStudentModal();
}
