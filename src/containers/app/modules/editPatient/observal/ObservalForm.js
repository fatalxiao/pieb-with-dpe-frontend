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
import RadioGroup from 'customized/CustomizedMaterialRadioGroup';
import TextField from 'customized/CustomizedMaterialTextField';
import TextArea from 'customized/CustomizedMaterialTextArea';
import DateTimePicker from 'customized/CustomizedMaterialDateTimePicker';
import FieldSet from 'components/FieldSet';
import DisplayField from 'components/DisplayField';

// Vendors
import debounce from 'lodash/debounce';
import {formatString} from 'vendors/Util';
import Time from 'vendors/Time';

// Styles
import './ObservalForm.scss';

const ObservalForm = ({
    patientId, form,
    updateObservalDataField, createOrUpdateObservalData
}) => {

    const

        /**
         * 提交到后端
         * @type {debounced}
         */
        save = useCallback(debounce(() =>
            patientId && createOrUpdateObservalData?.(patientId, undefined, true, true),
            400
        ), [patientId, createOrUpdateObservalData]),

        /**
         * 更新数据到 reducer
         * @type {Function}
         */
        updateField = useCallback((fieldName, fieldValue) => {
            updateObservalDataField?.(fieldName, fieldValue);
            setTimeout(() => save(), 0);
        }, [updateObservalDataField, save]),

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

        pcaDuration = useMemo(() =>
                formatDuration(Time.duration(form?.initialTime, form?.firstPcaTime)),
            [form, formatDuration]
        ),

        bolusDuration = useMemo(() =>
                formatDuration(Time.duration(form?.initialTime, form?.firstManualBolusTime)),
            [form, formatDuration]
        ),

        birthDuration = useMemo(() =>
                formatDuration(Time.duration(form?.initialTime, form?.birthTime), true),
            [form, formatDuration]
        );

    return (
        <div className="observal-data-form">

            <FieldSet title="1. Basic Information">
                <div className="row">
                    <DateTimePicker className="col-6"
                                    label="Initial Time"
                                    value={formatString(form.initialTime)}
                                    onChange={v => updateField('initialTime', v)}/>
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
                    <DateTimePicker className="col-6"
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
                    <DateTimePicker className="col-6"
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

            <FieldSet title="5. Epidural Catheter">
                <div className="row">
                    <Checkbox className="col-6"
                              label="Epidural Catheter Adjuestment"
                              checked={form.hasEpiduralCatheterAdjuestment}
                              onChange={v => updateField('hasEpiduralCatheterAdjuestment', v)}/>
                    <Checkbox className="col-6"
                              label="Epidural Catheter Replacement"
                              checked={form.hasEpiduralCatheterReplacement}
                              onChange={v => updateField('hasEpiduralCatheterReplacement', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="6. Labor">
                <div className="row">
                    <TextField className="col-6"
                               label="Patient Satisfaction Score"
                               value={formatString(form.patientSatisfactionScore)}
                               onChange={v => updateField('patientSatisfactionScore', v)}/>
                </div>
                <div className="row">
                    <Checkbox className="col-3"
                              label="Prenatal Fever"
                              checked={form.hasPrenatalFever}
                              onChange={v => updateField('hasPrenatalFever', v)}/>
                    <TextField className="col-3"
                               label="Prenatal Fever Temperature"
                               value={formatString(form.prenatalFeverTemperature)}
                               disabled={!form.hasPrenatalFever}
                               onChange={v => updateField('prenatalFeverTemperature', v)}/>
                    <Checkbox className="col-3"
                              label="Vasoactive Agent"
                              checked={form.hasVasoactiveAgent}
                              onChange={v => updateField('hasVasoactiveAgent', v)}/>
                    <Checkbox className="col-3"
                              label="Nausea"
                              checked={form.hasNausea}
                              onChange={v => updateField('hasNausea', v)}/>
                </div>
                <div className="row">
                    <Checkbox className="col-3"
                              label="Vomit"
                              checked={form.hasVomit}
                              onChange={v => updateField('hasVomit', v)}/>
                    <Checkbox className="col-3"
                              label="Pruritus"
                              checked={form.hasPruritus}
                              onChange={v => updateField('hasPruritus', v)}/>
                    <Checkbox className="col-3"
                              label="Hypotension"
                              checked={form.hasHypotension}
                              onChange={v => updateField('hasHypotension', v)}/>
                    <Checkbox className="col-3"
                              label="Unabled To Puncture Dura"
                              checked={form.isUnabledToPunctureDura}
                              onChange={v => updateField('isUnabledToPunctureDura', v)}/>
                </div>
                <div className="row">
                    <Checkbox className="col-3"
                              label="Caesarean Section"
                              checked={form.hasCaesareanSection}
                              onChange={v => updateField('hasCaesareanSection', v)}/>
                    <Checkbox className="col-3"
                              label="Instrumental"
                              checked={form.hasInstrumental}
                              onChange={v => updateField('hasInstrumental', v)}/>
                    <Checkbox className="col-6"
                              label="Postdural Puncture Headache"
                              checked={form.hasPostduralPunctureHeadache}
                              onChange={v => updateField('hasPostduralPunctureHeadache', v)}/>
                </div>
                <div className="row">
                    <Checkbox className="col-3"
                              label="Back Pain"
                              checked={form.hasBackPain}
                              onChange={v => updateField('hasBackPain', v)}/>
                    <Checkbox className="col-3"
                              label="Paresthesia"
                              checked={form.hasParesthesia}
                              onChange={v => updateField('hasParesthesia', v)}/>
                    <Checkbox className="col-6"
                              label="Accidental Dural Punture"
                              checked={form.hasAccidentalDuralPunture}
                              onChange={v => updateField('hasAccidentalDuralPunture', v)}/>
                </div>
                <div className="row">
                    <Checkbox className="col-6"
                              label="IV Epidural Catheter Insertion"
                              checked={form.isIVEpiduralCatheterInsertion}
                              onChange={v => updateField('isIVEpiduralCatheterInsertion', v)}/>
                    <Checkbox className="col-6"
                              label="Intrathecal Epidural Catheter Insertion"
                              checked={form.isIntrathecalEpiduralCatheterInsertion}
                              onChange={v => updateField('isIntrathecalEpiduralCatheterInsertion', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="7. Lateral Episiotomy">
                <div className="row">
                    <Checkbox className="col-3"
                              label="Lateral Episiotomy"
                              checked={form.hasLateralEpisiotomy}
                              onChange={v => updateField('hasLateralEpisiotomy', v)}/>
                    <TextField className="col-6"
                               label="Lateral Episiotomy VAS Score"
                               value={formatString(form.lateralEpisiotomyVasScore)}
                               disabled={!form.hasLateralEpisiotomy}
                               onChange={v => updateField('lateralEpisiotomyVasScore', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="8. NICU">
                <div className="row">
                    <Checkbox className="col-3"
                              label="NICU"
                              checked={form.hasNicu}
                              onChange={v => updateField('hasNicu', v)}/>
                    <TextArea className="col-9"
                              label="NICU Reason"
                              value={formatString(form.nicuReason)}
                              disabled={!form.hasNicu}
                              onChange={v => updateField('nicuReason', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="9. Foetal">
                <div className="row">
                    <RadioGroup className="col-3"
                                label="Foetal Gender"
                                name="foetalGender"
                                data={ObservalForm.GENDER_LIST}
                                value={formatString(form.foetalGender)}
                                onChange={v => updateField('foetalGender', v)}/>
                    <DateTimePicker className="col-3"
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
                    <TextField className="col-3 unit-cm"
                               label="Foetal Height"
                               rightIconCls="unit"
                               value={formatString(form.foetalHeight)}
                               onChange={v => updateField('foetalHeight', v)}/>
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
                <div className="row">
                    <TextField className="col-3"
                               label="Arterial PH"
                               value={formatString(form.arterialPh)}
                               onChange={v => updateField('arterialPh', v)}/>
                    <TextField className="col-3"
                               label="Arterial BE"
                               value={formatString(form.arterialBe)}
                               onChange={v => updateField('arterialBe', v)}/>
                    <TextField className="col-3"
                               label="Venous PH"
                               value={formatString(form.venousPh)}
                               onChange={v => updateField('venousPh', v)}/>
                    <TextField className="col-3"
                               label="Venous BE"
                               value={formatString(form.venousBe)}
                               onChange={v => updateField('venousBe', v)}/>
                </div>
            </FieldSet>

            <FieldSet title="10. Others">
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

    updateObservalDataField: PropTypes.func,
    createOrUpdateObservalData: PropTypes.func

};

export default connect(state => ({
    form: state.observal.form
}), dispatch => bindActionCreators({
    updateObservalDataField: actions.updateObservalDataField,
    createOrUpdateObservalData: actions.createOrUpdateObservalData
}, dispatch))(ObservalForm);
