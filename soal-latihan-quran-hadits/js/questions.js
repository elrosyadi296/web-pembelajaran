const rawQuestionsData = [
  {
    id: 1,
    question: "Salah satu syarat mad adalah apabila dhammah bertemu…",
    options: ["Alif", "Ya’ sukun", "Wawu sukun", "Wawu tasydid"],
    answerIndex: 2
  },
  {
    id: 2,
    question: "Perhatikan pernyataan-pernyataan berikut.\n1) Mempelajari Al-Qur'an dengan ilmu tajwid.\n2) Membaca Al-Qur'an dengan suara yang keras.\n3) Selalu melaksanakan perintah Allah Swt. dengan baik.\n4) Membaca Al-Qur'an dengan perlahan-lahan.\n5) Membaca Al-Qur'an agar dipuji oleh orang lain.\n\nPerilaku yang tepat dalam membaca Al-Qur'an ditunjukkan nomor…",
    options: ["1) dan 3)", "1) dan 4)", "1) dan 5)", "2) dan 4)"],
    answerIndex: 1
  },
  {
    id: 3,
    question: "Berikut yang tidak termasuk huruf mad adalah ...",
    options: ["huruf alif", "huruf wau", "huruf ya'", "huruf ba'"],
    answerIndex: 3
  },
  {
    id: 4,
    question: "Apabila terdapat huruf alif tanpa harakat didahului oleh huruf yang berharakat fathah, disebut dengan…",
    options: ["mad badal", "mad tabi`i", "mad jäiz munfaşil", "mad wajib muttaşil"],
    answerIndex: 1
  },
  {
    id: 5,
    question: "Hukum bacaan mad far'i ada …",
    options: ["2 cabang", "10 cabang", "4 cabang", "14 cabang"],
    answerIndex: 3
  },
  {
    id: 6,
    question: "Perhatikan pernyataan berikut:\n1) Menciptakan keselarasan bacaan.\n2) Mendapat pujian.\n3) Terhindar kesalahan membaca.\n4) Membaca cepat.\n\nTujuan mempelajari ilmu tajwid ditunjukkan nomor…",
    options: ["1) dan 2)", "2) dan 3)", "1) dan 3)", "3) dan 4)"],
    answerIndex: 2
  },
  {
    id: 7,
    question: "Orang yang murah hati atau suka memberi kepada orang lain tanpa mengharap imbalan disebut…",
    options: ["relawan", "hartawan", "pemurah", "usahawan"],
    answerIndex: 2
  },
  {
    id: 8,
    question: "Ayat (فَسَنُيَسِرُهُ لِلْيُسْرَى) menjelaskan bahwa orang yang pemurah akan mendapat ganjaran berupa…",
    options: ["kemudahan (kebahagiaan)", "kekayaan yang melimpah", "pengampunan dosa", "terhindar dari bahaya"],
    answerIndex: 0
  },
  {
    id: 9,
    question: "Orang yang memberikan hartanya di jalan Allah Swt. dan bertakwa terdapat pada potongan ayat…",
    options: ["وَمَا خَلَقَ الذَّكَرَ وَالْأُنثٰى", "إِنَّ سَعْيَكُمْ لَشَتَّى", "فَأَمَّا مَنْ أَعْطَى وَاتَّقَى", "وَالنَّهَارِ إِذَا تَجَلَّى"],
    answerIndex: 2
  },
  {
    id: 10,
    question: "Mad menurut bahasa artinya…",
    options: ["memantul", "panjang", "berdengung", "pendek"],
    answerIndex: 1
  },
  {
    id: 11,
    question: "Apabila huruf alif tanpa harakat dan huruf sebelumnya berharakat fathah, maka hukum bacaannya disebut…",
    options: ["Mad layyin", "Mad badal", "Mad tabi’i", "Mad tamkin"],
    answerIndex: 2
  },
  {
    id: 12,
    question: "Contoh bacaan mad tabi`i pada potongan ayat [ 1) \u2067خَلَقَ الذَّكَرَ\u2069, 2) \u2067وَارْزُقُوْهُمْ\u2069, 3) \u2067الَّذِينَ\u2069, 4) \u2067السُّفَهَاء\u2069, 5) \u2067لَا تَدْرُونَ\u2069] ditunjukkan nomor…",
    options: ["1), 2), dan 3)", "1), 2), dan 4)", "2), 3), dan 5)", "2), 4), dan 5)"],
    answerIndex: 3
  },
  {
    id: 13,
    question: "Pada ayat (لَكُمْ دِينَكُمْ وَلِيَ دِينِ), hukum mad tabi'i disebabkan oleh…",
    options: ["huruf ya sukun didahului dammah", "huruf alif didahului fathah", "huruf wau sukun didahului dammah", "huruf ya sukun didahului oleh huruf berharakat kasrah"],
    answerIndex: 3
  },
  {
    id: 14,
    question: "Allah senantiasa menyediakan dua jalan: ketakwaan dan kefasikan. Hal ini sesuai dengan firman Allah Swt…",
    options: ["وَالنَّهَارِ إِذَا جَلّٰهَا", "وَنَفْسٍ وَمَا سَوّٰهَا", "وَالسَّمَاءِ وَمَا بَنٰهَا", "فَاَلْهَمَهَا فُجُوْرَهَا وَتَقْوٰهَا"],
    answerIndex: 3
  },
  {
    id: 15,
    question: "Berikut perilaku yang menggambarkan isi kandungan ayat (قَدْ أَفْلَحَ مَنْ زَكَّهَا) adalah...",
    options: ["Fahmi rajin beribadah agar dipandang saleh", "Ridho selalu menolak apabila diajak bolos oleh teman-teman sekolahnya", "Aisyah rajin membantu ibunya asal diberi imbalan", "Toni sering membantah orang tua"],
    answerIndex: 1
  },
  {
    id: 16,
    question: "Pada ayat pertama Surat Asy-Syams, Allah menunjukkan kekuasaan-Nya dalam menciptakan...",
    options: ["Bulan", "Bintang", "Matahari", "Galaksi"],
    answerIndex: 2
  },
  {
    id: 17,
    question: "Pada ayat 3 & 4 Surat Asy-Syams, Allah menunjukkan kekuasaan-Nya dalam mengatur...",
    options: ["pagi dan petang", "terbit dan terbenam", "bulan dan bintang", "siang dan malam"],
    answerIndex: 3
  },
  {
    id: 18,
    question: "Sumpah Allah demi matahari, bulan, langit, malam, dan siang terdapat dalam Al-Qur'an surah…",
    options: ["Q.S. Asy-Syams/91: 1-7", "Q.S. Al-Baqarah/2: 1-5", "Q.S. Al-Lail/92: 8-10", "Q.S. Asy-Syams/91: 8-10"],
    answerIndex: 0
  },
  {
    id: 19,
    question: "Dalam Q.S. Ali 'Imran/3: 190, orang yang mau menggunakan akal pikiran untuk merenungkan ciptaan Allah dikenal dengan…",
    options: ["أُولُو الذِّكْرِ", "أُولُو الْأَبْصَارِ", "أُولُو الْأَلْبَابِ", "أولُو الْفِكْرِ"],
    answerIndex: 2
  },
  {
    id: 20,
    question: "Berikut yang BUKAN merupakan contoh dari seorang ulul albab adalah…",
    options: ["Hafiz mengamati proses terjadinya hujan", "Arkan meyakini pergantian siang dan malam", "Zalina meyakini bahwa pergantian siang dan malam terjadi dengan sendirinya", "Nayla memuji kebesaran Allah saat melihat laut"],
    answerIndex: 2
  },
  {
    id: 21,
    question: "Arti dari potongan hadis (إِنَّ رَحْمَتِي غَلَبَتْ غَضَبِي) adalah…",
    options: ["sesungguhnya rahmat-Ku mengalahkan kecintaan-Ku", "sesungguhnya di langit dan bumi penuh rahmat-Ku", "sesungguhnya rahmat-Ku tidak sebanding kemurkaan-Ku", "sesungguhnya rahmat-Ku mengalahkan kemurkaan-Ku"],
    answerIndex: 3
  },
  {
    id: 22,
    question: "Amir batal puasa lalu menyesal dan bertobat. Berdasarkan hadis rahmat Allah, perilaku Amir adalah…",
    options: ["benar, karena ia segera bertobat kepada Allah Swt. setelah melakukan kesalahan", "tidak berdosa karena hanya minum", "boleh karena merasa sangat haus", "salah karena Allah tidak mengampuni"],
    answerIndex: 0
  },
  {
    id: 23,
    question: "Harta yang diinfakkan tidak akan mengurangi harta melainkan menambah keberkahan. Sesuai hadis…",
    options: ["مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالِ", "وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ", "وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوِ إِلَّا عِزًّا", "اتَّقُوا الظُّلْمَ فَإِنَّ الظُّلْمَ ظُلُمَاتُ يَوْمَ الْقِيَامَةِ"],
    answerIndex: 0
  },
  {
    id: 24,
    question: "Akhlak terpuji yang harus diterapkan sesuai hadis riwayat Muslim dari Abu Hurairah R.A. tentang pengampunan adalah…",
    options: ["Tawakal", "Jujur", "Pemaaf", "Sabar"],
    answerIndex: 2
  },
  {
    id: 25,
    question: "Sulaiman bersyukur dan tidak merasa bangga diri atas jabatan baru serta mau minta bantuan bawahan. Sikap Sulaiman mencerminkan…",
    options: ["Dermawan", "Rajin", "Gigih", "Tawadhu’"],
    answerIndex: 3
  },
  {
    id: 26,
    question: "Arti lafal (ظُلُمَاتٌ) pada hadis tentang kezaliman adalah…",
    options: ["Kegelapan", "Kesesatan", "Kemurkaan", "Kekafiran"],
    answerIndex: 0
  },
  {
    id: 27,
    question: "Pak Toni melakukan penebangan liar tanpa memikirkan lingkungan. Perilaku tersebut termasuk sikap…",
    options: ["Kikir", "Zalim", "Adu domba", "Sombong"],
    answerIndex: 1
  },
  {
    id: 28,
    question: "Isi kandungan dari lafal (وَاتَّقُوا الشُّحَّ فَإِنَّ الشُّحْ أَهْلَكَ مَنْ كَانَ قَبْلَكُمْ) adalah…",
    options: ["kikir dapat menghilangkan ketaatan", "kikir dapat menyebabkan kekacauan sebagaimana umat terdahulu", "kikir dapat menyelamatkan keluarga", "kikir dihilangkan dengan bertobat"],
    answerIndex: 1
  },
  {
    id: 29,
    question: "Menahan harta pada situasi yang semestinya harus memberi disebut…",
    options: ["Format", "Dermawan", "Kikir", "Boros"],
    answerIndex: 2
  },
  {
    id: 30,
    question: "Rasa terdorong untuk menumpahkan darah dan menghalalkan yang diharamkan disebabkan sifat…",
    options: ["Mubazir", "Kikir", "Dermawan", "Hemat"],
    answerIndex: 1
  },
  {
    id: 31,
    question: "Surah Al-Lail diturunkan setelah surah…",
    options: ["Al A’la", "Adh Dhuha", "Asy Syams", "Al Balad"],
    answerIndex: 0
  },
  {
    id: 32,
    question: "Wahyu yang diturunkan sebelum Nabi Muhammad SAW hijrah ke Madinah disebut surah…",
    options: ["Haromiyah", "Makkiyah", "Madaniyah", "Nabawiyah"],
    answerIndex: 1
  },
  {
    id: 33,
    question: "Secara umum QS Al-Lail 1-11 menjelaskan tentang keuntungan bershadaqah dan akibat bagi...",
    options: ["Orang yang dermawan", "Orang yang punya jabatan", "Orang yang kikir", "Orang yang hemat"],
    answerIndex: 2
  },
  {
    id: 34,
    question: "Kemudahan bagi orang yang dermawan tercermin dalam ayat....",
    options: ["فَسَنُيَسِّرُهُ لِلْيُسْرَى", "وَصَدَّقَ بِالْحُسْنٰى", "فَسَنُيَسِّرُهُ لِلْعُسْرَى", "وَكَذَّبَ بِالْحُسْنَى"],
    answerIndex: 0
  },
  {
    id: 35,
    question: "Ayat (فَسَنُيَسِّرُهُ لِلْعُسْرَى) menjelaskan tentang…",
    options: ["Kemudahan bagi orang yang kikir", "Kesengsaraan bagi orang yang kikir", "Kesengsaraan bagi orang yang baik", "Kebahagiaan bagi orang yang bakhil"],
    answerIndex: 1
  },
  {
    id: 36,
    question: "Jaminan yang Allah berikan kepada orang dermawan sesuai surah Al-Lail ayat 7 adalah…",
    options: ["Kemudahan (kebahagiaan)", "Kekayaan (jabatan)", "Kesenangan", "Kekuatan"],
    answerIndex: 0
  },
  {
    id: 37,
    question: "Usaha manusia itu bermacam-macam. Hal ini sesuai makna ayat...",
    options: ["إِنَّ سَعْيَكُمْ لَشَتَّى", "فأَمَّا مَنْ أَعْطَى وَاتَّقَى", "وَصَدَّقَ بِالْحُسْنَى", "وَكَذَّبَ بِالْحُسْنَى"],
    answerIndex: 0
  },
  {
    id: 38,
    question: "Surah Al-Lail ayat 8 menjelaskan orang kikir merasa cukup. Maksud dari 'merasa cukup' adalah…",
    options: ["Takabur dalam kenikmatan", "Butuh pertolongan selain Allah", "Semua hasil usaha sendiri", "Tidak perlu pertolongan Allah swt"],
    answerIndex: 3
  }
];