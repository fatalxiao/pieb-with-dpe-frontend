/**
 * @file AnalgesiaApi.js
 */

// Statics
import config from 'src/config';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取 patient ID 的 Analgesia 数据
     * @param options
     */
    getAnalgesiaDataByPatientId(options) {
        if (options?.params?.patientId) {
            Api.get({
                ...options,
                url: `${config.appBaseUrl}/analgesia/getAnalgesiaDataByPatientId/${options.params.patientId}`
            });
        }
    },

    /**
     * 创建或更新 Analgesia 数据
     * @param options
     */
    createOrUpdateAnalgesiaData(options) {
        if (options?.params?.patientId) {
            Api.post({
                ...options,
                url: `${config.appBaseUrl}/analgesia/createOrUpdateAnalgesiaData/${options.params.patientId}`,
                params: options.params?.analgesiaData,
                cancelable: false
            });
        }
    }

};
