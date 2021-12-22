/**
 * @file PatientEditor.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import {Redirect} from 'react-router-dom';
import PointStep from 'alcedo-ui/PointStep';
import ModuleCard from 'components/module/ModuleCard';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './PatientEditor.scss';

const PatientEditor = ({
    route, form, steps, activatedStep,
    pushRoute
}) => {

    /**
     * 处理 step 变更
     * @type {Function}
     */
    const handleStepChange = useCallback(({nextActivatedStep}) => {
        pushRoute?.({
            route: steps?.[nextActivatedStep]?.route
        });
    }, [
        steps,
        pushRoute
    ]);

    return (
        <div className="patient-editor">

            <PointStep className="patient-editor-stepper"
                       steps={steps}
                       activatedStep={activatedStep}
                       finishedStep={steps?.length - 1}
                       onChange={handleStepChange}/>

            <ModuleCard className="patient-editor-content">

                {
                    form?.name ?
                        <div>
                            <div className="patient-editor-base-info">
                                <h1 className="patient-editor-name">{form.name}</h1>
                                <div className="patient-editor-desc">
                                    {`${form.id}  ·  ${form.group && form.group?.name}`}
                                </div>
                            </div>
                            {
                                activatedStep >= 0 ?
                                    <h2 className="patient-editor-content-title">
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

            </ModuleCard>

        </div>
    );

};

PatientEditor.propTypes = {

    route: PropTypes.object,

    form: PropTypes.object,
    steps: PropTypes.array,

    activatedStep: PropTypes.number,

    pushRoute: PropTypes.func

};

export default connect(state => ({
    form: state.patientInfo.form,
    steps: state.editPatient.steps,
    activatedStep: state.editPatient.activatedStep
}), dispatch => bindModelActionCreators({
    pushRoute: 'route/push'
}, dispatch))(PatientEditor);
