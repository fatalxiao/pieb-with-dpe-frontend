/**
 * @file AnalgesiaTable.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import ModuleTableCard from 'components/module/table/ModuleTableCard';
import Table from 'customized/Table';
import TextField from 'customized/MaterialTextField';
import DropdownSelect from 'customized/MaterialDropdownSelect';
import AppendTimePointButton from './AnalgesiaAppendTimePointButton';

// Vendors
import debounce from 'lodash/debounce';
import {formatString} from 'vendors/Util';

// Styles
import './AnalgesiaTable.scss';

const AnalgesiaTable = ({
    patientId, thoracicList, sacralList, analgesiaData,
    createOrUpdateAnalgesiaData, updateAnalgesiaDataField
}) => {

    /**
     * 将 Analgesia 数据提交到后端
     * @type {*}
     */
    const save = useCallback(() => {
        patientId && createOrUpdateAnalgesiaData?.({
            patientId,
            successResMsgDisabled: true
        });
    }, [
        patientId,
        createOrUpdateAnalgesiaData
    ]);

    /**
     * 将 Analgesia 数据 debounce 提交到后端
     */
    const debounceSave = useMemo(() => {
        return debounce(save, 400);
    }, [
        save
    ]);

    /**
     * 处理值变更
     * @type {Function}
     */
    const updateField = useCallback((timePoint, fieldName, fieldValue) => {
        updateAnalgesiaDataField?.({
            timePoint,
            fieldName,
            fieldValue
        });
        setTimeout(() => debounceSave(), 0);
    }, [
        updateAnalgesiaDataField, debounceSave
    ]);

    /**
     * 所有 columns 的配置
     * @type {*[]}
     */
    const columns = useMemo(() => {
        return [{
            key: 'timePoint',
            width: 48,
            headRenderer: 'Time',
            bodyRenderer: rowData => rowData.timePoint < 60 ?
                `${rowData.timePoint} min`
                :
                `${rowData.timePoint / 60} h`
        }, {
            key: 'vasScore',
            headRenderer: 'Vas',
            bodyRenderer: rowData =>
                <TextField value={formatString(rowData.vasScore)}
                           onChange={v => updateField(rowData.timePoint, 'vasScore', v)}/>
        }, {
            key: 'thoracicSensoryBlock',
            width: 166,
            noWrap: true,
            headRenderer: 'TSB',
            bodyRenderer: rowData =>
                <div>
                    <label>L: </label>
                    <DropdownSelect data={thoracicList}
                                    value={rowData.thoracicSensoryBlockLeft}
                                    valueField="value"
                                    displayField="name"
                                    onChange={v => updateField(rowData.timePoint, 'thoracicSensoryBlockLeft', v)}/>
                    <label>, R: </label>
                    <DropdownSelect data={thoracicList}
                                    value={rowData.thoracicSensoryBlockRight}
                                    valueField="value"
                                    displayField="name"
                                    onChange={v => updateField(rowData.timePoint, 'thoracicSensoryBlockRight', v)}/>
                </div>
        }, {
            key: 'sacralSensoryBlock',
            width: 166,
            noWrap: true,
            headRenderer: 'SSB',
            bodyRenderer: rowData =>
                <div>
                    <label>L: </label>
                    <DropdownSelect data={sacralList}
                                    value={rowData.sacralSensoryBlockLeft}
                                    valueField="value"
                                    displayField="name"
                                    onChange={v => updateField(rowData.timePoint, 'sacralSensoryBlockLeft', v)}/>
                    <label>, R: </label>
                    <DropdownSelect data={sacralList}
                                    value={rowData.sacralSensoryBlockRight}
                                    valueField="value"
                                    displayField="name"
                                    onChange={v => updateField(rowData.timePoint, 'sacralSensoryBlockRight', v)}/>
                </div>
        }, {
            key: 'bromageScore',
            headRenderer: 'Bromage',
            bodyRenderer: rowData =>
                <TextField value={formatString(rowData.bromageScore)}
                           onChange={v => updateField(rowData.timePoint, 'bromageScore', v)}/>
        }, {
            key: 'systolicBloodPressure',
            headRenderer: 'SBP',
            bodyRenderer: rowData =>
                <TextField value={formatString(rowData.systolicBloodPressure)}
                           onChange={v => updateField(rowData.timePoint, 'systolicBloodPressure', v)}/>
        }, {
            key: 'diastolicBloodPressure',
            headRenderer: 'DBP',
            bodyRenderer: rowData =>
                <TextField value={formatString(rowData.diastolicBloodPressure)}
                           onChange={v => updateField(rowData.timePoint, 'diastolicBloodPressure', v)}/>
        }, {
            key: 'heartRate',
            headRenderer: 'HR',
            bodyRenderer: rowData =>
                <TextField value={formatString(rowData.heartRate)}
                           onChange={v => updateField(rowData.timePoint, 'heartRate', v)}/>
        }, {
            key: 'fetalHeartRate',
            headRenderer: 'FHR',
            bodyRenderer: rowData =>
                <TextField value={formatString(rowData.fetalHeartRate)}
                           onChange={v => updateField(rowData.timePoint, 'fetalHeartRate', v)}/>
        }];
    }, [
        thoracicList, sacralList,
        updateField
    ]);

    return (
        <ModuleTableCard className="analgesia-data-table-card"
                         hasFinishedLoading={true}>

            <Table className="analgesia-data-table"
                   columns={columns}
                   data={analgesiaData}
                   idField="timePoint"
                   isPaginated={false}
                   isFootHidden={true}/>

            <AppendTimePointButton/>

        </ModuleTableCard>
    );

};

AnalgesiaTable.propTypes = {

    patientId: PropTypes.string,
    thoracicList: PropTypes.array,
    sacralList: PropTypes.array,
    analgesiaData: PropTypes.array,

    createOrUpdateAnalgesiaData: PropTypes.func,
    updateAnalgesiaDataField: PropTypes.func

};

export default connect(state => ({
    thoracicList: state.sensoryBlock.thoracicList,
    sacralList: state.sensoryBlock.sacralList,
    analgesiaData: state.analgesia.data
}), dispatch => bindModelActionCreators({
    createOrUpdateAnalgesiaData: 'analgesia/createOrUpdateAnalgesiaData',
    updateAnalgesiaDataField: 'analgesia/updateAnalgesiaDataField'
}, dispatch))(AnalgesiaTable);
