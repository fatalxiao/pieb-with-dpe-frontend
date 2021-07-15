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
 * @param cancelable
 */
function request(method, {
    name, url, params, header, contentType, cancelable
}) {

    const config = {
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
            null
    };

    // add request to cancelable list if it's cancelable
    if (cancelable) {

        const source = axios.CancelToken.source();

        RequestManagement.add({
            name,
            url,
            source
        });

        config.cancelToken = source?.token;

    }

    return axios(config);

}

/**
 * ajax get
 * @param options
 */
function get(options) {
    return request('get', options);
}

/**
 * ajax post
 * @param options
 */
function post(options) {
    return request('post', options);
}

export default {
    get,
    post
};
