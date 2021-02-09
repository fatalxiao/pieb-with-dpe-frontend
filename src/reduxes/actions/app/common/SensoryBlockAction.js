/**
 * @file PatientAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import SensoryBlockApi from 'apis/app/common/SensoryBlockApi';

/**
 * 获取所有的 Sensory Blocks
 * @returns {function(*): *}
 */
export const getSensoryBlocks = () => dispatch => dispatch({
    [actionTypes.CALL_API]: {
        types: [
            actionTypes.GET_SENSORY_BLOCKS_REQUEST,
            actionTypes.GET_SENSORY_BLOCKS_SUCCESS,
            actionTypes.GET_SENSORY_BLOCKS_FAILURE
        ],
        api: SensoryBlockApi.getSensoryBlocks,
        successResMsgDisabled: true
    }
});
