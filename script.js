// Fungsi untuk menampilkan halaman yang dipilih
function showPage(pageId) {
    console.log('Mencoba membuka halaman:', pageId); // Debug line

    // Hide all game containers if not on   age
    if (pageId !== 'aktivitas') {
        hideAllGameContainers();
    }

    // Sembunyikan semua halaman
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Tampilkan halaman yang dipilih
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Halaman berhasil ditampilkan:', pageId); // Debug
    } else {
        console.error('Halaman tidak ditemukan:', pageId); // Debug
        // Fallback ke beranda jika halaman tidak ditemukan
        document.getElementById('beranda').classList.add('active');
    }

    // Update navigasi aktif - handle both main nav and dropdown items
    const allNavLinks = document.querySelectorAll('nav a, .dropdown-content a');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's onclick contains the pageId
        const onclickAttr = link.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`showPage('${pageId}')`)) {
            link.classList.add('active');
        }
    });

    // Additional logic for dropdown items - ensure parent nav item is also highlighted if dropdown item is active
    const activeDropdownLink = document.querySelector('.dropdown-content a.active');
    if (activeDropdownLink) {
        // Find the main nav item that corresponds to this dropdown
        const mainNavItems = document.querySelectorAll('nav a');
        mainNavItems.forEach(navItem => {
            const navOnclick = navItem.getAttribute('onclick');
            if (navOnclick && navOnclick.includes('showPage')) {
                // For dropdown items, we might need to map them to main nav items
                // For now, keep the current logic but add logging
                console.log('Active dropdown item found:', activeDropdownLink.textContent.trim());
            }
        });
    }

    // Scroll ke atas
    window.scrollTo(0, 0);

    // Animasi progress bar jika halaman progress
    if (pageId === 'progress') {
        animateProgressBars();
    }

    // Inisialisasi games jika halaman aktivitas
    if (pageId === 'aktivitas') {
        initializeGames();
    }

    // Tutup dropdown menu
    const dropdownContent = document.getElementById('dropdownContent');
    if (dropdownContent) {
        dropdownContent.classList.remove('show');
    }

    return false; // Mencegah perilaku default link
}

// Fungsi untuk menampilkan kategori panduan
function showGuideCategory(category) {
    // Sembunyikan semua konten panduan
    const guideContents = document.querySelectorAll('.guide-content');
    guideContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Tampilkan konten yang dipilih
    document.getElementById(`${category}-guide`).classList.add('active');
    
    // Update kategori aktif
    const guideCategories = document.querySelectorAll('.guide-category');
    guideCategories.forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Aktifkan kategori yang dipilih
    event.target.classList.add('active');
}

// Inisialisasi progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Data artikel untuk setiap jenis ABK
const articles = {
    'autisme': {
        title: 'Memahami Autisme: Panduan Lengkap untuk Orang Tua',
        content: `
            <h3>Apa itu Autisme?</h3>
            <p>Autisme Spectrum Disorder (ASD) adalah gangguan perkembangan saraf yang mempengaruhi cara seseorang berkomunikasi, berinteraksi sosial, dan berperilaku. Autisme disebut sebagai "spectrum" karena gejalanya bervariasi dari ringan hingga berat dan mempengaruhi setiap individu dengan cara yang berbeda.</p>
            
            <h3>Karakteristik Utama Autisme</h3>
            <ul>
                <li><strong>Kesulitan Komunikasi Sosial:</strong> Anak dengan autisme mungkin mengalami kesulitan memahami bahasa tubuh, ekspresi wajah, nada suara, dan konteks sosial.</li>
                <li><strong>Perilaku Berulang:</strong> Mereka sering melakukan gerakan atau perilaku berulang seperti mengepakkan tangan, berputar, atau mengulangi kata-kata tertentu.</li>
                <li><strong>Minat Terbatas:</strong> Anak autisme biasanya memiliki minat yang sangat spesifik dan intens terhadap topik tertentu.</li>
                <li><strong>Perubahan Rutin:</strong> Mereka sering merasa sangat terganggu dengan perubahan dalam rutinitas harian mereka.</li>
            </ul>
            
            <h3>Strategi Pendukung untuk Anak Autisme</h3>
            <p>Berikut beberapa strategi yang dapat membantu perkembangan anak dengan autisme:</p>
            <ul>
                <li>Gunakan jadwal visual untuk membantu anak memahami rutinitas harian</li>
                <li>Berikan instruksi yang jelas dan konkret</li>
                <li>Gunakan minat khusus anak sebagai motivasi belajar</li>
                <li>Ciptakan lingkungan yang terstruktur dan dapat diprediksi</li>
                <li>Berikan waktu transisi yang cukup antara aktivitas</li>
            </ul>
            
            <h3>Terapi dan Intervensi</h3>
            <p>Beberapa terapi yang dapat membantu anak autisme meliputi:</p>
            <ul>
                <li>Terapi Perilaku (ABA - Applied Behavior Analysis)</li>
                <li>Terapi Wicara dan Bahasa</li>
                <li>Terapi Okupasi</li>
                <li>Terapi Sosial dan Emosional</li>
                <li>Intervensi Berbasis Keluarga</li>
            </ul>
        `
    },
    'adhd': {
        title: 'ADHD: Memahami dan Mengelola Gangguan Pemusatan Perhatian',
        content: `
            <h3>Pengertian ADHD</h3>
            <p>Attention-Deficit/Hyperactivity Disorder (ADHD) adalah gangguan neurodevelopmental yang ditandai dengan pola berkelanjutan dari ketidakmampuan memusatkan perhatian, hiperaktif, dan impulsivitas yang mengganggu fungsi atau perkembangan.</p>
            
            <h3>Tiga Tipe Utama ADHD</h3>
            <ul>
                <li><strong>Tipe Inatentif:</strong> Kesulitan mempertahankan perhatian, mudah teralih, sering lupa, dan kesulitan mengorganisir tugas.</li>
                <li><strong>Tipe Hiperaktif-Impulsif:</strong> Gelisah, banyak bicara, sulit duduk diam, dan bertindak tanpa berpikir.</li>
                <li><strong>Tipe Kombinasi:</strong> Memiliki gejala dari kedua tipe di atas.</li>
            </ul>
            
            <h3>Strategi untuk Mendukung Anak ADHD</h3>
            <p>Berikut strategi yang dapat membantu anak dengan ADHD:</p>
            <ul>
                <li>Buat rutinitas yang konsisten dan terstruktur</li>
                <li>Bagi tugas besar menjadi langkah-langkah kecil</li>
                <li>Gunakan penguat positif untuk perilaku yang diinginkan</li>
                <li>Sediakan lingkungan belajar yang minim distraksi</li>
                <li>Berikan istirahat singkat selama aktivitas yang membutuhkan konsentrasi</li>
                <li>Gunakan timer visual untuk membantu manajemen waktu</li>
            </ul>
            
            <h3>Intervensi dan Pengobatan</h3>
            <p>Penanganan ADHD biasanya melibatkan pendekatan multimodal:</p>
            <ul>
                <li>Terapi perilaku dan kognitif</li>
                <li>Pelatihan keterampilan sosial</li>
                <li>Intervensi pendidikan khusus</li>
                <li>Obat-obatan (atas rekomendasi dokter)</li>
                <li>Pelatihan orang tua dan dukungan keluarga</li>
            </ul>
        `
    },
    'disleksia': {
        title: 'Disleksia: Memahami Gangguan Belajar Spesifik',
        content: `
            <h3>Apa itu Disleksia?</h3>
            <p>Disleksia adalah gangguan belajar spesifik yang bersifat neurologis, ditandai dengan kesulitan dalam mengenali kata dengan tepat dan/atau lancar, mengeja, dan mengodekan kemampuan. Disleksia tidak berhubungan dengan tingkat kecerdasan seseorang.</p>
            
            <h3>Tanda-tanda Disleksia</h3>
            <ul>
                <li>Kesulitan membedakan huruf yang mirip (b-d, p-q, m-n)</li>
                <li>Membaca dengan lambat dan penuh usaha</li>
                <li>Sering terbalik dalam menulis huruf atau angka</li>
                <li>Kesulitan mengingat urutan (hari, bulan, alfabet)</li>
                <li>Menghindari aktivitas yang melibatkan membaca</li>
                <li>Kesulitan memahami apa yang dibaca</li>
            </ul>
            
            <h3>Strategi Pembelajaran untuk Anak Disleksia</h3>
            <p>Pendekatan multisensori sangat efektif untuk anak disleksia:</p>
            <ul>
                <li>Gunakan metode fonik yang sistematis</li>
                <li>Integrasikan pembelajaran visual, auditori, dan kinestetik</li>
                <li>Berikan waktu ekstra untuk menyelesaikan tugas</li>
                <li>Gunakan teknologi bantu (text-to-speech, audiobook)</li>
                <li>Fokus pada kekuatan dan bakat anak di area lain</li>
            </ul>
            
            <h3>Dukungan di Sekolah dan Rumah</h3>
            <p>Anak disleksia membutuhkan dukungan yang konsisten:</p>
            <ul>
                <li>Kerjasama antara orang tua, guru, dan terapis</li>
                <li>Akomodasi di kelas (waktu tambahan, tugas yang dimodifikasi)</li>
                <li>Penguatan positif untuk usaha dan kemajuan</li>
                <li>Membantu mengembangkan strategi kompensasi</li>
                <li>Mendorong minat dan bakat di luar akademik</li>
            </ul>
        `
    },
    'cerebral-palsy': {
        title: 'Cerebral Palsy: Memahami dan Mendukung Anak dengan Gangguan Motorik',
        content: `
            <h3>Pengertian Cerebral Palsy</h3>
            <p>Cerebral Palsy (CP) adalah kelompok gangguan yang mempengaruhi gerakan, tonus otot, atau postur yang disebabkan oleh kerusakan yang terjadi pada otak yang belum matang dan sedang berkembang, paling sering sebelum kelahiran.</p>
            
            <h3>Jenis-jenis Cerebral Palsy</h3>
            <ul>
                <li><strong>Spastik:</strong> Tonus otot meningkat, menyebabkan kekakuan dan kesulitan bergerak</li>
                <li><strong>Diskinetik:</strong> Gerakan tidak terkendali dan tidak terkoordinasi</li>
                <li><strong>Ataksik:</strong> Masalah dengan keseimbangan dan koordinasi</li>
                <li><strong>Campuran:</strong> Kombinasi dari beberapa jenis di atas</li>
            </ul>
            
            <h3>Dukungan dan Terapi</h3>
            <p>Anak dengan CP membutuhkan pendekatan multidisiplin:</p>
            <ul>
                <li>Terapi fisik untuk meningkatkan kekuatan dan mobilitas</li>
                <li>Terapi okupasi untuk membantu aktivitas sehari-hari</li>
                <li>Terapi wicara untuk masalah komunikasi dan menelan</li>
                <li>Alat bantu mobilitas (kursi roda, walker, orthosis)</li>
                <li>Intervensi pendidikan khusus</li>
            </ul>
            
            <h3>Strategi di Rumah dan Sekolah</h3>
            <p>Beberapa strategi untuk mendukung anak dengan CP:</p>
            <ul>
                <li>Modifikasi lingkungan untuk aksesibilitas</li>
                <li>Gunakan teknologi asistif untuk komunikasi dan belajar</li>
                <li>Beri dukungan emosional dan sosial</li>
                <li>Fokus pada kemampuan, bukan keterbatasan</li>
                <li>Libatkan anak dalam pengambilan keputusan tentang perawatannya</li>
            </ul>
        `
    },
    'tuna-rungu': {
        title: 'Tuna Rungu: Memahami dan Mendukung Anak dengan Gangguan Pendengaran',
        content: `
            <h3>Memahami Tuna Rungu</h3>
            <p>Tuna rungu mengacu pada kondisi kehilangan pendengaran yang mempengaruhi kemampuan seseorang untuk mendengar suara. Tingkat gangguan pendengaran bervariasi dari ringan hingga profound (sangat berat).</p>
            
            <h3>Tingkat Gangguan Pendengaran</h3>
            <ul>
                <li><strong>Ringan (20-40 dB):</strong> Kesulitan mendengar percakapan lembut atau dari jarak jauh</li>
                <li><strong>Sedang (41-70 dB):</strong> Kesulitan memahami percakapan normal tanpa alat bantu dengar</li>
                <li><strong>Berat (71-90 dB):</strong> Hanya dapat mendengar suara sangat keras</li>
                <li><strong>Profound (91+ dB):</strong> Tidak dapat mendengar bahkan suara sangat keras</li>
            </ul>
            
            <h3>Komunikasi dan Pendidikan</h3>
            <p>Beberapa pendekatan komunikasi untuk anak tuna rungu:</p>
            <ul>
                <li>Bahasa Isyarat (SIBI - Sistem Isyarat Bahasa Indonesia)</li>
                <li>Komunikasi Total (kombinasi bahasa isyarat, oral, dan tulisan)</li>
                <li>Metode Oral (mengembangkan kemampuan berbicara dan membaca bibir)</li>
                <li>Alat Bantu Dengar dan Implan Koklea</li>
            </ul>
            
            <h3>Strategi Pendukung</h3>
            <p>Untuk mendukung anak dengan gangguan pendengaran:</p>
            <ul>
                <li>Pastikan kontak visual sebelum berbicara</li>
                <li>Gunakan ekspresi wajah dan bahasa tubuh yang jelas</li>
                <li>Bicara dengan kecepatan normal dan artikulasi jelas</li>
                <li>Minimalkan kebisingan latar belakang</li>
                <li>Gunakan media visual untuk mendukung pembelajaran</li>
                <li>Berikan waktu ekstra untuk memproses informasi</li>
            </ul>
        `
    },
    'tuna-netra': {
        title: 'Tuna Netra: Memahami dan Mendukung Anak dengan Gangguan Penglihatan',
        content: `
            <h3>Memahami Tuna Netra</h3>
            <p>Tuna netra mengacu pada kondisi kehilangan penglihatan yang mempengaruhi kemampuan seseorang untuk melihat. Tingkat gangguan penglihatan bervariasi dari low vision (penglihatan rendah) hingga buta total.</p>
            
            <h3>Tingkat Gangguan Penglihatan</h3>
            <ul>
                <li><strong>Low Vision:</strong> Masih memiliki sisa penglihatan yang dapat dimanfaatkan dengan alat bantu</li>
                <li><strong>Buta Parsial:</strong> Hanya dapat melihat cahaya atau bayangan</li>
                <li><strong>Buta Total:</strong> Tidak dapat melihat sama sekali</li>
            </ul>
            
            <h3>Pendidikan dan Keterampilan</h3>
            <p>Anak tuna netra membutuhkan keterampilan khusus:</p>
            <ul>
                <li>Braille untuk membaca dan menulis</li>
                <li>Orientasi dan Mobilitas (penggunaan tongkat, navigasi)</li>
                <li>Keterampilan Kehidupan Sehari-hari (ADL)</li>
                <li>Teknologi Asistif (screen reader, perangkat braille)</li>
                <li>Pengembangan indera pendengaran dan peraba</li>
            </ul>
            
            <h3>Strategi Pendukung</h3>
            <p>Untuk mendukung anak dengan gangguan penglihatan:</p>
            <ul>
                <li>Beri deskripsi verbal yang jelas tentang lingkungan</li>
                <li>Gunakan materi taktil dan auditori dalam pembelajaran</li>
                <li>Jaga konsistensi penataan ruangan dan benda</li>
                <li>Latih kemandirian sejak dini</li>
                <li>Fasilitasi interaksi sosial dengan teman sebaya</li>
                <li>Gunakan kontras warna yang jelas untuk anak low vision</li>
            </ul>
        `
    }
};

// Fungsi untuk menampilkan artikel
function showArticle(articleId) {
    const article = articles[articleId];
    if (article) {
        // Update judul artikel
        document.getElementById('article-title').textContent = article.title;
        
        // Update konten artikel
        document.getElementById('article-content').innerHTML = article.content;
        
        // Sembunyikan grid kartu dan tampilkan artikel
        document.querySelector('.info-grid').style.display = 'none';
        document.getElementById('articles-section').classList.add('active');
        
        // Scroll ke atas halaman
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`Menampilkan artikel: ${article.title}`);
    } else {
        console.error('Artikel tidak ditemukan:', articleId);
    }
}

// Fungsi untuk menyembunyikan artikel dan kembali ke daftar
function hideArticle() {
    // Tampilkan kembali grid kartu
    document.querySelector('.info-grid').style.display = 'grid';
    
    // Sembunyikan section artikel
    document.getElementById('articles-section').classList.remove('active');
    
    // Scroll ke atas halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Kembali ke daftar ABK');
}

// Fungsi untuk inisialisasi halaman
function initializePage() {
    console.log('Halaman Informasi ABK diinisialisasi');
    
    // Tambahkan event listener untuk tombol (jika diperlukan)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Efek klik sederhana
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Pastikan grid kartu ditampilkan saat pertama kali load
    document.querySelector('.info-grid').style.display = 'grid';
    document.getElementById('articles-section').classList.remove('active');
}

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    // Reinitialize games if on activities page when coming back via browser navigation
    if (document.getElementById('aktivitas').classList.contains('active')) {
        initializeGames();
    }
});

// Export fungsi untuk penggunaan eksternal (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showArticle, hideArticle, articles };
}

// ===== WELCOME SCENE ANIMATIONS =====

// Generate particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#ffa751', '#ffe259'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 8 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        const duration = Math.random() * 10 + 5;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

// Generate sun rays
function createSunRays() {
    const container = document.getElementById('sunRays');
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'ray';
        ray.style.transform = `rotate(${i * 30}deg) translateY(-50%)`;
        container.appendChild(ray);
    }
}

// Interactive animal click effects
function setupAnimalInteractions() {
    document.querySelectorAll('.animal').forEach(animal => {
        animal.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 100);
        });
    });
}

// Initialize welcome scene animations
function initWelcomeScene() {
    createParticles();
    createSunRays();
    setupAnimalInteractions();
}

// ===== EDUKASI PAGE FUNCTIONS =====
// (Duplicate function removed - using the improved version below)

// ===== LAYANAN PAGE FUNCTIONS =====
function showSchoolMap(url, schoolName) {
    const mapContainer = document.getElementById('school-map-container');
    const mapTitle = document.getElementById('map-school-title');
    const mapDiv = document.getElementById('school-map');

    // Set school name
    mapTitle.textContent = `Lokasi: ${schoolName}`;

    // Embed Google Maps
    mapDiv.innerHTML = `<iframe src="${url}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

    // Show container
    mapContainer.style.display = 'block';

    // Scroll to map
    mapContainer.scrollIntoView({ behavior: 'smooth' });
}

function hideSchoolMap() {
    const mapContainer = document.getElementById('school-map-container');
    mapContainer.style.display = 'none';
}

// Fix features layout
function fixFeaturesLayout() {
    const features = document.querySelectorAll('.feature-card');
    if (features.length > 0) {
        // Logic untuk memperbaiki layout features bisa ditambahkan di sini
        console.log('Features layout fixed');
    }
}
// Game State
let gameState = {
    puzzle: {
        score: 0,
        completed: false,
        level: 1,
        shapes: []
    },
    memory: {
        pairs: 0,
        attempts: 0,
        selectedCards: [],
        cards: []
    },
    animal: {
        score: 0,
        currentAnimal: null
    }
};

// Shape definitions in order of difficulty (easier to harder)
const allShapes = [
    { id: 'square', name: 'Kotak', symmetry: true },
    { id: 'circle', name: 'Lingkaran', symmetry: true },
    { id: 'triangle', name: 'Segitiga', symmetry: true },
    { id: 'star', name: 'Bintang', symmetry: true },
    { id: 'rectangle', name: 'Persegi Panjang', symmetry: true },
    { id: 'hexagon', name: 'Segi Enam', symmetry: true },
    { id: 'pentagon', name: 'Segi Lima', symmetry: true }
];


// Animal data
const animals = [
    { emoji: '🐱', name: 'Kucing' },
    { emoji: '🐶', name: 'Anjing' },
    { emoji: '🐰', name: 'Kelinci' },
    { emoji: '🐦', name: 'Burung' },
    { emoji: '🐯', name: 'Harimau' },
    { emoji: '🐘', name: 'Gajah' },
    { emoji: '🦒', name: 'Jerapah' },
    { emoji: '🐼', name: 'Panda' }
];

// ===== FUNGSI GAME =====

// Cek apakah di halaman aktivitas
function isActivitiesPageActive() {
    return document.getElementById('aktivitas').classList.contains('active');
}

// Fungsi untuk menyembunyikan semua game containers
function hideAllGameContainers() {
    document.querySelectorAll('.game-container').forEach(container => {
        container.classList.add('hidden');
    });
}

// Inisialisasi game
function initializeGames() {
    if (!isActivitiesPageActive()) return;
    
    console.log('Menginisialisasi game');
    resetAllGames();
    showGameSelection();
    setupGameEventListeners();
}

// Tampilkan pemilihan game
function showGameSelection() {
    if (!isActivitiesPageActive()) return;
    
    document.querySelectorAll('.game-container').forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('games-grid').style.display = 'grid';
}

// Sembunyikan pemilihan game
function hideGameSelection() {
    if (!isActivitiesPageActive()) return;
    document.getElementById('games-grid').style.display = 'none';
}

// Reset semua game
function resetAllGames() {
    resetPuzzleGame();
    resetMemoryGame();
    resetAnimalGame();
}

// Setup event listeners game
function setupGameEventListeners() {
    if (!isActivitiesPageActive()) return;
    
    // Back buttons
    document.querySelectorAll('.back-to-games').forEach(btn => {
        btn.onclick = showGameSelection;
    });
}
// ===== PUZZLE GAME =====
function startPuzzleGame() {
    if (!isActivitiesPageActive()) {
        showPage('aktivitas');
        setTimeout(() => {
            hideGameSelection();
            document.getElementById('puzzle-game-container').classList.remove('hidden');
            resetPuzzleGame();
            setupDragAndDrop();
        }, 100);
        return;
    }
    
    hideGameSelection();
    document.getElementById('puzzle-game-container').classList.remove('hidden');
    resetPuzzleGame();
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable-shape');
    const slots = document.querySelectorAll('.shape-slot');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', this.dataset.shape);
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('over');
}

function handleDragLeave() {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('over');

    const shapeType = e.dataTransfer.getData('text/plain');
    const slotType = this.dataset.shape;

    // Find the shape object to check symmetry
    const shape = allShapes.find(s => s.id === shapeType);

    if (shapeType === slotType && shape && shape.symmetry) {
        this.classList.add('correct');
        this.innerHTML = `<div class="shape ${shapeType}"></div>`;

        const draggedShape = document.getElementById(`shape-${shapeType}`);
        draggedShape.classList.add('correct');
        draggedShape.setAttribute('draggable', 'false');

        updatePuzzleScore(10);
        showPuzzleFeedback('Bagus! Bentuk benar dan simetris! 🎉', 'success');
        checkPuzzleCompletion();
    } else if (shapeType === slotType && shape && !shape.symmetry) {
        showPuzzleFeedback('Bentuk benar tapi tidak simetris! Coba bentuk lain 🤔', 'error');
    } else {
        showPuzzleFeedback('Coba lagi! 🤔', 'error');
    }
}

function updatePuzzleScore(points) {
    gameState.puzzle.score += points;
    document.getElementById('puzzle-score').textContent = gameState.puzzle.score;
}

function checkPuzzleCompletion() {
    const correctSlots = document.querySelectorAll('.shape-slot.correct').length;
    if (correctSlots === gameState.puzzle.shapes.length) {
        gameState.puzzle.completed = true;
        gameState.puzzle.level += 1; // Advance to next level
        showPuzzleFeedback(`Hebat! Kamu menyelesaikan level ${gameState.puzzle.level - 1}! Naik ke level ${gameState.puzzle.level} 🏆`, 'success');
        setTimeout(() => {
            resetPuzzleGame(); // Reset for new level
        }, 2000);
    }
}

function showPuzzleFeedback(message, type) {
    const feedback = document.getElementById('puzzle-feedback');
    feedback.textContent = message;
    feedback.className = `game-feedback ${type}`;
}

function resetPuzzleGame() {
    // Select shapes for current level
    const numShapes = Math.min(gameState.puzzle.level + 1, allShapes.length); // Level 1: 2 shapes, Level 2: 3 shapes, etc.
    gameState.puzzle.shapes = allShapes.slice(0, numShapes);

    // Shuffle shapes for randomization
    for (let i = gameState.puzzle.shapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.puzzle.shapes[i], gameState.puzzle.shapes[j]] = [gameState.puzzle.shapes[j], gameState.puzzle.shapes[i]];
    }

    // Create separate shuffled slots (independent of shape order)
    const shuffledSlots = [...gameState.puzzle.shapes];
    for (let i = shuffledSlots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSlots[i], shuffledSlots[j]] = [shuffledSlots[j], shuffledSlots[i]];
    }

    gameState.puzzle.completed = false;

    document.getElementById('puzzle-score').textContent = gameState.puzzle.score;
    showPuzzleFeedback('Seret bentuk ke tempat yang sesuai!', 'info');

    // Update shape slots with shuffled order
    const shapeSlots = document.querySelectorAll('.shape-slot');
    shapeSlots.forEach((slot, index) => {
        slot.classList.remove('correct', 'over');
        if (index < shuffledSlots.length) {
            const slotShape = shuffledSlots[index];
            slot.dataset.shape = slotShape.id;
            slot.innerHTML = `<div class="slot-label">${slotShape.name}</div>`;
            slot.style.display = 'block';
        } else {
            slot.style.display = 'none';
        }
    });

    // Update draggable shapes
    const draggableShapes = document.querySelectorAll('.draggable-shape');
    draggableShapes.forEach((shape, index) => {
        shape.classList.remove('correct', 'dragging');
        shape.setAttribute('draggable', 'true');
        if (index < gameState.puzzle.shapes.length) {
            const shapeData = gameState.puzzle.shapes[index];
            shape.id = `shape-${shapeData.id}`;
            shape.dataset.shape = shapeData.id;
            shape.innerHTML = `<div class="shape ${shapeData.id}"></div>`;
            shape.style.display = 'block';
        } else {
            shape.style.display = 'none';
        }
    });
}

function getShapeName(shape) {
    const names = {
        'square': 'Kotak',
        'circle': 'Lingkaran', 
        'triangle': 'Segitiga'
    };
    return names[shape];
}

// ===== MEMORY GAME =====
function startMemoryGame() {
    if (!isActivitiesPageActive()) {
        showPage('aktivitas');
        setTimeout(() => {
            hideGameSelection();
            document.getElementById('memory-game-container').classList.remove('hidden');
            resetMemoryGame();
            generateMemoryCards();
        }, 100);
        return;
    }
    
    hideGameSelection();
    document.getElementById('memory-game-container').classList.remove('hidden');
    resetMemoryGame();
    generateMemoryCards();
}

function generateMemoryCards() {
    const memoryBoard = document.getElementById('memory-board');
    memoryBoard.innerHTML = '';
    
    const symbols = ['🐱', '🐶', '🐰', '🐼', '🐯', '🐸'];
    const cards = [...symbols, ...symbols];
    
    // Acak kartu
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="card-back">?</div>
            <div class="card-front">${symbol}</div>
        `;
        card.dataset.symbol = symbol;
        card.addEventListener('click', () => flipCard(card));
        memoryBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('flipped') || 
        card.classList.contains('matched') || 
        gameState.memory.selectedCards.length >= 2) {
        return;
    }
    
    card.classList.add('flipped');
    gameState.memory.selectedCards.push(card);
    
    if (gameState.memory.selectedCards.length === 2) {
        gameState.memory.attempts++;
        document.getElementById('memory-attempts').textContent = gameState.memory.attempts;
        setTimeout(checkMemoryMatch, 800);
    }
}

function checkMemoryMatch() {
    const [card1, card2] = gameState.memory.selectedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameState.memory.pairs++;
        document.getElementById('memory-pairs').textContent = gameState.memory.pairs;
        
        showMemoryFeedback('Pasangan ditemukan! 🎉', 'success');
        
        if (gameState.memory.pairs === 6) {
            const stars = gameState.memory.attempts <= 12 ? '⭐⭐⭐' : 
                         gameState.memory.attempts <= 18 ? '⭐⭐' : '⭐';
            showMemoryFeedback(`Selamat! Kamu menang dengan ${gameState.memory.attempts} percobaan! ${stars}`, 'success');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        showMemoryFeedback('Bukan pasangan, coba lagi! 🤔', 'error');
    }
    
    gameState.memory.selectedCards = [];
}

function showMemoryFeedback(message, type) {
    const feedback = document.getElementById('memory-feedback');
    feedback.textContent = message;
    feedback.className = `game-feedback ${type}`;
}

function resetMemoryGame() {
    gameState.memory = { pairs: 0, attempts: 0, selectedCards: [], cards: [] };
    document.getElementById('memory-pairs').textContent = '0';
    document.getElementById('memory-attempts').textContent = '0';
    showMemoryFeedback('Klik kartu untuk membuka!', 'info');
    generateMemoryCards(); // Regenerate cards to fully reset the game
}

// ===== ANIMAL GAME =====
function startAnimalGame() {
    if (!isActivitiesPageActive()) {
        showPage('aktivitas');
        setTimeout(() => {
            hideGameSelection();
            document.getElementById('animal-game-container').classList.remove('hidden');
            resetAnimalGame();
            nextAnimal();
        }, 100);
        return;
    }
    
    hideGameSelection();
    document.getElementById('animal-game-container').classList.remove('hidden');
    resetAnimalGame();
    nextAnimal();
}

function nextAnimal() {
    gameState.animal.currentAnimal = animals[Math.floor(Math.random() * animals.length)];
    document.getElementById('animal-emoji').textContent = gameState.animal.currentAnimal.emoji;
    
    const choices = [gameState.animal.currentAnimal.name];
    while (choices.length < 4) {
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        if (!choices.includes(randomAnimal.name)) {
            choices.push(randomAnimal.name);
        }
    }
    
    // Acak pilihan
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    const choiceButtons = document.querySelectorAll('.animal-choice');
    choiceButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.classList.remove('correct', 'incorrect');
        button.onclick = function() { checkAnimalGuess(choices[index]); };
    });
    
    showAnimalFeedback('Tebak nama hewan ini!', 'info');
}

function checkAnimalGuess(guess) {
    const choiceButtons = document.querySelectorAll('.animal-choice');

    // Guard against null currentAnimal
    if (!gameState.animal.currentAnimal) {
        showAnimalFeedback('Game belum siap, silakan tunggu...', 'error');
        return;
    }

    if (guess === gameState.animal.currentAnimal.name) {
        gameState.animal.score += 10;
        document.getElementById('animal-score').textContent = gameState.animal.score;
        
        choiceButtons.forEach(button => {
            if (button.textContent === gameState.animal.currentAnimal.name) {
                button.classList.add('correct');
            }
        });
        
        showAnimalFeedback(`Benar! Itu ${gameState.animal.currentAnimal.name} 🎉 +10 poin`, 'success');
        setTimeout(nextAnimal, 1500);
    } else {
        gameState.animal.score = 0;
        document.getElementById('animal-score').textContent = gameState.animal.score;

        choiceButtons.forEach(button => {
            if (button.textContent === guess) {
                button.classList.add('incorrect');
            }
            if (button.textContent === gameState.animal.currentAnimal.name) {
                button.classList.add('correct');
            }
        });

        showAnimalFeedback('Salah, skor direset ke 0! 🤔', 'error');
        setTimeout(nextAnimal, 1500);
    }
}

function showAnimalFeedback(message, type) {
    const feedback = document.getElementById('animal-feedback');
    feedback.textContent = message;
    feedback.className = `game-feedback ${type}`;
}

function resetAnimalGame() {
    gameState.animal = { score: 0, currentAnimal: null };
    document.getElementById('animal-score').textContent = '0';
    showAnimalFeedback('Pilih jawaban yang benar!', 'info');
}

// ===== ACCESSIBILITY FEATURES =====
function initializeAccessibilityFeatures() {
    // Text-to-Speech
    const textToSpeechBtn = document.getElementById('textToSpeechBtn');
    let isTextToSpeechActive = false;
    let speechSynthesis = window.speechSynthesis;

    if (textToSpeechBtn) {
        textToSpeechBtn.addEventListener('click', function() {
            isTextToSpeechActive = !isTextToSpeechActive;
            this.classList.toggle('active');

            if (isTextToSpeechActive) {
                // Aktifkan text-to-speech
                const pageContent = document.querySelector('.page.active').innerText;
                const utterance = new SpeechSynthesisUtterance(pageContent);
                utterance.lang = 'id-ID';
                speechSynthesis.speak(utterance);
            } else {
                // Nonaktifkan text-to-speech
                speechSynthesis.cancel();
            }
        });
    }

    // Mode Disleksia
    const dyslexiaModeBtn = document.getElementById('dyslexiaModeBtn');
    if (dyslexiaModeBtn) {
        dyslexiaModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dyslexia-mode');
            this.classList.toggle('active');
        });
    }

    // Dropdown Menu
    const menuBtn = document.getElementById('menuBtn');
    const dropdownContent = document.getElementById('dropdownContent');

    if (menuBtn && dropdownContent) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        // Tutup dropdown ketika klik di luar
        document.addEventListener('click', function() {
            dropdownContent.classList.remove('show');
        });
    }

    // Fix features layout
    fixFeaturesLayout();

    // Juga panggil saat resize window dengan debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(fixFeaturesLayout, 250);
    });
}

// ===== TWITTER-STYLE COMMUNITY FUNCTIONS =====

// Tweet data structure
let tweets = [];
let currentUser = {
    name: 'Pengguna Lumina',
    handle: '@luminauser',
    avatar: 'https://via.placeholder.com/40x40/1DA1F2/FFFFFF?text=U'
};

// Helper function to find tweet by ID (including nested replies)
function findTweetById(tweetId, tweetArray = tweets) {
    for (let tweet of tweetArray) {
        if (tweet.id === tweetId) {
            return tweet;
        }
        if (tweet.replies && tweet.replies.length > 0) {
            const found = findTweetById(tweetId, tweet.replies);
            if (found) return found;
        }
    }
    return null;
}

// Load tweets from localStorage
function loadTweets() {
    const storedTweets = localStorage.getItem('luminaTweets');
    if (storedTweets) {
        tweets = JSON.parse(storedTweets);
    } else {
        // Default tweets if none stored
        tweets = [
            {
                id: Date.now() - 300000,
                author: 'Aulia Sari',
                handle: '@auliasari',
avatar: 'https://via.placeholder.com/40x40/E91E63/FFFFFF?text=AS',
                content: 'Anak saya yang berusia 5 tahun dengan autisme sangat sulit untuk diajak komunikasi. Ada saran aktivitas yang bisa membantu meningkatkan kemampuan komunikasinya? 🙏',
                timestamp: Date.now() - 172800000, // 2 days ago
                likes: 12,
                retweets: 3,
                replies: [],
                liked: false,
                retweeted: false
            },
            {
                id: Date.now() - 200000,
                author: 'Rina Santoso',
                handle: '@rinasantoso',
                avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=RS',
                content: 'Baru saja menemukan terapis okupasi yang sangat baik di daerah Jakarta Selatan. Jika ada yang membutuhkan rekomendasi, bisa DM saya ya! 💪✨',
                timestamp: Date.now() - 432000000, // 5 days ago
                likes: 24,
                retweets: 7,
                replies: [],
                liked: true,
                retweeted: false
            },
            {
                id: Date.now() - 100000,
                author: 'Dr. Sari, Sp.A',
                handle: '@drsari_spa',
                avatar: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=DS',
                content: 'Minggu depan akan ada webinar gratis tentang "Strategi Menghadapi Tantrum pada Anak dengan ADHD". Silakan daftar melalui link di bio untuk yang berminat. 📚🧠',
                timestamp: Date.now() - 3600000, // 1 hour ago
                likes: 45,
                retweets: 15,
                replies: [],
                liked: false,
                retweeted: false
            }
        ];
        saveTweets();
    }
}

// Save tweets to localStorage
function saveTweets() {
    localStorage.setItem('luminaTweets', JSON.stringify(tweets));
}

// Format timestamp
function formatTimestamp(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'baru saja';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}j`;
    if (days < 7) return `${days}h`;
    return new Date(timestamp).toLocaleDateString('id-ID');
}

// Initialize tweet composer
function initializeTweetComposer() {
    const textarea = document.querySelector('.tweet-input');
    const tweetBtn = document.querySelector('.tweet-btn');
    const charCounter = document.querySelector('.char-counter');

    if (!textarea || !tweetBtn || !charCounter) return;

    // Character counter
    textarea.addEventListener('input', function() {
        const remaining = 280 - this.value.length;
        charCounter.textContent = remaining;

        if (remaining < 0) {
            charCounter.style.color = '#e0245e';
            tweetBtn.disabled = true;
        } else if (remaining <= 20) {
            charCounter.style.color = '#ffad1f';
            tweetBtn.disabled = this.value.trim().length === 0;
        } else {
            charCounter.style.color = '#657786';
            tweetBtn.disabled = this.value.trim().length === 0;
        }
    });

    // Tweet button
    tweetBtn.addEventListener('click', postTweet);

    // Send tweet on Enter key press (but not Shift+Enter for new lines)
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default newline
            const content = textarea.value.trim();
            if (content.length > 0 && content.length <= 280) {
                postTweet();
            }
        }
    });
}

// Post a new tweet
function postTweet() {
    const textarea = document.querySelector('.tweet-input');
    const content = textarea.value.trim();

    if (content.length === 0 || content.length > 280) return;

    const newTweet = {
        id: Date.now(),
        author: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        content: content,
        timestamp: Date.now(),
        likes: 0,
        retweets: 0,
        replies: 0,
        liked: false,
        retweeted: false
    };

    tweets.unshift(newTweet);
    saveTweets();
    displayTweets();

    // Clear composer
    textarea.value = '';
    document.querySelector('.char-counter').textContent = '280';
    document.querySelector('.tweet-btn').disabled = true;

    // Scroll to top to show new tweet
    document.querySelector('.tweet-feed').scrollIntoView({ behavior: 'smooth' });
}

// Display tweets
function displayTweets() {
    const feed = document.querySelector('.tweet-feed');
    if (!feed) return;

    feed.innerHTML = '';

    tweets.forEach(tweet => {
        const tweetElement = createTweetElement(tweet);
        feed.appendChild(tweetElement);
    });
}

// Create tweet element
function createTweetElement(tweet) {
    const tweetCard = document.createElement('div');
    tweetCard.className = 'tweet-card';
    tweetCard.dataset.tweetId = tweet.id;

    // Check if this is the current user's tweet to show delete button
    const isOwnTweet = tweet.author === currentUser.name;
    const deleteButtonHTML = isOwnTweet ? `
        <button class="action-btn delete-btn" title="Hapus" onclick="deleteTweet(this)">
            <i class="fas fa-trash"></i>
        </button>` : '';

    tweetCard.innerHTML = `
        <div class="tweet-avatar">
            <img src="${tweet.avatar}" alt="${tweet.author}">
        </div>
        <div class="tweet-content">
            <div class="tweet-header">
                <span class="tweet-author">${tweet.author}</span>
                <span class="tweet-handle">${tweet.handle}</span>
                <span class="tweet-time">· ${formatTimestamp(tweet.timestamp)}</span>
            </div>
            <div class="tweet-text">${tweet.content}</div>
            <div class="tweet-actions">
                <button class="action-btn reply-btn" title="Balas" onclick="showReplyModal(${tweet.id})">
                    <i class="far fa-comment"></i>
                    <span>${tweet.replies}</span>
                </button>
                <button class="action-btn retweet-btn ${tweet.retweeted ? 'retweeted' : ''}" title="Retweet" onclick="toggleRetweet(${tweet.id})">
                    <i class="fas fa-retweet"></i>
                    <span>${tweet.retweets}</span>
                </button>
                <button class="action-btn like-btn ${tweet.liked ? 'liked' : ''}" title="Suka" onclick="toggleLike(${tweet.id})">
                    <i class="${tweet.liked ? 'fas' : 'far'} fa-heart"></i>
                    <span>${tweet.likes}</span>
                </button>
                <button class="action-btn share-btn" title="Bagikan" onclick="shareTweet(${tweet.id})">
                    <i class="fas fa-share"></i>
                </button>
                ${deleteButtonHTML}
            </div>
        </div>
    `;

    return tweetCard;
}

// Toggle like
function toggleLike(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    tweet.liked = !tweet.liked;
    tweet.likes += tweet.liked ? 1 : -1;

    saveTweets();
    displayTweets();
}

// Toggle retweet
function toggleRetweet(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    tweet.retweeted = !tweet.retweeted;
    tweet.retweets += tweet.retweeted ? 1 : -1;

    saveTweets();
    displayTweets();
}

// Show reply modal
function showReplyModal(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    // Check if modal elements exist
    const replyUserAvatar = document.getElementById('replyUserAvatar');
    const replyUserName = document.getElementById('replyUserName');
    const replyUserHandle = document.getElementById('replyUserHandle');
    const originalTweetContent = document.getElementById('originalTweetContent');

    if (!replyUserAvatar || !replyUserName || !replyUserHandle || !originalTweetContent) {
        console.error('Reply modal elements not found');
        return;
    }

    // Populate modal with tweet data (with individual null checks)
    if (replyUserAvatar) replyUserAvatar.src = tweet.avatar;
    if (replyUserName) replyUserName.textContent = tweet.author;
    if (replyUserHandle) replyUserHandle.textContent = tweet.handle;
    if (originalTweetContent) originalTweetContent.textContent = tweet.content;

    // Clear previous reply
    const replyTextarea = document.getElementById('replyTextarea');
    replyTextarea.value = '';
    document.getElementById('reply-char-counter').textContent = '280';
    document.getElementById('replyBtn').disabled = true;

    // Show modal
    const modal = document.getElementById('replyModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Focus on textarea
    setTimeout(() => replyTextarea.focus(), 100);

    // Store tweet ID for submission
    modal.dataset.tweetId = tweetId;

    // Add character counter event listener
    replyTextarea.addEventListener('input', updateReplyCharCounter);
}

// Close reply modal
function closeReplyModal() {
    const modal = document.getElementById('replyModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Clear tweet ID
    delete modal.dataset.tweetId;

    // Remove event listener
    const replyTextarea = document.getElementById('replyTextarea');
    replyTextarea.removeEventListener('input', updateReplyCharCounter);
}

// Update reply character counter
function updateReplyCharCounter() {
    const textarea = document.getElementById('replyTextarea');
    const counter = document.getElementById('reply-char-counter');
    const submitBtn = document.getElementById('replyBtn');

    const remaining = 280 - textarea.value.length;
    counter.textContent = remaining;

    if (remaining < 0) {
        counter.style.color = '#e0245e';
        submitBtn.disabled = true;
    } else if (remaining <= 20) {
        counter.style.color = '#ffad1f';
        submitBtn.disabled = textarea.value.trim().length === 0;
    } else {
        counter.style.color = '#657786';
        submitBtn.disabled = textarea.value.trim().length === 0;
    }
}

// Submit reply
function submitReply() {
    const modal = document.getElementById('replyModal');
    const tweetId = parseInt(modal.dataset.tweetId);
    const replyContent = document.getElementById('replyTextarea').value.trim();

    if (!replyContent || replyContent.length > 280) return;

    const originalTweet = tweets.find(t => t.id === tweetId);
    if (!originalTweet) return;

    // Increment reply count on original tweet
    originalTweet.replies += 1;

    // Create reply tweet
    const replyTweet = {
        id: Date.now(),
        author: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        content: `@${originalTweet.handle.replace('@', '')} ${replyContent}`,
        timestamp: Date.now(),
        likes: 0,
        retweets: 0,
        replies: 0,
        liked: false,
        retweeted: false
    };

    // Add reply to tweets array
    tweets.unshift(replyTweet);

    // Save and update display
    saveTweets();
    displayTweets();

    // Close modal
    closeReplyModal();
}

// Initialize reply modal event listeners
function initializeReplyModal() {
    const replyBtn = document.getElementById('replyBtn');
    const replyTextarea = document.getElementById('replyTextarea');

    if (replyBtn) {
        replyBtn.addEventListener('click', submitReply);
    }

    if (replyTextarea) {
        // Allow submitting reply with Enter key
        replyTextarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const content = replyTextarea.value.trim();
                if (content.length > 0 && content.length <= 280) {
                    submitReply();
                }
            }
        });
    }
}

// Delete tweet
function deleteTweet(button) {
    const tweetCard = button.closest('.tweet-card');
    const tweetId = parseInt(tweetCard.dataset.tweetId);

    // Confirm deletion
    if (!confirm('Apakah Anda yakin ingin menghapus tweet ini?')) {
        return;
    }

    // Remove from tweets array
    tweets = tweets.filter(t => t.id !== tweetId);

    // Save to localStorage
    saveTweets();

    // Update display
    displayTweets();
}

// Share tweet (placeholder)
function shareTweet(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    if (navigator.share) {
        navigator.share({
            title: `Tweet dari ${tweet.author}`,
            text: tweet.content,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${tweet.content} - ${tweet.author} (${tweet.handle})`);
        alert('Link tweet berhasil disalin!');
    }
}

// Initialize community page
function initializeCommunityPage() {
    loadTweets();
    initializeTweetComposer();
    initializeReplyModal();
    displayTweets();
}

// Call initialization when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accessibility features
    initializeAccessibilityFeatures();

    // Initialize community features
    initializeCommunityPage();

    // Initialize video modal features
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close');

    // Tambahkan event listener untuk setiap video card
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            if (videoId && videoId !== 'dummy5' && videoId !== 'dummy6') {
                openVideoModal(videoId);
            }
        });
    });

    // Event listener untuk tombol close
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }

    // Event listener untuk klik di luar modal
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeVideoModal();
            }
        });
    }
});

// Fungsi untuk membuka modal video
function openVideoModal(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubePlayer');

    // Set URL video YouTube dengan autoplay
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    // Tampilkan modal
    modal.style.display = 'block';

    // Tambahkan event listener untuk menutup modal
    document.addEventListener('keydown', handleEscapeKey);

    // Tambahkan class ke body untuk mencegah scroll
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup modal video
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubePlayer');

    // Hentikan video dengan mengatur src ke string kosong
    iframe.src = '';

    // Sembunyikan modal
    modal.style.display = 'none';

    // Hapus event listener
    document.removeEventListener('keydown', handleEscapeKey);

    // Kembalikan scroll body
    document.body.style.overflow = 'auto';
}

// Fungsi untuk menangani tombol escape
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
}

// Show authentication tab (login/register)
function showAuthTab(tab) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Update form visibility
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(f => f.classList.remove('active'));

    const targetForm = document.getElementById(tab + 'Form');
    if (targetForm) {
        targetForm.classList.add('active');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const messageDiv = document.getElementById('loginMessage');

    // Basic validation
    if (!email || !password) {
        showAuthMessage(messageDiv, 'Harap isi semua field', 'error');
        return;
    }

    // Simulate login (in real app, this would be an API call)
    const users = JSON.parse(localStorage.getItem('luminaUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar || user.name.charAt(0).toUpperCase()
        };

        localStorage.setItem('luminaUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();

        showAuthMessage(messageDiv, 'Login berhasil!', 'success');
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 2000);
    } else {
        showAuthMessage(messageDiv, 'Email atau password salah', 'error');
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const messageDiv = document.getElementById('registerMessage');

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        showAuthMessage(messageDiv, 'Harap isi semua field', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAuthMessage(messageDiv, 'Password tidak cocok', 'error');
        return;
    }

    if (password.length < 6) {
        showAuthMessage(messageDiv, 'Password minimal 6 karakter', 'error');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('luminaUsers') || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        showAuthMessage(messageDiv, 'Email sudah terdaftar', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        avatar: name.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('luminaUsers', JSON.stringify(users));

    // Auto login after registration
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar
    };

    localStorage.setItem('luminaUser', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();

    showAuthMessage(messageDiv, 'Registrasi berhasil!', 'success');
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 2000);
}

// Show authentication message
function showAuthMessage(element, message, type) {
    element.textContent = message;
    element.className = `auth-message ${type}`;
}

// Logout user
function logout() {
    currentUser = null;
    localStorage.removeItem('luminaUser');
    updateAuthUI();
    closeProfileModal();
}

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');

    if (currentUser) {
        // Show user profile section
        authButtons.style.display = 'none';
        userProfile.style.display = 'flex';

        // Update user info
        document.getElementById('userAvatar').textContent = currentUser.avatar;
        document.getElementById('userName').textContent = currentUser.name;
    } else {
        // Show auth buttons
        authButtons.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

// Open profile modal
function openProfileModal() {
    if (!currentUser) return;

    const modal = document.getElementById('profileModal');
    const profileContent = document.getElementById('profileContent');

    profileContent.innerHTML = `
        <div class="profile-info">
            <div class="profile-avatar-large">${currentUser.avatar}</div>
            <div class="profile-details">
                <h3>${currentUser.name}</h3>
                <p>${currentUser.email}</p>
                <div class="profile-stats">
                    <div class="stat">
                        <span class="stat-number">0</span>
                        <span class="stat-label">Postingan</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">0</span>
                        <span class="stat-label">Follower</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">0</span>
                        <span class="stat-label">Following</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-actions">
            <button class="btn btn-secondary" onclick="editProfile()">Edit Profil</button>
            <button class="btn btn-outline-secondary" onclick="viewProgress()">Lihat Progress</button>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close profile modal
function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Edit profile (placeholder function)
function editProfile() {
    alert('Fitur edit profil akan segera hadir!');
}

// View progress (placeholder function)
function viewProgress() {
    closeProfileModal();
    showPage('progress');
}

// Open authentication modal
function openAuthModal(type) {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Switch to the appropriate tab
    showAuthTab(type);

    // Clear any previous messages
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');
    if (loginMessage) loginMessage.textContent = '';
    if (registerMessage) registerMessage.textContent = '';

    // Clear forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();
}

// Close authentication modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize authentication on page load
function initializeAuthentication() {
    // Load current user from localStorage
    const storedUser = localStorage.getItem('luminaUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }

    // Update UI based on authentication status
    updateAuthUI();

    // Add event listeners for auth modal close
    const modal = document.getElementById('authModal');
    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeAuthModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeAuthModal();
            }
        });
    }
}

// Open new post modal (placeholder for community feature)
function openNewPostModal() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    alert('Fitur buat postingan baru akan segera hadir!');
}
