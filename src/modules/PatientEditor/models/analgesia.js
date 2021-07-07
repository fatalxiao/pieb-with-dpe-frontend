/**
 * @file analgesia.js
 */

// Apis
import AnalgesiaApi from 'modules/PatientEditor/apis/AnalgesiaApi';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

/**
 * 每一行的默认数据
 * @type {{}}
 */
const BASE_DATA = {
    vasScore: '',
    thoracicSensoryBlockLeft: null,
    thoracicSensoryBlockRight: null,
    sacralSensoryBlockLeft: null,
    sacralSensoryBlockRight: null,
    bromageScore: '',
    systolicBloodPressure: '',
    diastolicBloodPressure: '',
    heartRate: '',
    fetalHeartRate: ''
};

/**
 * 默认的时间节点
 * @type {number[]}
 */
const DEFAULT_TIME_POINTS = [
    0, 20, 60, 2 * 60, 3 * 60, 4 * 60, 5 * 60, 6 * 60
];

/**
 * 获取默认的数据
 * @param timePoints
 * @returns {[]}
 */
export function getDefaultData(timePoints = DEFAULT_TIME_POINTS) {
    return timePoints.map(timePoint => ({
        ...BASE_DATA,
        timePoint
    }));
}

/**
 * 格式化 Sensory Block
 * @param keys
 * @param item
 * @param result
 */
export const formatSensoryBlock = (keys, item, result) => () => {
    for (let key of keys) {
        result[`${key}Value`] = item[key] ? item[key].value : null;
    }
};

/**
 * 格式化 Analgesia 数据
 * @param data
 * @param baseData
 * @returns {*}
 */
export const formatAnalgesiaData = (data, baseData) => () => data.filter(item => {

    if (!item) {
        return false;
    }

    // eslint-disable-next-line no-unused-vars
    const {timePoint, ...restItem} = item;

    return JSON.stringify(restItem) !== JSON.stringify(baseData);

}).map(item => {

    const result = {
        timePoint: item.timePoint,
        vasScore: item.vasScore,
        bromageScore: item.bromageScore,
        systolicBloodPressure: item.systolicBloodPressure,
        diastolicBloodPressure: item.diastolicBloodPressure,
        heartRate: item.heartRate,
        fetalHeartRate: item.fetalHeartRate
    };

    formatSensoryBlock([
        'thoracicSensoryBlockLeft',
        'thoracicSensoryBlockRight',
        'sacralSensoryBlockLeft',
        'sacralSensoryBlockRight'
    ], item, result)();

    return result;

});

export default {
    nameSpace: 'analgesia',
    state: {

        BASE_DATA,

        data: getDefaultData(),

        getActionType: null,
        updateActionType: null

    },
    apis: {

        /**
         * 获取某个 patientId 的 Analgesia 数据
         * @param patientId
         * @returns {function(*): *}
         */
        getAnalgesia: ({patientId}) => dispatchApi => dispatchApi({
            api: AnalgesiaApi.getAnalgesiaDataByPatientId,
            params: {patientId},
            successResMsgDisabled: true
        }),

        /**
         * 创建或更新 Analgesia 数据
         * @param patientId
         * @param callback
         * @param successResMsgDisabled
         * @returns {function(*, *, *): *}
         */
        createOrUpdateAnalgesiaData: ({
            patientId,
            callback,
            successResMsgDisabled
        }) => (dispatchApi, ispatch, getState) => {

            const {analgesia} = getState(),
                {data} = analgesia;

            if (!patientId || !data) {
                return;
            }

            return dispatchApi({
                api: AnalgesiaApi.createOrUpdateAnalgesiaData,
                params: {
                    patientId,
                    analgesiaData: formatAnalgesiaData(data, analgesia.BASE_DATA)()
                },
                successResMsgDisabled,
                successCallback() {
                    callback?.();
                }
            });

        }

    },
    globalReducers: {

        /**
         * 重置数据
         * @param state
         * @returns {*&{data: *[]}}
         */
        resetData: state => {
            return {
                ...state,
                data: getDefaultData()
            };
        }

    },
    reducers: {

        /**
         * 追加新的时间节点
         * @param state
         * @returns {{}}
         */
        appendTimePoint: state => {

            const {data} = state;

            return {
                ...state,
                data: [
                    ...state.data, {
                        ...BASE_DATA,
                        timePoint: data[data.length - 1].timePoint + 60
                    }
                ]
            };

        },

        /**
         * 更新 Analgesia 数据某个时间节点的某个字段
         * @param state
         * @param timePoint
         * @param fieldName
         * @param fieldValue
         * @returns {*&{data}}
         */
        updateAnalgesiaDataField: (state, {timePoint, fieldName, fieldValue}) => {

            const data = cloneDeep(state.data),
                updateItem = data.find(item => item.timePoint === timePoint);

            if (updateItem) {
                updateItem[fieldName] = fieldValue;
            }

            if ((
                    fieldName === 'thoracicSensoryBlockLeft' || fieldName === 'thoracicSensoryBlockRight'
                    || fieldName === 'sacralSensoryBlockLeft' || fieldName === 'sacralSensoryBlockRight'
                )
                && !fieldValue.value
            ) {
                updateItem[fieldName] = null;
            } else {
                if (fieldName === 'thoracicSensoryBlockLeft' && !updateItem.thoracicSensoryBlockRight) {
                    updateItem.thoracicSensoryBlockRight = fieldValue;
                } else if (fieldName === 'thoracicSensoryBlockRight' && !updateItem.thoracicSensoryBlockLeft) {
                    updateItem.thoracicSensoryBlockLeft = fieldValue;
                } else if (fieldName === 'sacralSensoryBlockLeft' && !updateItem.sacralSensoryBlockRight) {
                    updateItem.sacralSensoryBlockRight = fieldValue;
                } else if (fieldName === 'sacralSensoryBlockRight' && !updateItem.sacralSensoryBlockLeft) {
                    updateItem.sacralSensoryBlockLeft = fieldValue;
                }
            }

            return {
                ...state,
                data
            };

        },

        /**
         * 获取某个 patientId 的 Analgesia 数据
         * @param state
         * @returns {*&{getActionType: string}}
         */
        getAnalgesiaRequest: state => {
            return {
                ...state,
                getActionType: 'analgesia/getAnalgesiaRequest'
            };
        },
        getAnalgesiaSuccess: (state, {responseData}) => {

            const data = getDefaultData();

            if (responseData?.length > 0) {

                for (let resItem of responseData) {

                    const item = data.find(a => a.timePoint === resItem.timePoint);

                    if (item) {
                        Object.assign(item, resItem);
                    } else {

                        let timePoint = DEFAULT_TIME_POINTS[DEFAULT_TIME_POINTS.length - 1];

                        while (timePoint < resItem.timePoint) {

                            timePoint += 60;

                            if (timePoint >= resItem.timePoint) {
                                data.push(Object.assign({...BASE_DATA, timePoint}, resItem));
                            } else {
                                // eslint-disable-next-line no-loop-func
                                const i = data.findIndex(a => a?.timePoint === timePoint);
                                if (i < 0) {
                                    data.push({...BASE_DATA, timePoint});
                                }
                            }

                        }
                    }
                }
            }

            return {
                ...state,
                data,
                getActionType: 'analgesia/getAnalgesiaSuccess'
            };

        },
        getAnalgesiaFailure: state => {
            return {
                ...state,
                getActionType: 'analgesia/getAnalgesiaFailure'
            };
        },

        /**
         * 创建或更新 Analgesia 数据
         * @param state
         * @returns {*&{updateActionType: string}}
         */
        updateAnalgesiaRequest: state => {
            return {
                ...state,
                updateActionType: 'analgesia/updateAnalgesiaRequest'
            };
        },
        updateAnalgesiaSuccess: state => {
            return {
                ...state,
                updateActionType: 'analgesia/updateAnalgesiaSuccess'
            };
        },
        updateAnalgesiaFailure: state => {
            return {
                ...state,
                updateActionType: 'analgesia/updateAnalgesiaFailure'
            };
        }

    }
};
