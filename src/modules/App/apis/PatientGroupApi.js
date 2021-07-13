/**
 * @file PatientGroupApi.js
 */

// Statics
import {appBaseUrl} from 'src/config';

// Vendors
import Api from 'vendors/api/Api';

export default {

    /**
     * 获取 patient groups 数据
     */
    getPatientGroups() {
        return Api.get({
            url: `${appBaseUrl}/patientGroup/getPatientGroups`
        });
    }

};
