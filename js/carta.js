window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const canvas = document.getElementById('confetti');
  const contenido = document.querySelector('.contenido');

  // Oculta el scroll mientras está el modal
  document.body.classList.add('modal-open');
  contenido.classList.add('blur');

  // Ajusta el tamaño del canvas y lanza el confeti
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  } else {
    console.error('Confetti no está cargado 😭');
  }

  // Cierra el modal principal solo si haces clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) {
      modal.style.display = 'none';
      canvas.style.display = 'none';
      document.body.classList.remove('modal-open');
      contenido.classList.remove('blur');
    }
  });
});

// ==============================
// 🎀 Kitty Pestaña y Reproductor
// ==============================

const pestana = document.getElementById('pestana');
const pestanaModal = document.getElementById('pestana-modal');
const audio = document.getElementById('kitty-audio');
const playBtn = document.getElementById('play-btn');
const seekBar = document.getElementById('seek-bar');

let isPlaying = false;

// Toggle al hacer clic en la imagen de la pestaña
pestana.querySelector('.kitty-flecha').addEventListener('click', (e) => {
  e.stopPropagation();
  pestana.classList.toggle('open');

  if (pestana.classList.contains('open')) {
    audio.play().catch(err => console.warn('Autoplay bloqueado 😅'));
  } else {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    playBtn.textContent = '▶';
  }
});

// Cierra el modal flotante de Kitty si haces clic fuera de él
document.addEventListener('click', (e) => {
  if (
    pestana.classList.contains('open') &&
    !pestana.contains(e.target)
  ) {
    pestana.classList.remove('open');
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    playBtn.textContent = '▶';
  }
});

// Control del botón de play/pause
playBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que se cierre al hacer clic
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
  } else {
    audio.play();
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
});

// Actualiza la barra de progreso
audio.addEventListener('timeupdate', () => {
  const value = (audio.currentTime / audio.duration) * 100;
  seekBar.value = value || 0;
});

// Permite arrastrar la barra de progreso
seekBar.addEventListener('input', (e) => {
  const seekTime = (seekBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});