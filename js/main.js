// Mostrar confeti al cargar la página (una vez)
window.addEventListener("DOMContentLoaded", () => {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 }
  });
});

document.getElementById("enter-btn").addEventListener("click", () => {
  document.querySelector(".welcome-container").style.opacity = 0;

  setTimeout(() => {
    window.location.href = "sections/carta.html"; // Próxima parte
  }, 1000);
});

let kittyActive = null;
let kittyInSafeZone = false;
const safeZone = document.getElementById("kitty-safe-zone");

function createFallingKitty() {
  if (kittyActive || kittyInSafeZone) return;

  const kitty = document.createElement("img");
  kitty.src = "assets/kitty-cayendo.gif";
  kitty.classList.add("kitty-falling");
  document.body.appendChild(kitty);
  kittyActive = kitty;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  setTimeout(() => {
    if (!isDragging) {
      kitty.style.top = "80vh";
    }
  }, 100);

  const startDrag = (e) => {
    isDragging = true;
    kitty.classList.add("dragging");
    safeZone.classList.add("visible");

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = kitty.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    e.preventDefault();
  };

  const duringDrag = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    kitty.style.left = `${clientX - offsetX}px`;
    kitty.style.top = `${clientY - offsetY}px`;
  };

  const endDrag = () => {
    if (!isDragging) return;

    isDragging = false;
    kitty.classList.remove("dragging");
    safeZone.classList.remove("visible");

    const kittyRect = kitty.getBoundingClientRect();
    const safeRect = safeZone.getBoundingClientRect();

    const isInsideSafeZone =
      kittyRect.left < safeRect.right &&
      kittyRect.right > safeRect.left &&
      kittyRect.top < safeRect.bottom &&
      kittyRect.bottom > safeRect.top;

    if (isInsideSafeZone) {
      kittyInSafeZone = true;
      kittyActive = null;
      kitty.style.top = `${safeRect.top + 10}px`;
      kitty.style.left = `${safeRect.left + 10}px`;
      kitty.style.transition = "all 0.3s ease-in-out";
      return;
    }

    // Si se soltó fuera de la zona segura
    kitty.classList.add("dropping");
    kitty.style.top = "100vh";

    setTimeout(() => {
      kitty.remove();
      kittyActive = null;
      kittyInSafeZone = false;
    }, 1000);
  };

  // Eventos de arrastre
  kitty.addEventListener("mousedown", startDrag);
  kitty.addEventListener("touchstart", startDrag);
  document.addEventListener("mousemove", duringDrag);
  document.addEventListener("touchmove", duringDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

// Intervalo cada 3s
setInterval(() => {
  if (!kittyActive && !kittyInSafeZone) {
    createFallingKitty();
  }
}, 3000);