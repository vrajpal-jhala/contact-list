import React from 'react';
import {
  makeStyles,
  IconButton,
  Hidden,
} from '@material-ui/core';
import {
  Menu
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  header: {
    minHeight: 50,
    width: 100 + '%',
    boxShadow: '0px 0px 5px darkgrey'
  }
}));

const Header = ({ handleFullDrawerToggle }) => {

  const classes = useStyle();

  return (
    <header className={classes.header}>
      <Hidden smUp>
        <IconButton onClick={handleFullDrawerToggle}>
          <Menu />
        </IconButton>
      </Hidden>
    </header>
  );
};

export default Header;