/**
 * @file NavBar.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import NavBarTop from './NavBarTop';
import NavPatientMenu from '../patients/NavPatientsPopover';

// Vendors
import classNames from 'classnames';

// Styles
import './NavBar.scss';

const NavBar = ({isFold}) => (
    <div className={classNames('nav-bar', {
        fold: isFold
    })}>

        <NavBarTop isFold={isFold}/>

        <NavPatientMenu isFold={isFold}/>

    </div>
);

NavBar.propTypes = {
    isFold: PropTypes.bool
};

export default NavBar;
