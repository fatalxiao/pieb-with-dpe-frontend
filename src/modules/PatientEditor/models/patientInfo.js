/**
 * @file patientInfo.js
 */

/**
 * 默认的表单信息
 * @type {{}}
 */
const DEFAULT_FORM = {
    group: null,
    id: '',
    name: '',
    age: '',
    gestationalDaysWeeks: '',
    gestationalDaysDays: '',
    height: '',
    weight: '',
    heartRate: '',
    initialVasScore: '',
    systolicBloodPressure: '',
    diastolicBloodPressure: '',
    fetalHeartRate: '',
    pulseOxygenSaturation: '',
    cervicalDilationAtTimeOfEA: '',
    hasOxytocinAtTimeOfEA: false,
    hasInduction: false,
    status: 1,
    description: ''
};

export default {
    nameSpace: 'patientInfo',
    state: {

        form: {...DEFAULT_FORM},

        getActionType: '',
        updateActionType: ''

    },
    actions: {

        /**
         * 重置数据
         * @returns {function(*): *}
         */
        resetPatientData: () => dispatch => dispatch({
            type: 'resetData'
        })

    },
    reducers: {}
};
