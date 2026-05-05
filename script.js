/* =========================================================
   STAR PROCESSING — Site interactions
   ========================================================= */

(function () {
  'use strict';

  // ---- Year in footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Sticky nav state ----
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Mobile menu toggle ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      navToggle.innerHTML = isOpen
        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // ---- Reveal on scroll (IntersectionObserver) ----
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // ---- Subtle parallax on hero orbs ----
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
    });

    const tick = () => {
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      orbs.forEach((orb, i) => {
        const intensity = 30 - i * 8;
        orb.style.transform = `translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
      });

      requestAnimationFrame(tick);
    };
    tick();
  }

  // ---- Contact form (mailto submission to Stephenie) ----
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
          if (!input.value.trim()) {
            input.style.borderColor = '#C9676A';
            input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }

      // Build mailto link with form data
      const subject = encodeURIComponent(`New inquiry from ${name} — Star Processing website`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || '—'}\n\n` +
        `Message:\n${message}\n\n` +
        `— Sent via star-processing.com`
      );
      const mailto = `mailto:Stephenie@star-processing.com?subject=${subject}&body=${body}`;

      // Trigger the email client
      window.location.href = mailto;

      if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 8000);
      }
      form.reset();
    });
  }

  // ---- FAQ show-more toggle ----
  const faqToggle = document.getElementById('faqToggle');
  const faqGrid = document.getElementById('faqGrid');
  if (faqToggle && faqGrid) {
    const toggleText = faqToggle.querySelector('.faq-toggle-text');
    const hiddenCount = faqGrid.querySelectorAll('.faq-hidden').length;
    if (toggleText) toggleText.textContent = `Show ${hiddenCount} more questions`;

    faqToggle.addEventListener('click', () => {
      const expanded = faqGrid.classList.toggle('expanded');
      faqToggle.setAttribute('aria-expanded', expanded);
      if (toggleText) {
        toggleText.textContent = expanded
          ? 'Show fewer questions'
          : `Show ${hiddenCount} more questions`;
      }
      // If collapsing, scroll back to FAQ section so user isn't lost
      if (!expanded) {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          const top = faqSection.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  }

  // ---- Smooth-scroll for in-page anchors (older browsers fallback) ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
