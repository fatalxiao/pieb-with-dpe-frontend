/**
 * @file PatientApi.js
 */

// Statics
import config from 'src/config';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取 patient ID 的 Patient 数据
     * @param options
     */
    getPatientById(options) {
        if (options?.params?.id) {
            Api.get({
                ...options,
                url: `${config.appBaseUrl}/patient/getPatientById/${options.params.id}`
            });
        }
    },

    /**
     * 创建 Patient
     * @param options
     */
    createPatient(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/patient/createPatient`,
            cancelable: false
        });
    },

    /**
     * 创建或更新 Patient
     * @param options
     */
    createOrUpdatePatient(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/patient/createOrUpdatePatient`,
            cancelable: false
        });
    }

};
