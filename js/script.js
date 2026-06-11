// JavaScript für Interaktivität (kombiniert mit Bootstrap)

async function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    try {
        const navUrl = new URL('navbar.html', location.href);
        console.log('Lade Navbar von', navUrl.href);
        const resp = await fetch(navUrl);
        if (!resp.ok) {
            console.error('Navbar konnte nicht geladen werden:', resp.status);
            placeholder.innerHTML = '<!-- Navbar konnte nicht geladen werden -->';
            return;
        }
        const html = await resp.text();
        placeholder.innerHTML = html;
    } catch (err) {
        console.error('Fehler beim Laden der Navbar:', err);
    }
}

async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    try {
        const footerUrl = new URL('footer.html', location.href);
        console.log('Lade Footer von', footerUrl.href);
        const resp = await fetch(footerUrl);
        if (!resp.ok) {
            console.error('Footer konnte nicht geladen werden:', resp.status);
            placeholder.innerHTML = '<!-- Footer konnte nicht geladen werden -->';
            return;
        }
        const html = await resp.text();
        placeholder.innerHTML = html;
    } catch (err) {
        console.error('Fehler beim Laden des Footers:', err);
    }
}

function initUI() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.style.color = '#ff0000';
        }
    });

    // Einfache Parallax-Effekt für Hero (optional)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });
    }

    // Tooltip-Initialisierung für Bootstrap (falls verwendet)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await Promise.all([loadNavbar(), loadFooter()]);
    initUI();
});