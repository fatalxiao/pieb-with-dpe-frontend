import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavBarTop from './NavBarTop';
import NavBarBottom from './NavBarBottom';
import NavPatientMenu from '../patients/NavPatientsPopover';

import 'scss/containers/app/nav/bar/NavBar.scss';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {isFold} = this.props,

            wrapperClassName = classNames('nav-bar', {
                fold: isFold
            });

        return (
            <div className={wrapperClassName}>

                <NavBarTop isFold={isFold}/>

                <NavPatientMenu isFold={isFold}/>

                <NavBarBottom/>

            </div>
        );
    }
}

NavBar.propTypes = {
    isFold: PropTypes.bool
};

export default NavBar;