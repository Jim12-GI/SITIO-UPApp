document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('.view');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stepIndicator = document.getElementById('step-indicator');
    const progressBar = document.getElementById('progress-bar');
    const themeToggle = document.getElementById('theme-toggle');

    let currentIndex = 0;
    const totalViews = views.length;

    // Función principal para cambiar de pantalla/módulo
    function showView(index) {
        if (index < 0 || index >= totalViews) return;
        currentIndex = index;

        // Ocultar todas las vistas y mostrar solo la seleccionada
        views.forEach((view, i) => {
            view.classList.toggle('active', i === currentIndex);
        });

        // Actualizar estado activo de los botones superiores
        tabButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
            if (i === currentIndex) {
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        // Actualizar botones Anterior / Siguiente
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalViews - 1;
        nextBtn.textContent = currentIndex === totalViews - 1 ? 'Finalizado ✔' : 'Siguiente Tema ➡';

        // Actualizar indicador numérico y barra de progreso
        stepIndicator.textContent = `${currentIndex + 1} / ${totalViews}`;
        const progressPercent = ((currentIndex + 1) / totalViews) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Subir al inicio de la pantalla suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Eventos en botones superiores (Tabs)
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            showView(index);
        });
    });

    // Eventos en botones inferiores (Anterior / Siguiente)
    prevBtn.addEventListener('click', () => showView(currentIndex - 1));
    nextBtn.addEventListener('click', () => showView(currentIndex + 1));

    // Soporte opcional para flechas del teclado (Izquierda / Derecha)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentIndex < totalViews - 1) {
            showView(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showView(currentIndex - 1);
        }
    });

    // Cambio de tema Claro / Oscuro
    const savedTheme = localStorage.getItem('app-tutorial-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('app-tutorial-theme', next);
    });
});

// Copiar código al portapapeles
function copyCode(button) {
    const code = button.closest('.code-container').querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const original = button.innerText;
        button.innerText = '¡Copiado!';
        button.style.backgroundColor = '#16a34a';
        setTimeout(() => {
            button.innerText = original;
            button.style.backgroundColor = '';
        }, 1800);
    });
}