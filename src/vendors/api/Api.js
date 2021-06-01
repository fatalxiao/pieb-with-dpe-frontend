/**
 * @file Api.js
 */

// Vendors
import RequestManagement from './RequestManagement';

/**
 * 调用 ajax
 * @param method
 * @param name
 * @param url
 * @param params
 * @param formData
 * @param cancelable
 * @param header
 * @param contentType
 * @param isUpload
 * @param successCallback
 * @param failureCallback
 */
function ajax(method, {
    name, url, params, formData, cancelable, header, contentType, isUpload,
    successCallback, failureCallback
}) {

    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    let body;
    if (params) {

        if (isUpload) {
            body = new FormData(formData);
        } else {
            xhr.setRequestHeader('Content-type', contentType || 'application/json');
            body = JSON.stringify(params);
        }

    }

    if (header) {
        Object.entries(header).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    }

    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

            let response = xhr.responseText;

            if (xhr.status === 500) {
                failureCallback?.(xhr, response);
                return;
            }

            try {
                response = JSON.parse(response);
            } catch (e) {
                failureCallback?.(xhr);
                return;
            }

            if (parseInt(`${response.code / 1000}`, 10) === 2) {
                successCallback?.(xhr, response, response.data);
            } else {
                failureCallback?.(xhr, response, response.data);
            }

        }

    };

    // add request to cancelable list if it's cancelable
    if (cancelable !== false) {
        RequestManagement.add({
            name,
            url,
            xhr
        });
    }

    xhr.send(body);

}

/**
 * ajax get
 * @param options
 */
function get(options) {
    ajax('GET', options);
}

/**
 * ajax post
 * @param options
 */
function post(options) {
    ajax('POST', options);
}

/**
 * ajax put
 * @param options
 */
function put(options) {
    ajax('PUT', options);
}

/**
 * ajax delete
 * @param options
 */
function del(options) {
    ajax('DELETE', options);
}

/**
 * ajax post form
 * @param options
 */
function postForm(options) {
    ajax('POST', {
        ...options,
        isUpload: true
    });
}

export default {
    get,
    post,
    put,
    del,
    postForm
};
