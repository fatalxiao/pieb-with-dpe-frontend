import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import IconButton from 'alcedo-ui/IconButton';
import Popover from 'alcedo-ui/Popover';
import PatientList from './NavPatientList';

import 'scss/containers/app/nav/patients/NavPatientPopover.scss';

class NavPatientsPopover extends Component {

    constructor(props) {

        super(props);

        this.state = {
            popVisible: false
        };

        this.allPatientButtonRef = createRef();

        this.allPatientMouseHandler = ::this.allPatientMouseHandler;
        this.goToList = ::this.goToList;

    }

    allPatientMouseHandler(popVisible) {
        this.setState({
            popVisible
        });
    }

    goToList() {
        this.props.routerPush('/app/patient-list');
    }

    componentDidMount() {
        this.allPatientButtonEl = findDOMNode(this.allPatientButtonRef?.current);
    }

    render() {

        const {isFold} = this.props,
            {popVisible} = this.state;

        return (
            <div className="nav-patient-popover-wrapper">

                <IconButton ref={this.allPatientButtonRef}
                            className="nav-patient-popover-item"
                            iconCls="icon-list"
                            onMouseOver={() => {
                                this.allPatientMouseHandler(true);
                            }}
                            onClick={this.goToList}/>

                <Popover className="nav-patient-popover"
                         visible={isFold && popVisible}
                         triggerEl={this.allPatientButtonEl}
                         position={Popover.Position.RIGHT_TOP}
                         hasTriangle={false}
                         isTriggerPositionFixed={true}
                         onRequestClose={() => {
                             this.allPatientMouseHandler(false);
                         }}>
                    <PatientList/>
                </Popover>

            </div>
        );
    }
}

NavPatientsPopover.propTypes = {
    isFold: PropTypes.bool,
    routerPush: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(NavPatientsPopover);
