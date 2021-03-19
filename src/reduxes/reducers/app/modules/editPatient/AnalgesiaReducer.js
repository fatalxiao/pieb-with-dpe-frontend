/**
 * @file AnalgesiaReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

const

    /**
     * 每一行的默认数据
     * @type {{thoracicSensoryBlockLeft: null, bromageScore: string, fetalHeartRate: string, sacralSensoryBlockRight: null, heartRate: string, thoracicSensoryBlockRight: null, sacralSensoryBlockLeft: null, diastolicBloodPressure: string, systolicBloodPressure: string, vasScore: string}}
     */
    BASE_DATA = {
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
    },

    /**
     * 默认的时间节点
     * @type {number[]}
     */
    DEFAULT_TIME_POINTS = [
        0, 2, 4, 6, 8, 10, 12, 14, 16, 18,
        20, 30, 2 * 60, 3.5 * 60, 5 * 60, 6.5 * 60, 8 * 60
    ];

/**
 * 获取默认的数据
 * @param timePoints
 * @returns {[]}
 */
function getDefaultData(timePoints = DEFAULT_TIME_POINTS) {
    return timePoints.map(timePoint => ({
        ...BASE_DATA,
        timePoint
    }));
}

const initialState = {

    BASE_DATA,

    data: getDefaultData(),

    getActionType: '',
    updateActionType: ''

};

// eslint-disable-next-line complexity,require-jsdoc
function analgesia(state = initialState, action) {
    switch (action.type) {

        /**
         * 重置数据
         */
        case actionTypes.RESET_DATA: {
            return {
                ...state,
                data: getDefaultData()
            };
        }

        /**
         * 追加新的时间节点
         */
        case actionTypes.APPEND_TIME_POINT: {

            const data = cloneDeep(state.data);
            data.push({
                ...BASE_DATA,
                timePoint: data[data.length - 1].timePoint + 1.5 * 60
            });

            return {
                ...state,
                data
            };
        }

        /**
         * 更新 Analgesia 数据某个时间节点的某个字段
         */
        case actionTypes.UPDATE_ANALGESIA_FIELD: {

            const data = cloneDeep(state.data),
                updateItem = data.find(item => item.timePoint === action.timePoint);

            if (updateItem) {
                updateItem[action.fieldName] = action.fieldValue;
            }

            if ((action.fieldName === 'thoracicSensoryBlockLeft' || action.fieldName === 'thoracicSensoryBlockRight'
                || action.fieldName === 'sacralSensoryBlockLeft' || action.fieldName === 'sacralSensoryBlockRight')
                && !action.fieldValue.value) {
                updateItem[action.fieldName] = null;
            } else {
                if (action.fieldName === 'thoracicSensoryBlockLeft' && !updateItem.thoracicSensoryBlockRight) {
                    updateItem.thoracicSensoryBlockRight = action.fieldValue;
                } else if (action.fieldName === 'thoracicSensoryBlockRight' && !updateItem.thoracicSensoryBlockLeft) {
                    updateItem.thoracicSensoryBlockLeft = action.fieldValue;
                } else if (action.fieldName === 'sacralSensoryBlockLeft' && !updateItem.sacralSensoryBlockRight) {
                    updateItem.sacralSensoryBlockRight = action.fieldValue;
                } else if (action.fieldName === 'sacralSensoryBlockRight' && !updateItem.sacralSensoryBlockLeft) {
                    updateItem.sacralSensoryBlockLeft = action.fieldValue;
                }
            }

            return {
                ...state,
                data
            };

        }

        /**
         * 获取某个 patientId 的 Analgesia 数据
         */
        case actionTypes.GET_ANALGESIA_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_ANALGESIA_REQUEST
            };
        }
        case actionTypes.GET_ANALGESIA_SUCCESS: {

            const data = getDefaultData();

            if (action.responseData && action.responseData.length > 0) {

                for (let resItem of action.responseData) {

                    const item = data.find(a => a.timePoint === resItem.timePoint);

                    if (item) {
                        Object.assign(item, resItem);
                    } else {

                        let timePoint = DEFAULT_TIME_POINTS[DEFAULT_TIME_POINTS.length - 1];

                        while (timePoint < resItem.timePoint) {

                            timePoint += 1.5 * 60;

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
                getActionType: actionTypes.GET_ANALGESIA_SUCCESS
            };

        }
        case actionTypes.GET_ANALGESIA_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_ANALGESIA_FAILURE
            };
        }

        /**
         * 创建或更新 Analgesia 数据
         */
        case actionTypes.UPDATE_ANALGESIA_REQUEST: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_ANALGESIA_REQUEST
            };
        }
        case actionTypes.UPDATE_ANALGESIA_SUCCESS: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_ANALGESIA_SUCCESS
            };
        }
        case actionTypes.UPDATE_ANALGESIA_FAILURE: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_ANALGESIA_FAILURE
            };
        }

        default:
            return state;

    }
}

export default analgesia;
