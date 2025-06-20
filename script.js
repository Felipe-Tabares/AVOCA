// Script para la página informativa de AVOCA

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición para las cards al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las cards
document.querySelectorAll('.card, .objective-card, .tech-card, .feature-item, .solution-item').forEach(card => {
    observer.observe(card);
});

// Añadir clase 'active' al enlace de navegación actual
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Script.js para la página informativa (actualmente vacío, se puede añadir interactividad si es necesario)

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 100;
const colors = ['#E84142', '#FF6B6B', '#121212', '#2D2D2D'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Opcional: Volver a crear partículas o ajustar sus posiciones al redimensionar
});

class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mantener partículas dentro de los límites del canvas
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = []; // Limpiar partículas existentes si se llama de nuevo
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 2 - 1;
        const speedY = Math.random() * 2 - 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, size, speedX, speedY, color));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(18, 18, 18, 0.1)'; // Fondo semi-transparente negro mate
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Inicializar y animar
createParticles();
animate();

// Lógica del botón
const chooseHouseBtn = document.getElementById('chooseHouseBtn');
if (chooseHouseBtn) {
    chooseHouseBtn.addEventListener('click', () => {
        // Aquí redirigirías a la sección de votación
        alert('Redirigiendo a la sección de votación (aún no implementada)');
        // window.location.href = '/voting.html'; // Ejemplo de redirección
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // Animación de aparición para las cards al hacer scroll
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observar todas las cards
  document.querySelectorAll('.card, .objective-card, .tech-card, .feature-item, .solution-item').forEach(card => {
      observer.observe(card);
  });

  // Añadir clase 'active' al enlace de navegación actual
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  });
}); 