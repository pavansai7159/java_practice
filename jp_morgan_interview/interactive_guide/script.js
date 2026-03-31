document.addEventListener('DOMContentLoaded', () => {
    
    // Accordion Logic
    const questions = document.querySelectorAll('.question-card');
    
    questions.forEach(card => {
        const title = card.querySelector('.q-title');
        title.addEventListener('click', () => {
            // Toggle current
            card.classList.toggle('open');
        });
    });

    // Smooth Scrolling for Sidebar Links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Global API
window.expandAll = function() {
    const questions = document.querySelectorAll('.question-card');
    questions.forEach(card => card.classList.add('open'));
};

window.collapseAll = function() {
    const questions = document.querySelectorAll('.question-card');
    questions.forEach(card => card.classList.remove('open'));
};

// ==========================================
// Generate Premium PDF using html2pdf.js
// ==========================================
window.exportPDF = function() {
    // 1. Force expand all questions so the content renders in the PDF
    window.expandAll();
    
    // Give DOM a tiny moment to render the expanded states
    setTimeout(() => {
        const element = document.getElementById('print-area');
        
        // Configuration for html2pdf
        const opt = {
            margin:       [10, 10, 10, 10], // top, left, bottom, right in mm
            filename:     'JPMC_Software_Engineer_Interview_Guide.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true,
                letterRendering: true,
                windowWidth: 1200 // Force desktop width
            },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // Pagebreak logic: Avoid breaking inside a question block!
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Disable UI buttons during generation
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> Generating...`;
        
        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Restore button
            btn.innerHTML = originalText;
            // Optionally collapse all back
            // window.collapseAll();
        }).catch(err => {
            console.error("PDF Export failed:", err);
            btn.innerHTML = originalText;
            alert('Failed to generate PDF. Check console.');
        });
    }, 100);
};
