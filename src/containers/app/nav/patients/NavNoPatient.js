/**
 * @file NavNoPatient.js
 */

import React, {useState, useCallback} from 'react';

// Components
import AddPatientDialog from 'containers/app/modules/editPatient/patientBaseInfo/AddPatientDialog';

// Styles
import './NavNoPatient.scss';

const NavNoPatient = () => {

    const

        /**
         * 是否显示 dialog 的标志
         */
        [addPatientDialogVisible, setAddPatientDialogVisible] = useState(false),

        /**
         * 显示 dialog
         * @type {function(): void}
         */
        showAddPatientDialog = useCallback(() => setAddPatientDialogVisible(true), []),

        /**
         * 隐藏 dialog
         * @type {function(): void}
         */
        hideAddPatientDialog = useCallback(() => setAddPatientDialogVisible(false), []);

    return (
        <div className="nav-no-patient">

            <i className="icon-plus add-patient-icon"
               onClick={showAddPatientDialog}></i>

            You have no patient now.<br/>
            Would you
            <span className="add-patient-button"
                  onClick={showAddPatientDialog}>Create new Patient</span>
            ?

            <AddPatientDialog visible={addPatientDialogVisible}
                              onRequestClose={hideAddPatientDialog}/>

        </div>
    );

};

export default NavNoPatient;
