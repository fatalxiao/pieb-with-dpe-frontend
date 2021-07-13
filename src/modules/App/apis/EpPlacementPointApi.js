/**
 * @file EpPlacementPointApi.js
 */

// Statics
import {appBaseUrl} from 'src/config';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取所有的 Ep Placement Point
     * @param options
     */
    getEpPlacementPoints(options) {
        return Api.get({
            ...options,
            url: `${appBaseUrl}/epPlacementPoint/getEPPlacementPoints`,
        });
    }

};
