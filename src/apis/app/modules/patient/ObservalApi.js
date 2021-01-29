/**
 * @file ObservalApi.js
 */

// Statics
import config from 'src/config';

// Vendors
import Api from 'apis/Api';

export default {

    /**
     * 获取 patient ID 的 Observal 数据
     * @param options
     */
    getObservalDataByPatientId(options) {
        if (options?.params?.patientId) {
            Api.get({
                ...options,
                url: `${config.appBaseUrl}/observal/getObservalDataByPatientId/${options.params.patientId}`
            });
        }
    },

    /**
     * 创建或更新 Observal 数据
     * @param options
     */
    createOrUpdateObservalData(options) {
        if (options?.params?.patientId) {
            Api.post({
                ...options,
                url: `${config.appBaseUrl}/observal/createOrUpdateObservalData/${options.params.patientId}`,
                params: options.params?.observalData,
                cancelable: false
            });
        }
    }

};
