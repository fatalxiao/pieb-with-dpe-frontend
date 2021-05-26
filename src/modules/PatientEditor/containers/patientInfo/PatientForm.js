/**
 * @file PatientForm.js
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
import FieldSet from 'components/FieldSet';

// Vendors
import debounce from 'lodash/debounce';
import {formatString} from 'vendors/Util';

// Styles
import './PatientForm.scss';

const PatientForm = ({
    form, patientId,
    updatePatientInfoField, updatePatientInfo
}) => {

    const

        /**
         * 提交 field 新值到后端
         * @type {Function}
         */
        save = useCallback(() =>
            patientId && updatePatientInfo(patientId, undefined, true), [
            patientId, updatePatientInfo
        ]),

        /**
         * 提交 field 新值到后端
         * @type {Function}
         */
        debounceSave = useMemo(() => debounce(save, 1000), [save]),

        /**
         * 更新 field 新值到 reducer
         * @type {Function}
         */
        updateField = useCallback((fieldName, fieldValue) => {
            updatePatientInfoField?.(fieldName, fieldValue);
            setTimeout(() => debounceSave(), 0);
        }, [updatePatientInfoField, debounceSave]);

    return (
        <div className="patient-form">

            <FieldSet title="1. Patient Information">
                <div className="row">
                    <TextField className="col-3"
                               label="Age"
                               value={formatString(form.age)}
                               onChange={value => updateField('age', value)}/>
                    <TextField className="col-3 unit-weeks"
                               label="Gestational Days"
                               rightIconCls="unit"
                               value={formatString(form.gestationalDaysWeeks)}
                               onChange={value => updateField('gestationalDaysWeeks', value)}/>
                    <TextField className="col-3 unit-days gestational-days"
                               rightIconCls="unit"
                               value={formatString(form.gestationalDaysDays)}
                               onChange={value => updateField('gestationalDaysDays', value)}/>
                </div>
                <div className="row">
                    <TextField className="col-3 unit-cm"
                               label="Height"
                               rightIconCls="unit"
                               value={formatString(form.height)}
                               onChange={value => updateField('height', value)}/>
                    <TextField className="col-3 unit-kg"
                               label="Weight"
                               rightIconCls="unit"
                               value={formatString(form.weight)}
                               onChange={value => updateField('weight', value)}/>
                    <TextField className="col-3"
                               label="Heart Rate"
                               value={formatString(form.heartRate)}
                               onChange={value => updateField('heartRate', value)}/>
                    <TextField className="col-3"
                               label="Initial Vas Score"
                               value={formatString(form.initialVasScore)}
                               onChange={value => updateField('initialVasScore', value)}/>
                </div>
                <div className="row">
                    <TextField className="col-3"
                               label="Systolic Blood Pressure"
                               value={formatString(form.systolicBloodPressure)}
                               onChange={value => updateField('systolicBloodPressure', value)}/>
                    <TextField className="col-3"
                               label="Diastolic Blood Pressure"
                               value={formatString(form.diastolicBloodPressure)}
                               onChange={value => updateField('diastolicBloodPressure', value)}/>
                    <TextField className="col-3"
                               label="Fetal Heart Rate"
                               value={formatString(form.fetalHeartRate)}
                               onChange={value => updateField('fetalHeartRate', value)}/>
                    <TextField className="col-3"
                               label="Pulse Oxygen Saturation"
                               value={formatString(form.pulseOxygenSaturation)}
                               onChange={value => updateField('pulseOxygenSaturation', value)}/>
                </div>
                <div className="row">
                    <TextField className="col-6"
                               label="Cervical Dilation At Time Of EA"
                               value={formatString(form.cervicalDilationAtTimeOfEA)}
                               onChange={value => updateField('cervicalDilationAtTimeOfEA', value)}/>
                    <Checkbox className="col-3"
                              label="Induction"
                              checked={!!form.hasInduction}
                              onChange={value => updateField('hasInduction', value)}/>
                    <Checkbox className="col-3"
                              label="Oxytocin At Time Of EA"
                              checked={!!form.hasOxytocinAtTimeOfEA}
                              onChange={value => updateField('hasOxytocinAtTimeOfEA', value)}/>
                </div>
            </FieldSet>

            <FieldSet title="2. Others">
                <div className="row">
                    <TextArea className="col-12"
                              label="Description"
                              maxLength={1000}
                              wordCountVisible={true}
                              value={formatString(form.description)}
                              onChange={value => updateField('description', value)}/>
                </div>
            </FieldSet>

        </div>
    );

};

PatientForm.propTypes = {

    patientId: PropTypes.string,
    form: PropTypes.object,

    updatePatientInfoField: PropTypes.func,
    updatePatientInfo: PropTypes.func

};

export default connect(state => ({
    form: state.patientInfo.form
}), dispatch => bindActionCreators({
    updatePatientInfoField: actions.updatePatientInfoField,
    updatePatientInfo: actions.updatePatientInfo
}, dispatch))(PatientForm);
