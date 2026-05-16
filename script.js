// ================================================
//  NAVBAR – scroll efekt & hamburger menu
// ================================================

const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

// Přidej třídu .scrolled po odscrollování
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger menu – otevření / zavření
navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Zavření menu po kliknutí na odkaz
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ================================================
//  INTERSECTION OBSERVER – animace při scrollu
// ================================================

const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -60px 0px' };

// Skill bary
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const item = entry.target;
    item.classList.add('visible');

    const fill = item.querySelector('.skill-fill');
    if (fill) {
      // Krátká prodleva pro plynulý efekt
      setTimeout(() => {
        fill.style.width = fill.style.getPropertyValue('--fill');
      }, 100);
    }

    skillObserver.unobserve(item);   // animuj jen jednou
  });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  skillObserver.observe(el);
});

// ================================================
//  KONTAKTNÍ FORMULÁŘ – simulace odeslání
// ================================================

const form        = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const successMsg  = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Ukazuj stav načítání
  submitBtn.disabled = true;
  submitBtn.textContent = 'Odesílám…';

  // Simulace odeslání (nahraď fetch() voláním na svůj backend)
  setTimeout(() => {
    submitBtn.textContent = '✓ Odesláno!';
    successMsg.classList.add('show');
    form.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Odeslat zprávu →';
      successMsg.classList.remove('show');
    }, 4000);
  }, 1200);
});

// ================================================
//  SMOOTH HOVER TILT na kartičkách
// ================================================

document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);

    card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
