document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const blurOverlay = document.querySelector('.blur-overlay');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    observer.observe(card);

    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const alreadyActive = card.classList.contains('active');

      document.body.classList.remove('blur-active');
      blurOverlay.style.display = 'none';
      document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));

      if (!alreadyActive) {
        card.classList.add('active');
        document.body.classList.add('blur-active');
      }
    });
  });

  document.addEventListener('click', () => {
    const active = document.querySelector('.card.active');
    if (active) {
      active.classList.remove('active');
      document.body.classList.remove('blur-active');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const intercambiables = document.querySelectorAll(".card.intercambiable");

  intercambiables.forEach(card => {
    const emoji = card.querySelector(".emoji-cambia");
    const frase = card.querySelector(".frase");

    emoji.addEventListener("click", (e) => {
      e.stopPropagation();

      // Añadir animación al emoji
      emoji.classList.add("animando");

      // Cuando termine la animación, quitar la clase
      emoji.addEventListener("animationend", () => {
        emoji.classList.remove("animando");
      }, { once: true });

      // Cambiar frase y animarla
      const nuevaFrase = emoji.dataset.fraseAlternativa;
      const fraseActual = frase.textContent;

      // Intercambio y animación de texto
      frase.textContent = nuevaFrase;
      emoji.dataset.fraseAlternativa = fraseActual;

      frase.classList.remove("revelada");
      void frase.offsetWidth; // Forzar reflow
      frase.classList.add("revelada");
    });
  });
});