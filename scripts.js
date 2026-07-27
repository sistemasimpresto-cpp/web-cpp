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


//FORMULARIO
  

// 1. Detectamos los elementos del HTML por su ID
        const form = document.getElementById('formularioGoogle');
        const botonSubmit = document.getElementById('btnEnviar');
        const mensajeAviso = document.getElementById('mensajeConfirmacion');

       // Seleccionamos el nuevo elemento oculto
        const mensajeSecreto = document.getElementById('mensajeOculto');

        // 2. Escuchamos el momento en el que el usuario hace clic en "Enviar"
        form.addEventListener('submit', function(evento) {
            
            // Evitamos que la página se recargue automáticamente
            evento.preventDefault(); 
            
            // Deshabilitamos el botón para evitar que le den doble clic por error
            botonSubmit.disabled = true;
            botonSubmit.innerText = "Enviando  los datos...";

            // Capturamos todos los inputs y textareas del formulario automáticamente
            const datosFormulario = new FormData(form);

            // 3. Enviamos los datos usando la Fetch API (en segundo plano)
            fetch(form.action, {
                method: 'POST',
                body: datosFormulario,
                mode: 'no-cors' // Crucial para saltarse las restricciones de seguridad de Google
            })
            .then(() => {
                // Si la conexión fue exitosa, mostramos el aviso verde
                mensajeAviso.innerText = "¡Formulario enviado con éxito a la hoja de cálculo!";
                mensajeAviso.className = "alerta exito"; 
                mensajeSecreto.classList.add('mostrar');
                
                // Limpiamos los campos del formulario
                form.reset(); 
            })
            .catch(error => {
                // Si ocurre un error de conexión a internet o la URL está caída
                console.error('Hubo un error:', error);
                alert('No se pudo enviar el formulario. Inténtalo más tarde.');
            })
            .finally(() => {
                // Volvemos a activar el botón pase lo que pase
                botonSubmit.disabled = false;
                botonSubmit.innerText = "Enviar Formulario";
            });
        });
