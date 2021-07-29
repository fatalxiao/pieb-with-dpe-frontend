/**
 * @file ObservalApi.js
 */

// Statics
import config from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取 patient ID 的 Observal 数据
     * @param params
     */
    getObservalDataByPatientId(params) {
        return Api.get({
            url: `${config.appBaseUrl}/observal/getObservalDataByPatientId/${params?.patientId}`
        });
    },

    /**
     * 创建或更新 Observal 数据
     * @param params
     */
    createOrUpdateObservalData(params) {
        return Api.post({
            url: `${config.appBaseUrl}/observal/createOrUpdateObservalData/${params?.patientId}`,
            params: params?.observalData
        });
    }

};
