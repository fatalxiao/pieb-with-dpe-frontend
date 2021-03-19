/**
 * @file AnalgesiaAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import AnalgesiaApi from 'apis/app/modules/patient/AnalgesiaApi';

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

/**
 * 追加新的时间节点
 * @returns {{type: string}}
 */
export const appendTimePoint = () => ({
    type: actionTypes.APPEND_TIME_POINT
});

/**
 * 更新 Analgesia 数据某个时间节点的某个字段
 * @param timePoint
 * @param fieldName
 * @param fieldValue
 * @returns {{fieldName: *, timePoint: *, type: string, fieldValue: *}}
 */
export const updateAnalgesiaDataField = (timePoint, fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_ANALGESIA_FIELD,
    timePoint,
    fieldName,
    fieldValue
});

/**
 * 获取某个 patientId 的 Analgesia 数据
 * @param patientId
 * @returns {function(*): *}
 */
export const getAnalgesiaData = patientId => dispatch => {

    if (!patientId) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_ANALGESIA_REQUEST,
                actionTypes.GET_ANALGESIA_SUCCESS,
                actionTypes.GET_ANALGESIA_FAILURE
            ],
            api: AnalgesiaApi.getAnalgesiaDataByPatientId,
            params: {patientId},
            successResMsgDisabled: true
        }
    });

};

/**
 * 创建或更新 Analgesia 数据
 * @param patientId
 * @param callback
 * @param successResMsgDisabled
 * @returns {function(*, *): *}
 */
export const createOrUpdateAnalgesiaData = (patientId, callback, successResMsgDisabled) => (dispatch, getState) => {

    const {analgesia} = getState(),
        {data} = analgesia;

    if (!patientId || !data) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_ANALGESIA_REQUEST,
                actionTypes.UPDATE_ANALGESIA_SUCCESS,
                actionTypes.UPDATE_ANALGESIA_FAILURE
            ],
            api: AnalgesiaApi.createOrUpdateAnalgesiaData,
            params: {
                patientId,
                analgesiaData: formatAnalgesiaData(data, analgesia.BASE_DATA)()
            },
            successResMsgDisabled,
            successCallback() {
                callback?.();
            }
        }
    });

};
