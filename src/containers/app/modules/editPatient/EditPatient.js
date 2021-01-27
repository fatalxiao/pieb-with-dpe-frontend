/**
 * @file EditPatient.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions/index';

// Components
import {Redirect} from 'react-router-dom';
import PointStep from 'alcedo-ui/PointStep';

// Styles
import './EditPatient.scss';

const EditPatient = ({
    route, form, steps, activatedStep,
    routerPush
}) => {

    const

        /**
         * 处理 step 变更
         * @type {Function}
         */
        handleStepChange = useCallback(({activatedStep}) => {
            routerPush?.(steps?.[activatedStep]?.route);
        }, [steps, activatedStep, routerPush]);

    return (
        <div className="edit-patient">

            <PointStep className="edit-patient-stepper"
                       steps={steps}
                       activatedStep={activatedStep}
                       finishedStep={steps?.length - 1}
                       onChange={handleStepChange}/>

            <div className="edit-patient-content">

                {
                    form?.name ?
                        <div>
                            <div className="edit-patient-base-info">
                                <h1 className="edit-patient-name">{form.name}</h1>
                                <div className="edit-patient-desc">
                                    {`${form.id}  ·  ${form.group && form.group?.name}`}
                                </div>
                            </div>
                            {
                                activatedStep >= 0 ?
                                    <h2 className="edit-patient-content-title">
                                        {`Step ${activatedStep + 1}. ${steps?.[activatedStep].title}`}
                                    </h2>
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }

                {renderRoutes(route?.routes)}

                {
                    location?.pathname === '/app/patient' ?
                        <Redirect from="/app/patient"
                                  to="/app/patient-list"/>
                        :
                        null
                }

            </div>

        </div>
    );

};

EditPatient.propTypes = {

    form: PropTypes.object,
    steps: PropTypes.array,

    activatedStep: PropTypes.number,

    routerPush: PropTypes.func

};

export default connect(state => ({
    form: state.patientInfo.form,
    steps: state.editPatient.steps,
    activatedStep: state.editPatient.activatedStep
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(EditPatient);
