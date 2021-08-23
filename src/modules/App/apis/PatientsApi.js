/**
 * @file PatientApi.js
 */

// Statics
import {appBaseUrl} from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';
import RequestManagement from 'vendors/api/RequestManagement';

export default {

    /**
     * 获取用于列表的 patients 数据
     * @param options
     * @returns {*}
     */
    getPatients(options) {
        return Api.get({
            ...options,
            url: `${appBaseUrl}/patient/getPatients`
        });
    },

    /**
     * 获取完整的 patients 数据
     * @param options
     * @returns {*}
     */
    getFullPatients(options) {
        return Api.get({
            ...options,
            url: `${appBaseUrl}/patient/getFullPatients`
        });
    },

    /**
     * 更新 patient name
     * @param options
     */
    updatePatientName(options) {

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

    },

    /**
     * 更新 patient group
     * @param options
     * @returns {*}
     */
    updatePatientGroup(options) {
        return Api.post({
            ...options,
            url: `${appBaseUrl}/patient/updatePatient`
        });
    },

    /**
     * 启用 patient
     * @param options
     */
    enablePatient(options) {

        if (!options?.params) {
            return;
        }

        const {patientId} = options.params;

        return Api.post({
            ...options,
            url: `${appBaseUrl}/patient/enable/${patientId}`
        });

    },

    /**
     * 禁用 patient
     * @param options
     */
    disablePatient(options) {

        if (!options?.params) {
            return;
        }

        const {patientId} = options.params;

        return Api.post({
            ...options,
            url: `${appBaseUrl}/patient/disable/${patientId}`
        });

    }

};
