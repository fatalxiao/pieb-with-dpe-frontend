import React, {Component} from 'react';
import classNames from 'classnames';

import NavBar from './bar/NavBar';
import NavPatient from './patients/NavPatients';

import Event from 'vendors/Event';
import Valid from 'vendors/Valid';

import 'scss/containers/app/nav/Nav.scss';

class Nav extends Component {

    constructor(props) {

        super(props);

        this.navBarWidth = 64;
        this.navPatientWidth = 240;
        this.defaultWidth = this.navBarWidth + this.navPatientWidth;

        this.noMove = false;
        this.resizing = false;
        this.startWidth = null;
        this.mouseX = null;

        const navWidth = this.getNavWidth();
        this.state = {
            isDragging: false,
            navWidth,
            isNavPatientCollapsed: this.isNavPatientCollapsed(navWidth) || this.isNavPatientFold(navWidth),
            isNavPatientFold: this.isNavPatientFold(navWidth)
        };

    }

    getNavWidth = () => {
        return parseInt(localStorage.getItem('navWidth')) || this.defaultWidth;
    };

    saveNavWidth = navWidth => {
        localStorage.setItem('navWidth', navWidth);
    };

    isNavPatientCollapsed = navWidth => {
        return navWidth < this.navBarWidth * 2;
    };

    isNavPatientFold = navWidth => {
        return navWidth < this.navBarWidth + this.navPatientWidth / 3;
    };

    toggleMouseDownHandler = e => {

        e.stopPropagation();

        this.noMove = true;
        this.resizing = true;
        this.startWidth = this.state.navWidth;
        this.mouseX = e.pageX;

    };

    mouseMoveHandler = e => {

        e.stopPropagation();

        if (!this.resizing) {
            return;
        }

        this.noMove = false;

        const offsetX = e.pageX - this.mouseX,
            navWidth = Valid.range(this.startWidth + offsetX, this.navBarWidth);

        this.setState({
            isDragging: true,
            navWidth,
            isNavPatientCollapsed: this.isNavPatientCollapsed(navWidth),
            isNavPatientFold: false
        });

    };

    mouseUpHandler = () => {

        this.resizing = false;

        const {navWidth} = this.state,
            isFold = this.isNavPatientFold(navWidth),
            newNavWidth = isFold ? this.navBarWidth : (navWidth < this.defaultWidth ? this.defaultWidth : navWidth);

        this.setState({
            isDragging: false,
            navWidth: newNavWidth,
            isNavPatientCollapsed: this.isNavPatientCollapsed(newNavWidth) || isFold,
            isNavPatientFold: isFold
        }, () => {
            this.saveNavWidth(newNavWidth);
        });

    };

    toggleNav = e => {

        if (!this.noMove) {
            return;
        }

        e.stopPropagation();

        const {navWidth} = this.state,
            isFold = navWidth !== this.navBarWidth;

        this.setState({
            navWidth: isFold ? this.navBarWidth : this.defaultWidth,
            isNavPatientCollapsed: isFold,
            isNavPatientFold: isFold
        });

    };

    componentDidMount() {
        Event.addEvent(document, 'mousemove', this.mouseMoveHandler);
        Event.addEvent(document, 'mouseup', this.mouseUpHandler);
    }

    componentWillUnmount() {
        Event.removeEvent(document, 'mousemove', this.mouseMoveHandler);
        Event.removeEvent(document, 'mouseup', this.mouseUpHandler);
    }

    render() {

        const {isDragging, navWidth, isNavPatientCollapsed, isNavPatientFold} = this.state,

            collapsed = navWidth === this.navBarWidth,

            wrapperClassName = classNames('nav', {
                dragging: isDragging
            }),
            wrapperStyle = {
                flexBasis: collapsed ? this.navBarWidth : navWidth
            },
            innerStyle = {
                width: collapsed ? this.navBarWidth : navWidth
            },
            toggleClassName = classNames('nav-toggle', {
                collapsed
            });

        return (
            <div className={wrapperClassName}
                 style={wrapperStyle}>

                <div className="nav-inner"
                     style={innerStyle}>

                    <NavBar isCollapsed={isNavPatientCollapsed}
                            isFold={isNavPatientFold}/>

                    <NavPatient isCollapsed={isNavPatientCollapsed}
                                isFold={isNavPatientFold}/>

                    <div className="nav-resize"
                         onMouseDown={this.toggleMouseDownHandler}
                         onMouseUp={this.toggleNav}>
                        <div className={toggleClassName}></div>
                    </div>

                </div>

            </div>
        );
    }
}

export default Nav;