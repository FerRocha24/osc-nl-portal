// Toggle del menú hamburguesa en mobile
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
});

// Carga header y footer compartidos, y marca el link activo según data-page
document.addEventListener('DOMContentLoaded', async function () {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (headerPlaceholder) {
    const res = await fetch('components/header.html');
    headerPlaceholder.innerHTML = await res.text();

    // Marca el link activo usando el atributo data-page-actual del <body>
    const currentPage = document.body.getAttribute('data-page-actual');
    if (currentPage) {
      const activeLink = headerPlaceholder.querySelector(`a[data-page="${currentPage}"]`);
      if (activeLink) activeLink.classList.add('active');
    }

    // Vuelve a activar el toggle del menú hamburguesa (el header se cargó después)
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('open');
      });
    }
  }

  if (footerPlaceholder) {
    const res = await fetch('components/footer.html');
    footerPlaceholder.innerHTML = await res.text();
  }

  // La cabecera es sticky: sombra sólo cuando ya hay contenido arriba
  const header = document.querySelector('.site-header');
  if (header) {
    const actualizarSombra = () => {
      header.classList.toggle('con-sombra', window.scrollY > 8);
    };
    actualizarSombra();
    window.addEventListener('scroll', actualizarSombra, { passive: true });
  }
});