/**
 * @file ObservalForm.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import Checkbox from 'customized/CustomizedMaterialCheckbox';
import TextField from 'customized/CustomizedMaterialTextField';
import TextArea from 'customized/CustomizedMaterialTextArea';
import TimePicker from 'customized/CustomizedMaterialTimePicker';
import FieldSet from 'components/FieldSet';
import DisplayField from 'components/DisplayField';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';

// Vendors
import debounce from 'lodash/debounce';
import {formatString} from 'vendors/Util';
import Time from 'vendors/Time';

// Styles
import './ObservalForm.scss';

const ObservalForm = ({
    patientId, form, observalEndPoints, epPlacementPoints,
    updateObservalDataField, createOrUpdateObservalData
}) => {

    const

        /**
         * 提交到后端
         * @type {*}
         */
        save = useCallback(() =>
            patientId && createOrUpdateObservalData?.(patientId, undefined, true, true), [
            patientId,
            createOrUpdateObservalData
        ]),

        /**
         * debounce 提交到后端
         * @type {*}
         */
        debounceSave = useMemo(() =>
            debounce(save, 400), [
            save
        ]),

        /**
         * 更新数据到 reducer
         * @type {Function}
         */
        updateField = useCallback((fieldName, fieldValue) => {
            updateObservalDataField?.(fieldName, fieldValue);
            setTimeout(() => debounceSave(), 0);
        }, [
            updateObservalDataField, debounceSave
        ]),

        /**
         * 格式化时间区间
         * @type {Function}
         */
        formatDuration = useCallback((timeStamp, isBirthTime) => {

            if (timeStamp < 0) {
                return '';
            }

            return isBirthTime ?
                `Duration of Analgesia: ${~~(timeStamp / 1000 / 60) + 60} min`
                :
                `Duration: ${~~(timeStamp / 1000 / 60)} min`;

        }, []),

        /**
         * PCA 时长
         */
        pcaDuration = useMemo(() =>
            formatDuration(Time.duration(form?.initialTime, form?.firstPcaTime)), [
            form, formatDuration
        ]),

        /**
         * bolus 时长
         */
        bolusDuration = useMemo(() =>
            formatDuration(Time.duration(form?.initialTime, form?.firstManualBolusTime)), [
            form, formatDuration
        ]),

        /**
         * birth 时长
         */
        birthDuration = useMemo(() =>
            formatDuration(Time.duration(form?.initialTime, form?.birthTime), true), [
            form, formatDuration
        ]);

    return (
        <div className="observal-data-form">

            <FieldSet title="1. Basic Information">
                <div className="row">
                    <TimePicker className="col-6"
                                label="Initial Time"
                                value={formatString(form.initialTime)}
                                onChange={v => updateField('initialTime', v)}/>
                    <DropdownSelect className="col-6"
                                    data={observalEndPoints}
                                    value={form.observalEndPoint}
                                    label="Observal End Point"
                                    valueField="id"
                                    displayField="name"
                                    onChange={v => updateField('observalEndPoint', v)}/>
                    <TimePicker className="col-6"
                                label="Cervix Fully Dilated Time"
                                value={formatString(form.cervixFullyDilatedTime)}
                                onChange={v => updateField('cervixFullyDilatedTime', v)}/>
                    <DropdownSelect className="col-3"
                                    data={epPlacementPoints}
                                    value={form.epPlacementPoint}
                                    label="EP Placement Point"
                                    valueField="id"
                                    displayField="name"
                                    onChange={v => updateField('epPlacementPoint', v)}/>
                    <TextField className="col-3"
                               label="Cervix Dilatation"
                               value={formatString(form.cervixDilatation)}
                               onChange={v => updateField('cervixDilatation', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="2. Medication use">
                <div className="row">
                    <TextField className="col-3 unit-ml"
                               label="Initial Dose"
                               rightIconCls="unit"
                               value={formatString(form.initialDose)}
                               onChange={v => updateField('initialDose', v)}/>
                    <TextField className="col-3 unit-ml"
                               label="Pump Consumption"
                               rightIconCls="unit"
                               value={formatString(form.pumpConsumption)}
                               onChange={v => updateField('pumpConsumption', v)}/>
                    <TextField className="col-3 unit-ml"
                               label="Bolus"
                               rightIconCls="unit"
                               value={formatString(form.bolus)}
                               onChange={v => updateField('bolus', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="3. PCA">
                <div className="row">
                    <TimePicker className="col-6"
                                label="First PCA Time"
                                value={formatString(form.firstPcaTime)}
                                onChange={v => updateField('firstPcaTime', v)}/>
                    {
                        pcaDuration ?
                            <DisplayField className="col-6 duration-tag">
                                {pcaDuration}
                            </DisplayField>
                            :
                            null
                    }
                </div>
                <div className="row">
                    <TextField className="col-6"
                               label="PCA Count"
                               value={formatString(form.pcaCount)}
                               onChange={v => updateField('pcaCount', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="4. Bolus">
                <div className="row">
                    <TimePicker className="col-6"
                                label="First Manual Bolus Time"
                                value={formatString(form.firstManualBolusTime)}
                                onChange={v => updateField('firstManualBolusTime', v)}/>
                    {
                        bolusDuration ?
                            <DisplayField className="col-6 duration-tag">
                                {bolusDuration}
                            </DisplayField>
                            :
                            null
                    }
                </div>
                <div className="row">
                    <TextField className="col-6"
                               label="Manual Bolus Count"
                               value={formatString(form.manualBolusCount)}
                               onChange={v => updateField('manualBolusCount', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="5. Labor">
                <div className="row">
                    <Checkbox className="col-3"
                              label="Vasoactive Agent"
                              checked={form.hasVasoactiveAgent}
                              onChange={v => updateField('hasVasoactiveAgent', v)}/>
                    <Checkbox className="col-3"
                              label="Hypotension"
                              checked={form.hasHypotension}
                              onChange={v => updateField('hasHypotension', v)}/>
                    <Checkbox className="col-3"
                              label="Caesarean Section"
                              checked={form.hasCaesareanSection}
                              onChange={v => updateField('hasCaesareanSection', v)}/>
                    <Checkbox className="col-3"
                              label="Instrumental"
                              checked={form.hasInstrumental}
                              onChange={v => updateField('hasInstrumental', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="6. Lateral Episiotomy">
                <div className="row">
                    <Checkbox className="col-3"
                              label="Lateral Episiotomy"
                              checked={form.hasLateralEpisiotomy}
                              onChange={v => updateField('hasLateralEpisiotomy', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="7. Foetal">
                <div className="row">
                    <TimePicker className="col-3"
                                label="Birth Time"
                                value={formatString(form.birthTime)}
                                onChange={v => updateField('birthTime', v)}/>
                    {
                        birthDuration ?
                            <DisplayField className="col-6 duration-tag">
                                {birthDuration}
                            </DisplayField>
                            :
                            null
                    }
                </div>
                <div className="row">
                    <TextField className="col-3 unit-g"
                               label="Foetal Weight"
                               rightIconCls="unit"
                               value={formatString(form.foetalWeight)}
                               onChange={v => updateField('foetalWeight', v)}/>
                    <TextField className="col-3"
                               label="1min Apgar Score"
                               value={formatString(form.oneMinuteApgarScore)}
                               onChange={v => updateField('oneMinuteApgarScore', v)}/>
                    <TextField className="col-3"
                               label="5min Apgar Score"
                               value={formatString(form.fiveMinuteApgarScore)}
                               onChange={v => updateField('fiveMinuteApgarScore', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="8. Others">
                <div className="row">
                    <TextArea className="col-12"
                              label="Description"
                              maxLength={1000}
                              wordCountVisible={true}
                              value={formatString(form.description)}
                              onChange={v => updateField('description', v)}/>
                </div>
            </FieldSet>

        </div>
    );

};

ObservalForm.GENDER_LIST = [{
    label: 'Male',
    value: 1
}, {
    label: 'Female',
    value: 2
}];

ObservalForm.propTypes = {

    patientId: PropTypes.string,
    form: PropTypes.object,
    observalEndPoints: PropTypes.array,
    epPlacementPoints: PropTypes.array,

    updateObservalDataField: PropTypes.func,
    createOrUpdateObservalData: PropTypes.func

};

export default connect(state => ({
    form: state.observal.form,
    observalEndPoints: state.observalEndPoint.list,
    epPlacementPoints: state.epPlacementPoint.list
}), dispatch => bindActionCreators({
    updateObservalDataField: actions.updateObservalDataField,
    createOrUpdateObservalData: actions.createOrUpdateObservalData
}, dispatch))(ObservalForm);
