/**
 * @file PatientsApi.js
 */

// Statics
import {appBaseUrl} from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';
import RequestManagement from 'vendors/api/RequestManagement';

/**
 * 获取用于列表的 patients 数据
 * @param options
 * @returns {*}
 */
export function getPatients(options) {
    return Api.get({
        ...options,
        url: `${appBaseUrl}/patient/getPatients`
    });
}

/**
 * 获取完整的 patients 数据
 * @param options
 * @returns {*}
 */
export function getFullPatients(options) {
    return Api.get({
        ...options,
        url: `${appBaseUrl}/patient/getFullPatients`
    });
}

/**
 * 更新 patient name
 * @param options
 */
export function updatePatientName(options) {

    if (!options?.params) {
        return;
    }

    const {id} = options.params;

    const name = `updatePatientName/${id}`;
    RequestManagement.cancelByName(name);

    return Api.post({
        ...options,
        name,
        url: `${appBaseUrl}/patient/updatePatient`,
        cancelable: true
    });

}

/**
 * 更新 patient group
 * @param options
 * @returns {*}
 */
export function updatePatientGroup(options) {
    return Api.post({
        ...options,
        url: `${appBaseUrl}/patient/updatePatient`
    });
}

/**
 * 启用 patient
 * @param options
 */
export function enablePatient(options) {

    if (!options?.params) {
        return;
    }

    const {patientId} = options.params;

    return Api.post({
        ...options,
        url: `${appBaseUrl}/patient/enable/${patientId}`
    });

}

/**
 * 禁用 patient
 * @param options
 */
export function disablePatient(options) {

    if (!options?.params) {
        return;
    }

    const {patientId} = options.params;

    return Api.post({
        ...options,
        url: `${appBaseUrl}/patient/disable/${patientId}`
    });

}
