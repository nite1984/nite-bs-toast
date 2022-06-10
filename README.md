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
});
```