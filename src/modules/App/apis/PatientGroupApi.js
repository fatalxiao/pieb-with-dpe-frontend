/**
 * @file PatientGroupApi.js
 */

// Statics
import {appBaseUrl} from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

/**
 * 获取 patient groups 数据
 * @param options
 * @returns {*}
 */
export function getPatientGroups(options) {
    return Api.get({
        ...options,
        url: `${appBaseUrl}/patientGroup/getPatientGroups`
    });
}
