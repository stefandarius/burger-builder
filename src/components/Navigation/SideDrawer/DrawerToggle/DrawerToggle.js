import React from 'react';
import classes from '../DrawerToggle/DrawerToggle.module.css';

const drawerToglle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToglle;