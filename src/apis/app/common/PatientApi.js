/**
 * @file PatientApi.js
 */

// Statics
import {appBaseUrl} from 'src/config';

// Vendors
import Api from 'apis/Api';
import RequestManagement from 'apis/RequestManagement';

export default {

    /**
     * 获取用于列表的 patients 数据
     * @param options
     */
    getPatients(options) {
        Api.get({
            ...options,
            url: `${appBaseUrl}/patient/getPatients`,
            cancelable: false
        });
    },

    /**
     * 获取完整的 patients 数据
     * @param options
     */
    getFullPatients(options) {
        Api.get({
            ...options,
            url: `${appBaseUrl}/patient/getFullPatients`,
            cancelable: false
        });
    },

    /**
     * 更新 patient name
     * @param options
     */
    updatePatientName(options) {

        const name = `updatePatientName/${options.id}`;
        RequestManagement.cancelByName(name);

        Api.post({
            ...options,
            name,
            url: `${appBaseUrl}/patient/updatePatient`
        });

    },

    /**
     * 更新 patient group
     * @param options
     */
    updatePatientGroup(options) {
        Api.post({
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
        if (options?.params?.id) {
            Api.post({
                ...options,
                url: `${appBaseUrl}/patient/enable/${options.params.id}`,
                cancelable: false
            });
        }
    },

    /**
     * 禁用 patient
     * @param options
     */
    disablePatient(options) {
        if (options?.params?.id) {
            Api.post({
                ...options,
                url: `${appBaseUrl}/patient/disable/${options.params.id}`,
                cancelable: false
            });
        }
    }

};
