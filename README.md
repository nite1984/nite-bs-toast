# nite-bs-toasts

# Install

```
npm i @nite1984/nite-bs-toast
```

```
import niteBsToast from '@nite1984/nite-bs-toast';

window.niteBsToast = niteBsToast;
```

# Usage

```
//Define a container for the toasts in your html template
<div class="toast-container"></div>

niteBsToast.successToast('ok', 'msg');
niteBsToast.errorToast('ok', 'msg');
niteBsToast.laravelErrorToast('error', laravelResponseErrorsObj);

niteBsToast.showLoadingToast('ok', 'msg');
niteBsToast.hideLoadingToast();

//In case you want to customize the selector for the toast container
niteBsToast.settings({
    toastContainerSelector: '.toast-container',
    toastHtmlTemplate: `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header p-0">
            <div style="border-left: 15px solid {{iconColor}};">
                <div class="p-2 d-flex align-items-center">
                    <strong>{{title}}</strong>
                    <button type="button" class="btn-close mx-0" aria-label="Close" data-bs-dismiss="toast"></button>
                </div>
            </div>    
        </div>
        <div class="toast-body bg-white">{{text}}</div>
        </div>`
});
```