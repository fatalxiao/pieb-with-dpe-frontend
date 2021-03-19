/**
 * @file EpPlacementPointApi.js
 */

// Statics
import {appBaseUrl} from 'src/config';

// Vendors
import Api from 'apis/Api';

export default {

    /**
     * 获取所有的 Ep Placement Point
     * @param options
     */
    getEpPlacementPoints(options) {
        Api.get({
            ...options,
            url: `${appBaseUrl}/epPlacementPoint/getEPPlacementPoints`,
            cancelable: false
        });
    }

};
