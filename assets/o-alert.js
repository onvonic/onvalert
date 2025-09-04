class OAlert {
    static show(options) {
        const defaults = {
            title: "",
            text: "",
            subtext: "",
            html: null,
            icon: "info",
            buttons: null
        };
        const opts = { ...defaults, ...options };

        // pastikan overlay lama dihapus dulu
        if (document.getElementById("oalert-overlay")) {
            document.getElementById("oalert-overlay").remove();
        }

        // overlay
        const overlay = document.createElement("div");
        overlay.id = "oalert-overlay";

        // box
        const box = document.createElement("div");
        box.className = `oalert-box ${opts.icon}`;

        // icon
        const icon = document.createElement("div");
        icon.className = "oalert-icon";
        icon.innerHTML = OAlert.icons[opts.icon] || OAlert.icons.info;

        // content
        const content = document.createElement("div");
        content.className = "oalert-content";

        if (opts.title) {
            const title = document.createElement("p");
            title.className = "oalert-title";
            title.textContent = opts.title;
            content.appendChild(title);
        }

        if (opts.text) {
            const text = document.createElement("p");
            text.className = "oalert-text";
            text.textContent = opts.text;
            content.appendChild(text);
        }

        if (opts.subtext) {
            const sub = document.createElement("p");
            sub.className = "oalert-subtext";
            sub.innerHTML = opts.subtext;
            content.appendChild(sub);
        }

        if (opts.html) {
            const html = document.createElement("div");
            html.innerHTML = opts.html;
            content.appendChild(html);
        }

        // buttons
        const btnContainer = document.createElement("div");
        btnContainer.className = "oalert-buttons";

        const buttons = opts.buttons || [{
            text: "Got it",
            class: "oalert-btn-primary",
            action: () => OAlert.close()
        }];

        buttons.forEach(btn => {
            const button = document.createElement("button");
            button.textContent = btn.text;
            button.className = `oalert-btn ${btn.class || "oalert-btn-secondary"}`;
            button.onclick = () => btn.action && btn.action();
            btnContainer.appendChild(button);
        });

        content.appendChild(btnContainer);

        // assembly
        box.appendChild(icon);
        box.appendChild(content);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) OAlert.close();
        });
    }

    static close() {
        const overlay = document.getElementById("oalert-overlay");
        if (overlay) {
            overlay.style.animation = "fadeOut 0.2s ease-in forwards";
            setTimeout(() => overlay.remove(), 200);
        }
    }

    static fire(options) {
        return new Promise((resolve) => {
            let resolved = false;
            const safeResolve = (val) => {
                if (!resolved) {
                    resolved = true;
                    resolve(val);
                }
            };

            const buttons = [];

            if (options.showCancelButton) {
                buttons.push({
                    text: options.cancelButtonText || "Cancel",
                    class: "oalert-btn-secondary",
                    action: () => {
                        OAlert.close();
                        safeResolve({ isConfirmed: false, isDismissed: true });
                    }
                });
            }

            buttons.push({
                text: options.confirmButtonText || "OK",
                class: "oalert-btn-primary",
                action: () => {
                    OAlert.close();
                    safeResolve({ isConfirmed: true });
                }
            });

            OAlert.show({
                title: options.title,
                text: options.text,
                html: options.html,
                icon: options.icon,
                subtext: options.footer || options.subtext || "",
                buttons: buttons
            });

            // auto close
            if (options.timer) {
                setTimeout(() => {
                    OAlert.close();
                    safeResolve({ isConfirmed: false, isDismissed: true, isTimeout: true });
                }, options.timer);
            }
        });
    }

    // icon SVGs
    static icons = {
        info: `<svg class="oalert-icon" viewBox="0 0 24 24" fill="#3498db"><circle cx="12" cy="12" r="10"/><rect x="11" y="10" width="2" height="7" fill="#fff"/><rect x="11" y="6" width="2" height="2" fill="#fff"/></svg>`,
        success: `<svg class="oalert-icon" viewBox="0 0 24 24" fill="#2ecc71"><circle cx="12" cy="12" r="10"/><polyline points="8,12 11,15 16,9" stroke="#fff" stroke-width="2" fill="none"/></svg>`,
        warning: `<svg class="oalert-icon" viewBox="0 0 24 24" fill="#f39c12"><circle cx="12" cy="12" r="10"/><rect x="11" y="7" width="2" height="7" fill="#fff"/><rect x="11" y="15" width="2" height="2" fill="#fff"/></svg>`,
        error: `<svg class="oalert-icon" viewBox="0 0 24 24" fill="#e74c3c"><circle cx="12" cy="12" r="10"/><line x1="9" y1="9" x2="15" y2="15" stroke="#fff" stroke-width="2"/><line x1="15" y1="9" x2="9" y2="15" stroke="#fff" stroke-width="2"/></svg>`,
        question: `<svg class="oalert-icon" viewBox="0 0 24 24" fill="#9b59b6"><circle cx="12" cy="12" r="10"/><text x="12" y="16" text-anchor="middle" font-size="12" fill="#fff">?</text></svg>`
    };
}