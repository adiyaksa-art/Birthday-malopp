/**
 * ==========================================================
 * KONFIGURASI UCAPAN ULANG TAHUN — HALIMAH AZZAHRA (5 JUNI)
 * ==========================================================
 * Kalau nanti ingin memakai foto asli Halimah Azzahra,
 * isi path file foto ke `heroPhoto`, `ovalPhoto`, `closingPhoto`,
 * `showcasePhotos` (4 foto), atau `galleryPhotos`.
 */
const CONFIG = {
  recipientName: 'Halimah Azzahra',
  shortName: 'Halimah',
  birthdayDay: 5,
  birthdayYear: 2026,

  heroPhoto: 'asset/kecil.jpeg',
  ovalPhoto: 'asset/foto2.jpg',
  closingPhoto: 'asset/foto1.jpg',
  showcasePhotos: ['asset/foto3.jpg', 'asset/foto4.jpg', 'asset/foto5.jpg'],
  galleryPhotos: [
    'asset/foto3.jpg',
    'asset/foto4.jpg',
    'asset/foto5.jpg',
    'asset/foto1.jpg',
    'asset/foto2.jpg'
  ],

  // Pengaturan lagu latar:
  songTitle: 'Semua Aku Dirayakan',
  songArtist: 'Nadin Amizah',
  // ID resmi lagu Nadin Amizah - Semua Aku Dirayakan (diputar penuh saat online lewat http://localhost / hosting)
  youtubeVideoId: '5UihqGaL5nM',
  spotifyTrackId: '2x3vwXWuecPrRqgEUuSUJA',
  // Opsional: jika punya file MP3 di folder asset/, isi misal: 'asset/semua-aku-dirayakan.mp3'
  // (bisa juga pilih langsung lewat tombol "🎵 Pilih File MP3" di Slide 1)
  audioSrc: null,

  wishes: [
    { icon: '🍓', title: 'Sehat', detail: 'Sehat teruss ya sayangg, panjang umur dan sehat selaluu' },
    { icon: '🐰', title: 'Bahagia', detail: 'Semogaa di umur ke 20 inii selalu bahagia yaa sayangg, selalu senyum soalnyaa maniss' },
    { icon: '🌟', title: 'Sukses', detail: 'semua rencana kamu dan harapan kamu semoga terkabul yaa cintakuu' },
    { icon: '👑', title: 'Disayang', detail: 'Dikelilingi orang-orang baik terus dan tulus contohnya sama aku hehee' }
  ],

  envelopePreviewText:
    'Terima kasih karena telah menjadi seseorang yang membawa banyak hal baik untuk orang-orang di sekitarmu. Semoga hari 5 Juni ini penuh dengan kebahagiaan, cinta, dan kejutan manis yang bikin kamu terus tersenyum.',
  envelopeSign: 'Have the happiest birthday, Halimah Azzahra! 🩷',

  fullLetter: `Haloo sayanggku,

Ciee Happy Birthday yaa yang ke 20 di tanggal 5 Juni yang manis ini! 🎂🩷
Semoga ulang tahun iniii paling terkesan buat kamu walaupun semua hadiah dari akuu cuma sederhana hehehe termasuk inii

Maaciw yaa udah jadi Halimah yang selalu bikin akuu ngerasa lebih hangat, lembut, dan penuh tawa. Semoga di usia yang baru ini, semua rencana baik yang masih kamu simpan rapi pelan-pelan jadi kenyataan, dan semua lelah kemarin terbayar dengan kebahagiaan hari ini.

Semoga Allah selalu menjaga kamuu yaa, memberi kesehatan, rezeki yang lancar, dan hati yang selalu tenangg.

Happy Birthday, Pretty Girl! 🎀`,

  justForYouText:
    'Kalau ada satu hal yang pengen aku sampaikan hari ini, itu cuma... semoga Halimah Azzahra selalu dikelilingi sama orang-orang yang tulus, hal-hal yang baik, dan momen-momen sederhana yang bikin hati kamu tenang. Nggak perlu jadi sempurna buat jadi seseorang yang berarti, karena menjadi diri sendiri aja udah lebih dari cukup.\n\nNikmatin setiap langkah yang kamu jalani, rayain setiap pencapaian sekecil apa pun, dan jangan lupa kasih waktu buat diri sendiri untuk istirahat kalau lagi lelah dan jangan lupa cerita, aku siap kok dengerin kamu cerita. Wishing you endless happiness, beautiful memories, and all the good things life has to offer.',

  closingText:
    'Semoga halaman kecil ini bisa bikin kamu senyum yaa, walaupun cuma sebentar dan sederhana. Terima kasih udah meluangkan waktu buat membacanya sampai akhir. Semoga hari 5 Juni ini jadi awal dari banyak hal baik yang akan datang, dan semoga kebahagiaan selalu nemuin jalannya ke kamu, sayangkuu cintaku. 🎀',

  luckyFortunes: [
    '🍓 Ramalan 5 Juni: tingkat keimutan sayangku naik +1000%!',
    '✨ Semesta lagi nyiapin hal-hal manis yang bakal bikin kamu senyum lebar~',
    '🍰 Hari ini wajib makan jajanan favorit & jajan enak tanpa rasa bersalah!',
    '🎀 Semua doa baik yang kamu panjatkan hari ini pelan-pelan akan terkabul!',
    '🌸 Tahun baru usiamu bakal dipenuhi tawa, ketenangan, dan peluk hangat!'
  ]
};

/* ==========================================================
   AUDIO PLAYER (MP3 LOKAL -> YOUTUBE FULL SONG -> SPOTIFY -> SYNTH FALLBACK)
   ========================================================== */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.noteIndex = 0;
    this.audioEl = null;
    this.usingMp3 = false;
    this.ytPlayer = null;
    this.ytReady = false;
    this.usingYt = false;
    this.spotifyMode = false;
    this.wantsYtPlay = false;

    // Aransemen fallback lembut nada dasar E Mayor (~80 BPM) jika offline / file:// tanpa MP3
    this.arpeggio = [
      [164.81, 0.9], [246.94, 0.45], [329.63, 0.45], [415.30, 0.55], [493.88, 0.65], [415.30, 0.45],
      [220.00, 0.9], [329.63, 0.45], [440.00, 0.45], [493.88, 0.55], [554.37, 0.65], [493.88, 0.45],
      [164.81, 0.9], [246.94, 0.45], [415.30, 0.45], [493.88, 0.55], [659.25, 0.75], [493.88, 0.45],
      [185.00, 0.9], [277.18, 0.45], [329.63, 0.45], [440.00, 0.55],
      [246.94, 0.9], [369.99, 0.45], [440.00, 0.45], [622.25, 0.75],
      [220.00, 0.85], [329.63, 0.42], [440.00, 0.45], [554.37, 0.65],
      [207.65, 0.85], [311.13, 0.42], [369.99, 0.45], [493.88, 0.65],
      [277.18, 0.85], [415.30, 0.42], [493.88, 0.45], [659.25, 0.75],
      [246.94, 1.0], [369.99, 0.5], [493.88, 0.95]
    ];

    if (CONFIG.audioSrc) {
      this.loadAudioSource(CONFIG.audioSrc, false);
    }
    this.initYoutubeIfHttp();
  }

  initYoutubeIfHttp() {
    if (!window.location.protocol.startsWith('http') || !CONFIG.youtubeVideoId) return;

    window.onYouTubeIframeAPIReady = () => {
      if (!window.YT || !window.YT.Player) return;
      this.ytPlayer = new window.YT.Player('yt-player-mount', {
        height: '1',
        width: '1',
        videoId: CONFIG.youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            this.ytReady = true;
            if (this.wantsYtPlay && !this.muted && !this.usingMp3 && !this.spotifyMode) {
              this.playYoutube();
            }
          },
          onStateChange: (ev) => {
            if (window.YT && ev.data === window.YT.PlayerState.PLAYING) {
              this.usingYt = true;
              this.stopSynth();
              this.updateStatusNote();
            } else if (window.YT && ev.data === window.YT.PlayerState.ENDED && !this.muted) {
              this.ytPlayer.seekTo(0, true);
              this.ytPlayer.playVideo();
            }
          },
          onError: () => {
            this.ytReady = false;
            this.usingYt = false;
            this.updateStatusNote();
            if (!this.muted && !this.usingMp3 && !this.spotifyMode) {
              this.startSynth();
            }
          }
        }
      });
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    tag.onerror = () => this.updateStatusNote();
    document.head.appendChild(tag);
  }

  playYoutube() {
    if (!this.ytReady || !this.ytPlayer || this.usingMp3 || this.spotifyMode || this.muted) return false;
    try {
      this.stopSynth();
      this.ytPlayer.unMute();
      this.ytPlayer.setVolume(85);
      this.ytPlayer.playVideo();
      this.usingYt = true;
      this.bgmPlaying = true;
      this.updateStatusNote();
      return true;
    } catch (_) {
      return false;
    }
  }

  pauseYoutube() {
    if (this.ytReady && this.ytPlayer && this.ytPlayer.pauseVideo) {
      try {
        this.ytPlayer.pauseVideo();
      } catch (_) {}
    }
  }

  loadAudioSource(src, autoPlay = true) {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.src = '';
    }
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.85;
    audio.addEventListener('canplaythrough', () => {
      this.usingMp3 = true;
      this.usingYt = false;
      this.pauseYoutube();
      this.stopSynth();
      this.updateStatusNote();
      if (autoPlay && !this.muted) {
        audio.play().catch(() => {});
        this.bgmPlaying = true;
      }
    }, { once: true });
    audio.addEventListener('error', () => {
      this.usingMp3 = false;
      this.audioEl = null;
      this.updateStatusNote();
      if (autoPlay && !this.muted) {
        this.startBgm();
      }
    }, { once: true });
    this.audioEl = audio;
  }

  updateStatusNote() {
    const note = document.getElementById('music-status-note');
    if (!note) return;
    if (this.spotifyMode) {
      note.textContent = '🎧 Mode Player Spotify aktif — tekan tombol Play di kotak Spotify atas.';
    } else if (this.usingMp3) {
      note.textContent = '🎤 Memutar file MP3 penuh: Semua Aku Dirayakan — Nadin Amizah';
    } else if (this.usingYt) {
      note.textContent = '🎤 Memutar lagu & vokal asli: Semua Aku Dirayakan — Nadin Amizah';
    } else if (!window.location.protocol.startsWith('http')) {
      note.textContent = '💡 Untuk vokal asli Nadin Amizah otomatis: buka via Laragon (http://localhost/gwen-birthday-website) atau klik "🎵 Pilih File MP3".';
    } else {
      note.textContent = '🎵 Memuat vokal penuh Nadin Amizah — pastikan internet aktif atau pilih MP3.';
    }
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.wantsYtPlay = true;
    if (!this.muted && !this.bgmPlaying) {
      this.startBgm();
    }
  }

  playTone(freq, duration = 0.35, type = 'sine', volume = 0.08, delay = 0) {
    if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.04);
  }

  startSynth() {
    if (this.bgmPlaying || this.muted || this.usingMp3 || this.usingYt || this.spotifyMode) return;
    this.bgmPlaying = true;
    const step = () => {
      if (!this.bgmPlaying || this.muted || this.usingMp3 || this.usingYt || this.spotifyMode) return;
      const [freq, dur] = this.arpeggio[this.noteIndex % this.arpeggio.length];
      this.playTone(freq, dur * 1.4, 'sine', 0.036);
      this.playTone(freq * 2, dur * 0.85, 'triangle', 0.009);
      this.noteIndex += 1;
      const pause = Math.round(dur * 680);
      this.bgmTimer = setTimeout(step, pause);
    };
    step();
  }

  stopSynth() {
    this.bgmPlaying = false;
    clearTimeout(this.bgmTimer);
  }

  startBgm() {
    if (this.muted || this.spotifyMode) return;
    this.wantsYtPlay = true;
    if (this.usingMp3 && this.audioEl) {
      this.stopSynth();
      this.pauseYoutube();
      this.audioEl.play().catch(() => {});
      this.bgmPlaying = true;
      this.updateStatusNote();
      return;
    }
    if (this.playYoutube()) {
      return;
    }
    this.startSynth();
    this.updateStatusNote();
  }

  stopBgm() {
    this.wantsYtPlay = false;
    this.stopSynth();
    this.pauseYoutube();
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.bgmPlaying = false;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) this.stopBgm();
    else {
      this.unlock();
      this.startBgm();
    }
    return this.muted;
  }

  getTrackProgress() {
    if (this.usingMp3 && this.audioEl && Number.isFinite(this.audioEl.duration) && this.audioEl.duration > 0) {
      return {
        current: Math.floor(this.audioEl.currentTime),
        total: Math.floor(this.audioEl.duration)
      };
    }
    if (this.usingYt && this.ytReady && this.ytPlayer && this.ytPlayer.getCurrentTime && this.ytPlayer.getDuration) {
      const cur = this.ytPlayer.getCurrentTime();
      const tot = this.ytPlayer.getDuration();
      if (tot > 0) {
        return { current: Math.floor(cur), total: Math.floor(tot) };
      }
    }
    return null;
  }

  playPop() {
    this.playTone(523.25, 0.12, 'sine', 0.08, 0);
    this.playTone(783.99, 0.18, 'triangle', 0.07, 0.05);
  }

  playChime() {
    this.playTone(587.33, 0.25, 'sine', 0.07, 0);
    this.playTone(783.99, 0.32, 'sine', 0.07, 0.08);
    this.playTone(1046.5, 0.45, 'triangle', 0.05, 0.16);
  }

  playSparkleBurst() {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, idx) => {
      this.playTone(f, 0.36, 'sine', 0.055, idx * 0.055);
    });
  }

  playBlowOut() {
    if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, now);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
    this.playSparkleBurst();
  }
}

const sound = new SoundEngine();

/* ==========================================================
   PARTICLE CANVAS (SAKURA, CURSOR TRAIL, CONFETTI HEARTS)
   ========================================================== */
class FxCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.ambientPetals = [];
    this.lastTrail = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('pointermove', (e) => this.spawnTrail(e.clientX, e.clientY));
    this.initAmbient();
    this.loop();
  }

  resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  initAmbient() {
    this.ambientPetals = Array.from({ length: 16 }, () => this.makePetal(true));
  }

  makePetal(randomY = false) {
    const colors = ['#ffc2d9', '#ffdce9', '#ffffff', '#ff9ec2'];
    return {
      x: Math.random() * this.w,
      y: randomY ? Math.random() * this.h : -20,
      r: 4 + Math.random() * 5.5,
      vx: -0.35 + Math.random() * 0.7,
      vy: 0.48 + Math.random() * 0.8,
      rot: Math.random() * Math.PI * 2,
      vr: -0.02 + Math.random() * 0.04,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.45 + Math.random() * 0.4,
      kind: Math.random() > 0.28 ? 'petal' : 'star'
    };
  }

  spawnTrail(x, y) {
    const now = performance.now();
    if (now - this.lastTrail < 48) return;
    this.lastTrail = now;
    const colors = ['#ff8fb8', '#ffcce0', '#ffffff'];
    this.particles.push({
      x: x + (-6 + Math.random() * 12),
      y: y + (-6 + Math.random() * 12),
      vx: -0.5 + Math.random(),
      vy: -0.9 - Math.random() * 0.8,
      gravity: 0.03,
      drag: 0.96,
      size: 3.5 + Math.random() * 3.5,
      rot: Math.random() * Math.PI,
      vr: 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0.85,
      decay: 0.035,
      shape: Math.random() > 0.5 ? 'heart' : 'star'
    });
  }

  burst(x, y, count = 42, spread = 8) {
    const colors = ['#ff7eb0', '#ffb8d1', '#ffffff', '#ffd6e5', '#f9c770', '#ff5f98'];
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.6 + Math.random() * spread;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.4,
        gravity: 0.14,
        drag: 0.985,
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        vr: -0.14 + Math.random() * 0.28,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        shape: Math.random() > 0.45 ? 'heart' : 'rect'
      });
    }
  }

  confettiShower() {
    this.burst(this.w * 0.28, this.h * 0.35, 36, 7);
    this.burst(this.w * 0.72, this.h * 0.35, 36, 7);
    this.burst(this.w * 0.5, this.h * 0.25, 48, 9);
  }

  drawHeart(ctx, size) {
    ctx.beginPath();
    ctx.moveTo(0, size * 0.35);
    ctx.bezierCurveTo(-size * 0.6, -size * 0.25, -size, size * 0.25, 0, size);
    ctx.bezierCurveTo(size, size * 0.25, size * 0.6, -size * 0.25, 0, size * 0.35);
    ctx.fill();
  }

  drawStar(ctx, size) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(0, 0, size, 0);
    ctx.quadraticCurveTo(0, 0, 0, size);
    ctx.quadraticCurveTo(0, 0, -size, 0);
    ctx.quadraticCurveTo(0, 0, 0, -size);
    ctx.fill();
  }

  loop() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    this.ambientPetals.forEach((p, idx) => {
      p.x += p.vx + Math.sin(p.y * 0.015) * 0.3;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y > h + 24) this.ambientPetals[idx] = this.makePetal(false);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.kind === 'petal') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.58, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        this.drawStar(ctx, p.r * 0.85);
      }
      ctx.restore();
    });

    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      const pt = this.particles[i];
      pt.vx *= pt.drag;
      pt.vy = pt.vy * pt.drag + pt.gravity;
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.rot += pt.vr;
      pt.life -= pt.decay;
      if (pt.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.life);
      ctx.translate(pt.x, pt.y);
      ctx.rotate(pt.rot);
      ctx.fillStyle = pt.color;
      if (pt.shape === 'heart') this.drawHeart(ctx, pt.size);
      else if (pt.shape === 'star') this.drawStar(ctx, pt.size);
      else ctx.fillRect(-pt.size / 2, -pt.size * 0.32, pt.size, pt.size * 0.64);
      ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

const fx = new FxCanvas(document.getElementById('fx-canvas'));

/* ==========================================================
   CUTE SVG ILLUSTRATIONS
   ========================================================== */
function buildHeroHeartSvgMarkup() {
  return `
    <rect x="0" y="0" width="240" height="225" fill="#fff2f7"/>
    <circle cx="52" cy="48" r="24" fill="#ffffff" opacity="0.8"/>
    <circle cx="192" cy="52" r="22" fill="#ffffff" opacity="0.8"/>
    <ellipse cx="102" cy="70" rx="11" ry="26" fill="#fff" stroke="#f297bc" stroke-width="2.5" transform="rotate(-8 102 70)"/>
    <ellipse cx="138" cy="70" rx="11" ry="26" fill="#fff" stroke="#f297bc" stroke-width="2.5" transform="rotate(8 138 70)"/>
    <ellipse cx="102" cy="72" rx="5" ry="14" fill="#ffd2e4" transform="rotate(-8 102 72)"/>
    <ellipse cx="138" cy="72" rx="5" ry="14" fill="#ffd2e4" transform="rotate(8 138 72)"/>
    <polygon points="104,76 109,58 120,68 131,58 136,76" fill="#ffd875" stroke="#e5a93c" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="120" cy="176" rx="46" ry="38" fill="#ffb8d4" stroke="#f092b6" stroke-width="2.5"/>
    <circle cx="120" cy="118" r="38" fill="#fff" stroke="#f297bc" stroke-width="2.5"/>
    <circle cx="105" cy="115" r="3.8" fill="#5a2e42"/>
    <circle cx="135" cy="115" r="3.8" fill="#5a2e42"/>
    <ellipse cx="95" cy="124" rx="6.5" ry="3.5" fill="#ff9ec2"/>
    <ellipse cx="145" cy="124" rx="6.5" ry="3.5" fill="#ff9ec2"/>
    <path d="M113 125 Q120 132 127 125" fill="none" stroke="#5a2e42" stroke-width="2.4" stroke-linecap="round"/>
    <text x="54" y="138" font-size="18" fill="#ff7eb0">🌸</text>
    <text x="170" y="136" font-size="18" fill="#ff7eb0">🌸</text>
  `;
}

const DEFAULT_PORTRAIT_SVGS = [
  `<svg viewBox="0 0 240 180" style="width:100%;height:100%;display:block"><rect width="240" height="180" fill="#fff3f8"/><circle cx="120" cy="92" r="54" fill="#ffe0ec"/><ellipse cx="100" cy="54" rx="10" ry="24" fill="#fff" stroke="#f297bc" stroke-width="2.5"/><ellipse cx="140" cy="54" rx="10" ry="24" fill="#fff" stroke="#f297bc" stroke-width="2.5"/><circle cx="120" cy="96" r="35" fill="#fff" stroke="#f297bc" stroke-width="2.5"/><circle cx="107" cy="94" r="3.4" fill="#5a2e42"/><circle cx="133" cy="94" r="3.4" fill="#5a2e42"/><ellipse cx="98" cy="101" rx="5.5" ry="3" fill="#ff9ec2"/><ellipse cx="142" cy="101" rx="5.5" ry="3" fill="#ff9ec2"/><path d="M114 102 Q120 108 126 102" fill="none" stroke="#5a2e42" stroke-width="2.2" stroke-linecap="round"/><text x="36" y="54" font-size="22">🎀</text><text x="182" y="56" font-size="22">🌸</text></svg>`,
  `<svg viewBox="0 0 240 180" style="width:100%;height:100%;display:block"><rect width="240" height="180" fill="#fff8fb"/><polygon points="74,82 82,40 108,64" fill="#fff" stroke="#f297bc" stroke-width="2.5"/><polygon points="166,82 158,40 132,64" fill="#fff" stroke="#f297bc" stroke-width="2.5"/><ellipse cx="120" cy="94" rx="44" ry="35" fill="#fff" stroke="#f297bc" stroke-width="2.5"/><circle cx="104" cy="91" r="3.4" fill="#5a2e42"/><circle cx="136" cy="91" r="3.4" fill="#5a2e42"/><ellipse cx="94" cy="99" rx="6" ry="3.2" fill="#ff9ec2"/><ellipse cx="146" cy="99" rx="6" ry="3.2" fill="#ff9ec2"/><path d="M115 99 Q120 104 125 99" fill="none" stroke="#5a2e42" stroke-width="2.2" stroke-linecap="round"/><text x="106" y="156" font-size="26">🍓</text></svg>`,
  `<svg viewBox="0 0 240 180" style="width:100%;height:100%;display:block"><rect width="240" height="180" fill="#ffeaf2"/><circle cx="86" cy="56" r="18" fill="#ffc3db" stroke="#f297bc" stroke-width="2.5"/><circle cx="154" cy="56" r="18" fill="#ffc3db" stroke="#f297bc" stroke-width="2.5"/><circle cx="120" cy="92" r="40" fill="#ffc3db" stroke="#f297bc" stroke-width="2.5"/><ellipse cx="120" cy="100" rx="18" ry="13" fill="#fff5f9"/><circle cx="104" cy="85" r="3.5" fill="#5a2e42"/><circle cx="136" cy="85" r="3.5" fill="#5a2e42"/><path d="M115 100 Q120 105 125 100" fill="none" stroke="#5a2e42" stroke-width="2.2" stroke-linecap="round"/><text x="108" y="156" font-size="22">🩷</text></svg>`,
  `<svg viewBox="0 0 240 180" style="width:100%;height:100%;display:block"><rect width="240" height="180" fill="#fff6fa"/><circle cx="120" cy="96" r="40" fill="#ffffff" stroke="#ffbdd7" stroke-width="3"/><circle cx="104" cy="90" r="3.5" fill="#5a2e42"/><circle cx="136" cy="90" r="3.5" fill="#5a2e42"/><ellipse cx="95" cy="98" rx="6" ry="3.2" fill="#ff9ec2"/><ellipse cx="145" cy="98" rx="6" ry="3.2" fill="#ff9ec2"/><polygon points="114,97 126,97 120,105" fill="#ffb86c"/><text x="108" y="52" font-size="22">👑</text><text x="48" y="148" font-size="22">🌷</text><text x="166" y="148" font-size="22">🦋</text></svg>`
];

const KAWAII_STICKERS = [
  `<svg viewBox="0 0 80 80" class="tile-svg"><ellipse cx="29" cy="24" rx="7" ry="17" fill="#fff" stroke="#f7b3cd" stroke-width="2.5"/><ellipse cx="51" cy="24" rx="7" ry="17" fill="#fff" stroke="#f7b3cd" stroke-width="2.5"/><circle cx="40" cy="48" r="20" fill="#fff" stroke="#f7b3cd" stroke-width="2.5"/><circle cx="33" cy="47" r="2.6" fill="#54283c"/><circle cx="47" cy="47" r="2.6" fill="#54283c"/><path d="M36 53 Q40 57 44 53" fill="none" stroke="#54283c" stroke-width="2" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 80 80" class="tile-svg"><polygon points="20,40 24,18 37,32" fill="#fff" stroke="#f7b3cd" stroke-width="2.5"/><polygon points="60,40 56,18 43,32" fill="#fff" stroke="#f7b3cd" stroke-width="2.5"/><ellipse cx="40" cy="48" rx="22" ry="18" fill="#fff" stroke="#f7b3cd" stroke-width="2.5"/><circle cx="32" cy="46" r="2.6" fill="#54283c"/><circle cx="48" cy="46" r="2.6" fill="#54283c"/><path d="M37 51 Q40 55 43 51" fill="none" stroke="#54283c" stroke-width="2" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 80 80" class="tile-svg"><rect x="14" y="24" width="52" height="36" rx="8" fill="#fff" stroke="#ff9ec2" stroke-width="2.5"/><path d="M16 26 L40 44 L64 26" fill="none" stroke="#ff9ec2" stroke-width="2.5" stroke-linecap="round"/><path d="M40 44 C35 37,28 41,32 47 C35 50,40 53,40 53 C40 53,45 50,48 47 C52 41,45 37,40 44 Z" fill="#ff6fa6"/></svg>`,
  `<svg viewBox="0 0 80 80" class="tile-svg"><path d="M18 52 L40 24 L62 52 Z" fill="#ffe4ef" stroke="#f7b3cd" stroke-width="2.2"/><rect x="18" y="48" width="44" height="12" rx="4" fill="#fff" stroke="#f7b3cd" stroke-width="2.2"/><circle cx="40" cy="23" r="6" fill="#ff5f8f"/></svg>`,
  `<svg viewBox="0 0 80 80" class="tile-svg"><path d="M40 36 C24 14,6 18,12 36 C16 48,30 44,40 36 Z" fill="#ff8fb8" stroke="#e8528a" stroke-width="2.2"/><path d="M40 36 C56 14,74 18,68 36 C64 48,50 44,40 36 Z" fill="#ffb8d1" stroke="#e8528a" stroke-width="2.2"/><circle cx="40" cy="36" r="6" fill="#fff5f8" stroke="#e8528a" stroke-width="2.2"/></svg>`,
  `<svg viewBox="0 0 80 80" class="tile-svg"><rect x="20" y="24" width="40" height="12" rx="6" fill="#ffb8d1" stroke="#f06292" stroke-width="2"/><rect x="20" y="38" width="40" height="12" rx="6" fill="#ffd8e7" stroke="#f06292" stroke-width="2"/><rect x="20" y="52" width="40" height="12" rx="6" fill="#ffb8d1" stroke="#f06292" stroke-width="2"/></svg>`,
  `<svg viewBox="0 0 80 80" class="tile-svg"><polygon points="24,28 40,16 56,28" fill="#ffe6f0" stroke="#f06292" stroke-width="2.2"/><rect x="24" y="28" width="32" height="36" rx="5" fill="#fff" stroke="#f06292" stroke-width="2.2"/><rect x="24" y="40" width="32" height="16" fill="#ffc2d9"/></svg>`
];

const PINK_BREEZE_ICON = `
  <svg width="30" height="30" viewBox="0 0 36 36" aria-hidden="true">
    <path d="M6 14 H23 C26 14, 27 10, 24 9 C22 8, 20 10, 21 11" fill="none" stroke="#ff7eb0" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M4 19 H28 C31 19, 32 23, 29 24 C27 25, 25 23, 26 22" fill="none" stroke="#e8528a" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M8 24 H19 C22 24, 23 28, 20 29 C18 30, 17 28, 18 27" fill="none" stroke="#ffb8d1" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
`;

/* ==========================================================
   CALENDAR, CAROUSEL & CONTENT POPULATION
   ========================================================== */
function buildJuneCalendar() {
  const grid = document.getElementById('cal-days');
  grid.innerHTML = '';

  const firstDay = new Date(CONFIG.birthdayYear, 5, 1).getDay();
  const daysInJune = 30;

  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement('div');
    empty.className = 'cal-cell';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInJune; d += 1) {
    const cell = document.createElement('div');
    cell.className = 'cal-cell';

    if (d === CONFIG.birthdayDay) {
      cell.classList.add('birthday-5');
      cell.setAttribute('role', 'button');
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('aria-label', 'Tanggal 5 Juni ulang tahun Halimah Azzahra');
      cell.innerHTML = `
        <svg class="cal-heart-ring" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 34 C10 26, 4 19, 4 13 C4 7, 9 4, 14 4 C17 4, 19 6, 20 8 C21 6, 23 4, 26 4 C31 4, 36 7, 36 13 C36 19, 30 26, 20 34 Z"
                fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="cal-num">${d}</span>
      `;
      cell.addEventListener('click', () => {
        sound.unlock();
        sound.playSparkleBurst();
        const rect = cell.getBoundingClientRect();
        fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28, 6);
        document.getElementById('cal-birthday-tag').innerHTML =
          `🎉 Yeay! <strong>5 Juni</strong> adalah hari spesial <strong>${CONFIG.recipientName}</strong>! 🩷`;
      });
    } else {
      cell.innerHTML = `<span class="cal-num">${d}</span>`;
    }

    grid.appendChild(cell);
  }
}

/* Photo Carousel Slider State */
let carouselIndex = 0;
let carouselTotal = 4;
let carouselTimer = null;

function setCarouselSlide(idx) {
  carouselIndex = (idx + carouselTotal) % carouselTotal;
  const track = document.getElementById('car-track');
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll('#car-dots .car-dot').forEach((d, i) => {
    d.classList.toggle('active', i === carouselIndex);
  });
}

function startCarouselAuto() {
  stopCarouselAuto();
  carouselTimer = setInterval(() => setCarouselSlide(carouselIndex + 1), 3400);
}

function stopCarouselAuto() {
  clearInterval(carouselTimer);
}

function initPhotoCarousel() {
  const track = document.getElementById('car-track');
  const dotsWrap = document.getElementById('car-dots');
  track.innerHTML = '';
  dotsWrap.innerHTML = '';

  const defaults = [
    { type: 'svg', html: DEFAULT_PORTRAIT_SVGS[0], caption: 'Hari spesialmu 5 Juni 🎀' },
    { type: 'svg', html: DEFAULT_PORTRAIT_SVGS[1], caption: 'Tetap ceria & manis selalu 🍓' },
    { type: 'img', src: 'asset/kue.png', caption: 'Waktunya kue ulang tahun 🎂' },
    { type: 'svg', html: DEFAULT_PORTRAIT_SVGS[3], caption: 'Happy Birthday Halimah Azzahra 👑' }
  ];

  const slideCaptions = [
    'Pose andalan kamuu lucuu bangett 🩷',
    'Iniiijugaa ihh lucuu bangettt~ 🍓',
    'Cantiknyaa oiii inii pacal siapa cii 🌸'
  ];

  const hasShowcase = CONFIG.showcasePhotos.length > 0;
  carouselTotal = hasShowcase ? CONFIG.showcasePhotos.length : 4;

  for (let i = 0; i < carouselTotal; i += 1) {
    const custom = CONFIG.showcasePhotos[i];
    const item = defaults[i % defaults.length];
    const slideEl = document.createElement('div');
    slideEl.className = 'car-slide';

    let mediaHtml = '';
    let modalHtml = '';
    const cap = custom ? (slideCaptions[i] || `Momen manis Halimah #${i + 1} 🩷`) : item.caption;

    if (custom) {
      mediaHtml = `<img src="${custom}" alt="${cap}">`;
      modalHtml = `<img src="${custom}" style="width:100%;max-height:66vh;object-fit:contain;border-radius:16px;" alt="${cap}"><p style="margin:10px 0 0;font-weight:700;color:#5a2e42;">${cap}</p>`;
    } else if (item.type === 'img') {
      mediaHtml = `<img src="${item.src}" alt="${cap}">`;
      modalHtml = `<img src="${item.src}" style="width:100%;border-radius:16px;" alt="${cap}"><p style="margin:10px 0 0;font-weight:700;color:#5a2e42;">${cap}</p>`;
    } else {
      mediaHtml = item.html;
      modalHtml = `<div style="width:240px;height:180px;margin:0 auto;border-radius:18px;overflow:hidden;">${item.html}</div><p style="margin:10px 0 0;font-weight:700;color:#5a2e42;">${cap}</p>`;
    }

    slideEl.innerHTML = `
      <div class="car-media">${mediaHtml}</div>
      <p class="car-caption">${cap}</p>
    `;
    slideEl.addEventListener('click', () => openModal(modalHtml));
    track.appendChild(slideEl);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `car-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.addEventListener('click', () => {
      sound.unlock();
      sound.playPop();
      setCarouselSlide(i);
      startCarouselAuto();
    });
    dotsWrap.appendChild(dot);
  }
}

document.getElementById('car-prev').addEventListener('click', () => {
  sound.unlock();
  sound.playPop();
  setCarouselSlide(carouselIndex - 1);
  startCarouselAuto();
});

document.getElementById('car-next').addEventListener('click', () => {
  sound.unlock();
  sound.playPop();
  setCarouselSlide(carouselIndex + 1);
  startCarouselAuto();
});

function populateContent() {
  document.querySelectorAll('[data-recipient]').forEach((el) => {
    el.textContent = CONFIG.recipientName;
  });

  buildJuneCalendar();
  initPhotoCarousel();

  const heartContent = document.getElementById('hero-heart-content');
  if (CONFIG.heroPhoto) {
    heartContent.innerHTML = `<image href="${CONFIG.heroPhoto}" x="0" y="0" width="240" height="225" preserveAspectRatio="xMidYMid slice"/>`;
  } else {
    heartContent.innerHTML = buildHeroHeartSvgMarkup();
  }

  document.getElementById('spotify-title').textContent = CONFIG.songTitle;
  document.getElementById('spotify-artist').textContent = CONFIG.songArtist;
  document.getElementById('env-paper-text').textContent = CONFIG.envelopePreviewText;
  document.getElementById('env-paper-sign').textContent = CONFIG.envelopeSign;
  document.getElementById('just-body').textContent = CONFIG.justForYouText;
  document.getElementById('closing-body').textContent = CONFIG.closingText;

  // Wish tags
  const tagsGrid = document.getElementById('tags-grid');
  tagsGrid.innerHTML = '';
  CONFIG.wishes.forEach((wish, idx) => {
    const tag = document.createElement('div');
    tag.className = 'wish-tag';
    tag.innerHTML = `
      <svg class="tag-ribbon" width="34" height="20" viewBox="0 0 40 24" aria-hidden="true">
        <path d="M20 12 C12 2,2 4,4 12 C6 19,14 17,20 12 Z" fill="#ff8fb8" stroke="#e8528a" stroke-width="1.6"/>
        <path d="M20 12 C28 2,38 4,36 12 C34 19,26 17,20 12 Z" fill="#ffb8d1" stroke="#e8528a" stroke-width="1.6"/>
        <circle cx="20" cy="12" r="3.6" fill="#fff5f8" stroke="#e8528a" stroke-width="1.6"/>
      </svg>
      <div class="tag-inner">
        <div class="tag-face front">
          <span class="tag-icon">${wish.icon}</span>
          <span class="tag-title">${wish.title}</span>
          <span class="tag-tap-mini">ketuk ya 🎀</span>
          <img class="tag-corner-blossom" src="${idx % 2 === 0 ? 'asset/bunga%20mpu.png' : 'asset/bunga%20mpk.png'}" alt="" aria-hidden="true">
        </div>
        <div class="tag-face back">
          <span class="tag-back-text">${wish.detail}</span>
          <span class="tag-check">🩷</span>
        </div>
      </div>
    `;

    tag.addEventListener('click', () => {
      sound.unlock();
      sound.playPop();
      tag.classList.toggle('flipped');
      const flipped = document.querySelectorAll('#tags-grid .wish-tag.flipped').length;
      document.getElementById('wish-jar-count').textContent =
        flipped >= 4 ? '4/4 semua doa terkumpul! 🩷' : `${flipped}/4 terkumpul`;
      const rect = tag.getBoundingClientRect();
      fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14, 4.5);
      showWishToast();
    });

    tagsGrid.appendChild(tag);
  });

  const ovalInner = document.getElementById('ornate-oval-inner');
  ovalInner.innerHTML = CONFIG.ovalPhoto
    ? `<img class="portrait-focus-2" src="${CONFIG.ovalPhoto}" alt="Foto spesial ${CONFIG.recipientName}">`
    : DEFAULT_PORTRAIT_SVGS[0];

  const closingCircle = document.getElementById('closing-circle-frame');
  closingCircle.innerHTML = CONFIG.closingPhoto
    ? `<img class="portrait-focus-1" src="${CONFIG.closingPhoto}" alt="Foto ${CONFIG.recipientName}">`
    : DEFAULT_PORTRAIT_SVGS[3];
}

/* ==========================================================
   27-TILE HEART MOSAIC
   ========================================================== */
const HEART_MATRIX = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0]
];

const ASSET_TILES = [
  { src: 'asset/bunga%20mpk.png', cake: false, note: '🌸 Bunga mekar untuk Halimah Azzahra!' },
  { src: 'asset/bunga%20mpu.png', cake: false, note: '🌷 Warna pink lembut buat 5 Juni!' },
  { src: 'asset/kupu%20kupu.png', cake: false, note: '🦋 Kupu-kupu ikut merayakan kamu!' },
  { src: 'asset/balon%201.png', cake: false, note: '🎈 Balon doa baik meluncur tinggi!' },
  { src: 'asset/balon%20love%203.png', cake: false, note: '🩷 Penuh kasih sayang sepanjang tahun!' },
  { src: 'asset/kue.png', cake: true, note: '🎂 Selamat ulang tahun ke-5 Juni ini!' }
];

const STICKER_NOTES = [
  '🐰 Kelinci pink titip salam: Happy Birthday Halimah!',
  '🐱 Meong! Kamu orang paling manis hari ini~',
  '💌 Ada banyak doa baik tersimpan di sini!',
  '🍰 Sweet treat khusus buat birthday girl!',
  '🎀 Pita pink tanda hari ini milikmu sepenuhnya!',
  '🩷 Macaron manis buat harimu yang ceria!',
  '🍓 Susu stroberi kesukaan suasana hati yang adem!'
];

function buildHeartMosaic() {
  const container = document.getElementById('heart-mosaic');
  const noteBubble = document.getElementById('tile-note-bubble');
  container.innerHTML = '';
  noteBubble.textContent = 'Ketuk kotak kecil di dalam hati ini ya~ 🌸';

  let idx = 0;
  const hasCustom = CONFIG.galleryPhotos.length > 0;

  HEART_MATRIX.forEach((row) => {
    row.forEach((cell) => {
      const slot = document.createElement('div');
      slot.className = cell ? 'heart-slot filled' : 'heart-slot empty';
      if (cell === 1) {
        const curIdx = idx;
        idx += 1;
        const tile = document.createElement('div');
        tile.className = 'heart-tile';
        tile.style.setProperty('--delay', `${0.08 + curIdx * 0.035}s`);
        let noteText = `🩷 Momen manis ke-${curIdx + 1} untuk ${CONFIG.shortName}!`;

        if (hasCustom) {
          const src = CONFIG.galleryPhotos[curIdx % CONFIG.galleryPhotos.length];
          const isFullBody = src.includes('foto1') || src.includes('foto2');
          tile.innerHTML = `<img class="photo-cover ${isFullBody ? 'portrait-zoom' : ''}" src="${src}" alt="Kenangan ${curIdx + 1}">`;
        } else if (curIdx % 2 === 0) {
          const asset = ASSET_TILES[(curIdx / 2) % ASSET_TILES.length];
          if (asset.cake) tile.classList.add('cake-crop');
          tile.innerHTML = `<img src="${asset.src}" alt="Dekorasi lucu">`;
          noteText = asset.note;
        } else {
          const stIdx = ((curIdx - 1) / 2) % KAWAII_STICKERS.length;
          tile.innerHTML = KAWAII_STICKERS[stIdx];
          noteText = STICKER_NOTES[stIdx];
        }

        tile.addEventListener('animationend', (e) => {
          if (e.animationName === 'tileFlyIn') {
            tile.classList.remove('in');
            tile.classList.add('settled');
          } else if (e.animationName === 'tilePop') {
            tile.classList.remove('pop');
          }
        });

        tile.addEventListener('click', () => {
          if (!tile.classList.contains('settled')) return;
          sound.unlock();
          sound.playPop();
          noteBubble.textContent = noteText;
          tile.classList.remove('pop');
          void tile.offsetWidth;
          tile.classList.add('pop');
          const rect = tile.getBoundingClientRect();
          fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10, 3.5);
        });

        slot.appendChild(tile);
        requestAnimationFrame(() => requestAnimationFrame(() => tile.classList.add('in')));
      }
      container.appendChild(slot);
    });
  });
}

/* Slide 5 Tab Switcher (Carousel vs Heart Mosaic) */
document.querySelectorAll('.gallery-mode-tabs .mode-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    sound.unlock();
    sound.playPop();
    const target = tab.dataset.tab;
    document.querySelectorAll('.gallery-mode-tabs .mode-tab').forEach((t) => {
      const isSelected = t === tab;
      t.classList.toggle('active', isSelected);
      t.setAttribute('aria-selected', String(isSelected));
    });
    document.getElementById('panel-carousel').classList.toggle('active', target === 'carousel');
    document.getElementById('panel-mosaic').classList.toggle('active', target === 'mosaic');
    if (target === 'mosaic') {
      buildHeartMosaic();
      stopCarouselAuto();
    } else {
      startCarouselAuto();
    }
  });
});

/* ==========================================================
   ANIMATED SLIDE DECK CONTROLLER (7 SLIDES + SWIPE + ARROWS)
   ========================================================== */
const TOTAL_SLIDES = 7;
const SLIDE_HINTS = [
  'Geser atau klik Lanjut ✨',
  'Pretty Girl • 5 Juni 🎀',
  'Tiup lilin & tap wish 🕯️',
  'Baca surat manisnya 💌',
  'Slide foto & kolase hati 📸',
  'Tarik kapsul keberuntungan 🍓',
  'Selamat ulang tahun Halimah! 🧸'
];

let currentSlide = 0;
let deckUnlocked = false;
let candlesInitialized = false;

function goToSlide(nextIdx, customDir = null) {
  const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, nextIdx));
  if (clamped === currentSlide && document.getElementById(`slide-${clamped}`).classList.contains('is-active')) {
    return;
  }

  const dir = customDir || (clamped >= currentSlide ? 'next' : 'prev');
  currentSlide = clamped;

  document.querySelectorAll('#slides-deck .slide').forEach((s) => {
    s.classList.remove('is-active', 'enter-next', 'enter-prev');
    s.scrollTop = 0;
  });

  const activeSlide = document.getElementById(`slide-${currentSlide}`);
  activeSlide.classList.add('is-active', dir === 'next' ? 'enter-next' : 'enter-prev');

  document.querySelectorAll('#chapter-dots .ch-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
    dot.classList.toggle('done', idx < currentSlide);
  });
  document.getElementById('ch-counter').textContent = `${currentSlide + 1}/${TOTAL_SLIDES}`;
  document.getElementById('btn-prev-slide').disabled = currentSlide === 0;
  document.getElementById('nav-hint-pill').textContent = SLIDE_HINTS[currentSlide];
  document.getElementById('btn-next-label').textContent =
    currentSlide === TOTAL_SLIDES - 1 ? 'Ulangi ↺' : 'Lanjut →';

  if (currentSlide === 2 && !candlesInitialized) {
    candlesInitialized = true;
    lightAllFiveCandles();
  }

  if (currentSlide === 4 && document.getElementById('panel-carousel').classList.contains('active')) {
    startCarouselAuto();
  } else {
    stopCarouselAuto();
  }

  if (currentSlide === TOTAL_SLIDES - 1) {
    setTimeout(() => fx.confettiShower(), 350);
  }
}

document.getElementById('btn-prev-slide').addEventListener('click', () => {
  sound.unlock();
  sound.playPop();
  if (currentSlide > 0) goToSlide(currentSlide - 1, 'prev');
});

document.getElementById('btn-next-slide').addEventListener('click', () => {
  sound.unlock();
  sound.playChime();
  if (currentSlide === TOTAL_SLIDES - 1) {
    candlesInitialized = false;
    document.querySelectorAll('#tags-grid .wish-tag').forEach((t) => t.classList.remove('flipped'));
    document.getElementById('wish-jar-count').textContent = '0/4 terkumpul';
    document.getElementById('pink-teddy').classList.remove('hugging');
    document.getElementById('hug-toast').textContent = '';
    goToSlide(0, 'prev');
  } else {
    goToSlide(currentSlide + 1, 'next');
  }
});

document.querySelectorAll('#chapter-dots .ch-dot').forEach((dot) => {
  dot.addEventListener('click', () => {
    sound.unlock();
    sound.playPop();
    goToSlide(Number(dot.dataset.goto));
  });
});

// Touch / Pointer Swipe Navigation on Slides Deck
let swipeStartX = 0;
let swipeStartY = 0;
let swipeTracking = false;

const deckEl = document.getElementById('slides-deck');
deckEl.addEventListener('pointerdown', (e) => {
  if (e.target.closest('#hold-zone, #photo-carousel, button, .wish-tag, .heart-tile')) {
    swipeTracking = false;
    return;
  }
  swipeTracking = true;
  swipeStartX = e.clientX;
  swipeStartY = e.clientY;
});

deckEl.addEventListener('pointerup', (e) => {
  if (!swipeTracking) return;
  swipeTracking = false;
  const dx = e.clientX - swipeStartX;
  const dy = e.clientY - swipeStartY;
  if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.4) {
    sound.unlock();
    sound.playPop();
    if (dx < 0 && currentSlide < TOTAL_SLIDES - 1) goToSlide(currentSlide + 1, 'next');
    if (dx > 0 && currentSlide > 0) goToSlide(currentSlide - 1, 'prev');
  }
});

window.addEventListener('keydown', (e) => {
  if (!deckUnlocked || document.getElementById('cute-modal').classList.contains('open')) return;
  if (e.key === 'ArrowRight' && currentSlide < TOTAL_SLIDES - 1) {
    sound.playPop();
    goToSlide(currentSlide + 1, 'next');
  } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
    sound.playPop();
    goToSlide(currentSlide - 1, 'prev');
  }
});

/* ==========================================================
   COVER GIFT BOX OPEN -> FLORAL HEART BURST -> SLIDE 1
   ========================================================== */
let isGiftOpened = false;
let spotifySec = 0;
let spotifyInterval = null;

function syncMusicUi() {
  const muted = sound.muted;
  document.getElementById('sound-toggle').classList.toggle('muted', muted);
  document.getElementById('sound-label').textContent = muted ? 'Musik: Mati' : 'Musik: Nyala';
  document.getElementById('spotify-play-icon').textContent = muted ? '▶' : '⏸';
  document.getElementById('eq-bars').classList.toggle('paused', muted);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function startSpotifyBar() {
  clearInterval(spotifyInterval);
  spotifyInterval = setInterval(() => {
    if (!sound.muted && deckUnlocked) {
      const mp3Prog = sound.getTrackProgress();
      if (mp3Prog) {
        document.getElementById('spotify-bar-fill').style.width = `${(mp3Prog.current / mp3Prog.total) * 100}%`;
        document.getElementById('spotify-time').textContent = formatTime(mp3Prog.current);
      } else {
        spotifySec = (spotifySec + 1) % 280;
        document.getElementById('spotify-bar-fill').style.width = `${(spotifySec / 280) * 100}%`;
        document.getElementById('spotify-time').textContent = formatTime(spotifySec);
      }
    }
  }, 1000);
}

const BURST_ASSETS = ['asset/bunga%20mpk.png', 'asset/bunga%20mpu.png', 'asset/kupu%20kupu.png'];

document.getElementById('cover-gift-btn').addEventListener('click', (e) => {
  if (isGiftOpened) return;
  isGiftOpened = true;
  sound.unlock();
  sound.playSparkleBurst();

  const btn = e.currentTarget;
  btn.classList.add('popping');
  const rect = btn.getBoundingClientRect();
  fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 55, 9);

  // Burst flowers into a heart ring around the gift box!
  const burstLayer = document.getElementById('cover-burst-layer');
  const scale = Math.min(window.innerWidth, window.innerHeight) * 0.014;
  for (let i = 0; i < 14; i += 1) {
    const t = (Math.PI * 2 * i) / 14;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const img = document.createElement('img');
    img.src = BURST_ASSETS[i % BURST_ASSETS.length];
    img.className = 'burst-flower';
    img.style.setProperty('--tx', `${(hx * scale).toFixed(1)}px`);
    img.style.setProperty('--ty', `${(hy * scale).toFixed(1)}px`);
    img.style.setProperty('--rot', `${-18 + (i * 17) % 36}deg`);
    img.style.setProperty('--sz', `${54 + (i % 3) * 12}px`);
    burstLayer.appendChild(img);
    setTimeout(() => img.classList.add('out'), 30 + i * 28);
  }

  setTimeout(() => {
    deckUnlocked = true;
    document.getElementById('cover-screen').classList.add('opened');
    document.getElementById('slides-deck').classList.add('revealed');
    document.getElementById('slides-deck').setAttribute('aria-hidden', 'false');
    document.getElementById('floating-top-bar').classList.add('visible');
    document.getElementById('slide-nav-bar').classList.add('visible');
    syncMusicUi();
    startSpotifyBar();
    goToSlide(0, 'next');
  }, 950);
});

document.getElementById('sound-toggle').addEventListener('click', () => {
  sound.toggleMute();
  syncMusicUi();
});

document.getElementById('spotify-play-btn').addEventListener('click', () => {
  sound.toggleMute();
  syncMusicUi();
});

// Pick local MP3 track (e.g. Nadin Amizah - Semua Aku Dirayakan.mp3)
const mp3Input = document.getElementById('mp3-file-input');
document.getElementById('btn-pick-mp3').addEventListener('click', () => {
  mp3Input.click();
});
mp3Input.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const objUrl = URL.createObjectURL(file);
  sound.muted = false;
  sound.spotifyMode = false;
  document.getElementById('spotify-embed-slot').classList.remove('open');
  document.getElementById('spotify-embed-slot').innerHTML = '';
  document.getElementById('btn-toggle-spotify').textContent = '🎧 Player Spotify';
  sound.unlock();
  sound.loadAudioSource(objUrl, true);
  document.getElementById('btn-pick-mp3').textContent = '🎵 MP3 Terpasang!';
  syncMusicUi();
});

// Toggle Official Spotify Embed Player inside Slide 1
document.getElementById('btn-toggle-spotify').addEventListener('click', () => {
  const slot = document.getElementById('spotify-embed-slot');
  const btn = document.getElementById('btn-toggle-spotify');
  const opening = !slot.classList.contains('open');

  if (opening) {
    sound.spotifyMode = true;
    sound.stopBgm();
    sound.muted = true;
    slot.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${CONFIG.spotifyTrackId}?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify Semua Aku Dirayakan"></iframe>`;
    slot.classList.add('open');
    slot.setAttribute('aria-hidden', 'false');
    btn.textContent = '✕ Tutup Spotify';
  } else {
    sound.spotifyMode = false;
    slot.classList.remove('open');
    slot.setAttribute('aria-hidden', 'true');
    slot.innerHTML = '';
    btn.textContent = '🎧 Player Spotify';
    sound.muted = false;
    sound.unlock();
    sound.startBgm();
  }
  syncMusicUi();
  sound.updateStatusNote();
});

sound.updateStatusNote();

/* ==========================================================
   5-CANDLE LIGHTING & HOLD-TO-BLOW OUT
   ========================================================== */
const HOLD_CIRC = 220;
let candleReady = false;
let candleBlown = false;
let holdStart = null;
let holdRaf = null;
const cakeTimers = [];

function clearCakeTimers() {
  while (cakeTimers.length) clearTimeout(cakeTimers.pop());
}

function getFlames() {
  return Array.from(document.querySelectorAll('#flames-row .mini-flame'));
}

function lightAllFiveCandles() {
  clearCakeTimers();
  candleReady = false;
  candleBlown = false;
  holdStart = null;
  cancelAnimationFrame(holdRaf);

  const match = document.getElementById('matchstick');
  const flames = getFlames();
  match.classList.remove('sweep-right', 'sweep-mid', 'sweep-left', 'retreat');
  flames.forEach((f) => f.classList.remove('lit', 'blowing'));
  document.getElementById('candle-halo').classList.remove('lit');
  document.getElementById('smoke-group').classList.remove('rising');
  document.getElementById('breath-puffs').classList.remove('active');
  document.getElementById('hold-progress').style.strokeDashoffset = HOLD_CIRC;
  document.getElementById('hold-label').textContent = '🕯️';
  document.getElementById('cake-wish-copy').textContent = 'sebentar... lilinnya dinyalakan satu per satu ✨';

  cakeTimers.push(setTimeout(() => match.classList.add('sweep-right'), 200));
  cakeTimers.push(setTimeout(() => flames[4].classList.add('lit'), 480));
  cakeTimers.push(setTimeout(() => {
    flames[3].classList.add('lit');
    match.classList.remove('sweep-right');
    match.classList.add('sweep-mid');
  }, 660));
  cakeTimers.push(setTimeout(() => {
    flames[2].classList.add('lit');
    document.getElementById('candle-halo').classList.add('lit');
  }, 840));
  cakeTimers.push(setTimeout(() => {
    flames[1].classList.add('lit');
    match.classList.remove('sweep-mid');
    match.classList.add('sweep-left');
  }, 1020));
  cakeTimers.push(setTimeout(() => flames[0].classList.add('lit'), 1200));
  cakeTimers.push(setTimeout(() => {
    match.classList.remove('sweep-left');
    match.classList.add('retreat');
    candleReady = true;
    document.getElementById('hold-label').innerHTML = PINK_BREEZE_ICON;
    document.getElementById('cake-wish-copy').textContent = `Make a wish dulu ya, ${CONFIG.shortName}~ 🌷`;
    document.getElementById('cake-hint').textContent = 'tekan & tahan tombol bundar sampai 5 lilin padam';
  }, 1450));
}

function finishBlowOut() {
  if (candleBlown) return;
  candleBlown = true;
  candleReady = false;
  cancelAnimationFrame(holdRaf);

  getFlames().forEach((f) => f.classList.remove('lit', 'blowing'));
  document.getElementById('candle-halo').classList.remove('lit');
  document.getElementById('breath-puffs').classList.remove('active');
  document.getElementById('smoke-group').classList.add('rising');
  document.getElementById('hold-progress').style.strokeDashoffset = 0;
  document.getElementById('hold-label').textContent = '✨';
  document.getElementById('cake-wish-copy').textContent = 'Yeay! Semua lilin padam, semoga harapan Halimah terkabul 🩷';
  document.getElementById('cake-hint').textContent = 'permohonan 5 Juni terkirim ke langit ✨';

  sound.playBlowOut();
  const rect = document.getElementById('cake-stage').getBoundingClientRect();
  fx.burst(rect.left + rect.width / 2, rect.top + 35, 52, 8.5);
}

function tickHold() {
  if (!holdStart || candleBlown || !candleReady) return;
  const elapsed = Date.now() - holdStart;
  const pct = Math.min(elapsed / 1450, 1);
  document.getElementById('hold-progress').style.strokeDashoffset = HOLD_CIRC * (1 - pct);

  const flames = getFlames();
  if (pct > 0.25) flames[0].classList.remove('lit');
  if (pct > 0.45) flames[4].classList.remove('lit');
  if (pct > 0.65) flames[1].classList.remove('lit');
  if (pct > 0.82) flames[3].classList.remove('lit');

  if (pct >= 1) {
    finishBlowOut();
    return;
  }
  holdRaf = requestAnimationFrame(tickHold);
}

function startHold(e) {
  if (e) e.preventDefault();
  sound.unlock();
  if (!candleReady || candleBlown) return;
  holdStart = Date.now();
  document.getElementById('hold-zone').classList.add('holding');
  document.getElementById('breath-puffs').classList.add('active');
  getFlames().forEach((f) => f.classList.add('blowing'));
  document.getElementById('cake-hint').textContent = 'terus... tahan sedikit lagi... ✨';
  holdRaf = requestAnimationFrame(tickHold);
}

function cancelHold() {
  if (candleBlown || !holdStart) return;
  holdStart = null;
  cancelAnimationFrame(holdRaf);
  document.getElementById('hold-zone').classList.remove('holding');
  document.getElementById('breath-puffs').classList.remove('active');
  getFlames().forEach((f) => {
    f.classList.add('lit');
    f.classList.remove('blowing');
  });
  document.getElementById('hold-progress').style.strokeDashoffset = HOLD_CIRC;
  document.getElementById('cake-hint').textContent = 'tekan & tahan tombol bundar sampai 5 lilin padam';
}

const holdZoneBtn = document.getElementById('hold-zone');
holdZoneBtn.addEventListener('pointerdown', startHold);
holdZoneBtn.addEventListener('pointerup', cancelHold);
holdZoneBtn.addEventListener('pointerleave', cancelHold);
holdZoneBtn.addEventListener('pointercancel', cancelHold);
document.getElementById('btn-relight').addEventListener('click', () => {
  sound.unlock();
  sound.playPop();
  lightAllFiveCandles();
});

/* ==========================================================
   WISH TOAST, GACHA, MODAL, CLOSING HUG
   ========================================================== */
let toastTimer = null;
function showWishToast() {
  const el = document.getElementById('wish-toast');
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

let fortuneIdx = 0;
document.getElementById('btn-gacha').addEventListener('click', (e) => {
  sound.unlock();
  sound.playChime();
  document.getElementById('gacha-result').textContent =
    CONFIG.luckyFortunes[fortuneIdx % CONFIG.luckyFortunes.length];
  fortuneIdx += 1;
  const rect = e.currentTarget.getBoundingClientRect();
  fx.burst(rect.left + rect.width / 2, rect.top, 16, 4.5);
});

const modal = document.getElementById('cute-modal');
function openModal(html) {
  sound.unlock();
  sound.playPop();
  document.getElementById('modal-body').innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);

function openFullLetterModal() {
  openModal(`
    <div style="font-size:11px;letter-spacing:2.5px;font-weight:700;color:#e8528a;margin-bottom:10px;">SURAT UNTUK ${CONFIG.recipientName.toUpperCase()}</div>
    <div class="modal-letter-text">${CONFIG.fullLetter}</div>
  `);
}

document.getElementById('btn-expand-letter').addEventListener('click', openFullLetterModal);
document.getElementById('open-envelope-card').addEventListener('click', openFullLetterModal);

document.getElementById('ornate-oval-frame').addEventListener('click', () => {
  const html = CONFIG.ovalPhoto
    ? `<img src="${CONFIG.ovalPhoto}" style="width:100%;max-height:66vh;object-fit:contain;border-radius:18px;" alt="Foto spesial Halimah"><p style="margin:10px 0 0;font-weight:700;color:#5a2e42;">Pretty Girl • ${CONFIG.recipientName} 🎀</p>`
    : `<div style="width:240px;height:180px;margin:0 auto;border-radius:18px;overflow:hidden;">${DEFAULT_PORTRAIT_SVGS[0]}</div><p style="margin:12px 0 0;font-weight:700;color:#5a2e42;">Pretty Girl • ${CONFIG.recipientName} 🎀</p>`;
  openModal(html);
});

document.getElementById('hero-heart-box').addEventListener('click', (e) => {
  sound.unlock();
  sound.playSparkleBurst();
  const rect = e.currentTarget.getBoundingClientRect();
  fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26, 6);
  if (CONFIG.heroPhoto) {
    openModal(`<img src="${CONFIG.heroPhoto}" style="width:100%;max-height:66vh;object-fit:contain;border-radius:18px;" alt="Foto utama Halimah Azzahra"><p style="margin:10px 0 0;font-weight:700;color:#5a2e42;">Today is your day, ${CONFIG.recipientName} 🌸</p>`);
  }
});

document.getElementById('closing-circle-frame').addEventListener('click', () => {
  if (CONFIG.closingPhoto) {
    openModal(`<img src="${CONFIG.closingPhoto}" style="width:100%;max-height:66vh;object-fit:contain;border-radius:18px;" alt="Foto penutup Halimah Azzahra"><p style="margin:10px 0 0;font-weight:700;color:#5a2e42;">Happy Birthday, ${CONFIG.recipientName}! 🩷</p>`);
  }
});

document.getElementById('btn-hug').addEventListener('click', () => {
  sound.unlock();
  sound.playSparkleBurst();
  const teddy = document.getElementById('pink-teddy');
  teddy.classList.remove('hugging');
  void teddy.offsetWidth;
  teddy.classList.add('hugging');
  document.getElementById('hug-toast').textContent =
    `Peluk hangat & ucapan selamat ulang tahun terkirim untuk ${CONFIG.recipientName}! 🫶🩷`;
  fx.confettiShower();
});

/* Boot Animated Slide Deck */
populateContent();
buildHeartMosaic();
