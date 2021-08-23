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
     * @param options
     */
    getObservalDataByPatientId(options) {

        if (!options?.params) {
            return;
        }

        const {patientId} = options.params;

        return Api.get({
            ...options,
            url: `${config.appBaseUrl}/observal/getObservalDataByPatientId/${patientId}`
        });

    },

    /**
     * 创建或更新 Observal 数据
     * @param options
     */
    createOrUpdateObservalData(options) {

        if (!options?.params) {
            return;
        }

        const {patientId, observalData} = options.params;

        return Api.post({
            url: `${config.appBaseUrl}/observal/createOrUpdateObservalData/${patientId}`,
            params: observalData
        });

    }

};
