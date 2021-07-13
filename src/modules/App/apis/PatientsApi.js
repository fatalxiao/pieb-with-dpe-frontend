/**
 * @file PatientApi.js
 */

// Statics
import {appBaseUrl} from 'src/config';

// Vendors
import axios from 'axios';
import Api from 'vendors/api/Api';
import RequestManagement from 'vendors/api/RequestManagement';

export default {

    /**
     * 获取用于列表的 patients 数据
     * @param options
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

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const name = `updatePatientName/${options?.id}`;
        RequestManagement.cancelByName(name);

        return Api.post({
            ...options,
            name,
            url: `${appBaseUrl}/patient/updatePatient`,
            source
        });

    },

    /**
     * 更新 patient group
     * @param options
     */
    updatePatientGroup(options) {
        return Api.post({
            ...options,
            url: `${appBaseUrl}/patient/updatePatient`,
            cancelable: false
        });
    },

    /**
     * 启用 patient
     * @param options
     */
    enablePatient(options) {
        return Api.post({
            ...options,
            url: `${appBaseUrl}/patient/enable/${options?.params?.id}`,
            cancelable: false
        });
    },

    /**
     * 禁用 patient
     * @param options
     */
    disablePatient(options) {
        return Api.post({
            ...options,
            url: `${appBaseUrl}/patient/disable/${options?.params?.id}`,
            cancelable: false
        });
    }

};
