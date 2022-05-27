console.log('nite toast');

/**/
const NiteBsToasts = (function () {
    'use strict';

    const Constructor = function () {

        let bsLoadingToastEl = null;
        let bsLoadingToast = null;

        /**
         * PRIVATE INTERFACE
         */

        /**/
        const createToastElement = function (type, title, text) {

            let icon_color;
            switch (type) {
                case 'success':
                    icon_color = '#198754';
                    break;
                case 'warning':
                    icon_color = '#ffc107';
                    break;
                default:
                    icon_color = '#dc3545';
                    break;
            }

            let toastHtml = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="${icon_color}"></rect></svg>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" disabled aria-label="Close"></button>
            </div>
            <div class="toast-body">${text}</div>
            </div>`;

            const toastTemplate = document.createElement('template');
            toastTemplate.innerHTML = toastHtml;

            return toastTemplate.content.firstChild;
        }

        /**
         * PUBLIC INTERFACE
         */
        const publicAPIs = {};

        //Crea un toast di successo
        publicAPIs.successToast = function (title, msg) {

            const toastEl = createToastElement('success', title, msg);
            document.querySelector('.toast-container').appendChild(toastEl);

            const bsToast = new bootstrap.Toast(toastEl);
            bsToast.show();
        }

        //Crea un toast di errore
        publicAPIs.errorToast = function (title, msg) {

            const toastEl = createToastElement('error', title, msg);
            document.querySelector('.toast-container').appendChild(toastEl);

            const bsToast = new bootstrap.Toast(toastEl);
            bsToast.show();
        }

        //Mostra toast loading
        publicAPIs.showLoadingToast = function (title, msg) {

            publicAPIs.hideLoadingToast();

            bsLoadingToastEl = createToastElement('warning', title, msg);
            document.querySelector('.toast-container').appendChild(bsLoadingToastEl);

            bsLoadingToast = new bootstrap.Toast(bsLoadingToastEl, {
                animation: true,
                autohide: false
            });
            bsLoadingToast.show();
        }

        //Nasconde toast loading
        publicAPIs.hideLoadingToast = function () {

            if (bsLoadingToast != null) {
                bsLoadingToastEl.addEventListener('shown.bs.toast', function () {
                    bsLoadingToast.hide();
                });
                bsLoadingToast.hide();
            }
        }

        //Crea un toast di errore per ajax falliti
        publicAPIs.laravelErrorToast = function (title, errorsObj) {

            if (typeof errorsObj !== 'object') {
                errorsObj = JSON.parse(errorsObj);
            }
            if ('errors' in errorsObj) errorsObj = errorsObj.errors;

            let errorText = '<ul>';
            for (let p of Object.entries(errorsObj)) {
                errorText += '<li>' + p[1] + '</li>';
            }
            errorText += '</ul>';

            publicAPIs.errorToast(title, errorText);
        }

        return publicAPIs;

    };

    return Constructor;

})();

export {
    NiteBsToasts
};