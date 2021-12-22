/**
 * @file AnalgesiaApi.js
 */

// Statics
import config from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

/**
 * 获取 patient ID 的 Analgesia 数据
 * @param options
 */
export function getAnalgesiaDataByPatientId(options) {

    if (!options?.params) {
        return;
    }

    const {patientId} = options.params;

    return Api.get({
        ...options,
        url: `${config.appBaseUrl}/analgesia/getAnalgesiaDataByPatientId/${patientId}`
    });

}

/**
 * 创建或更新 Analgesia 数据
 * @param options
 */
export function createOrUpdateAnalgesiaData(options) {

    if (!options?.params) {
        return;
    }

    const {patientId, analgesiaData} = options.params;

    return Api.post({
        ...options,
        url: `${config.appBaseUrl}/analgesia/createOrUpdateAnalgesiaData/${patientId}`,
        params: analgesiaData
    });

}
