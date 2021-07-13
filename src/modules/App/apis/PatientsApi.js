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
     */
    getPatients() {
        return Api.get({
            url: `${appBaseUrl}/patient/getPatients`
        });
    },

    /**
     * 获取完整的 patients 数据
     */
    getFullPatients() {
        return Api.get({
            url: `${appBaseUrl}/patient/getFullPatients`
        });
    },

    /**
     * 更新 patient name
     * @param params
     */
    updatePatientName(params) {

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const name = `updatePatientName/${params?.id}`;
        RequestManagement.cancelByName(name);

        return Api.post({
            name,
            url: `${appBaseUrl}/patient/updatePatient`,
            source
        });

    },

    /**
     * 更新 patient group
     */
    updatePatientGroup(params) {
        return Api.post({
            url: `${appBaseUrl}/patient/updatePatient`,
            params
        });
    },

    /**
     * 启用 patient
     * @param params
     */
    enablePatient(params) {
        return Api.post({
            url: `${appBaseUrl}/patient/enable/${params?.patientId}`
        });
    },

    /**
     * 禁用 patient
     * @param params
     */
    disablePatient(params) {
        return Api.post({
            url: `${appBaseUrl}/patient/disable/${params?.patientId}`
        });
    }

};
