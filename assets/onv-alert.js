class OnvAlert {
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
            blur: false
        };
        this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'onv-alert-container';
        document.body.appendChild(container);
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
        toast.className = `onv-alert ${options.positionClass} ${options.icon}`;

        toast.innerHTML = `
      <div class="onv-alert-icon"></div>
      <div class="onv-alert-content">
        ${options.title ? `<div class="onv-alert-title">${options.title}</div>` : ''}
        <div class="onv-alert-message">${options.text}</div>
      </div>
      ${options.closeButton ? '<button class="onv-alert-close">×</button>' : ''}
    `;

        const container = document.getElementById('onv-alert-container');
        container.appendChild(toast);

        if (options.closeButton) {
            const closeButton = toast.querySelector('.onv-alert-close');
            closeButton.addEventListener('click', () => this.close(toast, options.blur));
        }

        toast.style.animation = `fadeIn ${options.showDuration}ms`;

        if (options.timeOut !== "0") {
            setTimeout(() => this.close(toast, options.blur), parseInt(options.timeOut));
        }
    }

    createBlurOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'blur-overlay';
        document.body.appendChild(overlay);
    }

    close(toast, hasBlur) {
        toast.style.animation = `fadeOut ${this.defaultOptions.hideDuration}ms`;
        setTimeout(() => {
            toast.remove();
            if (hasBlur) {
                const overlay = document.querySelector('.blur-overlay');
                if (overlay) overlay.remove();
            }
        }, parseInt(this.defaultOptions.hideDuration));
    }
}

const onvAlert = new OnvAlert();