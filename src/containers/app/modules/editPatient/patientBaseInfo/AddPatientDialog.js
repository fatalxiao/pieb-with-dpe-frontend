/**
 * @file AddPatientDialog.js
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import Dialog from 'alcedo-ui/Dialog';
import TextField from 'customized/CustomizedMaterialTextField';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import FieldSet from 'components/FieldSet';
import Msg from 'components/Msg';

// Vendors
import {formatString} from 'vendors/Util';

// Styles
import 'scss/containers/app/nav/bar/AddPatientDialog.scss';

const AddPatientDialog = ({
    groupList, form, visible,
    onRequestClose, updatePatientBaseInfoField, createPatient, routerPush
}) => {

    const

        /**
         * 当前 form 的错误消息
         */
        [errorMsg, setErrorMsg] = useState(''),

        /**
         * 更新值
         * @type {Function}
         */
        updateField = useCallback((fieldName, fieldValue) => {

            if (errorMsg) {
                setErrorMsg('');
            }

            updatePatientBaseInfoField?.(fieldName, fieldValue);

        }, [errorMsg, updatePatientBaseInfoField]),

        /**
         * 提交新值到后端
         * @type {Function}
         */
        save = useCallback(() => {

            const error = [];

            // 校验值
            if (!form.id) {
                error.push('ID');
            }
            if (!form.name) {
                error.push('Name');
            }
            if (!form.group) {
                error.push('Group');
            }

            // 如果有 error 中断提交
            if (error.length > 0) {
                setErrorMsg(`${error.join(', ')} is required!`);
                return;
            }

            createPatient?.(() => {
                onRequestClose();
                routerPush(`/app/patient/info/${form.id}`);
            });

        }, [
            form,
            createPatient, onRequestClose, routerPush
        ]);

    return (
        <Dialog className="add-patient-dialog"
                visible={visible}
                title="Create Patient"
                okButtonText="Create"
                onOKButtonClick={save}
                onRequestClose={onRequestClose}>

            <FieldSet title="1. Patient Basic Information">
                <div className="row">
                    <TextField className="col-6"
                               label="ID"
                               value={formatString(form.id)}
                               required={true}
                               onChange={value => updateField('id', value)}/>
                    <TextField className="col-6"
                               label="Name"
                               value={formatString(form.name)}
                               required={true}
                               onChange={value => updateField('name', value)}/>
                </div>
            </FieldSet>

            <FieldSet title="2. Select Patient Group">
                <div className="row">
                    <DropdownSelect className="col-12"
                                    label="Group"
                                    data={groupList}
                                    valueField="id"
                                    displayField="name"
                                    value={form.group}
                                    required={true}
                                    onChange={value => updateField('group', value)}/>
                </div>
            </FieldSet>

            {
                errorMsg ?
                    <Msg type={Msg.Type.ERROR}>
                        {errorMsg}
                    </Msg>
                    :
                    null
            }

        </Dialog>
    );

};

AddPatientDialog.propTypes = {

    groupList: PropTypes.array,
    form: PropTypes.object,

    visible: PropTypes.bool,

    onRequestClose: PropTypes.func,
    routerPush: PropTypes.func,
    updatePatientBaseInfoField: PropTypes.func,
    createPatient: PropTypes.func

};

export default connect(state => ({
    groupList: state.group.list,
    form: state.patientBaseInfo.form
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush,
    updatePatientBaseInfoField: actions.updatePatientBaseInfoField,
    createPatient: actions.createPatient
}, dispatch))(AddPatientDialog);
