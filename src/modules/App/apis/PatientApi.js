/**
 * @file PatientApi.js
 */

// Statics
import config from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

/**
 * 获取 patient ID 的 Patient 数据
 * @param options
 */
export function getPatientById(options) {

    if (!options?.params) {
        return;
    }

    const {id} = options.params;

    return Api.get({
        ...options,
        url: `${config.appBaseUrl}/patient/getPatientById/${id}`
    });

}

/**
 * 创建 Patient
 * @param options
 */
export function createPatient(options) {
    return Api.post({
        ...options,
        url: `${config.appBaseUrl}/patient/createPatient`
    });
}

/**
 * 创建或更新 Patient
 * @param options
 */
export function createOrUpdatePatient(options) {
    return Api.post({
        ...options,
        url: `${config.appBaseUrl}/patient/createOrUpdatePatient`
    });
}
