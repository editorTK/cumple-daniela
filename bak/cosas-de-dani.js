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