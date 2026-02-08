/* ============================================================
   CONTACT.JS — Form Validation & Handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showStatus('All fields are required for compilation.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Invalid return address format.', 'error');
            return;
        }

        // Simulate form submission (replace with real endpoint later)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">progress_activity</span> Deploying...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showStatus('Connection initialized successfully! Packet delivered.', 'success');
            form.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1500);
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showStatus(message, type) {
        // Remove existing status
        const existing = document.getElementById('form-status');
        if (existing) existing.remove();

        const status = document.createElement('div');
        status.id = 'form-status';
        status.className = `mt-4 p-3 rounded-lg font-mono text-sm border ${type === 'success'
                ? 'bg-neon/10 border-neon/30 text-neon'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`;
        status.innerHTML = `<span class="text-xs">${type === 'success' ? '[SUCCESS]' : '[ERROR]'}</span> ${message}`;

        form.appendChild(status);

        // Auto-remove after 5s
        setTimeout(() => {
            if (status.parentNode) status.remove();
        }, 5000);
    }
});
