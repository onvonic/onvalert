class OToast {
    constructor() {
        this.defaultOptions = {
            title: "",
            text: "",
            icon: "info",
            closeButton: true,
            positionClass: "toast-top-right",
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            blur: false,
            showTimestamp: false
        };
        this.createContainer();
    }

    createContainer() {
        if (!document.getElementById('onv-toast-container')) {
            const container = document.createElement('div');
            container.id = 'onv-toast-container';
            document.body.appendChild(container);
        }
    }

    options(opts) {
        const mergedOptions = {
            ...this.defaultOptions,
            ...opts
        };
        this.show(mergedOptions);
    }

    show(options) {
        if (options.blur) {
            this.createBlurOverlay();
        }

        const toast = document.createElement('div');
        toast.className = `onv-toast ${options.positionClass} ${options.icon}`;

        // Get icon color based on type
        const iconColors = {
            info: "#22d3ee",
            success: "#047857",
            error: "#b91c1c",
            warning: "#fbbf24",
            question: "#1d4ed8"
        };

        const currentColor = iconColors[options.icon] || iconColors.info;

        // Icon SVG with dynamic color
        let iconSvg = "";
        if (options.icon === "info") {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${currentColor}" stroke="none"></circle>
                <line stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="12" y2="16"></line>
                <line stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="8"></line>
            </svg>`;
        }
        if (options.icon === "success") {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${currentColor}" stroke="none"></circle>
                <path d="M8 12l2.5 2.5L16 9" stroke="#ffffff" stroke-width="2" fill="none"/>
            </svg>`;
        }
        if (options.icon === "error") {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${currentColor}" stroke="none"></circle>
                <line x1="9" y1="9" x2="15" y2="15" stroke="#ffffff" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>`;
        }
        if (options.icon === "warning") {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${currentColor}" stroke="none"></circle>
                <line x1="12" y1="8" x2="12" y2="14" stroke="#ffffff" stroke-width="2"/>
                <circle cx="12" cy="17" r="1" fill="#ffffff"/>
            </svg>`;
        }
        if (options.icon === "question") {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${currentColor}" stroke="none"></circle>
                <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" stroke="#ffffff" stroke-width="2" fill="none"/>
                <circle cx="12" cy="17" r="1" fill="#ffffff"/>
            </svg>`;
        }

        // Generate timestamp if needed
        const timestamp = options.showTimestamp ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        // Use the new structured layout
        toast.innerHTML = `
            <div class="onv-toast-header">
                <div class="onv-toast-icon-wrapper">
                    ${iconSvg}
                </div>
                <strong class="onv-toast-type">${options.icon}</strong>
                ${timestamp ? `<small class="onv-toast-time">${timestamp}</small>` : ''}
                ${options.closeButton ? '<button class="onv-toast-close">×</button>' : ''}
            </div>
            <div class="onv-toast-body">
                ${options.title ? options.title : options.text}
            </div>
        `;

        // Set initial state sebelum ditambahkan ke DOM
        toast.style.opacity = '0';
        toast.style.transform = this.getInitialTransform(options.positionClass);
        toast.style.transition = `all ${options.showDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

        const container = document.getElementById('onv-toast-container');
        container.appendChild(toast);

        if (options.closeButton) {
            const closeButton = toast.querySelector('.onv-toast-close');
            closeButton.addEventListener('click', () => this.close(toast, options.blur));
        }

        // Trigger animasi show setelah element ditambahkan ke DOM
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = this.getFinalTransform(options.positionClass);
        });

        if (options.timeOut !== "0") {
            setTimeout(() => this.close(toast, options.blur), parseInt(options.timeOut));
        }
    }

    getInitialTransform(positionClass) {
        const transforms = {
            'toast-top-right': 'translateX(100%)',
            'toast-top-left': 'translateX(-100%)', 
            'toast-top-center': 'translateX(-50%) translateY(-30px)',
            'toast-bottom-right': 'translateX(100%)',
            'toast-bottom-left': 'translateX(-100%)',
            'toast-bottom-center': 'translateX(-50%) translateY(30px)',
            'toast-center-middle': 'translate(-50%, -50%) scale(0.9)'
        };
        return transforms[positionClass] || 'translateX(100%)';
    }

    getFinalTransform(positionClass) {
        const transforms = {
            'toast-top-right': 'translateX(0)',
            'toast-top-left': 'translateX(0)',
            'toast-top-center': 'translateX(-50%)',
            'toast-bottom-right': 'translateX(0)',
            'toast-bottom-left': 'translateX(0)',
            'toast-bottom-center': 'translateX(-50%)',
            'toast-center-middle': 'translate(-50%, -50%) scale(1)'
        };
        return transforms[positionClass] || 'translateX(0)';
    }

    createBlurOverlay() {
        if (!document.querySelector('.blur-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'blur-overlay';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 300ms ease';
            document.body.appendChild(overlay);
            
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
        }
    }

    close(toast, hasBlur) {
        const hideDuration = parseInt(this.defaultOptions.hideDuration);
        
        toast.style.transition = `all ${hideDuration}ms cubic-bezier(0.7, 0, 0.84, 0)`;
        toast.style.opacity = '0';
        toast.style.transform = this.getHideTransform(toast.className);

        setTimeout(() => {
            toast.remove();
            if (hasBlur) {
                const overlay = document.querySelector('.blur-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 300);
                }
            }
        }, hideDuration);
    }

    getHideTransform(className) {
        if (className.includes('toast-top-right') || className.includes('toast-bottom-right')) {
            return 'translateX(100%)';
        }
        if (className.includes('toast-top-left') || className.includes('toast-bottom-left')) {
            return 'translateX(-100%)';
        }
        if (className.includes('toast-top-center')) {
            return 'translateX(-50%) translateY(-30px)';
        }
        if (className.includes('toast-bottom-center')) {
            return 'translateX(-50%) translateY(30px)';
        }
        if (className.includes('toast-center-middle')) {
            return 'translate(-50%, -50%) scale(0.9)';
        }
        return 'translateY(-30px)';
    }
}

// ✅ instance global, bisa dipakai langsung di HTML
const oToast = new OToast();