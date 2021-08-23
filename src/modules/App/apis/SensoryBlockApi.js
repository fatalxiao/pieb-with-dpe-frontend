/**
 * @file SensoryBlockApi.js
 */

// Statics
import {appBaseUrl} from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取所有的 Sensory Block 数据
     * @param options
     * @returns {*}
     */
    getSensoryBlocks(options) {
        return Api.get({
            ...options,
            url: `${appBaseUrl}/sensoryBlock/getSensoryBlocks`
        });
    }

};
