/**
 * @file NavNoPatient.js
 */

import React, {useState, useCallback} from 'react';

// Components
import AddPatientDialog from 'modules/PatientEditor/containers/patientBaseInfo/AddPatientDialog';

// Styles
import './NavNoPatient.scss';

const NavNoPatient = () => {

    /**
     * 是否显示 dialog 的标志
     */
    const [addPatientDialogVisible, setAddPatientDialogVisible] = useState(false);

    /**
     * 显示 dialog
     * @type {function(): void}
     */
    const showAddPatientDialog = useCallback(() => {
        setAddPatientDialogVisible(true);
    }, []);

    /**
     * 隐藏 dialog
     * @type {function(): void}
     */
    const hideAddPatientDialog = useCallback(() => {
        setAddPatientDialogVisible(false);
    }, []);

    return (
        <div className="nav-no-patient">

            <i className="icon-plus add-patient-icon"
               onClick={showAddPatientDialog}/>

            You have no patient now.<br/>
            Would you
            <span className="add-patient-button"
                  onClick={showAddPatientDialog}>
                Create new Patient
            </span>
            ?

            <AddPatientDialog visible={addPatientDialogVisible}
                              onRequestClose={hideAddPatientDialog}/>

        </div>
    );

};

export default NavNoPatient;
