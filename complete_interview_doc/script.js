// Toggle Q&A card
function toggleQA(el) {
    var card = el.parentElement;
    card.classList.toggle('open');
}

// Scroll to section
function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Scroll progress bar + nav + back-to-top + section reveal
var ticking = false;
window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            var h = document.documentElement.scrollHeight - window.innerHeight;
            var p = (window.scrollY / h) * 100;
            document.getElementById('scrollProgress').style.width = p + '%';
            document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
            document.getElementById('backTop').classList.toggle('visible', window.scrollY > 600);

            var secs = document.querySelectorAll('.section');
            for (var i = 0; i < secs.length; i++) {
                var rect = secs[i].getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    secs[i].classList.add('visible');
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Search
var searchTimer;
document.getElementById('searchInput').addEventListener('input', function () {
    clearTimeout(searchTimer);
    var input = this;
    searchTimer = setTimeout(function () {
        var q = input.value.toLowerCase().trim();
        var cards = document.querySelectorAll('.qa-card');
        var secs = document.querySelectorAll('.section');
        var found = 0;

        if (!q) {
            for (var i = 0; i < cards.length; i++) { cards[i].style.display = ''; cards[i].classList.remove('open'); }
            for (var j = 0; j < secs.length; j++) secs[j].style.display = '';
            document.getElementById('noResults').classList.remove('show');
            document.getElementById('topicsGrid').style.display = '';
            return;
        }

        document.getElementById('topicsGrid').style.display = 'none';
        for (var i = 0; i < cards.length; i++) {
            var text = cards[i].textContent.toLowerCase();
            var match = text.indexOf(q) >= 0;
            cards[i].style.display = match ? '' : 'none';
            if (match) {
                found++;
                if (q.length > 2) cards[i].classList.add('open');
            } else {
                cards[i].classList.remove('open');
            }
        }

        for (var j = 0; j < secs.length; j++) {
            var vis = secs[j].querySelectorAll('.qa-card');
            var hasVisible = false;
            for (var k = 0; k < vis.length; k++) {
                if (vis[k].style.display !== 'none') { hasVisible = true; break; }
            }
            secs[j].style.display = hasVisible ? '' : 'none';
            if (hasVisible) secs[j].classList.add('visible');
        }

        document.getElementById('noResults').classList.toggle('show', found === 0);
    }, 200);
});

// Initial section reveal
setTimeout(function () {
    var secs = document.querySelectorAll('.section');
    for (var i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top < window.innerHeight) {
            secs[i].classList.add('visible');
        }
    }
}, 200);

// Keyboard shortcut: Ctrl/Cmd + K to focus search
document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    if (e.key === 'Escape') {
        document.getElementById('searchInput').blur();
        document.getElementById('searchInput').value = '';
        document.getElementById('searchInput').dispatchEvent(new Event('input'));
    }
});
