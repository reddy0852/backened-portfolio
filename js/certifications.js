/* ============================================================
   CERTIFICATIONS.JS — Expand/Collapse Credential Cards
   with dynamic terminal log output + Credly embed loading
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('[data-cert-toggle]');
    const logContainer = document.getElementById('cert-log-lines');
    let credlyScriptLoaded = false;

    /**
     * Returns current time as HH:MM:SS in 24-hour format.
     */
    function getTime(offsetSec = 0) {
        const now = new Date(Date.now() + offsetSec * 1000);
        return now.toLocaleTimeString('en-GB', { hour12: false });
    }

    /**
     * Creates a single terminal log line element.
     */
    function createLogLine(level, message, offsetSec = 0) {
        const colorMap = {
            INFO: 'text-blue-500',
            SUCCESS: 'text-neon',
            WARN: 'text-amber-500',
            ERROR: 'text-red-500',
        };

        const line = document.createElement('div');
        line.className = 'flex gap-2 opacity-0 translate-y-1 transition-all duration-300';

        const time = document.createElement('span');
        time.className = 'text-gray-700';
        time.textContent = getTime(offsetSec);

        const tag = document.createElement('span');
        tag.className = colorMap[level] || 'text-gray-500';
        tag.textContent = level;

        const msg = document.createElement('span');
        msg.textContent = message;

        line.appendChild(time);
        line.appendChild(tag);
        line.appendChild(msg);

        return line;
    }

    /**
     * Appends log lines with staggered fade-in.
     */
    function appendLogs(lines) {
        lines.forEach((lineEl, i) => {
            logContainer.appendChild(lineEl);
            requestAnimationFrame(() => {
                setTimeout(() => {
                    lineEl.classList.remove('opacity-0', 'translate-y-1');
                    lineEl.classList.add('opacity-100', 'translate-y-0');
                }, i * 120);
            });
        });
    }

    /**
     * Loads the Credly embed script once, then re-triggers rendering.
     */
    function loadCredlyEmbeds() {
        if (credlyScriptLoaded) {
            // Script already loaded — re-trigger by re-inserting it
            const s = document.createElement('script');
            s.src = '//cdn.credly.com/assets/utilities/embed.js';
            s.async = true;
            document.body.appendChild(s);
            return;
        }
        const script = document.createElement('script');
        script.src = '//cdn.credly.com/assets/utilities/embed.js';
        script.async = true;
        document.body.appendChild(script);
        credlyScriptLoaded = true;
    }

    /**
     * Calculates remaining days until `expiresDate`.
     */
    function daysRemaining(expiresDate) {
        if (!expiresDate) return null;
        const expires = new Date(expiresDate);
        if (isNaN(expires.getTime())) return null;
        const diff = Math.ceil((expires - new Date()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    }

    // ── Toggle logic ──────────────────────────────────────────

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-cert-toggle');
            const certName = btn.getAttribute('data-cert-name') || targetId;
            const certExpires = btn.getAttribute('data-cert-expires') || null;
            const content = document.getElementById(targetId);
            const icon = btn.querySelector('.material-symbols-outlined');
            const label = btn.querySelector('.toggle-label');

            if (!content) return;

            const isExpanded = content.classList.contains('expanded');

            if (isExpanded) {
                // ── Collapse ──
                content.classList.remove('expanded');
                btn.setAttribute('aria-expanded', 'false');
                if (icon) icon.textContent = 'expand_more';
                if (label) label.textContent = 'View credential';

                logContainer.innerHTML = '';
                appendLogs([
                    createLogLine('INFO', `Collapsed view for ${certName}.`, 0),
                ]);
            } else {
                // ── Expand ──
                content.classList.add('expanded');
                btn.setAttribute('aria-expanded', 'true');
                if (icon) icon.textContent = 'expand_less';
                if (label) label.textContent = 'Hide credential';

                // Load Credly badge embed
                loadCredlyEmbeds();

                // Build log lines
                logContainer.innerHTML = '';
                const lines = [
                    createLogLine('INFO', 'Loaded credential data from secure storage.', 0),
                    createLogLine('SUCCESS', `Rendered expanded view for ${certName}.`, 1),
                ];

                const remaining = daysRemaining(certExpires);
                if (remaining !== null) {
                    if (remaining === 0) {
                        lines.push(
                            createLogLine('ERROR', `Certificate expired! Renewal required.`, 2)
                        );
                    } else {
                        lines.push(
                            createLogLine('WARN', `Certificate expiration check: ${remaining} days remaining.`, 2)
                        );
                    }
                }

                appendLogs(lines);
            }
        });
    });
});
