/**
 * @file PatientApi.js
 */

// Statics
import config from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取 patient ID 的 Patient 数据
     * @param params
     */
    getPatientById(params) {
        return Api.get({
            url: `${config.appBaseUrl}/patient/getPatientById/${params?.id}`
        });
    },

    /**
     * 创建 Patient
     */
    createPatient(params) {
        return Api.post({
            url: `${config.appBaseUrl}/patient/createPatient`,
            params
        });
    },

    /**
     * 创建或更新 Patient
     */
    createOrUpdatePatient(params) {
        return Api.post({
            url: `${config.appBaseUrl}/patient/createOrUpdatePatient`,
            params
        });
    }

};
