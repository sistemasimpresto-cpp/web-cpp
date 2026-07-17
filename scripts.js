
  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));

  // Navbar shrink
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });

  // Smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // Filtro equipos
  function filtrar(tipo, btn) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('act'));
    btn.classList.add('act');
    document.querySelectorAll('.eq-card').forEach(c => {
      const show = tipo === 'todos' || c.dataset.t === tipo;
      c.style.display = show ? '' : 'none';
      if(show){ c.classList.remove('in'); setTimeout(()=>c.classList.add('in'), 60); }
    });
  }
