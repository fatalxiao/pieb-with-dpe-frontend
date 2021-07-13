/**
 * @file Api.js
 */

// Vendors
import axios from 'axios';
import RequestManagement from './RequestManagement';

/**
 * 调用 ajax
 * @param method
 * @param name
 * @param url
 * @param params
 * @param header
 * @param contentType
 * @param source
 */
function request(method, {
    name, url, params, header, contentType, source
}) {

    // const xhr = new XMLHttpRequest();
    //
    // xhr.open(method, url, true);
    //
    // let body;
    // if (params) {
    //
    //     if (isUpload) {
    //         body = new FormData(formData);
    //     } else {
    //         xhr.setRequestHeader('Content-type', contentType || 'application/json');
    //         body = JSON.stringify(params);
    //     }
    //
    // }
    //
    // if (header) {
    //     Object.entries(header).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    // }
    //
    // xhr.onreadystatechange = () => {
    //
    //     if (xhr.readyState === 4) {
    //
    //         let response = xhr.responseText;
    //
    //         if (xhr.status === 500) {
    //             failureCallback?.(xhr, response);
    //             return;
    //         }
    //
    //         try {
    //             response = JSON.parse(response);
    //         } catch (e) {
    //             failureCallback?.(xhr);
    //             return;
    //         }
    //
    //         if (parseInt(`${response.code / 1000}`, 10) === 2) {
    //             successCallback?.(xhr, response, response.data);
    //         } else {
    //             failureCallback?.(xhr, response, response.data);
    //         }
    //
    //     }
    //
    // };
    //
    // // add request to cancelable list if it's cancelable
    // if (cancelable !== false) {
    //     RequestManagement.add({
    //         name,
    //         url,
    //         xhr
    //     });
    // }
    //
    // xhr.send(body);

    // add request to cancelable list if it's cancelable
    if (source) {
        RequestManagement.add({
            name,
            url,
            source
        });
    }

    return axios({
        method,
        url,
        headers: {
            ...header,
            'Content-type': contentType || 'application/json'
        },
        params: method === 'get' ?
            params
            :
            null,
        data: method === 'post' ?
            params
            :
            null,
        cancelToken: source?.token || null
    });

}

/**
 * ajax get
 * @param options
 */
function get(options) {
    return request('get', options);
    // return axios.get(options.url, {
    //     params: options.params
    // });
}

/**
 * ajax post
 * @param options
 */
function post(options) {
    return request('post', options);
    // return axios.post(options.url, {
    //     data: options.params
    // });
}

export default {
    get,
    post
};
