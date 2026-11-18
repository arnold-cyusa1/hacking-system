// ===== script.js – smooth scroll + active section + typing =====
(function () {
    // 1. smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', id);
            }
        });
    });

    // 2. highlight the section currently in view
    var sections = document.querySelectorAll('section[id], article[id]');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var heading = entry.target.querySelector('h2, h3');
                    if (heading) {
                        document.title = 'OWASP · ' + heading.textContent.trim().slice(0, 30);
                    }
                }
            });
        }, { threshold: 0.6 });
        sections.forEach(function (s) { observer.observe(s); });
    }

    // 3. typing effect for the main heading
    var h1 = document.querySelector('header h1');
    if (h1) {
        var original = '⩕ HACKER CONSOLE';
        var i = 0;
        h1.textContent = '';
        var cursor = document.createElement('span');
        cursor.id = 'cursor';
        cursor.textContent = '▌';
        h1.appendChild(cursor);
        var typer = setInterval(function () {
            if (i < original.length) {
                cursor.insertAdjacentText('beforebegin', original.charAt(i));
                i++;
            } else {
                clearInterval(typer);
            }
        }, 70);
    }

    // 4. console easter egg
    console.log('%c [OWASP TOP 10] hacker console ready — stay ethical. ', 'background:#0b0f0b;color:#00ff41;padding:4px;font-family:monospace');
})();