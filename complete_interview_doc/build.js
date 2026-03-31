const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const GUIDE_DIR = path.join(__dirname, '..', 'interview-guide');
const OUTPUT = path.join(__dirname, 'index.html');

const files = [
    '01-java-python.md', '02-frameworks.md', '03-apis-microservices.md',
    '04-databases.md', '05-devops.md', '06-kafka-security-networking.md',
    '07-architecture-systemdesign.md', '08-dsa.md', '09-aws-gcp.md',
];

const topicMeta = [
    { id: 'java-python', icon: '☕', label: 'Java & Python', color: '#f97316' },
    { id: 'frameworks', icon: '🍃', label: 'Spring Boot & Frameworks', color: '#22c55e' },
    { id: 'apis-micro', icon: '🔗', label: 'APIs & Microservices', color: '#6366f1' },
    { id: 'databases', icon: '🗄️', label: 'Databases', color: '#06b6d4' },
    { id: 'devops', icon: '🐳', label: 'DevOps & CI/CD', color: '#8b5cf6' },
    { id: 'kafka-sec', icon: '🔒', label: 'Kafka & Security', color: '#ef4444' },
    { id: 'sys-design', icon: '🏗️', label: 'System Design', color: '#ec4899' },
    { id: 'dsa', icon: '🧮', label: 'DSA', color: '#14b8a6' },
    { id: 'aws-gcp', icon: '☁️', label: 'AWS & GCP', color: '#f59e0b' },
];

function parseSections() {
    const sections = [];
    files.forEach(function (file, idx) {
        const content = fs.readFileSync(path.join(GUIDE_DIR, file), 'utf-8');
        const meta = topicMeta[idx];
        const subTopics = [];
        const parts = content.split(/^## /m).filter(Boolean);
        parts.forEach(function (part) {
            const lines = part.split('\n');
            const title = lines[0].replace(/^#+\s*/, '').trim();
            if (title.startsWith('Part') || title === '---') return;
            const body = lines.slice(1).join('\n');
            const difficulties = [];
            const diffParts = body.split(/^### /m).filter(Boolean);
            diffParts.forEach(function (dp) {
                const dLines = dp.split('\n');
                const dTitle = dLines[0].trim();
                const dBody = dLines.slice(1).join('\n').trim();
                if (dBody.length > 10) {
                    var level = 'medium';
                    if (dTitle.indexOf('🟢') >= 0 || dTitle.toLowerCase().indexOf('easy') >= 0) level = 'easy';
                    if (dTitle.indexOf('🔴') >= 0 || dTitle.toLowerCase().indexOf('hard') >= 0) level = 'hard';
                    const questions = [];
                    const qParts = dBody.split(/^\*\*Q\d+/m).filter(Boolean);
                    qParts.forEach(function (qp) {
                        const qText = qp.trim();
                        if (qText.length < 10) return;
                        const qMatch = qText.match(/^\.?\s*(.*?)\*\*\s*\n([\s\S]*)/);
                        if (qMatch) {
                            questions.push({
                                question: qMatch[1].replace(/^\.\s*/, '').trim(),
                                answer: marked.parse(qMatch[2].trim()),
                            });
                        } else {
                            questions.push({ question: '', answer: marked.parse(qText) });
                        }
                    });
                    difficulties.push({ title: dTitle, level: level, questions: questions });
                }
            });
            if (difficulties.length > 0) {
                subTopics.push({ title: title, difficulties: difficulties });
            }
        });
        sections.push(Object.assign({}, meta, { subTopics: subTopics }));
    });
    return sections;
}

const sections = parseSections();

var totalQ = 0;
sections.forEach(function (s) {
    s.subTopics.forEach(function (st) {
        st.difficulties.forEach(function (d) { totalQ += d.questions.length; });
    });
});

// Build HTML strings
function buildTopicCards() {
    var out = '';
    sections.forEach(function (s) {
        var easy = 0, med = 0, hard = 0;
        s.subTopics.forEach(function (st) {
            st.difficulties.forEach(function (d) {
                if (d.level === 'easy') easy += d.questions.length;
                else if (d.level === 'hard') hard += d.questions.length;
                else med += d.questions.length;
            });
        });
        out += '<div class="topic-card" onclick="scrollToSection(\'' + s.id + '\')" data-color="' + s.color + '">';
        out += '<div class="card-bar" style="background:' + s.color + '"></div>';
        out += '<span class="topic-card-icon">' + s.icon + '</span>';
        out += '<div class="topic-card-title">' + s.label + '</div>';
        out += '<div class="topic-card-count">' + (easy + med + hard) + ' questions</div>';
        out += '<div class="topic-card-badges">';
        if (easy) out += '<span class="badge badge-easy">' + easy + ' Easy</span>';
        if (med) out += '<span class="badge badge-medium">' + med + ' Medium</span>';
        if (hard) out += '<span class="badge badge-hard">' + hard + ' Hard</span>';
        out += '</div></div>';
    });
    return out;
}

function buildSections() {
    var out = '';
    sections.forEach(function (s) {
        out += '<div class="section" id="' + s.id + '">';
        out += '<div class="section-header">';
        out += '<span class="section-icon">' + s.icon + '</span>';
        out += '<h2 class="section-title">' + s.label + '</h2>';
        out += '<div class="section-line"></div></div>';

        s.subTopics.forEach(function (st) {
            out += '<div class="subsection">';
            out += '<h3 class="subsection-title">' + st.title + '</h3>';
            st.difficulties.forEach(function (d) {
                out += '<div class="diff-group">';
                var labelText = d.level === 'easy' ? '🟢 Easy' : d.level === 'hard' ? '🔴 Hard' : '🟡 Medium';
                out += '<div class="diff-label ' + d.level + '"><span class="diff-dot"></span> ' + labelText + '</div>';
                d.questions.forEach(function (q, qi) {
                    out += '<div class="qa-card">';
                    out += '<div class="qa-question" onclick="toggleQA(this)">';
                    out += '<span class="q-num">Q' + (qi + 1) + '</span>';
                    out += '<span class="q-text">' + (q.question || 'Question') + '</span>';
                    out += '<svg class="q-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
                    out += '</div>';
                    out += '<div class="qa-answer"><div class="qa-answer-inner">' + q.answer + '</div></div>';
                    out += '</div>';
                });
                out += '</div>';
            });
            out += '</div>';
        });
        out += '</div>';
    });
    return out;
}

// Read CSS and JS from separate files
const cssFile = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');
const jsFile = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf-8');

const html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '<title>Interview Mastery Guide — Pavan Sai Vatrapu</title>\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n' +
    '<style>' + cssFile + '</style>\n' +
    '</head>\n<body>\n' +
    '<div class="bg-effects"><div class="bg-orb"></div><div class="bg-orb"></div><div class="bg-orb"></div><div class="bg-orb"></div></div>\n' +
    '<div class="grid-bg"></div>\n' +
    '<div class="scroll-progress" id="scrollProgress"></div>\n' +
    '<nav class="nav" id="nav"><div class="nav-inner">' +
    '<div class="nav-logo">⚡ InterviewMastery</div>' +
    '<div class="nav-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
    '<input type="text" id="searchInput" placeholder="Search questions..." autocomplete="off">' +
    '</div></div></nav>\n' +
    '<section class="hero" id="hero">' +
    '<div class="hero-badge"><span class="dot"></span> Backend Developer Interview Guide 2026</div>' +
    '<h1><span class="gradient">Interview Mastery</span><br>Complete Guide</h1>' +
    '<p class="hero-sub">200+ curated questions across 20+ topics — Easy, Medium & Hard — everything you need to crack your next Backend / SDE interview.</p>' +
    '<div class="hero-stats">' +
    '<div class="stat"><span class="stat-num">' + totalQ + '+</span><span class="stat-label">Questions</span></div>' +
    '<div class="stat"><span class="stat-num">' + sections.length + '</span><span class="stat-label">Topics</span></div>' +
    '<div class="stat"><span class="stat-num">3</span><span class="stat-label">Levels</span></div>' +
    '</div>' +
    '<div class="hero-scroll"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div>' +
    '</section>\n' +
    '<main class="main">\n' +
    '<div class="topics-grid" id="topicsGrid">' + buildTopicCards() + '</div>\n' +
    '<div class="no-results" id="noResults"><span>🔍</span>No questions match your search</div>\n' +
    buildSections() + '\n' +
    '</main>\n' +
    '<div class="back-top" id="backTop" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m18 15-6-6-6 6"/></svg></div>\n' +
    '<script>' + jsFile + '</script>\n' +
    '</body>\n</html>';

fs.writeFileSync(OUTPUT, html, 'utf-8');
console.log('Generated: ' + OUTPUT);
console.log('Total questions: ' + totalQ);
console.log('Topics: ' + sections.length);
