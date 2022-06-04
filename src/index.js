/**/
const niteBsToast = (function () {
    'use strict';

    const defaults = {
        toastContainerSelector: '.toast-container',
    };

    let settings = Object.assign({}, defaults, {});

    let bsLoadingToastEl = null;
    let bsLoadingToast = null;

    /**/
    const createToastElement = function (type, title, text) {

        let iconColor;
        switch (type) {
            case 'success':
                iconColor = '#198754';
                break;
            case 'warning':
                iconColor = '#ffc107';
                break;
            default:
                iconColor = '#dc3545';
                break;
        }

        let toastHtml = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="${iconColor}"></rect></svg>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="toast-body">${text}</div>
            </div>`;

        const toastTemplate = document.createElement('template');
        toastTemplate.innerHTML = toastHtml;

        return toastTemplate.content.firstChild;
    }

    /**/
    const niteBsToast = {};

    //Crea un toast di successo
    niteBsToast.successToast = function (title, msg) {

        const toastEl = createToastElement('success', title, msg);
        document.querySelector(settings.toastContainerSelector).appendChild(toastEl);

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }

    //Crea un toast di errore
    niteBsToast.errorToast = function (title, msg) {

        const toastEl = createToastElement('error', title, msg);
        document.querySelector(settings.toastContainerSelector).appendChild(toastEl);

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }

    //Mostra toast loading
    niteBsToast.showLoadingToast = function (title, msg) {

        niteBsToast.hideLoadingToast();

        bsLoadingToastEl = createToastElement('warning', title, msg);
        document.querySelector(settings.toastContainerSelector).appendChild(bsLoadingToastEl);

        bsLoadingToast = new bootstrap.Toast(bsLoadingToastEl, {
            animation: true,
            autohide: false
        });
        bsLoadingToast.show();
    }

    //Nasconde toast loading
    niteBsToast.hideLoadingToast = function () {

        if (bsLoadingToast != null) {
            bsLoadingToastEl.addEventListener('shown.bs.toast', function () {
                bsLoadingToast.hide();
            });
            bsLoadingToast.hide();
        }
    }

    //Crea un toast di errore per ajax falliti
    niteBsToast.laravelErrorToast = function (title, errorsObj) {

        if (typeof errorsObj !== 'object') {
            errorsObj = JSON.parse(errorsObj);
        }
        if ('errors' in errorsObj) errorsObj = errorsObj.errors;

        let errorText = '<ul>';
        for (let p of Object.entries(errorsObj)) {
            errorText += '<li>' + p[1] + '</li>';
        }
        errorText += '</ul>';

        niteBsToast.errorToast(title, errorText);
    }

    /**/
    niteBsToast.settings = function (options) {
        settings = Object.assign({}, defaults, options);
    }

    return niteBsToast;
})();

module.exports = niteBsToast;