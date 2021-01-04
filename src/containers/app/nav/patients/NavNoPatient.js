import React, {Component} from 'react';

import AddPatientDialog from 'containers/app/modules/editPatient/patientBaseInfo/AddPatientDialog';

import 'scss/containers/app/nav/patients/NavNoPatient.scss';

class NavNoPatient extends Component {

    constructor(props) {

        super(props);

        this.state = {
            addPatientDialogVisible: false
        };

        this.showAddPatient = ::this.showAddPatient;
        this.hideAddPatient = ::this.hideAddPatient;

    }

    showAddPatient() {
        this.setState({
            addPatientDialogVisible: true
        });
    }

    hideAddPatient() {
        this.setState({
            addPatientDialogVisible: false
        });
    }

    render() {

        const {addPatientDialogVisible} = this.state;

        return (
            <div className="nav-no-patient">

                <i className="icon-plus add-patient-icon"
                   onClick={this.showAddPatient}></i>

                You have no patient now.<br/>
                Would you <span className="add-patient-button"
                                onClick={this.showAddPatient}>Create new Patient</span> ?

                <AddPatientDialog visible={addPatientDialogVisible}
                                  onRequestClose={this.hideAddPatient}/>

            </div>
        );
    }
}

export default NavNoPatient;