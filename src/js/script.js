// Efeito da barra de navegação ao rolar a página
const navbar = document.querySelector(".navbar");

function atualizarNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("rolagem", window.scrollY > 10);
}

window.addEventListener("scroll", atualizarNavbar, { passive: true });
atualizarNavbar();

// Menu responsivo
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

if (menuIcon && navMenu) {
    function fecharMenu() {
        navMenu.classList.remove("active");
        menuIcon.setAttribute("aria-expanded", "false");
        menuIcon.setAttribute("aria-label", "Abrir menu");
    }

    function alternarMenu() {
        const aberto = navMenu.classList.toggle("active");
        menuIcon.setAttribute("aria-expanded", String(aberto));
        menuIcon.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    menuIcon.addEventListener("click", alternarMenu);

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            fecharMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") fecharMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) fecharMenu();
    });
}

// Atualiza o ano do rodapé
const currentYear = document.getElementById("current-year");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Feedbacks

const feedbackTrack = document.querySelector(".feedback-track");
const feedbackCards = document.querySelectorAll(".feedback-card");
const feedbackPrev = document.querySelector(".feedback-prev");
const feedbackNext = document.querySelector(".feedback-next");
const feedbackDots = document.querySelector(".feedback-dots");
const feedbackCarousel = document.querySelector(".feedback-carousel");

if (
  feedbackTrack &&
  feedbackCards.length > 0 &&
  feedbackPrev &&
  feedbackNext &&
  feedbackDots
) {
  let currentFeedback = 0;
  let autoplay;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Cria os indicadores de posição
  feedbackCards.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.classList.add("feedback-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para depoimento ${index + 1}`);

    dot.addEventListener("click", () => {
      showFeedback(index);
      restartAutoplay();
    });

    feedbackDots.appendChild(dot);
  });

  const dots = feedbackDots.querySelectorAll(".feedback-dot");

  function showFeedback(index) {
    currentFeedback =
      (index + feedbackCards.length) % feedbackCards.length;

    feedbackTrack.style.transform =
      `translateX(-${currentFeedback * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentFeedback);
      dot.setAttribute(
        "aria-current",
        i === currentFeedback ? "true" : "false"
      );
    });
  }

  function nextFeedback() {
    showFeedback(currentFeedback + 1);
  }

  function prevFeedback() {
    showFeedback(currentFeedback - 1);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  function startAutoplay() {
    stopAutoplay();

    if (!reducedMotion && !document.hidden) {
      autoplay = setInterval(nextFeedback, 5000);
    }
  }

  function restartAutoplay() {
    startAutoplay();
  }

  feedbackNext.addEventListener("click", () => {
    nextFeedback();
    restartAutoplay();
  });

  feedbackPrev.addEventListener("click", () => {
    prevFeedback();
    restartAutoplay();
  });

  feedbackCarousel.addEventListener("mouseenter", stopAutoplay);
  feedbackCarousel.addEventListener("mouseleave", startAutoplay);
  feedbackCarousel.addEventListener("focusin", stopAutoplay);
  feedbackCarousel.addEventListener("focusout", startAutoplay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  showFeedback(0);
  startAutoplay();
}