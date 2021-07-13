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
     */
    getObservalEndPoints() {
        return Api.get({
            url: `${appBaseUrl}/observalEndPoint/getObservalEndPoints`
        });
    }

};
