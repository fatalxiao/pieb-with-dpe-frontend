/**
 * @file ObservalEndPointApi.js
 */

// Statics
import {appBaseUrl} from 'src/config';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取所有的 Observal End Point
     * @param options
     */
    getObservalEndPoints(options) {
        return Api.get({
            ...options,
            url: `${appBaseUrl}/observalEndPoint/getObservalEndPoints`,
        });
    }

};
