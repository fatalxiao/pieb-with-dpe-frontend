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
     * @param params
     */
    getAnalgesiaDataByPatientId(params) {
        return Api.get({
            url: `${config.appBaseUrl}/analgesia/getAnalgesiaDataByPatientId/${params?.patientId}`
        });
    },

    /**
     * 创建或更新 Analgesia 数据
     * @param params
     */
    createOrUpdateAnalgesiaData(params) {
        return Api.post({
            url: `${config.appBaseUrl}/analgesia/createOrUpdateAnalgesiaData/${params?.patientId}`,
            params: params?.analgesiaData
        });
    }

};
