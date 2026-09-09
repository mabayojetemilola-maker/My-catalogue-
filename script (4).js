// Hassan Visuals - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Fade-up animations on scroll
  const fadeElements = document.querySelectorAll('.fade-up');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // Portfolio filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length && portfolioCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('project-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const business = formData.get('business') || '';
      const whatsapp = formData.get('whatsapp') || '';
      const email = formData.get('email') || '';
      const service = formData.get('service') || '';
      const description = formData.get('description') || '';
      const deadline = formData.get('deadline') || '';
      const budget = formData.get('budget') || 'Not specified';

      // Build WhatsApp message
      const message = encodeURIComponent(
        `*New Project Enquiry - Hassan Visuals*\n\n` +
        `*Name:* ${name}\n` +
        `*Business:* ${business}\n` +
        `*WhatsApp:* ${whatsapp}\n` +
        `*Email:* ${email}\n` +
        `*Service:* ${service}\n` +
        `*Deadline:* ${deadline || 'Not specified'}\n` +
        `*Budget:* ${budget}\n\n` +
        `*Project Description:*\n${description}`
      );

      // Open WhatsApp with pre-filled message
      const waNumber = '2348054724774';
      window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');

      // Show success message
      const successMsg = document.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }

      // Optional: reset form
      // contactForm.reset();
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
