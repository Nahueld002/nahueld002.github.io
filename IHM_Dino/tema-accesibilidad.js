// tema-accesibilidad.js
// =============================================================
// Script centralizado para manejar TODOS los temas visuales
// y el modo de texto grande entre páginas. Lee / guarda
// preferencias en localStorage.
// =============================================================

// Clases CSS que representan temas visuales (agrega aquí si creas más)
const TEMA_CLASES = [
  "contraste-alto",
  "tema-diurno",
  "tema-daltonismo-tri",
  "tema-baja-vision",
  "tema-vision-tunel"
];

// ===================== Funciones utilitarias =====================

// Aplica todas las preferencias guardadas al cargar la página
function aplicarPreferencias() {
  // Restaurar tema
  const temaGuardado = localStorage.getItem("temaAccesibilidad");
  if (temaGuardado && TEMA_CLASES.includes(temaGuardado)) {
    document.body.classList.add(temaGuardado);
    setGreeting();
  }

  // Restaurar texto grande
  if (localStorage.getItem("texto-grande") === "true") {
    document.body.classList.add("texto-grande");
  }
}

// Activa un tema visual exclusivo y lo guarda
function activarTema(nombreClase) {
  // Elimina todos los temas previos
  document.body.classList.remove(...TEMA_CLASES);
  localStorage.removeItem("temaAccesibilidad");

  if (nombreClase) {
    document.body.classList.add(nombreClase);
    localStorage.setItem("temaAccesibilidad", nombreClase);
  }
}

// Alterna tamaño de texto grande y lo guarda
function aumentarTexto() {
  document.body.classList.toggle("texto-grande");
  localStorage.setItem("texto-grande", document.body.classList.contains("texto-grande"));
}

// =================== Aplicar al cargar la página =================
window.addEventListener("DOMContentLoaded", aplicarPreferencias);

// =================== Exponer funciones globales ==================
// (para que los botones inline onclick puedan usarlas)
window.activarTema = activarTema;
window.aumentarTexto = aumentarTexto;

function setGreeting() {
  const nombre = localStorage.getItem("nombreUsuario");
  const bienvenida = document.getElementById("bienvenidaUsuario");
  if (nombre && bienvenida) {
    bienvenida.textContent = `👋 Bienvenido, ${nombre}`;
  }
}