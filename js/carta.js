window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const canvas = document.getElementById('confetti');
  const contenido = document.querySelector('.contenido');
  const audio = document.getElementById('kitty-audio');

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

  // Inicia la música automáticamente al cargar la página
  audio.play().catch(err => console.warn('Autoplay bloqueado 😅'));
});
