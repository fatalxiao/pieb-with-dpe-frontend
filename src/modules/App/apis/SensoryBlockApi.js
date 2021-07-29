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
     */
    getSensoryBlocks() {
        return Api.get({
            url: `${appBaseUrl}/sensoryBlock/getSensoryBlocks`
        });
    }

};
